import './App.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, child, ref, onValue, get } from "firebase/database";

function App() {

  var profile1 = [];

  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("created account")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("error")
        //const errorMessage = error.message;
        // ..
      });
  }

  const logIn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("logued account")
        getInfoDb();
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }

  const getInfoDb = () => {
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, 'profile'))
      .then((snapshot) => {
        var timbres = [];
        snapshot.forEach(childSnapshot => {
          timbres.push(childSnapshot.val());
        });
        console.log(timbres);
        profile1 = timbres;
      })
      .then(() => {
        console.log(profile1[4]);
      })
  }

  return (
    <div className="main">
      <div className="App">
        <input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type={"password"} placeholder="pass" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signUp}>Crear cuenta</button>
        <button onClick={logIn}>Ingresar</button>
      </div>
    </div>
  );
}

export default App;
