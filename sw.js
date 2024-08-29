var CACHE_NAME = "calculadoraclassica";
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).
            then(function (cache) {
                return cache.addAll([
                    "/",
                    "/index.html",
                    "/js/app.js",
                    "/js/script.js",
                    "/css/styles.css",
                    "/icon.png",
                    "icons/icon48x48.png",
                    "icons/icon72x72.png",
                    "icons/icon96x96.png",
                    "icons/icon144x144.png",
                    "icons/icon168x168.png",
                    "icons/icon192x192.png",
                    "/manifest.json"
                ]);
            }));
});
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys
                .filter(key => key != CACHE_NAME)
                .map(key => caches.delete(key)));
        })
    );
});
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(cache => {
            return cache || fetch(e.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request.url, response.clone());
                    return response;
                })
            })
        })
    );
});
