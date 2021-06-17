import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQmR7Ho3vmI5Ov8qkEsh2v3XDHq7BlV8U",
  authDomain: "to-do-6fb08.firebaseapp.com",
  projectId: "to-do-6fb08",
  storageBucket: "to-do-6fb08.appspot.com",
  messagingSenderId: "889037025569",
  appId: "1:889037025569:web:93a7ab88bef6925babce60",
};

const fb = firebase.initializeApp(firebaseConfig);
// export const auth = fb.auth();
export const db = fb.firestore();
