var cacheName = 'generic-pwa';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      const filesToCache = [
        '/',
        '/index.html',
        '/css/style.css',
        '/js/main.js'
      ];
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
