import firebase from "firebase/compat/app";
import "firebase/compat/auth"; //for authenticaiton
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2r9RJPBF7jm1Pp7oa6MjJLmB3HCM_kqc",
  authDomain: "zero-hunger-3d40e.firebaseapp.com",
  projectId: "zero-hunger-3d40e",
  storageBucket: "zero-hunger-3d40e.appspot.com",
  messagingSenderId: "210632614955",
  appId: "1:210632614955:web:f5d7e2d50b7a5b9f1ab66e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const myDatabase = firebase.firestore();
const myStorage = firebase.storage();
const myAuthentication = firebase.auth();

export { myDatabase, myStorage, myAuthentication };
