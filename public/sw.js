// Nogadex Consults Service Worker — Network First Strategy
const CACHE_NAME = "nogadex-waec-v3";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First: Always fetch fresh code from the server
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
  const title = data.title || "🚨 Nogadex Admin Alert";
  const options = {
    body: data.body || "New student order received!",
    icon: "/logo.png",
    badge: "/logo.png",
    requireInteraction: true,
    renotify: true,
    silent: false,
    vibrate: [300, 150, 400, 150, 300],
    data: {
      url: data.url || "/admin",
    },
    actions: [
      { action: "open", title: "⚡ Open Order" },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle Notification & Action Clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/admin";

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
