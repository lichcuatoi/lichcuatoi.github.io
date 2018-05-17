var CACHE_NAME = 'lichcuatoi-20180517-1602';

var PRECACHE_URLS = [
  '/',
  '/index.html',
  '/images/favicon.png',
  '/css/calendar.css',
  '/js/calendar.js',
  "/lib/slick/slick.css",
  "/lib/slick/slick-theme.css",
  "/lib/slick/slick.min.js",
  "/lib/jquery/jquery.min.js"
];

self.addEventListener('install', function(event) {
  function onInstall () {
    return caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(PRECACHE_URLS);
      });
  }
  event.waitUntil(onInstall(event));
});

self.addEventListener('fetch', function(event) {
  // If we can fetch latest version, then do so
  var responsePromise = fetch(event.request)
    .then(function(response) {

      // Don't cache response unless it's 2xx status
      if (!response || !response.ok) {
        return response;
      }

      // Clone it to allow us to cache it
      var responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache);
        });

      return response;
    })
    .catch(function(err) {

      // NOTE: On a patchy network, it could take a long time for the fetch
      // to fail and for us to get here. TO DO: introduce a timeout.
      console.log('Fetch failed, maybe we are offline. Try cache...', err);

      return caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Cache hit', event.request);
            return response;
          } else {
            console.log('Offline cache miss =(');
          }
        });

    });

  event.respondWith(responsePromise);
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // If it is not a current cache, delete it
          if (cacheWhitelist.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
