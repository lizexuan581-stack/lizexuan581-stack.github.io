'use strict';

const CACHE_PREFIX = 'zhiliu-';
const CACHE_NAME = 'zhiliu-cet6-1a5d0d66c0b1';
const PRECACHE_PATHS = ["./", "./app.js", "./audio.json", "./catalog.js", "./content.js", "./icon-192.png", "./icon-512.png", "./icon.svg", "./index.html", "./library.js", "./manifest.webmanifest", "./paper-data.js", "./paper-extra.js", "./paper-history.js", "./papers.js", "./README.md", "./sprint-data.js", "./sprint.js", "./styles.css"];
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
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
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
  const buffer=await response.arrayBuffer(), size=buffer.byteLength;
  const match=/^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range')||'');
  if(!match) return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
  let start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
  let end=match[1]?(match[2]?Math.min(Number(match[2]),size-1):size-1):size-1;
  if(start>=size||start>end)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
  return new Response(buffer.slice(start,end+1),{status:206,headers:{'Content-Type':response.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});
}
