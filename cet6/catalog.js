'use strict';
let currentPaperId = '202406-1', catalogYear = 'all';
function allPapers() {
  return [{...window.CET_PAPER,id:'202406-1'}, window.CET_EXTRA, ...(window.CET_HISTORY || [])]
    .filter(p => p?.pages?.length).sort((a,b) => b.id.localeCompare(a.id));
}
function currentPaper() {
  return allPapers().find(p => p.id === currentPaperId) || allPapers()[0];
}
function catalogCard(p) {
  const hasReading = [26,36,46].some(n => paperHasQuestion(p,n));
  const scoreCount = Object.keys(p.answerKey || {}).length;
  const web=onlineEdition(p);
  const details = web?.editionNote || p.contentNotice || p.coverageNote || p.sectionNote || '';
  return `<article class="card"><span class="tag">${p.year || p.id.slice(0,4)} 年</span>
    <h2 style="margin-top:15px">${esc(p.title)}</h2>
    <p class="small muted">${web?.pageCount||p.pages.length} 页题卷 · ${web?.answerPageCount||p.answerPages.length} 页解析 · ${p.audio ? '含听力录音' : '未收录录音'}</p>
    <p class="small">${scoreCount ? scoreCount + ' 道客观题可自动批改' : '完成后对照原卷解析'}</p>
    ${details ? '<p class="small muted">' + esc(details) + '</p>' : ''}
    <div class="actions"><button class="btn primary" data-open-paper="${p.id}" data-paper-route="${hasReading?'reading':'writing'}">${hasReading?'做阅读':'做写作'}</button>
    ${p.audio ? '<button class="btn" data-open-paper="'+p.id+'" data-paper-route="listening">做听力</button>':''}
    <a class="btn tiny" href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">资料来源</a></div>
    ${onlineOfflinePanel(p)}</article>`;
}
function catalogPage() {
  const papers=allPapers(), years=[...new Set(papers.map(p => p.id.slice(0,4)))];
  const filters=['all', ...years].map(year =>
    `<button class="tab ${catalogYear===year?'active':''}" data-year="${year}">${year==='all'?'全部':year+' 年'}</button>`).join('');
  return pageHead('历年真题库', '选择试卷即可开始。共 '+papers.length+' 份资料，含部分题型补充卷。')+
    '<div class="tabs">'+filters+'</div><div class="resource-grid">'+
    papers.filter(p => catalogYear==='all' || p.id.startsWith(catalogYear)).map(catalogCard).join('')+'</div>';
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-open-paper]');
  if(!b?.dataset.openPaper)return;
  legacyPractice=false;activeSprintTask=null;currentPaperId=b.dataset.openPaper;
  paperReviewId=null;paperShowAnswers=false;
  paperIndex=b.dataset.paperRoute==='reading'?Math.min(2,currentPaper().pages.length-1):b.dataset.paperRoute==='translation'?currentPaper().pages.length-1:0;
  navigate(b.dataset.paperRoute);
});
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-year]');
  if(b?.dataset.year){catalogYear=b.dataset.year;render();}
});
