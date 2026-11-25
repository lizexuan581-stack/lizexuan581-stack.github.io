'use strict';

function paperSources(paper) {
  const web = window.CET_ONLINE_SOURCES?.[paper.id] || {};
  const useLocal = !web.editionId || !libraryImportMode() || libraryReadyPaper(paper);
  const url = (path, external) => (useLocal && libraryURL(path)) || (external && onlineOfflineURL(external)) || '';
  const byPage = (paths, remote) => {
    if (useLocal && paths?.length && paths.every(path => libraryURL(path))) return paths.map(libraryURL);
    return (remote || []).map(onlineOfflineURL);
  };
  return {
    pages: byPage(paper.pages, web.pages),
    answers: byPage(paper.answerPages, web.answerPages),
    pdf: url(paper.pdf, web.pdf),
    answerPdf: url(paper.answers, web.answers),
    audio: url(paper.audio, web.audio),
    audioArchive: web.audioArchive || '',
    web
  };
}

function readerDocument(p, sources, showAnswers) {
  const pages = showAnswers ? sources.answers : sources.pages;
  const pdf = showAnswers ? sources.answerPdf : sources.pdf;
  const count = pages.length || (showAnswers ? sources.web.answerPageCount || p.answerPages.length : sources.web.pageCount || p.pages.length);
  return {pages, pdf, count: Math.max(1, count)};
}

function readerFrame(p, doc, index) {
  const title = esc(p.title + ' 第' + (index + 1) + '页');
  if (doc.pages[index]) return '<img src="' + esc(doc.pages[index]) + '" alt="' + title + '" referrerpolicy="no-referrer">';
  if (doc.pdf) return '<cet-pdf src="' + esc(doc.pdf) + '" page="' + (index + 1) + '" aria-label="' + title + '"></cet-pdf>';
  return '<p>此页暂未载入。<a href="'+esc(p.source)+'" target="_blank" rel="noopener">查看发布页</a></p>';
}

// Keep the current PDF in memory while the student moves between pages.
// A new element owns each canvas, so a slow render cannot replace a newer page.
if (typeof customElements !== 'undefined' && !customElements.get('cet-pdf')) {
  let libraryPromise, lastDocument;
  function getPDF(url) {
    if (lastDocument?.url === url) return lastDocument.promise;
    const previous = lastDocument;
    const promise = (async () => {
      libraryPromise ||= import('./pdfjs.mjs');
      const pdfjs = await libraryPromise;
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('./pdfworker.mjs', document.baseURI).href;
      return pdfjs.getDocument({url, cMapUrl:new URL("./",document.baseURI).href, cMapPacked:true, standardFontDataUrl:new URL("./",document.baseURI).href, isEvalSupported:false, useSystemFonts:true, disableFontFace:false}).promise;
    })();
    lastDocument = {url,promise};
    previous?.promise.then(doc => doc.destroy()).catch(() => {});
    promise.catch(() => { if (lastDocument?.promise === promise) lastDocument = null; });
    return promise;
  }
  customElements.define('cet-pdf', class extends HTMLElement {
    async connectedCallback() {
      const url = this.getAttribute('src'), pageNumber = Number(this.getAttribute('page')) || 1;
      this.textContent = '正在加载原卷…';
      try {
        const pdf = await getPDF(url);
        if (!this.isConnected) return;
        const page = await pdf.getPage(Math.min(pageNumber,pdf.numPages));
        if (!this.isConnected) return;
        const scale = Math.min(2.4, 1450 / page.getViewport({scale:1}).width);
        const viewport = page.getViewport({scale});
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        canvas.style.cssText = 'width:100%;height:auto;display:block';
        canvas.setAttribute('aria-label', this.getAttribute('aria-label'));
        this.replaceChildren(canvas);
        this.renderTask = page.render({canvasContext:canvas.getContext('2d'),viewport});
        await this.renderTask.promise;
      } catch (_) {
        if (!this.isConnected) return;
        const link = document.createElement('a');
        link.href = url + '#page=' + pageNumber; link.target = '_blank'; link.rel = 'noopener';
        link.textContent = '在新窗口打开原卷';
        const frame = document.createElement('iframe');
        frame.title = this.getAttribute('aria-label'); frame.src = link.href;
        frame.style.cssText = 'width:100%;height:70vh;border:0';
        this.replaceChildren(link, frame);
      }
    }
    disconnectedCallback() { this.renderTask?.cancel(); }
  });
}
