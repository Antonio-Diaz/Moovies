import firebase from "firebase/app";
import { defaults } from "lodash";

const firebaseConfig = {
    apiKey: "AIzaSyAoZCzZNLDtKF7alM26Q-qh414RA_Z41Aw",
    authDomain: "moovie-102ed.firebaseapp.com",
    projectId: "moovie-102ed",
    storageBucket: "moovie-102ed.appspot.com",
    messagingSenderId: "219865950813",
    appId: "1:219865950813:web:c5cbfc9c2e5220a38e7bb4",
    measurementId: "G-QFFX67LTCK"
  };


  export default firebase.initializeApp(firebaseConfig);