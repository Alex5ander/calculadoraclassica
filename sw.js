var CACHE_NAME = "calculadoraclassica";
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).
            then(function (cache) {
                return cache.addAll([
                   
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
self.addEventListener("fetch", function (event) {
    event.respondWith(
        (async () => {
            const r = await caches.match(event.request);
            console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(event.request);
            const cache = await caches.open(CACHE_NAME);
            console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
            cache.put(event.request, response.clone());
            return response;
        })(),
    );
});
