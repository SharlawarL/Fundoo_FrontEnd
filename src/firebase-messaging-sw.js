importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '192803779142'
});

const messaging = firebase.messaging();