// IMPORTANT: Update this version number whenever you make changes to force cache refresh
const CACHE_NAME = 'wcvh-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/login.css',
  '/css/cart.css',
  '/js/script.js',
  '/js/login.js',
  '/js/auth-helpers.js',
  '/js/cart.js',
  '/js/pwa.js',
  '/js/firebase-config.js',
  '/images/Pet-Veterinary-Logo-Design-1.jpg',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', event => {
  console.log('[SW] Installing new service worker...');
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell and content');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch resources - Network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Update cache with fresh content
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              console.log('[SW] Serving from cache (offline):', event.request.url);
              return response;
            }
            // If not in cache either, return a custom offline page or error
            return new Response('Offline - Content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating new service worker...');
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] New service worker activated!');
      // Immediately claim all clients so they use the new service worker
      return self.clients.claim();
    })
  );
});
