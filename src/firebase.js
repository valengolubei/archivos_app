// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDerD3KhmRkKYSoNZpkHM5H7ZzaQeSX5Nk",
    authDomain: "apptimbrame.firebaseapp.com",
    projectId: "apptimbrame",
    storageBucket: "apptimbrame.appspot.com",
    messagingSenderId: "852391732088",
    appId: "1:852391732088:web:dbdfa55ae4f6fa9f92de8d",
    measurementId: "G-9STPES6MLT"
};

// Initialize Firebase


const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;







