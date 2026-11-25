'use strict';

const CACHE_PREFIX = 'zhiliu-cet6-';
const PAPER_CACHE_NAME = 'cet6-personal-paper-assets-v1';
const PAPER_CACHE_PATH = new URL('./__paper_cache__/asset', self.registration.scope).pathname;
const CACHE_NAME = 'zhiliu-cet6-50f1b6dd42a4';
const PRECACHE_PATHS = ["./", "./Adobe-GB1-5.bcmap", "./Adobe-GB1-UCS2.bcmap", "./app.js?v=4dc77496dd83", "./audio.json", "./catalog.js?v=b08a3e88fe55", "./content.js?v=e2acf5d75225", "./FoxitDingbats.pfb", "./FoxitFixed.pfb", "./FoxitFixedBold.pfb", "./FoxitFixedBoldItalic.pfb", "./FoxitFixedItalic.pfb", "./FoxitSerif.pfb", "./FoxitSerifBold.pfb", "./FoxitSerifBoldItalic.pfb", "./FoxitSerifItalic.pfb", "./FoxitSymbol.pfb", "./GBK-EUC-H.bcmap", "./icon-192.png", "./icon-512.png", "./icon.svg", "./index.html", "./LiberationSans-Bold.ttf", "./LiberationSans-BoldItalic.ttf", "./LiberationSans-Italic.ttf", "./LiberationSans-Regular.ttf", "./library.js?v=17049d9fa14b", "./LICENSE_FOXIT", "./LICENSE_LIBERATION", "./listening-cues.js?v=ee310e532f23", "./manifest.webmanifest", "./online-offline.js?v=c7f8323c00e5", "./online-sources.js?v=b1e64c9c301a", "./paper-data.js?v=e936756304c7", "./paper-extra.js?v=4ea988aadd34", "./paper-history.js?v=7914a0ab3c75", "./paper-reader.js?v=0e1668051b20", "./papers.js?v=1d0f55d46c73", "./PDFJS-CMAP-LICENSE.txt", "./PDFJS-LICENSE.txt", "./pdfjs.mjs", "./pdfworker.mjs", "./practice-room.css?v=55284997130f", "./question-locations-images.js?v=9f7959a769ed", "./question-locations-pdf.js?v=4922bff7418a", "./README.md", "./sprint-data.js?v=f8bce4f7f2ff", "./sprint.js?v=310dbab168b9", "./styles.css?v=25f02f95ca98", "./UniGB-UCS2-H.bcmap", "./UniGB-UTF16-H.bcmap"];
const PRECACHE_URLS = PRECACHE_PATHS.map(path => new URL(path, self.registration.scope).href);
const INDEX_URL = new URL('./index.html', self.registration.scope).href;

async function isCacheReady() {
  const cache = await caches.open(CACHE_NAME);
  const responses = await Promise.all(PRECACHE_URLS.map(url => cache.match(url)));
  return responses.every(response => response && response.ok);
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
    if (!(await isCacheReady())) throw new Error('Offline resources are incomplete.');
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function saveSuccessfulResponse(cache, request, response) {
  if (!response.ok || response.status === 206 || !['basic', 'default'].includes(response.type)) return;
  try {
    await cache.put(request, response.clone());
  } catch (_) {
    // Storage limits must not stop a successful online response from being served.
  }
}

async function navigate(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await saveSuccessfulResponse(cache, request, response);
      return response;
    }
    return await cache.match(request) || await cache.match(INDEX_URL) || response;
  } catch (_) {
    return await cache.match(request) || await cache.match(INDEX_URL) || Response.error();
  }
}

async function staticResource(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    await saveSuccessfulResponse(cache, request, response);
    return response;
  } catch (_) {
    return Response.error();
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    const media = ['image', 'audio', 'video'].includes(request.destination);
    if (media || (!request.destination && request.mode === 'cors')) {
      event.respondWith((async () => {
        const cache = await caches.open(PAPER_CACHE_NAME);
        const localAsset = new URL('./__paper_cache__/asset', self.registration.scope);
        localAsset.searchParams.set('source', request.url);
        // The already-open player still uses the original URL after the student saves the paper.
        const saved = await cache.match(localAsset.href);
        if (saved) return request.headers.has('range') ? makeRangeResponse(saved, request.headers.get('range')) : saved;
        if (request.destination === 'image' && request.mode === 'no-cors') {
          const opaqueImage = await cache.match(request.url);
          if (opaqueImage) return opaqueImage;
        }
        return fetch(request);
      })());
    }
    return;
  }
  if (url.pathname === PAPER_CACHE_PATH) {
    event.respondWith((async () => {
      const cache = await caches.open(PAPER_CACHE_NAME);
      const file = await cache.match(request.url);
      if (!file) return new Response('本卷缓存已移除，请联网重新保存。', { status: 404 });
      return request.headers.has('range') ? makeRangeResponse(file, request.headers.get('range')) : file;
    })());
    return;
  }
  // A partial response cannot safely stand in for the complete cached resource.
  if (request.headers.has('range')) { event.respondWith(rangeResponse(request)); return; }
  event.respondWith(request.mode === 'navigate' ? navigate(request) : staticResource(request));
});

self.addEventListener('message', event => {
  if (event.data?.type === 'CACHE_STATUS') {
    event.waitUntil((async () => {
      let ready = false;
      try { ready = await isCacheReady(); } catch (_) { /* Report unavailable storage as not ready. */ }
      const target = event.ports?.[0] || event.source;
      if (target) target.postMessage({ type: 'CACHE_READY', ready });
    })());
  } else if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil((async () => {
      if (await isCacheReady()) await self.skipWaiting();
    })());
  }
});

async function rangeResponse(request) {
  const cache=await caches.open(CACHE_NAME);
  const response=await cache.match(request.url);
  if(!response) return fetch(request);
  return makeRangeResponse(response, request.headers.get('range'));
}

async function makeRangeResponse(response, range) {
  const file = await response.blob();
  const size = file.size;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range || '');
  const unsatisfiable = () => new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  if (!match || (!match[1] && !match[2])) return unsatisfiable();
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || start >= size || start > end) return unsatisfiable();
  const headers = new Headers(response.headers);
  headers.set('Content-Range', 'bytes ' + start + '-' + end + '/' + size);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(file.slice(start, end + 1), { status: 206, headers });
}
