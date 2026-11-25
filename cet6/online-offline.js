'use strict';

const ONLINE_PAPER_CACHE = 'cet6-personal-paper-assets-v1';
const ONLINE_PAPER_INDEX = 'cet6-paper-cache-locations-v1';
const offlineJobs = new Map();
const offlineSaves = new Map();
const offlineSummaries = new Map();
const offlineInspections = new Map();
const offlinePapers = new Map();
let offlineLocations = new Map();
try {
  const pairs = JSON.parse(localStorage.getItem(ONLINE_PAPER_INDEX) || '[]');
  if (Array.isArray(pairs)) offlineLocations = new Map(pairs);
} catch (_) { /* Private browsing or a cleared index. */ }

function onlineAssetURL(value) {
  if (!value || typeof value !== 'string') return '';
  try {
    const url = new URL(value, location.href);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return '';
    url.hash = '';
    return url.href;
  } catch (_) { return ''; }
}

function offlineLocalAddress(original) {
  const url = new URL('./__paper_cache__/asset', document.baseURI);
  url.searchParams.set('source', original);
  return url.href;
}

function onlineOfflineURL(original) {
  const url = onlineAssetURL(original);
  if (url && offlineLocations.get(url) === 'readable' && navigator.serviceWorker?.controller)
    return offlineLocalAddress(url);
  return original || '';
}

function onlineOfflineAssets(paper) {
  const s = window.CET_ONLINE_SOURCES?.[paper.id];
  if (!s) return [];
  const assets = new Map();
  function add(original, kind, label) {
    const url = onlineAssetURL(original);
    if (url) assets.set(url, { url, kind, label });
  }
  if (s.pages?.length) s.pages.forEach((url, i) => add(url, 'image', '题卷第 ' + (i + 1) + ' 页'));
  else add(s.pdf, 'pdf', '题卷 PDF');
  if (s.answerPages?.length) s.answerPages.forEach((url, i) => add(url, 'image', '解析第 ' + (i + 1) + ' 页'));
  else add(s.answers, 'pdf', '解析 PDF');
  add(s.audio, 'audio', '听力录音');
  return [...assets.values()];
}

function offlinePersistLocations() {
  try { localStorage.setItem(ONLINE_PAPER_INDEX, JSON.stringify([...offlineLocations])); }
  catch (_) { /* Cache verification still works in this session. */ }
}

async function offlineCached(cache, asset) {
  if (await cache.match(offlineLocalAddress(asset.url))) {
    offlineLocations.set(asset.url, 'readable');
    return true;
  }
  if (asset.kind === 'image' && (await cache.match(asset.url))?.type === 'opaque') {
    offlineLocations.set(asset.url, 'opaque');
    return true;
  }
  offlineLocations.delete(asset.url);
  return false;
}

async function offlineInspect(paper) {
  const assets = onlineOfflineAssets(paper);
  const cache = await caches.open(ONLINE_PAPER_CACHE);
  const hits = await Promise.all(assets.map(asset => offlineCached(cache, asset)));
  offlinePersistLocations();
  return { count: hits.filter(Boolean).length, total: assets.length };
}

function offlineDescription(paper) {
  const summary = offlineSummaries.get(paper.id);
  if (typeof libraryReadyPaper === 'function' && libraryReadyPaper(paper))
    return { text: '本机资料已就绪，可离线练习。', disabled: true, label: '已导入本卷' };
  if (!onlineOfflineAssets(paper).length) return { text: '', disabled: true, label: '' };
  if (!('caches' in window) || !navigator.serviceWorker)
    return { text: '当前浏览器支持在线练习。离线保存需使用支持离线缓存的浏览器。', label: '', disabled: true };
  if (offlineJobs.has(paper.id))
    return { text: offlineJobs.get(paper.id), label: '正在保存', disabled: true };
  if (summary?.error) return { text: summary.error, label: '重试离线保存', disabled: false };
  if (summary?.count && summary.count === summary.total)
    return { text: '本卷题面、解析及已收录的录音已保存在本机。', label: '检查离线资料', disabled: false };
  if (summary?.count)
    return { text: '本机已保存 ' + summary.count + ' / ' + summary.total + ' 项。', label: '继续保存本卷', disabled: false };
  return { text: '', label: '保存本卷供离线练习', disabled: false };
}

function offlinePaint(paper) {
  if (!document.querySelectorAll) return;
  const info = offlineDescription(paper);
  for (const el of document.querySelectorAll('[data-offline-paper-panel="' + paper.id + '"]')) {
    const button = el.querySelector('button');
    const status = el.querySelector('[role="status"]');
    if (button) { button.textContent = info.label; button.disabled = info.disabled; button.hidden = !info.label; }
    if (status) status.textContent = info.text;
  }
  offlinePaintSprint();
}

