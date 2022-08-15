// // import { initializeApp } from 'firebase/app';

// // const firebaseConfig = {
// //     apiKey: "AIzaSyDzE2-28oVjdqGzGHKzmGpDRtlZyYsyNl0",
// //     authDomain: "pc-master-pro.firebaseapp.com",
// //     projectId: "pc-master-pro",
// //     storageBucket: "pc-master-pro.appspot.com",
// //     messagingSenderId: "458601990093",
// //     appId: "1:458601990093:web:95c0b51441b27135bbe684"
// // };

// // export const app = initializeApp(firebaseConfig);

// import "firebase/messaging";
// import firebase from "firebase/app";
// import localforage from "localforage";
// import { getMessaging } from "firebase/messaging";

// const firebaseCloudMessaging = {
//   init: async () => {
//     if (!firebase?.apps?.length) {
//       // Initialize the Firebase app with the credentials
//       firebase?.initializeApp({
//         apiKey: "AIzaSyDzE2-28oVjdqGzGHKzmGpDRtlZyYsyNl0",
//         authDomain: "pc-master-pro.firebaseapp.com",
//         projectId: "pc-master-pro",
//         storageBucket: "pc-master-pro.appspot.com",
//         messagingSenderId: "458601990093",
//         appId: "1:458601990093:web:95c0b51441b27135bbe684",
//       });

//       console.log(firebase.messaging());

//       try {
       
//         const messaging = getMessaging();
//         const tokenInLocalForage = await localforage.getItem("fcm_token");

//         // Return the token if it is alredy in our local storage
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }

//         // Request the push notification permission from browser
//         const status = await Notification.requestPermission();
//         if (status && status === "granted") {
//           // Get new token from Firebase
//           const fcm_token = await messaging.getToken({
//             vapidKey:
//               "BDyS0RbKV0Hbrn4n0K0if7y_8aCNALKN2z8YuXBCypbIo7NSbtSq_5djaRZKyXYf49CWbpxUqRY1kUVd4Qn462o",
//           });

//           // Set token in our local storage
//           if (fcm_token) {
//             localforage.setItem("fcm_token", fcm_token);
//             return fcm_token;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };
// export { firebaseCloudMessaging };

import App, { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage  } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDzE2-28oVjdqGzGHKzmGpDRtlZyYsyNl0",
  authDomain: "pc-master-pro.firebaseapp.com",
  projectId: "pc-master-pro",
  storageBucket: "pc-master-pro.appspot.com",
  messagingSenderId: "458601990093",
  appId: "1:458601990093:web:95c0b51441b27135bbe684"
};
App.initializeApp(firebaseConfig);




const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey:'BDyS0RbKV0Hbrn4n0K0if7y_8aCNALKN2z8YuXBCypbIo7NSbtSq_5djaRZKyXYf49CWbpxUqRY1kUVd4Qn462o'})
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });