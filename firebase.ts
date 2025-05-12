// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTiKXhtn-EfRi-jCeaU5zACAbgRlY8SyI",
  authDomain: "edu-mate-c21f5.firebaseapp.com",
  projectId: "edu-mate-c21f5",
  storageBucket: "edu-mate-c21f5.firebasestorage.app",
  messagingSenderId: "19758567498",
  appId: "1:19758567498:web:ce772b7bf97bfa2e9296b3",
  measurementId: "G-FS056G2NQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const analytics = getAnalytics(app);
}

export const auth = getAuth(app);
if (typeof document !== "undefined") {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  });
  auth.onIdTokenChanged((user) => {
    if (user) {
      user.getIdToken(true).then((token) => {
        document.cookie = "token=" + token + ";";
      });
    }
  });
}
export const firestore = getFirestore(app);
