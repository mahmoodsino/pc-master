importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCBclhkoWrm3Us8HA6A0Mu-e4WvCBi7WwI",
  authDomain: "pcmaster-43d91.firebaseapp.com",
  projectId: "pcmaster-43d91",
  storageBucket: "pcmaster-43d91.appspot.com",
  messagingSenderId: "389910024616",
  appId: "1:389910024616:web:be919d96dbd0ab69e40d9d"
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