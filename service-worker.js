const CACHE_NAME = "menu-pwa-v1"
const ARCHIVOS_CACHE = [
    "./",
    "index.html",
    "styles.css",
    "menu.js",
    "manifest.json"
]
self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
            cache.addAll(FILES))
            )
        self.skipWaiting()
    })
self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim())
})
self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(response => {
         response || fetch(event.request))
    )
})
