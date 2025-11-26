const CACHE_NAME = 'my-portfolio-v1';

const ASSETS = [
    '/',                     // root
    '/index.html',
    '/favicon.ico',
    '/style.css',
    '/script.js',

    // Components
    '/components/navbar.js',

    // Images
    '/assets/img/11563.jpg',
    '/assets/img/87421.svg',
    '/assets/img/0345743.png',

    // CSS
    '/assets/css/tailwind.min.css',
    '/assets/css/aos.css',

    // JS
    '/assets/js/feather.min.js',
    '/assets/js/aos.js',
    '/assets/js/particles.min.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching assets...');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activated');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch Handler
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // If in cache, return it
            if (cachedResponse) {
                return cachedResponse;
            }

            // Else fetch normally
            return fetch(event.request)
                .then((response) => {
                    // Save new file to cache
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => {
                    // fallback kalau perlu
                });
        })
    );
});
