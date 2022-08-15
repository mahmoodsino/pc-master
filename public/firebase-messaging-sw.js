importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDzE2-28oVjdqGzGHKzmGpDRtlZyYsyNl0",
    authDomain: "pc-master-pro.firebaseapp.com",
    projectId: "pc-master-pro",
    storageBucket: "pc-master-pro.appspot.com",
    messagingSenderId: "458601990093",
    appId: "1:458601990093:web:95c0b51441b27135bbe684"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});