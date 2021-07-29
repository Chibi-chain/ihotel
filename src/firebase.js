import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA3-YeDsB4VeHmpQszvmND6dSZrD9sUW1s",
  authDomain: "ihotel-b749e.firebaseapp.com",
  projectId: "ihotel-b749e",
  storageBucket: "ihotel-b749e.appspot.com",
  messagingSenderId: "310889220546",
  appId: "1:310889220546:web:784494e02133a1f9a4ee5b",
  measurementId: "G-9DK9S3XMFQ",
};

export const useFirebase = () => {
  let [state, setState] = useState({ firebase });
  useEffect(() => {
    let app;
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    }
    let auth = firebase.auth(app);
    let firestore = firebase.firestore(app);
    let rtdb = firebase.database();
    let storage = firebase.storage();
    setState({ firebase, app, auth, firestore, rtdb, storage });
  }, [firebaseConfig]);
  return state;
};
