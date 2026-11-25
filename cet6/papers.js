'use strict';
let paperIndex=0, paperShowAnswers=false, paperReviewId=null;
let room={signature:'',question:0,mode:'question',full:false};
let linkedQuestion=0;
function onlineEdition(p) {
  return libraryImportMode() && !libraryReadyPaper(p) ? window.CET_ONLINE_SOURCES?.[p.id] : null;
}
function locationMap(p) {
  const local = !onlineEdition(p);
  return (local && window.CET_LOCAL_LOCATIONS?.[p.id]) || window.CET_IMAGE_LOCATIONS?.[p.id] || window.CET_PDF_LOCATIONS?.[p.id] || {};
}
function paperHasQuestion(p,n) {
  const map=locationMap(p);
  if (map.q) return Array.isArray(map.q[n]);
  const missing=onlineEdition(p)?.missingSections || p.missingSections || [];
  return !missing.includes(n<=25?'listening':n<=35?'cloze':n<=45?'matching':'careful');
}
function paperDraftScope() {
  const edition=onlineEdition(currentPaper())?.editionId;
  return edition?currentPaperId+'-'+edition:currentPaperId;
}
const paperKey=n=>'paper-'+paperDraftScope()+'-'+n;
function sessionSuffix() {return paperReviewId?'review-'+paperReviewId:activeSprintTask?.kind==='paper'?'task-'+activeSprintTask.id:'';}
function responseKey(n) {const suffix=sessionSuffix();return paperKey(n)+(suffix?'-'+suffix:'');}
const paperMarkKey=section=>'paper-marked-'+section+'-'+paperDraftScope()+(paperReviewId?'-'+paperReviewId:'')+(activeSprintTask?.kind==='paper'?'-'+activeSprintTask.id:'');
function paperNumbers(p) {
  const task=activeSprintTask?.kind==='paper'?activeSprintTask:null;
  const single=paperReviewId?Number(paperReviewId.split('-').pop()):0;
  const low=single||task?.from||(route==='listening'?1:26), high=single||task?.to||(route==='listening'?25:55);
  return Array.from({length:high-low+1},(_,i)=>low+i).filter(n=>paperHasQuestion(p,n));
}
function sectionKey(n) {return n<=25?'listening':n<=35?'cloze':n<=45?'matching':n<=50?'careful1':'careful2';}
const sectionTitles={listening:'听力理解',cloze:'选词填空',matching:'长篇匹配',careful1:'仔细阅读 · 第一篇',careful2:'仔细阅读 · 第二篇',writing:'写作',translation:'翻译'};
const sectionName=()=>({listening:'听力',reading:'阅读',writing:'写作',translation:'翻译'}[route]);
const writtenRoute=()=>route==='writing'||route==='translation';
function roomSignature(){return [paperDraftScope(),route,sessionSuffix()].join('/');}
function sessionQuestionKey(){return 'position-'+roomSignature();}
function ensureRoom(p) {
  const signature=roomSignature();
  if(room.signature===signature)return;
  const nums=writtenRoute()?[]:paperNumbers(p);
  const saved=Number(state.drafts[sessionQuestionKey()]);
  const question=nums.includes(linkedQuestion)?linkedQuestion:nums.includes(saved)?saved:nums[0]||0;
  linkedQuestion=0;
  room={signature,question,mode:'question',full:false};
  paperShowAnswers=false;
  const map=locationMap(p);
  paperIndex=map.q?.[question]?.[0]??map.sections?.[route]?.[0]??0;
}
function currentRange(p) {
  const map=locationMap(p),n=room.question;
  if(writtenRoute())return {range:map.sections?.[route],start:map.sectionY?.[route],end:map.sectionYEnd?.[route]};
  if(room.mode==='material'){
    const key=sectionKey(n);
    return {range:map.sections?.[key],start:map.sectionY?.[key],end:map.sectionYEnd?.[key]};
  }
  const range=map.q?.[n],next=map.q?.[n+1];
  const start=map.y?.[n];
  let end=map.yEnd?.[n];
  if(end==null&&range&&next&&next[0]===range[1]&&map.y?.[n+1]>(range[0]===range[1]?(start||0):0)+.025)end=map.y[n+1]-.002;
  return {range,start,end};
}
function frameSlice(p,doc,index,from,to) {
  const media=readerFrame(p,doc,index);
  if(room.full)return media;
  const transform=!onlineEdition(p) && locationMap(p).localTransform?.[index];
  const localY=value=>transform?transform[0]+value*transform[1]:value;
  const top=Number.isFinite(from)?Math.max(0,localY(from)-.006):0;
  const bottom=Number.isFinite(to)?Math.min(1,localY(to)+.006):1;
  return `<cet-crop data-from="${top}" data-to="${bottom>top?bottom:1}"><div class="crop-content">${media}</div></cet-crop>`;
}
// Crop the displayed original, including multi-page questions. Recalculate after fonts,
// images or a PDF canvas load, and when the tablet changes orientation.
if(typeof customElements!=='undefined'&&!customElements.get('cet-crop')) {
  customElements.define('cet-crop',class extends HTMLElement {
    connectedCallback(){
      const apply=()=>{
        const content=this.firstElementChild;
        if(!content)return;
        const h=content.offsetHeight;
        if(h<95||content.querySelector('iframe'))return;
        const top=Number(this.dataset.from),end=Number(this.dataset.to);
        this.style.height=Math.ceil(h*(end-top))+'px';
        content.style.transform=`translateY(${-top*h}px)`;
      };
      this._apply=apply;
      this.addEventListener('load',apply,true);
      if(typeof ResizeObserver!=='undefined'){this._observer=new ResizeObserver(apply);this._observer.observe(this.firstElementChild);}
      requestAnimationFrame(apply);
    }
    disconnectedCallback(){this._observer?.disconnect();this.removeEventListener('load',this._apply,true);}
  });
}
function sourceBlock(p,area=currentRange(p)) {
  const {range,start,end}=area, doc=readerDocument(p,paperSources(p),false);
  if(!range)return `<p class="notice">当前整理版未找到这道题的位置。<a href="${esc(p.source)}" target="_blank" rel="noopener">打开原始资料</a></p>`;
  const [first,last]=range;
  return `<div class="original-pages">${Array.from({length:last-first+1},(_,i)=>{
    const page=first+i;
    return `<div class="original-sheet"><div class="folio">原卷第 ${page+1} 页</div>${frameSlice(p,doc,page,i===0?start:0,page===last?end:1)}</div>`;
  }).join('')}</div>`;
}
function answerBook(p) {
  const doc=readerDocument(p,paperSources(p),true);
  paperIndex=Math.max(0,Math.min(paperIndex,doc.count-1));
  return `<section class="answer-book"><div class="actions"><b>原版解析册</b><label>第 <select id="paper-jump" aria-label="解析册页码">${Array.from({length:doc.count},(_,i)=>`<option value="${i}" ${i===paperIndex?'selected':''}>${i+1}</option>`).join('')}</select> / ${doc.count} 页</label>${button('回到当前题','paper-close-book','tiny')}</div><div class="original-pages">${readerFrame(p,doc,paperIndex)}</div></section>`;
}
function optionsFor(p,n) {
  if(n>=36&&n<=45&&locationMap(p).matchingChoices)return locationMap(p).matchingChoices;
  return p.choiceRanges?.find(r=>n>=r.from&&n<=r.to)?.choices || (n>=26&&n<=45?'ABCDEFGHIJKLMNO':'ABCD');
}
function isMarked(nums) {return state.drafts[paperMarkKey(sectionName())]==='yes'&&nums.every(n=>!!state.drafts[responseKey(n)]);}
function checkedResponse(n){return state.drafts['checked-'+responseKey(n)]===state.drafts[responseKey(n)]&&!!state.drafts[responseKey(n)];}
function questionDeck(p,nums) {
  const n=room.question, selected=state.drafts[responseKey(n)],done=isMarked(nums), graded=done||checkedResponse(n);
  const key=p.answerKey?.[n], idx=nums.indexOf(n);
  const material=route==='reading'&&locationMap(p).sections?.[sectionKey(n)];
  const occupied=nums.filter(num=>state.drafts[responseKey(num)]).length;
  const map=locationMap(p);
  const bank=sectionKey(n)==='cloze'&&map.sections?.wordBank&&!room.full&&room.mode==='question'&&!paperShowAnswers
    ? '<details class="word-bank" open><summary>本篇词库</summary>'+
      sourceBlock(p,{range:map.sections.wordBank,start:map.sectionY?.wordBank,end:map.sectionYEnd?.wordBank})+'</details>':'';
  const links=nums.map(num=>{
    const picked=state.drafts[responseKey(num)];
    const verdict=(done||checkedResponse(num))&&p.answerKey?.[num]?(picked===p.answerKey[num]?'good':'bad'):picked?'filled':'';
    return `<button type="button" class="q-number ${num===n?'current':''} ${verdict}" data-question-number="${num}" aria-label="定位第${num}题" aria-pressed="${n===num}">${num}</button>`;
  }).join('');
  return `<div class="room-grid"><section class="question-sheet card"><div class="room-heading"><h2>第 ${n} 题</h2><span>${sectionTitles[sectionKey(n)]}</span></div>
    <div class="actions sheet-modes"><button class="btn tiny ${room.mode==='question'&&!paperShowAnswers?'primary':''}" data-room-mode="question">看本题</button>
    ${material?`<button class="btn tiny ${room.mode==='material'&&!paperShowAnswers?'primary':''}" data-room-mode="material">${n<36?'文章与词库':'阅读原文'}</button>`:''}
    <button class="btn tiny" data-action="paper-expand" aria-pressed="${room.full}">${room.full?'收起整页':'展开整页'}</button></div>
    ${paperShowAnswers?answerBook(p):sourceBlock(p)}${bank}
    <div class="answer-area"><b>第 ${n} 题 · 选择答案</b><div class="answer-buttons">${[...optionsFor(p,n)].map(v=>`<button class="q-option ${v===selected?'picked':''}" aria-label="第${n}题选${v}" aria-pressed="${v===selected}" data-room-choice="${v}" data-for-question="${n}" ${graded?'disabled':''}>${v}</button>`).join('')}</div>
    ${graded&&key?`<p class="question-result ${key===selected?'good':'bad'}">第 ${n} 题${key===selected?'答对了':'答错了'} · 你的答案 ${esc(selected)} · 参考答案 ${esc(key)}</p>`:''}
    <div class="actions"><button class="btn" data-question-number="${nums[idx-1]||n}" ${idx===0?'disabled':''}>上一题</button>
    ${!activeSprintTask&&!paperReviewId&&key&&!graded?button('核对本题','paper-check-one','tiny'):''}
    ${idx<nums.length-1?`<button class="btn primary" data-question-number="${nums[idx+1]}">下一题</button>`:button('提交本组','paper-submit','primary')}</div></div>
    </section><aside><section class="card"><div class="section-head"><h2>本组题号</h2><span class="small">${occupied} / ${nums.length} 已选</span></div>
    <div class="question-numbers">${links}</div><div class="actions">${done?button('重新练习','paper-retry'):button(key?'提交本组':'保存并对照解析','paper-submit','primary')}${button('翻阅解析册','paper-answers','tiny')}</div></section>
    ${notePanel(p)}</aside></div>`;
}
function notePanel(p) {
  const k='paper-notes-'+paperDraftScope()+'-'+sectionName();
  return `<details class="card room-notes"><summary>复习笔记</summary><textarea id="paper-notes" placeholder="记录本卷的题号、定位句或错因">${esc(state.drafts[k]||'')}</textarea></details>${onlineOfflinePanel(p)}`;
}
function writtenDeck(p) {
  const k='real-'+paperDraftScope()+'-'+sectionName()+(activeSprintTask?.id||'');
  return `<div class="room-grid"><section class="card question-sheet"><h2>${sectionName()}题面</h2>${paperShowAnswers?answerBook(p):sourceBlock(p)}<div class="actions">${button('翻阅解析册','paper-answers','tiny')}${button(room.full?'收起整页':'展开整页','paper-expand','tiny')}</div></section><aside><section class="card"><h2>我的${sectionName()}</h2><textarea id="paper-draft" placeholder="在此作答，草稿自动保存">${esc(state.drafts[k]||'')}</textarea><p id="paper-word-count" class="small muted">${wordCount(state.drafts[k]||'')} words</p></section>${notePanel(p)}</aside></div>`;
}
function cueFor(p,n) {return window.CET_LISTENING_CUES?.[p.id]?.find(g=>n>=g.from&&n<=g.to);}
function cueTime(cue,questionOnly=false) {
  if(!cue)return null;
  const local=paperSources(currentPaper()).usesLocalAudio;
  if(questionOnly)return (local?cue.localQuestions:cue.questions)?.[room.question]??null;
  return (local?cue.localStart:cue.start)??null;
}
function audioCaption(p) {
  const cue=cueFor(p,room.question);
  return cue?`第 ${cue.from}–${cue.to} 题 · ${esc(cue.label)}`:'本卷听力录音';
}
function cueButtons(p) {
  const cue=cueFor(p,room.question);
  return cue?`${button('从本段开头听','paper-play-group','tiny')}${cueTime(cue,true)!=null?button('听第 '+room.question+' 题提问','paper-play-question','tiny'):''}`:'';
}
function recording(p) {
  if(route!=='listening')return '';
  const audio=paperSources(p).audio, cue=cueFor(p,room.question);
  return `<section class="card recording"><div class="room-heading"><h2 id="cue-heading">${audioCaption(p)}</h2><label>语速 <select id="paper-speed" aria-label="播放语速">${[.75,1,1.25,1.5].map(v=>`<option ${v===1?'selected':''} value="${v}">${v}×</option>`).join('')}</select></label></div>
    <audio id="paper-audio" preload="metadata" controls src="${esc(audio)}" data-start="${cueTime(cue)??''}"></audio>
    <div class="actions"><span class="cue-buttons" id="cue-buttons">${cueButtons(p)}</span>${button('后退 10 秒','paper-back','tiny')}${button('前进 10 秒','paper-forward','tiny')}</div></section>`;
}
function paperPage() {
  const p=currentPaper();ensureRoom(p);
  const nums=writtenRoute()?[]:paperNumbers(p);
  const hasAudio=!!paperSources(p).audio;
  const options=[['listening','听力',hasAudio&&paperHasQuestion(p,1)],['reading','阅读',[26,36,46].some(n=>paperHasQuestion(p,n))],['writing','写作',true],['translation','翻译',true]];
  const top=pageHead(p.title,sectionName()+'练习',button('专注模式','focus'))+
    `<div class="tabs room-tabs">${options.map(([r,label,ok])=>`<button class="tab ${route===r?'active':''}" data-route="${r}" ${ok?'':'disabled'}>${label}</button>`).join('')}<button class="tab" data-route="catalog">换一套卷</button></div>`;
  if((route==='listening'&&!hasAudio)||(!writtenRoute()&&!nums.length))
    return top+`<div class="notice">本卷未收录可练的${sectionName()}部分。${route==='listening'?'可在真题库选择带录音的试卷。':''}</div>`;
  return top+recording(p)+`<div id="room-deck">${writtenRoute()?writtenDeck(p):questionDeck(p,nums)}</div>
    <p class="small muted">题卷来源 · <a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>${onlineEdition(p)?.editionNote?' · '+esc(onlineEdition(p).editionNote):''}</p>`;
}
function redrawRoom() {
  const p=currentPaper(),deck=document.querySelector('#room-deck');
  if(!deck){render();return;}
  deck.innerHTML=writtenRoute()?writtenDeck(p):questionDeck(p,paperNumbers(p));
}
function seekRecording(time,play=false) {
  const audio=document.querySelector('#paper-audio');
  if(!audio||time==null||!Number.isFinite(Number(time)))return;
  audio.dataset.start=String(time);
  if(audio.readyState>=1)audio.currentTime=Number(time);
  if(play)audio.play().catch(()=>toast('请点播放器中的播放键'));
}
document.addEventListener('loadedmetadata',e=>{
  const a=e.target;
  if(a.id==='paper-audio'&&a.dataset.start!=='')a.currentTime=Number(a.dataset.start);
},true);
function showQuestion(n) {
  const p=currentPaper();
  if(!paperNumbers(p).includes(n))return;
  const old=cueFor(p,room.question);
  room.question=n;room.mode='question';room.full=false;paperShowAnswers=false;
  state.drafts[sessionQuestionKey()]=String(n);save();
  if(!sessionSuffix()&&window.history?.replaceState)window.history.replaceState(null,'','#'+route+'/'+currentPaperId+'/'+n);
  if(route==='listening'){
    const cue=cueFor(p,n);
    if(old!==cue)seekRecording(cueTime(cue));
    const head=document.querySelector('#cue-heading'),buttons=document.querySelector('#cue-buttons');
    if(head)head.textContent=audioCaption(p);if(buttons)buttons.innerHTML=cueButtons(p);
  }
  redrawRoom();
}
function storeChoice(n,value) {
  const p=currentPaper();
  if(room.question!==n || !paperNumbers(p).includes(n)||!optionsFor(p,n).includes(value)||value.length!==1||checkedResponse(n)||isMarked(paperNumbers(p)))return;
  state.drafts[responseKey(n)]=value;save();redrawRoom();
}
function recordChoice(p,n) {
  const picked=state.drafts[responseKey(n)],key=p.answerKey[n],ok=picked===key;
  if(!checkedResponse(n)){
    logAnswer(route,paperKey(n),ok,`${p.title} · ${sectionName()}第${n}题`,key,'重做时会定位到本卷这道题。可对照原版解析复核。',route==='listening'?'没听懂':'定位错');
    state.drafts['checked-'+responseKey(n)]=picked;
  }
  return ok;
}
function clearPaperSession(nums) {
  for(const n of nums){delete state.drafts[responseKey(n)];delete state.drafts['checked-'+responseKey(n)];}
  delete state.drafts[paperMarkKey(sectionName())];delete state.drafts[sessionQuestionKey()];
}
function submitRoom() {
  const p=currentPaper(),nums=paperNumbers(p);
  if(!nums.length||isMarked(nums))return;
  const missing=nums.find(n=>!state.drafts[responseKey(n)]);
  if(missing){showQuestion(missing);return toast('第 '+missing+' 题还没有选择答案');}
  if(nums.some(n=>!p.answerKey?.[n])){paperShowAnswers=true;paperIndex=0;save();redrawRoom();return toast('作答已保存，可对照本卷原版解析');}
  const correct=nums.reduce((sum,n)=>sum+Number(recordChoice(p,n)),0);
  state.drafts[paperMarkKey(sectionName())]='yes';sprintOnPaper(correct,nums.length);
  if(!paperReviewId&&!activeSprintTask&&correct/nums.length>=.8)finishDay(route);
  save();redrawRoom();toast(`答对 ${correct} / ${nums.length}，可点题号复核`);
}
document.addEventListener('click',e=>{
  const t=e.target.closest('button');
  if(!t||!['reading','listening','writing','translation'].includes(route)||legacyPractice)return;
  if(t.dataset.questionNumber){showQuestion(Number(t.dataset.questionNumber));return;}
  if(t.dataset.roomMode){room.mode=t.dataset.roomMode;room.full=false;paperShowAnswers=false;redrawRoom();return;}
  if(t.dataset.roomChoice){storeChoice(Number(t.dataset.forQuestion),t.dataset.roomChoice);return;}
  const action=t.dataset.action;
  if(!action?.startsWith('paper-'))return;
  const p=currentPaper(),n=room.question, audio=document.querySelector('#paper-audio'), cue=cueFor(p,n);
  switch(action){
    case 'paper-expand': room.full=!room.full;paperShowAnswers=false;redrawRoom();break;
    case 'paper-answers': paperShowAnswers=true;paperIndex=0;redrawRoom();break;
    case 'paper-close-book': paperShowAnswers=false;redrawRoom();break;
    case 'paper-back':case 'paper-forward': if(audio)seekRecording(Math.min(audio.duration||Infinity,Math.max(0,audio.currentTime+(action==='paper-back'?-10:10))));break;
    case 'paper-play-group':seekRecording(cueTime(cue),true);break;
    case 'paper-play-question':seekRecording(cueTime(cue,true),true);break;
    case 'paper-check-one':if(!state.drafts[responseKey(n)])return toast('先为第 '+n+' 题选择答案');if(p.answerKey?.[n]){recordChoice(p,n);save();redrawRoom();}break;
    case 'paper-submit':submitRoom();break;
    case 'paper-retry':{const nums=paperNumbers(p);clearPaperSession(nums);save();showQuestion(nums[0]);break;}
  }
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.id==='paper-jump'){paperIndex=Number(t.value);redrawRoom();}
  if(t.id==='paper-speed'){const a=document.querySelector('#paper-audio');if(a)a.playbackRate=Number(t.value);}
});
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.id==='paper-draft'){state.drafts['real-'+paperDraftScope()+'-'+sectionName()+(activeSprintTask?.id||'')]=t.value;save();document.querySelector('#paper-word-count').textContent=wordCount(t.value)+' words';}
  if(t.id==='paper-notes'){state.drafts['paper-notes-'+paperDraftScope()+'-'+sectionName()]=t.value;save();}
});
