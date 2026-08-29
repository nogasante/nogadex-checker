// Nogadex Consults Service Worker — Network First Strategy
const CACHE_NAME = "nogadex-waec-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // Delete all old cached versions to prevent stale JS from freezing the browser
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First: Always fetch fresh code from the server, never serve stale crashing cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => cached || Response.error());
      })
  );
});

// Listen for Push Notifications
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "🎓 Nogadex WAEC Result Checker";
  const options = {
    body: data.body || "Your WAEC result slip has been processed!",
    icon: "/logo.png",
    badge: "/logo.png",
    data: {
      url: data.url || "/",
    },
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle Notification Click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
