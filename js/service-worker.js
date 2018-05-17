var cacheName = 'lichcuatoi-20180517-1530';

var filesToCache = [
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

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
