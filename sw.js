const CACHE_NAME = 'love-app-v1';
const ASSETS = [
  './',
  './index.html',
  'https://raw.githubusercontent.com/my-lovep/Thalia_p/main/IMG_6507.jpeg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => {
    return response || fetch(e.request);
  }));
});
