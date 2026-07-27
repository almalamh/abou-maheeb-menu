importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCOXdd8rSvTyILCvYqk5pS_WoaHJs2IxC0",
    authDomain: "abou-maheeb.firebaseapp.com",
    projectId: "abou-maheeb",
    storageBucket: "abou-maheeb.firebasestorage.app",
    messagingSenderId: "591919493287",
    appId: "1:591919493287:web:4b55a5e6fadf7981f8eb82"
});

var messaging = firebase.messaging();
var CACHE_NAME = 'abou-maheeb-v7';
var urlsToCache = [
    './',
    './menu.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
    'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('firestore.googleapis.com') !== -1) return;
    event.respondWith(
        fetch(event.request).then(function(response) {
            if (response && response.status === 200) {
                var responseClone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseClone);
                });
            }
            return response;
        }).catch(function() {
            return caches.match(event.request);
        })
    );
});

messaging.onBackgroundMessage(function(payload) {
    var title = (payload.notification && payload.notification.title) || 'أبو مهيب - برجر ومشويات';
    var body = (payload.notification && payload.notification.body) || '';
    var options = {
        body: body,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: payload.data && payload.data.orderId ? 'order-' + payload.data.orderId : 'notification',
        renotify: true,
        vibrate: [200, 100, 200],
        data: payload.data || {}
    };
    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = './menu.html';
    if (event.notification.data && event.notification.data.orderId) {
        url += '?order=' + event.notification.data.orderId;
    }
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf('menu.html') !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
