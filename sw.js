'use strict';
// Change VERSION whenever the application shell is published with different bytes.
const VERSION='1.2.1';
const BASE=new URL(self.registration.scope);
const PREFIX='skynexa-shell-'+encodeURIComponent(BASE.pathname)+'-';
const CACHE=PREFIX+VERSION;
const FILES=['index.html','manifest.webmanifest','privacy.html','offline.html','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','favicon.svg'];
const CORE=FILES.map(file=>new URL(file,BASE).href);
const APP=new URL('index.html',BASE).href;
const OFFLINE=new URL('offline.html',BASE).href;
const ALLOWED=new Set(CORE.map(url=>new URL(url).pathname));
self.addEventListener('install',event=>{event.waitUntil((async()=>{const existed=(await caches.keys()).includes(CACHE);try{const cache=await caches.open(CACHE);await cache.addAll(CORE.map(url=>new Request(url,{cache:'reload'})))}catch(error){if(!existed)await caches.delete(CACHE);throw error}})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type==='SKYNEXA_SKIP_WAITING'){event.waitUntil(self.skipWaiting());return}if(event.data?.type==='SKYNEXA_STATUS'){event.waitUntil((async()=>{const cache=await caches.open(CACHE);const entries=await Promise.all(CORE.map(url=>cache.match(url)));event.source?.postMessage({type:'SKYNEXA_OFFLINE_STATUS',ready:entries.every(Boolean),version:VERSION})})())}});
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);if(url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 const appNavigation=request.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===new URL(APP).pathname);
 if(!appNavigation&&!ALLOWED.has(url.pathname))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),key=appNavigation?APP:new URL(url.pathname,BASE.origin).href,cached=await cache.match(key);if(cached)return cached;try{const response=await fetch(request);if(response.ok&&response.type!=='opaque'){await cache.put(key,response.clone());return response}if(request.mode==='navigate')return await cache.match(OFFLINE)||response;return response}catch(error){if(request.mode==='navigate')return await cache.match(OFFLINE)||new Response('SkyNexa is offline. Reconnect once to cache the app.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});return new Response('',{status:503})}})());
});
