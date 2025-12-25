const CACHE_NAME = 'my-portfolio-v1';

// --- AUTO BASE PATH DETECTION (TERPENTING) ---
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');

// --- LIST ASSETS ---
const ASSETS = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/favicon.ico`,
    `${BASE}/style.css`,
    `${BASE}/script.js`,

    // Components
    `${BASE}/components/navbar.js`,

    // Images
    `${BASE}/assets/img/87421.svg`,
    `${BASE}/assets/img/0345743.png`,

    // CSS
    `${BASE}/assets/css/tailwind.min.css`,
    `${BASE}/assets/css/aos.css`,

    // JS
    `${BASE}/assets/js/feather.min.js`,
    `${BASE}/assets/js/aos.js`,
    `${BASE}/assets/js/particles.min.js`
];

// --- INSTALL ---
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching assets...');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// --- ACTIVATE ---
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
    self.clients.claim();
});

// --- FETCH HANDLER ---
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                if (cached) return cached;
                return fetch(event.request)
                    .then((response) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                    })
                    .catch(() => {
                        // fallback optional
                    });
            })
    );
});

