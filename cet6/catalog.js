'use strict';
let currentPaperId = '202406-1', catalogYear = 'all';
let catalogFeature = 'all';
function allPapers() {
  const papers=[{...window.CET_PAPER,id:'202406-1'}, window.CET_EXTRA, ...(window.CET_HISTORY || []), ...(window.CET_WINTER_2025 || [])];
  return papers.filter(p => p?.pages?.length || (p?.remoteOnly && window.CET_ONLINE_SOURCES?.[p.id]?.pdf))
    .map(p => window.CET_NEW_GRADES?.[p.id] ? {...p,...window.CET_NEW_GRADES[p.id]} : p)
    .sort((a,b) => b.id.localeCompare(a.id));
}
function currentPaper() {
  return allPapers().find(p => p.id === currentPaperId) || allPapers()[0];
}
function catalogCard(p) {
  const hasReading = [26,36,46].some(n => paperHasQuestion(p,n));
  const hasAudio = !!paperSources(p).audio && paperHasQuestion(p,1);
  const scoreCount = Object.keys(p.answerKey || {}).filter(n=>(Number(n)>25||hasAudio)&&paperHasQuestion(p,Number(n))).length;
  const web=onlineEdition(p);
  const flagged=catalogFeature==='flagged'?flaggedQuestions(p):[];
  const details = web?.editionNote || p.contentNotice || p.coverageNote || p.sectionNote || '';
  return `<article class="card"><span class="tag">${p.year || p.id.slice(0,4)} 年</span>
    <h2 style="margin-top:15px">${esc(p.title)}</h2>
    <p class="small muted">${web?.pageCount||p.pages.length} 页题卷 · ${web?.answerPageCount||p.answerPages.length} 页解析 · ${hasAudio ? '含听力录音' : '未收录录音'}</p>
    <p class="small">${scoreCount ? scoreCount + ' 道客观题可自动批改' : '完成后对照原卷解析'}</p>
    ${details ? '<p class="small muted">' + esc(details) + '</p>' : ''}
    <div class="actions"><button class="btn primary" data-open-paper="${p.id}" data-paper-route="${hasReading?'reading':'writing'}">${hasReading?'做阅读':'做写作'}</button>
    ${hasAudio ? '<button class="btn" data-open-paper="'+p.id+'" data-paper-route="listening">做听力</button>':''}
    <a class="btn tiny" href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">资料来源</a></div>
    ${flagged.length?'<div class="question-numbers">'+flagged.map(n=>`<button class="btn tiny" data-open-paper="${p.id}" data-paper-route="${n<=25?'listening':'reading'}" data-open-question="${n}">第 ${n} 题</button>`).join('')+'</div>':''}
    ${onlineOfflinePanel(p)}</article>`;
}
function catalogPage() {
  const papers=allPapers(), years=[...new Set(papers.map(p => p.id.slice(0,4)))];
  const filters=['all', ...years].map(year =>
    `<button class="tab ${catalogYear===year?'active':''}" aria-pressed="${catalogYear===year}" data-year="${year}">${year==='all'?'全部年份':year+' 年'}</button>`).join('');
  const inYear=papers.filter(p=>catalogYear==='all'||p.id.startsWith(catalogYear));
  const matches=(p,key)=>key==='graded'?Object.keys(p.answerKey||{}).length>0:key==='audio'?!!paperSources(p).audio&&paperHasQuestion(p,1):key==='flagged'?flaggedQuestions(p).length>0:true;
  const features=[['all','全部试卷'],['graded','可自动批改'],['audio','有听力录音'],['flagged','我标记的题']];
  const choices=features.map(([key,label])=>`<button class="tab ${catalogFeature===key?'active':''}" aria-pressed="${catalogFeature===key}" data-catalog-feature="${key}">${label} · ${inYear.filter(p=>matches(p,key)).length}</button>`).join('');
  const shown=inYear.filter(p=>matches(p,catalogFeature));
  return pageHead('历年真题库', '选择试卷即可开始。共 '+papers.length+' 份资料，含部分题型补充卷。')+
    '<section class="catalog-filters" aria-label="筛选试卷"><div class="tabs">'+filters+'</div><div class="tabs">'+choices+'</div></section>'+
    (shown.length?'<div class="resource-grid">'+shown.map(catalogCard).join('')+'</div>':
    '<div class="card">'+(catalogFeature==='flagged'?'这个年份还没有标记。做题时点「标记本题」，就能回到这里按题号复习。':'这个年份没有符合条件的试卷。')+'</div>');
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-open-paper]');
  if(!b?.dataset.openPaper)return;
  legacyPractice=false;activeSprintTask=null;currentPaperId=b.dataset.openPaper;
  paperReviewId=null;paperShowAnswers=false;
  linkedQuestion=Number(b.dataset.openQuestion)||0;
  room.signature='';
  navigate(b.dataset.paperRoute);
  if(b.dataset.openQuestion&&window.history?.replaceState)window.history.replaceState(null,'','#'+route+'/'+currentPaperId+'/'+room.question);
});
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-year]');
  if(b?.dataset.year){catalogYear=b.dataset.year;render();}
  const f=e.target.closest('[data-catalog-feature]');
  if(f?.dataset.catalogFeature){catalogFeature=f.dataset.catalogFeature;render();}
});
