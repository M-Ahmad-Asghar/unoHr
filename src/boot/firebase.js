import firebase from "firebase";
import "@firebase/firestore";

var config = {
  apiKey: "AIzaSyDE0OZEif3XbEIc9_X09D5b9qHxkd1CagQ",
  authDomain: "promising-saga-232017.firebaseapp.com",
  databaseURL: "https://promising-saga-232017.firebaseio.com",
  projectId: "promising-saga-232017",
  storageBucket: "promising-saga-232017.appspot.com",
  messagingSenderId: "577836332495"
};
firebase.initializeApp(config);

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
