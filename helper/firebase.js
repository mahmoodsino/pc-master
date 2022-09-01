import { onMessage } from "firebase/messaging";
import { getMessaging, getToken } from "firebase/messaging";

import { initializeApp } from "firebase/app";
import { useRecoilState } from "recoil";
import { TokenAtom } from "./state";
import { handelSendNotificationToken } from "./sever";
const firebaseConfig = {
  apiKey: "AIzaSyDzE2-28oVjdqGzGHKzmGpDRtlZyYsyNl0",
  authDomain: "pc-master-pro.firebaseapp.com",
  projectId: "pc-master-pro",
  storageBucket: "pc-master-pro.appspot.com",
  messagingSenderId: "458601990093",
  appId: "1:458601990093:web:95c0b51441b27135bbe684",
};

let messaging;
const app = async () => {
  initializeApp(firebaseConfig);
  messaging = getMessaging();
};
app();
export const requestForToken = async () => {
  const [token, setToken] = useRecoilState(TokenAtom);
  return await getToken(messaging, {
    vapidKey:
      "BDyS0RbKV0Hbrn4n0K0if7y_8aCNALKN2z8YuXBCypbIo7NSbtSq_5djaRZKyXYf49CWbpxUqRY1kUVd4Qn462o",
  })
    .then((currentToken) => {
      if (currentToken) {
        handelSendNotificationToken(token, currentToken).then(
          (res) =>
          console.log(res)
        );
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
