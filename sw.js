const CACHE_NAME = 'ghi-am-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Cài đặt Service Worker và lưu trữ các file tĩnh
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Đã lưu cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Phục vụ nội dung từ cache khi offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Trả về file từ cache nếu có
        }
        return fetch(event.request); // Nếu không có thì tải từ mạng
      })
  );
});
