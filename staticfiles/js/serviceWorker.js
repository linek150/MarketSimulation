var CACHE_NAME = 'MarketSimCache';
var urlsToCache = [
  '/',
  'staticfiles/style.css',
  'staticfiles/offline.html',
  'staticfiles/status404.html',
]
self.addEventListener('install',(event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache)=>{
      console.log("Cached opened.");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});