function offlineText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function offlineObserve(paper) {
  offlinePapers.set(paper.id, paper);
  if (!offlineInspections.has(paper.id) && typeof caches !== 'undefined') {
    offlineInspections.set(paper.id, offlineInspect(paper).then(result => {
      if (!offlineJobs.has(paper.id)) offlineSummaries.set(paper.id, result);
      offlinePaint(paper);
    }).catch(() => {}));
  }
}

function onlineOfflinePanel(paper) {
  if (!paper || !/^\d{6}-\d+$/.test(paper.id)) return '';
  offlineObserve(paper);
  const info = offlineDescription(paper);
  return '<div class="actions" data-offline-paper-panel="' + paper.id + '">' +
    '<button class="btn tiny" type="button" data-save-offline-paper="' + paper.id + '" ' +
    (info.disabled ? 'disabled ' : '') + (!info.label ? 'hidden' : '') + '>' + offlineText(info.label) + '</button>' +
    '<span role="status" class="small muted" aria-live="polite">' + offlineText(info.text) + '</span></div>';
}

function offlineMediaType(bytes, kind) {
  const prefix = String.fromCharCode(...bytes.slice(0, 12));
  if (kind === 'pdf' && prefix.startsWith('%PDF-')) return 'application/pdf';
  if (kind === 'image') {
    if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
    if (bytes[0] === 0x89 && prefix.slice(1, 4) === 'PNG') return 'image/png';
    if (prefix.startsWith('GIF8')) return 'image/gif';
    if (prefix.startsWith('RIFF') && prefix.slice(8) === 'WEBP') return 'image/webp';
  }
  if (kind === 'audio') {
    if (prefix.startsWith('ID3') || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)) return 'audio/mpeg';
    if (prefix.startsWith('RIFF') && prefix.slice(8) === 'WAVE') return 'audio/wav';
    if (prefix.slice(4, 8) === 'ftyp') return 'audio/mp4';
    if (prefix.startsWith('OggS')) return 'audio/ogg';
  }
  throw new Error('来源返回的文件格式不匹配');
}

async function offlineVerifyImage(url) {
  const image = new Image();
  image.referrerPolicy = 'no-referrer';
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => { image.src = ''; reject(new Error('读取题图超时')); }, 18000);
    image.onload = () => { clearTimeout(timer); image.naturalWidth > 0 ? resolve() : reject(new Error('题图无法打开')); };
    image.onerror = () => { clearTimeout(timer); reject(new Error('题图无法打开')); };
    image.src = url;
  });
}

async function offlineSaveAsset(cache, asset) {
  if (await offlineCached(cache, asset)) return;
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), asset.kind === 'audio' ? 120000 : 50000);
  const options = { signal: abort.signal, credentials: 'omit', referrerPolicy: 'no-referrer' };
  try {
    let response;
    try { response = await fetch(asset.url, { ...options, mode: 'cors' }); }
    catch (err) {
      if (asset.kind !== 'image' || abort.signal.aborted) throw err;
      await offlineVerifyImage(asset.url);
      const image = await fetch(asset.url, { ...options, mode: 'no-cors' });
      if (image.type !== 'opaque') throw new Error('无法离线读取题图');
      await cache.put(asset.url, image);
      offlineLocations.set(asset.url, 'opaque');
      return;
    }
    if (!response.ok || response.status === 206) throw new Error('未收到完整文件');
    const blob = await response.blob();
    const bytes = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
    const type = offlineMediaType(bytes, asset.kind);
    const saved = new Response(blob, { headers: {
      'Content-Type': type, 'Content-Length': String(blob.size),
      'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes'
    } });
    await cache.put(offlineLocalAddress(asset.url), saved);
    offlineLocations.set(asset.url, 'readable');
  } finally { clearTimeout(timer); }
}

function saveOnlinePaper(paper) {
  if (!offlineSaves.has(paper.id)) {
    offlineSaves.set(paper.id, offlineDownloadPaper(paper).finally(() => offlineSaves.delete(paper.id)));
  }
  return offlineSaves.get(paper.id);
}

