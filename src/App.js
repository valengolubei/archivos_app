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
      .then(() => {
        const captureDataTime = () => {
          const current = new Date();
          const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
          const time = current.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          console.log(time);
          console.log(date)
        }

        captureDataTime();
        //si los user nuevos se agregan en la primera posicion(la 0) de la lista Cards de la db , cambiar .lenghth por 0
        const capturarHorarioPresionado = () => {
          if (profile1[4].doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          const cardsLength = profile1[0].length - 1;
          if (profile1[4].cardScan = true) {
            console.log(profile1[0][cardsLength])
          }

          //poner si tiene o no accesso el user
          if (profile1[0][cardsLength].enabled == true) { console.log(profile1[0][cardsLength] + " tiene accesso") }
          if (profile1[0][cardsLength].enabled == false) { console.log(profile1[0][cardsLength].username + " no tiene accesso") }
        }

        const notificar = () => {
          if (profile1[4].unlockDoor = true) { alert("la puerte esta abierta") }
        }

        const modificarEstado = () => {
          // const db = getDatabase();
          // const dbRef = ref(db);
          // put(child(dbRef, 'profile'))
          //   .then((snapshot) => {
          //     var timbres = [];
          //     snapshot.forEach(childSnapshot => {
          //       timbres.push(childSnapshot.val());
          //     });
          //   })
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        notificar();
      })
  }

  return (
    // <div className="main">
    //   <div className="App">
    //     <input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
    //     <input type={"password"} placeholder="pass" onChange={(e) => setPassword(e.target.value)} />
    //     <button onClick={signUp}>Crear cuenta</button>
    //     <button onClick={logIn}>Ingresar</button>
    //   </div>
    // </div>

<div className="App">
<div id="main">

<div id="login">
    <h1>LOG IN</h1>
    <form>
      <input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type={"password"} placeholder="pass" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signUp}>CREAR CUENTA</button>
        <button onClick={logIn}>INGRESAR</button>
    </form>
</div>

<div id="app"> 
    <section>
    <button id="bt_cerrar">SALIR</button>
        <div>
            <div class="imagen"></div>
            <h2>Usuario #34624</h2>
        </div>
    </section>

    <section id="historialTimbre">
        <h1>Registro del timbre</h1>
        <article>
            <img src={require('./img/bell.svg')} />
            <hr />
            <div id="tiempo">
                <h3>Timbre presionado por UserX</h3>
                <p>18:05:32hs el 16/12/2022</p>
                <p>Acceso: denegado</p> 
            </div>
        </article>
    </section>

</div>
<footer>
    <p>Todos los derechos reservados</p>
</footer>
</div>
</div>

  );}

export default App;
