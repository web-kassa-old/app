const CACHE_NAME = 'pos-v28'; // Не забудьте поменять версию при публикации
const ASSETS = [
  './',
  './index.html',
  './pos2.html',
  './config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  // Агрессивная установка: не ждем!
  self.skipWaiting();
  
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  // Мгновенный захват контроля над всеми открытыми окнами
  e.waitUntil(self.clients.claim());
  
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', e => {
  // Для API (Google Script) всегда идем в сеть
  if (e.request.url.includes('script.google.com')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  
  // Network-First (Сначала сеть, потом кэш). Это заставляет браузер всегда искать свежие файлы
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Слушаем команду на получение версии
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});