async function offlineDownloadPaper(paper) {
  offlineJobs.set(paper.id, '正在检查本机资料…');
  offlinePaint(paper);
  try {
    if (!navigator.serviceWorker?.controller)
      throw new Error('请等待「程序离线就绪」，然后刷新页面并重试。');
    await offlineInspections.get(paper.id);
    const assets = onlineOfflineAssets(paper);
    const cache = await caches.open(ONLINE_PAPER_CACHE);
    let completed = 0;
    const failed = [];
    let next = 0;
    async function saveNext() {
      while (next < assets.length) {
        const asset = assets[next++];
        try { await offlineSaveAsset(cache, asset); }
        catch (err) { failed.push(err?.name === 'QuotaExceededError' ? '设备空间不足' : asset.label); }
        offlineJobs.set(paper.id, '正在保存 ' + (++completed) + ' / ' + assets.length + ' 项…');
        offlinePaint(paper);
      }
    }
    await Promise.all([saveNext(), saveNext()]);
    const summary = await offlineInspect(paper);
    if (summary.count < summary.total)
      summary.error = '已保存 ' + summary.count + ' / ' + summary.total + ' 项。' +
        (failed.slice(0, 3).join('、') || '部分文件') + '暂未保存，可重试或使用个人资料包。';
    offlineSummaries.set(paper.id, summary);
  } catch (err) {
    offlineSummaries.set(paper.id, { error: err.message || '保存中断，请重试。' });
  } finally {
    offlineJobs.delete(paper.id);
    offlinePaint(paper);
  }
}

let sprintOfflineBusy = false;
let sprintOfflineCurrent = null;

function sprintOfflinePapers() {
  const ids = new Set((window.SPRINT_DAYS || []).flatMap(day => day.tasks.map(task => task.paperId)).filter(Boolean));
  const papers = typeof allPapers === 'function' ? allPapers() : [];
  return [...ids].map(id => papers.find(paper => paper.id === id)).filter(Boolean);
}

function sprintOfflineImported(paper) {
  return typeof libraryReadyPaper === 'function' && libraryReadyPaper(paper);
}

function sprintOfflineState() {
  const papers = sprintOfflinePapers();
  const missing = papers.filter(paper => {
    if (sprintOfflineImported(paper)) return false;
    const summary = offlineSummaries.get(paper.id);
    return !summary?.total || summary.count !== summary.total;
  });
  const done = papers.length - missing.length;
  const errors = missing.filter(paper => offlineSummaries.get(paper.id)?.error);
  const failedTitles = errors.map(paper => paper.id.slice(0, 4) + ' 年 ' + Number(paper.id.slice(4, 6)) + ' 月第 ' + paper.id.split('-')[1] + ' 套');
  let status = done + ' / ' + papers.length + ' 份训练用卷已就绪。';
  if (sprintOfflineBusy && sprintOfflineCurrent)
    status += sprintOfflineCurrent.title + ' · ' + (offlineJobs.get(sprintOfflineCurrent.id) || '正在检查…');
  else if (failedTitles.length)
    status += '待补齐：' + failedTitles.join('、') + '。联网后可继续。';
  const unsupported = typeof caches === 'undefined' || !navigator.serviceWorker;
  const label = sprintOfflineBusy ? '正在保存训练用卷' : !missing.length ? '检查训练用卷' : done || errors.length ? '继续保存训练用卷' : '保存全部训练用卷';
  return { status, label, disabled: sprintOfflineBusy || unsupported };
}

function offlinePaintSprint() {
  const panel = document.querySelector?.('[data-sprint-offline-panel]');
  if (!panel) return;
  const info = sprintOfflineState();
  const button = panel.querySelector('button');
  button.disabled = info.disabled;
  button.textContent = info.label;
  panel.querySelector('[role="status"]').textContent = info.status;
}

function sprintOfflinePanel() {
  const papers = sprintOfflinePapers();
  if (!papers.length) return '';
  papers.forEach(offlineObserve);
  const info = sprintOfflineState();
  return '<section class="card" style="margin-top:18px" data-sprint-offline-panel><h2>离线训练</h2>' +
    '<p class="small muted">一次保存 14 天任务所用的 ' + papers.length + ' 份试卷和配套录音，下载时请保持页面打开。</p>' +
    '<button class="btn" type="button" data-save-sprint-papers="all" ' + (info.disabled ? 'disabled' : '') + '>' + info.label + '</button>' +
    '<p class="small muted" aria-live="polite" role="status">' + offlineText(info.status) + '</p></section>';
}

async function saveSprintPapers() {
  if (sprintOfflineBusy) return;
  sprintOfflineBusy = true;
  offlinePaintSprint();
  try {
    if (typeof libraryInit !== 'undefined') await libraryInit;
    for (const paper of sprintOfflinePapers()) {
      if (sprintOfflineImported(paper)) continue;
      sprintOfflineCurrent = paper;
      offlinePaintSprint();
      await saveOnlinePaper(paper);
    }
  } finally {
    sprintOfflineCurrent = null;
    sprintOfflineBusy = false;
    offlinePaintSprint();
  }
}

document.addEventListener('click', event => {
  if (event.target.closest('button')?.dataset.saveSprintPapers === 'all') {
    saveSprintPapers();
    return;
  }
  const id = event.target.closest('[data-save-offline-paper]')?.dataset.saveOfflinePaper;
  const paper = offlinePapers.get(id);
  if (paper) saveOnlinePaper(paper);
});
