const CACHE_NAME = 'myplanner-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './tasks.html',
  './notes.html',
  './timer.html',
  './alarm.html',
  './links.html',
  './support.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// نصب اپ و ذخیره فایل‌ها
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// باز کردن فایل‌ها از حافظه وقتی اینترنت قطع است
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
