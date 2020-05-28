var CACHE_NAME = 'MarketSimCache';
var urlsToCache = [
  {% load static %}
  "/",
  "{% static 'svg/panBalance.svg' %}",
  "{% static 'png/wage.png' %}",
  "{% static 'css/style.css' %}",
  "{% static 'html/offline.html' %}",
  "{% static 'html/status404.html' %}",
  "{% static 'mp4/funnyAnimals.mp4' %}",
]
self.addEventListener('install',(event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache)=>{
      console.log("Cached opened.");
      return cache.addAll(urlsToCache);
    }).catch((err)=>{
      console.log("Error: ",err);
    })
  );
  self.skipWaiting();
});
//First cache then web, every response is cached
self.addEventListener('fetch',(event)=>{
  console.log(event.request.url,"Inside Fetch");
  event.respondWith(
    caches.match(event.request)
    .then(offlineResponse=>{
      if(offlineResponse){
        return offlineResponse;
      }
      console.log("Returning fetch response: ",event.request.url);
      return fetch(event.request.url)
      .then(onlineResponse=>{
        console.log("Online response.ok: ",onlineResponse.ok);
        if(onlineResponse.ok){return onlineResponse;}
        return caches.match("{% static 'html/status404.html' %}");
      })
      .catch(err=>{
        console.log("Fetch sie wypierdolił, strone offline: ",err);
        return caches.match("{% static 'html/offline.html' %}");
      });
    })
  );
});
