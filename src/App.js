import './App.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, child, ref, onValue, get } from "firebase/database";
import 'firebase/compat/database';

function App() {

  var profile1 = [];
  var current;
  var date;
  var time;
  var cardsLength;
  var startTime;
  var endTime;
  const db = getDatabase();
  const dbRef = ref(db);

  // var listaEstructuraRegistro = [];

  /*class EstructuraRegistro {
    constructor(userName, date, altaBajaUser, accessTime) {
      this.userName = userName;
      this.date = date;
      this.altaBajaUser = altaBajaUser;
      this.accessTime = accessTime;
    }
  }*/

  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("created account")

      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("error")
      });
  }

  const logIn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("logued account")
        getInfoDb();
        /* el login debe iniciar con display block y el div de la app con display none. cuando se ejecuta la funcion
        del login deben inventirse las etiquetas.
         document.querySelector("#app").style.display = "block";
         document.querySelector(".login").style.display = "none";*/
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }

  const getInfoDb = () => {
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
        const captureDataTime = () => {
          current = new Date();
          date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
          time = current.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          console.log(time);
          console.log(date)
          //const timeAndDate = ("A las "+ time + " el " + date);
        }

        captureDataTime();
        //si los user nuevos se agregan en la primera posicion(la 0) de la lista Cards de la db , cambiar .lenghth por 0
        const capturarHorarioPresionado = () => {
          if (profile1[3].doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          cardsLength = profile1[0].length - 1;
          if (profile1[3].cardScan === true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (profile1[0][cardsLength].enabled === true) { console.log(profile1[0][cardsLength].username + " tiene accesso") }
          if (profile1[0][cardsLength].enabled === false) { console.log(profile1[0][cardsLength].username + " no tiene accesso") }
        }

        const notificar = () => {
          if (profile1[3].unlockDoor = true) { console.log("la puerte esta abierta") }
        }

        const modificarEstadoEnabled = () => {
          if (profile1[0][0].enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          startTime = profile1[0][0].accessTimes[0].startTime;
          endTime = profile1[0][0].accessTimes[0].endTime;
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        notificar();
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
  }

  const darDeAlta = () => {
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
        const captureDataTime = () => {
          current = new Date();
          date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
          time = current.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          console.log(time);
          console.log(date)
          //const timeAndDate = ("A las "+ time + " el " + date);
        }

        captureDataTime();
        //si los user nuevos se agregan en la primera posicion(la 0) de la lista Cards de la db , cambiar .lenghth por 0
        const capturarHorarioPresionado = () => {
          if (profile1[3].doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          cardsLength = profile1[0].length - 1;
          if (profile1[3].cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (profile1[0][cardsLength].enabled === true) { console.log(profile1[0][cardsLength].username + " tiene accesso") }
          if (profile1[0][cardsLength].enabled === false) { console.log(profile1[0][cardsLength].username + " no tiene accesso") }
        }

        const notificar = () => {
          if (profile1[3].unlockDoor = true) { console.log("la puerte esta abierta") }
        }

        const modificarEstadoEnabled = () => {
          if (profile1[0][0].enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          startTime = profile1[0][0].accessTimes[0].startTime;
          endTime = profile1[0][0].accessTimes[0].endTime;
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        notificar();
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        var enabledActualizado = {
          accessTimes: [
            {
              "endTime": 17,
              "startTime": 8
            }
          ],
          enabled: true,
          id: "11 9E D4 23",
          username: "admin"
        };

        firebase.database().ref('profile/cards/0').set(enabledActualizado);
      })
  }

  const darDeBaja = () => {
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
        const captureDataTime = () => {
          current = new Date();
          date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
          time = current.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          console.log(time);
          console.log(date)
          //const timeAndDate = ("A las "+ time + " el " + date);
        }

        captureDataTime();
        //si los user nuevos se agregan en la primera posicion(la 0) de la lista Cards de la db , cambiar .lenghth por 0
        const capturarHorarioPresionado = () => {
          if (profile1[3].doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          cardsLength = profile1[0].length - 1;
          if (profile1[3].cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (profile1[0][cardsLength].enabled === true) { console.log(profile1[0][cardsLength].username + " tiene accesso") }
          if (profile1[0][cardsLength].enabled === false) { console.log(profile1[0][cardsLength].username + " no tiene accesso") }
        }

        const notificar = () => {
          if (profile1[3].unlockDoor = true) { console.log("la puerte esta abierta") }
        }

        const modificarEstadoEnabled = () => {
          if (profile1[0][0].enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          startTime = profile1[0][cardsLength].accessTimes[1];
          endTime = profile1[0][cardsLength].accessTimes[0];
          console.log(startTime + endTime)
        }
        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        notificar();
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        var enabledActualizado = {
          accessTimes: [
            {
              "endTime": 17,
              "startTime": 8
            }
          ],
          enabled: false,
          id: "11 9E D4 23",
          username: "admin"
        };

        firebase.database().ref('profile/cards/0').set(enabledActualizado);
      })
  }

  const setearTimeStart = () => {
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
        const captureDataTime = () => {
          current = new Date();
          date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
          time = current.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          console.log(time);
          console.log(date)
          //const timeAndDate = ("A las "+ time + " el " + date);
        }

        captureDataTime();
        //si los user nuevos se agregan en la primera posicion(la 0) de la lista Cards de la db , cambiar .lenghth por 0
        const capturarHorarioPresionado = () => {
          if (profile1[3].doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          cardsLength = profile1[0].length - 1;
          if (profile1[3].cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (profile1[0][cardsLength].enabled === true) { console.log(profile1[0][cardsLength].username + " tiene accesso") }
          if (profile1[0][cardsLength].enabled === false) { console.log(profile1[0][cardsLength].username + " no tiene accesso") }
        }

        const notificar = () => {
          if (profile1[3].unlockDoor = true) { console.log("la puerte esta abierta") }
        }

        const modificarEstadoEnabled = () => {
          if (profile1[0][0].enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          startTime = profile1[0][0].accessTimes[0].startTime;
          endTime = profile1[0][0].accessTimes[0].endTime;
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        notificar();
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        var enabledActualizado = {
          accessTimes: [
            {
              "endTime": 17,
              "startTime": 8
            }
          ],
          enabled: true,
          id: "11 9E D4 23",
          username: "admin"
        };

        firebase.database().ref('profile/cards/0').set(enabledActualizado);
      })
  }

  /*  function cargarHistorial(_array) {
  
      let contenido = ""
      _array.forEach(element => {
          contenido += `
          <article>
          <div>
              <h1>Timbre tocado por ${element.username}</h1>
              <h2>A las ${element.date} y fecha</h2>
              <h3>Acceso: ${element.enabled}</h3>
              <h5>Horario habilitado desde (select con la opcion precargada) ${element.timeStart} hasta ${element.timeEnd} </h5>
          </div>
              <button onClick={darDeBaja}>DAR DE BAJA</button>
              <button onClick={darDeAlta}>DAR DE ALTA</button>
          </article>        
          `
      });
  
      document.querySelector("#historialTimbre").innerHTML = contenido;*/


  /*setInterval(() => {
    getInfoDb();
    console.log("sdf")
  }, 3000)*/

  /* const userName = profile1[0][cardsLength].username;
   const date = timeAndDate;
   const altaBajaUser = profile1[0][cardsLength].enabled;
   const accessTime = profile1[0][cardsLength].accessTime;
   const estructura = new EstructuraRegistro(userName, date, altaBajaUser, accessTime);
   listaEstructuraRegistro.push(estructura);*/

  return (
    <div id="main">

      <div className="login">
        <h1>LOG IN</h1>
        <input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type={"password"} placeholder="pass" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signUp}>CREAR CUENTA</button>
        <button onClick={logIn}>INGRESAR</button>
      </div>

      <div id="app">
        <section>
          <button id="bt_cerrar">SALIR</button>
          <div>
            <div className="imagen"></div>
            <h2>Dueño del timbre</h2>
          </div>
        </section>

        <section id="historialTimbre">
          <h1>Registro del timbre</h1>
          <article>
            <div className='infoRegistro'>
              <img src={require('./img/bell.png')} />
              <hr />
              <div id="tiempo">
                <h3>Timbre presionado por UserX</h3>
                <p>18:05:32hs el 16/12/2022</p>
                {/* <select name="timeStart" id="timeStart" onClick="{setearTimeStart}">
                        <option value="seleccionar">timeStart desde la DB y todos los numeros del 0 al 24 como options</option>
                    </select> */}
                {/* <select name="timeEnd" id="timeEnd"  onClick="{setearTimeEnd}">
                        <option value="seleccionar">timeEnd desde la DB y todos los numeros del 0 al 24 como options</option>
                    </select> */}
                <h5>Acceso: denegado</h5>
                <p>Habilitado: de 14.00 a 23.34</p>
              </div>
            </div>

            <div className="btns">
              <button onClick={darDeBaja}>DAR DE BAJA</button>
              <button onClick={darDeAlta}>DAR DE ALTA</button>
            </div>
          </article>
        </section>

      </div>
      <footer>
        <p>Todos los derechos reservados</p>
      </footer>
    </div>

  );
}

export default App;
