// Mỗi lần sửa file index, ảnh thì phải sửa cái này
// Định dạng yyyymmdd-hhmi
var cacheName = 'lichcuatoi-20180517-1505';

// '/images/favicon.png'
var filesToCache = [
  '/',
  //'/.',
  '/index.html',
  '/css/calendar.css',
  '/js/calendar.js',
  "/lib/slick/slick.css",
  "/lib/slick/slick-theme.css",
  "/lib/slick/slick.min.js",
  "/lib/jquery/jquery.min.js"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
