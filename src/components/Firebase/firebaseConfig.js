import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAGQOGENiyKmNhzwwsu9LGT6ylY2Yij1tw",
    authDomain: "marvel-quiz-ba81e.firebaseapp.com",
    projectId: "marvel-quiz-ba81e",
    storageBucket: "marvel-quiz-ba81e.appspot.com",
    messagingSenderId: "604564654464",
    appId: "1:604564654464:web:0f95d91de13af31b185965"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const firestore = getFirestore();

  export const user = uid => doc(firestore, `users/${uid}`)
  