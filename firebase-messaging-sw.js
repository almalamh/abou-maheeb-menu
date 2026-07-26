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

messaging.onBackgroundMessage(function(payload) {
    var title = payload.notification.title || 'أبو مهيب - برجر ومشويات';
    var options = {
        body: payload.notification.body,
        icon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100',
        badge: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100',
        tag: payload.data && payload.data.orderId ? 'order-' + payload.data.orderId : 'notification',
        renotify: true,
        vibrate: [200, 100, 200],
        data: payload.data || {}
    };
    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = 'menu.html';
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
