// import React, { useEffect } from "react";
// import * as firebase from "firebase/app";
// import "firebase/messaging";
// import { firebaseCloudMessaging } from "../../helper/firebase";
// import { ToastContainer, toast } from "react-toastify";
// import { useRouter } from "next/router";
// import { getMessaging } from "firebase/messaging";

// function PushNotificationLayout({ children }) {
//   const router = useRouter();
//   useEffect(() => {
//     setToken();

//     // Event listener that listens for the push notification event in the background
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.addEventListener("message", (event) => {
//         console.log("event for the service worker", event);
//       });
//     }

//     // Calls the getMessage() function if the token is there
//     async function setToken() {
//       try {
//         const token = await firebaseCloudMessaging.init();
//         if (token) {
//           console.log("token", token);
//           getMessage();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   });

//   // Handles the click function on the toast showing push notification
//   const handleClickPushNotification = (url) => {
//     router.push(url);
//   };

//   // Get the push notification message and triggers a toast to display it
//   function getMessage() {
//     const messaging = getMessaging();
//     messaging.onMessage((message) => {
//       toast(
//         <div onClick={() => handleClickPushNotification(message?.data?.url)}>
//           <h5>{message?.notification?.title}</h5>
//           <h6>{message?.notification?.body}</h6>
//         </div>,
//         {
//           closeOnClick: false,
//         }
//       );
//     });
//   }

//   return (
//     <>
//       <ToastContainer />
//       {children}
//     </>
//   );
// }

// export default PushNotificationLayout;



import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken,onMessageListener } from '../../helper/firebase'; 

const Notification = () => {
  const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast(<ToastDisplay/>);
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  }, [notification])

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));

  return (
     <Toaster/>
  )
}

export default Notification