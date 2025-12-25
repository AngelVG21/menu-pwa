const CACHE_NAME = "menu-pwa-v1"
const ARCHIVOS_CACHE = [
    "./",
    "./index.html",
    "./styles.css",
    "./menu.js",
    "./manifest.json"
]
self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ARCHIVOS_CACHE)
        })  
    )
})
self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(respuesta => {
            return respuesta || fetch(event.request)
        })
    )
})