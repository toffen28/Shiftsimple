const CACHE = 'shiftsimple-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    }).then(() => self.clients.claim())
  )
})

// Minimal fetch handler — no offline caching yet, just enables installability
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})