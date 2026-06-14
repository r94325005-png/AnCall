/* 新教倫理 公開站 — Service Worker：離線可讀
   導覽頁採「網路優先、離線回退快取」；靜態資源採「快取優先、背景更新」。 */
const VER = 'weber-cache-2026-06-14';
const CORE = [
  './', 'index.html', 'about.html',
  'assets/style.css', 'assets/app.js', 'assets/favicon.svg',
  'assets/icon-192.png', 'assets/icon-512.png', 'manifest.webmanifest'
];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(VER).then((c) => c.addAll(CORE).catch(() => {})));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VER).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; /* 跨網域（字型等）不攔截 */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const cp = res.clone(); caches.open(VER).then((c) => c.put(req, cp)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req)
        .then((res) => { if (res && res.status === 200) { const cp = res.clone(); caches.open(VER).then((c) => c.put(req, cp)); } return res; })
        .catch(() => cached);
      return cached || net;
    })
  );
});
