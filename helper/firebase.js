import { onMessage } from "firebase/messaging";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { useRecoilState } from "recoil";
import { TokenAtom } from "./state";
import { handelSendNotificationToken } from "./sever";
const firebaseConfig = {
  apiKey: "AIzaSyCBclhkoWrm3Us8HA6A0Mu-e4WvCBi7WwI",
  authDomain: "pcmaster-43d91.firebaseapp.com",
  projectId: "pcmaster-43d91",
  storageBucket: "pcmaster-43d91.appspot.com",
  messagingSenderId: "389910024616",
  appId: "1:389910024616:web:be919d96dbd0ab69e40d9d"
};
initializeApp(firebaseConfig);

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
      "BAghJaGMEN6M1G006u8WXlQQUy-NErSFLBzttyspMWvKeX1Jmv5AAthBg9Q91zddSBx-IcmevAEhxbOSMiKq5p0",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
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
