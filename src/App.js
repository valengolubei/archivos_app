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
  var flagsLength;
  var startTime;
  var endTime;
  var userName;
  var idUser;
  var cardScan;
  var doorBell;
  var sendNotification;
  var unlockDoor;
  var enabled;

  const db = getDatabase();
  const dbRef = ref(db);

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
          if (doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          //muestra el ultimo usuario que paso la tarjeta
          cardsLength = profile1[0].length - 1;
          flagsLength = profile1[3].length - 1;
          userName = profile1[0][cardsLength].username;
          enabled = profile1[0][cardsLength].enabled;
          idUser = profile1[0][cardsLength].id;

          cardScan = profile1[3][flagsLength].cardScan;
          doorBell = profile1[3][flagsLength].doorBell;
          sendNotification = profile1[3][flagsLength].sendNotification;
          unlockDoor = profile1[3][flagsLength].unlockDoor;

          startTime = profile1[0][cardsLength].accessTimes[0].startTime;
          endTime = profile1[0][cardsLength].accessTimes[0].endTime;

          if (cardScan === true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (enabled === true) { console.log(userName + " tiene accesso") }
          if (enabled === false) { console.log(userName + " no tiene accesso") }
        }

        const notificar = () => {
          console.log("la puerte esta abierta")
          setTimeout(() => {
            var trancarPuerta = {
              "11 9E D4 23": true,
              "E2 3A 7D 19": true,
              cardScan: cardScan,
              doorBell: doorBell,
              sendNotification: sendNotification,
              unlockDoor: false
            };
            firebase.database().ref(`/profile/cards/${cardsLength}`).set(trancarPuerta);
          }, 1000)
        }

        const modificarEstadoEnabled = () => {
          if (enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        if (unlockDoor = true) { notificar(); }
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
          if (doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          cardsLength = profile1[0].length - 1;
          flagsLength = profile1[3].length - 1;
          userName = profile1[0][cardsLength].username;
          enabled = profile1[0][cardsLength].enabled;
          idUser = profile1[0][cardsLength].id;

          cardScan = profile1[3][flagsLength].cardScan;
          doorBell = profile1[3][flagsLength].doorBell;
          sendNotification = profile1[3][flagsLength].sendNotification;
          unlockDoor = profile1[3][flagsLength].unlockDoor;

          startTime = profile1[0][cardsLength].accessTimes[0].startTime;
          endTime = profile1[0][cardsLength].accessTimes[0].endTime;

          //muestra el ultimo usuario que paso la tarjeta

          if (cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (enabled === true) { console.log(userName + " tiene accesso") }
          if (enabled === false) { console.log(userName + " no tiene accesso") }
        }
        const notificar = () => {
          console.log("la puerte esta abierta")
          setTimeout(() => {
            var trancarPuerta = {
              "11 9E D4 23": true,
              "E2 3A 7D 19": true,
              cardScan: cardScan,
              doorBell: doorBell,
              sendNotification: sendNotification,
              unlockDoor: false
            };
            firebase.database().ref('/profile/flags/0').set(trancarPuerta);
          }, 1000)
        }
        const modificarEstadoEnabled = () => {
          if (enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        if (unlockDoor = true) { notificar(); }
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        var enabledActualizado = {
          accessTimes: [
            {
              "endTime": endTime,
              "startTime": startTime
            }
          ],
          enabled: true,
          id: idUser,
          username: userName
        };

        firebase.database().ref(`/profile/cards/${cardsLength}`).set(enabledActualizado);
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
          if (doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          cardsLength = profile1[0].length - 1;
          flagsLength = profile1[3].length - 1;
          userName = profile1[0][cardsLength].username;
          enabled = profile1[0][cardsLength].enabled;
          idUser = profile1[0][cardsLength].id;

          cardScan = profile1[3][flagsLength].cardScan;
          doorBell = profile1[3][flagsLength].doorBell;
          sendNotification = profile1[3][flagsLength].sendNotification;
          unlockDoor = profile1[3][flagsLength].unlockDoor;

          startTime = profile1[0][cardsLength].accessTimes[0].startTime;
          endTime = profile1[0][cardsLength].accessTimes[0].endTime;

          //muestra el ultimo usuario que paso la tarjeta
          if (cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (enabled === true) { console.log(userName + " tiene accesso") }
          if (enabled === false) { console.log(userName + " no tiene accesso") }
        }
        const notificar = () => {
          console.log("la puerte esta abierta")
          setTimeout(() => {
            var trancarPuerta = {
              "11 9E D4 23": true,
              "E2 3A 7D 19": true,
              cardScan: cardScan,
              doorBell: doorBell,
              sendNotification: sendNotification,
              unlockDoor: false
            };
            firebase.database().ref('/profile/flags/0').set(trancarPuerta);
          }, 1000)
        }
        const modificarEstadoEnabled = () => {
          if (enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          console.log(startTime + endTime)
        }
        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        if (unlockDoor = true) { notificar(); }
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        var enabledActualizado = {
          accessTimes: [
            {
              "endTime": endTime,
              "startTime": startTime
            }
          ],
          enabled: false,
          id: idUser,
          username: userName
        };

        firebase.database().ref(`/profile/cards/${cardsLength}`).set(enabledActualizado);
      })
  }

  const cambiarHorarioStart = (data) => {
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

        const capturarHorarioPresionado = () => {
          if (doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          cardsLength = profile1[0].length - 1;
          flagsLength = profile1[3].length - 1;
          userName = profile1[0][cardsLength].username;
          enabled = profile1[0][cardsLength].enabled;
          idUser = profile1[0][cardsLength].id;

          cardScan = profile1[3][flagsLength].cardScan;
          doorBell = profile1[3][flagsLength].doorBell;
          sendNotification = profile1[3][flagsLength].sendNotification;
          unlockDoor = profile1[3][flagsLength].unlockDoor;

          startTime = profile1[0][cardsLength].accessTimes[0].startTime;
          endTime = profile1[0][cardsLength].accessTimes[0].endTime;

          //muestra el ultimo usuario que paso la tarjeta
          if (cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (enabled === true) { console.log(userName + " tiene accesso") }
          if (enabled === false) { console.log(userName + " no tiene accesso") }
        }
        const notificar = () => {
          console.log("la puerte esta abierta")
          setTimeout(() => {
            var trancarPuerta = {
              "11 9E D4 23": true,
              "E2 3A 7D 19": true,
              cardScan: cardScan,
              doorBell: doorBell,
              sendNotification: sendNotification,
              unlockDoor: false
            };
            firebase.database().ref('/profile/flags/0').set(trancarPuerta);
          }, 1000)
        }
        const modificarEstadoEnabled = () => {
          if (enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        if (unlockDoor = true) { notificar(); }
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        console.log(data);

        var startTimeActualizado = data;

        const horaActualizadaStart = {
          endTime: endTime,
          startTime: startTimeActualizado
        }

        firebase.database().ref(`/profile/cards/${cardsLength}/accessTimes/0`).set(horaActualizadaStart);
      })
  }

  const cambiarHorarioEnd = (data) => {
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

        const capturarHorarioPresionado = () => {
          if (doorBell = true) {
            console.log("el timbre se presionó")
          }
        }

        const marcarTarjetaYMostrarAcceso = () => {
          cardsLength = profile1[0].length - 1;
          flagsLength = profile1[3].length - 1;
          userName = profile1[0][cardsLength].username;
          enabled = profile1[0][cardsLength].enabled;
          idUser = profile1[0][cardsLength].id;

          cardScan = profile1[3][flagsLength].cardScan;
          doorBell = profile1[3][flagsLength].doorBell;
          sendNotification = profile1[3][flagsLength].sendNotification;
          unlockDoor = profile1[3][flagsLength].unlockDoor;

          startTime = profile1[0][cardsLength].accessTimes[0].startTime;
          endTime = profile1[0][cardsLength].accessTimes[0].endTime;

          //muestra el ultimo usuario que paso la tarjeta
          if (cardScan = true) {
            console.log(profile1[0][cardsLength])
          }
          //poner si tiene o no accesso el user
          if (enabled === true) { console.log(userName + " tiene accesso") }
          if (enabled === false) { console.log(userName + " no tiene accesso") }
        }
        const notificar = () => {
          console.log("la puerte esta abierta")
          setTimeout(() => {
            var trancarPuerta = {
              "11 9E D4 23": true,
              "E2 3A 7D 19": true,
              cardScan: cardScan,
              doorBell: doorBell,
              sendNotification: sendNotification,
              unlockDoor: false
            };
            firebase.database().ref('/profile/flags/0').set(trancarPuerta);
          }, 1000)
        }
        const modificarEstadoEnabled = () => {
          if (enabled === true) {
            console.log("usuario dado de alta");
          }
          else { console.log("usuario dado de baja"); }
        }

        const modificarHorarioAccess = () => {
          console.log("Horario habilitado desde la(s) " + startTime + " hasta la(s) " + endTime)
        }

        capturarHorarioPresionado();
        marcarTarjetaYMostrarAcceso();
        if (unlockDoor = true) { notificar(); }
        modificarEstadoEnabled();
        modificarHorarioAccess();
      })
      .then(() => {
        console.log(data);
        var endTimeActualizado = data;

        const horaActualizadaEnd = {
          endTime: endTimeActualizado,
          startTime: startTime
        }

        firebase.database().ref(`/profile/cards/${cardsLength}/accessTimes/0`).set(horaActualizadaEnd);
      })
  }

  /*setInterval(() => {
    getInfoDb();
    console.log("sdf")
  }, 3000)*/

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
          
         {profile1.map(t => 
          <article>
          <div className='infoRegistro'>
            <img src={require('./img/bell.png')} />
            <hr />
            <div id="tiempo">
              <h3>Timbre presionado por ${userName}</h3>
              <p>A las ${time} el ${date}</p>
              <h5>Acceso: ${enabled}</h5>
              <p>Habilitado: de ${startTime} hasta ${endTime}</p>

              <label>
                Cambiar horario:
                <select onChange={(e) => cambiarHorarioStart(e.target.value)}>
                  <option value="00:00">00:00 h.</option>
                  <option value="00:15">00:15 h.</option>
                  <option value="00:30">00:30 h.</option>
                  <option value="00:45">00:45 h.</option>
                  <option value="01:00">01:00 h.</option>
                  <option value="01:15">01:15 h.</option>
                  <option value="01:30">01:30 h.</option>
                  <option value="01:45">01:45 h.</option>
                  <option value="02:00">02:00 h.</option>
                  <option value="02:15">02:15 h.</option>
                  <option value="02:30">02:30 h.</option>
                  <option value="02:45">02:45 h.</option>
                  <option value="03:00">03:00 h.</option>
                  <option value="03:15">03:15 h.</option>
                  <option value="03:30">03:30 h.</option>
                  <option value="03:45">03:45 h.</option>
                  <option value="04:00">04:00 h.</option>
                  <option value="04:15">04:15 h.</option>
                  <option value="04:30">04:30 h.</option>
                  <option value="04:45">04:45 h.</option>
                  <option value="05:00">05:00 h.</option>
                  <option value="05:15">05:15 h.</option>
                  <option value="05:30">05:30 h.</option>
                  <option value="05:45">05:45 h.</option>
                  <option value="06:00">06:00 h.</option>
                  <option value="06:15">06:15 h.</option>
                  <option value="06:30">06:30 h.</option>
                  <option value="06:45">06:45 h.</option>
                  <option value="07:00">07:00 h.</option>
                  <option value="07:15">07:15 h.</option>
                  <option value="07:30">07:30 h.</option>
                  <option value="07:45">07:45 h.</option>
                  <option value="08:00">08:00 h.</option>
                  <option value="08:15">08:15 h.</option>
                  <option value="08:30">08:30 h.</option>
                  <option value="08:45">08:45 h.</option>
                  <option value="09:00">09:00 h.</option>
                  <option value="09:15">09:15 h.</option>
                  <option value="09:30">09:30 h.</option>
                  <option value="09:45">09:45 h.</option>
                  <option value="10:00">10:00 h.</option>
                  <option value="10:15">10:15 h.</option>
                  <option value="10:30">10:30 h.</option>
                  <option value="10:45">10:45 h.</option>
                  <option value="11:00">11:00 h.</option>
                  <option value="11:15">11:15 h.</option>
                  <option value="11:30">11:30 h.</option>
                  <option value="11:45">11:45 h.</option>
                  <option value="12:00">12:00 h.</option>
                  <option value="12:15">12:15 h.</option>
                  <option value="12:30">12:30 h.</option>
                  <option value="12:45">12:45 h.</option>
                  <option value="13:00">13:00 h.</option>
                  <option value="13:15">13:15 h.</option>
                  <option value="13:30">13:30 h.</option>
                  <option value="13:45">13:45 h.</option>
                  <option value="14:00">14:00 h.</option>
                  <option value="14:15">14:15 h.</option>
                  <option value="14:30">14:30 h.</option>
                  <option value="14:45">14:45 h.</option>
                  <option value="15:00">15:00 h.</option>
                  <option value="15:15">15:15 h.</option>
                  <option value="15:30">15:30 h.</option>
                  <option value="15:45">15:45 h.</option>
                  <option value="16:00">16:00 h.</option>
                  <option value="16:15">16:15 h.</option>
                  <option value="16:30">16:30 h.</option>
                  <option value="16:45">16:45 h.</option>
                  <option value="17:00">17:00 h.</option>
                  <option value="17:15">17:15 h.</option>
                  <option value="17:30">17:30 h.</option>
                  <option value="17:45">17:45 h.</option>
                  <option value="18:00">18:00 h.</option>
                  <option value="18:15">18:15 h.</option>
                  <option value="18:30">18:30 h.</option>
                  <option value="18:45">18:45 h.</option>
                  <option value="19:00">19:00 h.</option>
                  <option value="19:15">19:15 h.</option>
                  <option value="19:30">19:30 h.</option>
                  <option value="19:45">19:45 h.</option>
                  <option value="20:00">20:00 h.</option>
                  <option value="20:15">20:15 h.</option>
                  <option value="20:30">20:30 h.</option>
                  <option value="20:45">20:45 h.</option>
                  <option value="21:00">21:00 h.</option>
                  <option value="21:15">21:15 h.</option>
                  <option value="21:30">21:30 h.</option>
                  <option value="21:45">21:45 h.</option>
                  <option value="22:00">22:00 h.</option>
                  <option value="22:15">22:15 h.</option>
                  <option value="22:30">22:30 h.</option>
                  <option value="22:45">22:45 h.</option>
                  <option value="23:00">23:00 h.</option>
                  <option value="23:15">23:15 h.</option>
                  <option value="23:30">23:30 h.</option>
                  <option value="23:45">23:45 h.</option>
                </select>
              </label>

              <label>
                Cambiar horario:
                <select onChange={(e) => cambiarHorarioEnd(e.target.value)}>
                  <option value="00:00">00:00 h.</option>
                  <option value="00:15">00:15 h.</option>
                  <option value="00:30">00:30 h.</option>
                  <option value="00:45">00:45 h.</option>
                  <option value="01:00">01:00 h.</option>
                  <option value="01:15">01:15 h.</option>
                  <option value="01:30">01:30 h.</option>
                  <option value="01:45">01:45 h.</option>
                  <option value="02:00">02:00 h.</option>
                  <option value="02:15">02:15 h.</option>
                  <option value="02:30">02:30 h.</option>
                  <option value="02:45">02:45 h.</option>
                  <option value="03:00">03:00 h.</option>
                  <option value="03:15">03:15 h.</option>
                  <option value="03:30">03:30 h.</option>
                  <option value="03:45">03:45 h.</option>
                  <option value="04:00">04:00 h.</option>
                  <option value="04:15">04:15 h.</option>
                  <option value="04:30">04:30 h.</option>
                  <option value="04:45">04:45 h.</option>
                  <option value="05:00">05:00 h.</option>
                  <option value="05:15">05:15 h.</option>
                  <option value="05:30">05:30 h.</option>
                  <option value="05:45">05:45 h.</option>
                  <option value="06:00">06:00 h.</option>
                  <option value="06:15">06:15 h.</option>
                  <option value="06:30">06:30 h.</option>
                  <option value="06:45">06:45 h.</option>
                  <option value="07:00">07:00 h.</option>
                  <option value="07:15">07:15 h.</option>
                  <option value="07:30">07:30 h.</option>
                  <option value="07:45">07:45 h.</option>
                  <option value="08:00">08:00 h.</option>
                  <option value="08:15">08:15 h.</option>
                  <option value="08:30">08:30 h.</option>
                  <option value="08:45">08:45 h.</option>
                  <option value="09:00">09:00 h.</option>
                  <option value="09:15">09:15 h.</option>
                  <option value="09:30">09:30 h.</option>
                  <option value="09:45">09:45 h.</option>
                  <option value="10:00">10:00 h.</option>
                  <option value="10:15">10:15 h.</option>
                  <option value="10:30">10:30 h.</option>
                  <option value="10:45">10:45 h.</option>
                  <option value="11:00">11:00 h.</option>
                  <option value="11:15">11:15 h.</option>
                  <option value="11:30">11:30 h.</option>
                  <option value="11:45">11:45 h.</option>
                  <option value="12:00">12:00 h.</option>
                  <option value="12:15">12:15 h.</option>
                  <option value="12:30">12:30 h.</option>
                  <option value="12:45">12:45 h.</option>
                  <option value="13:00">13:00 h.</option>
                  <option value="13:15">13:15 h.</option>
                  <option value="13:30">13:30 h.</option>
                  <option value="13:45">13:45 h.</option>
                  <option value="14:00">14:00 h.</option>
                  <option value="14:15">14:15 h.</option>
                  <option value="14:30">14:30 h.</option>
                  <option value="14:45">14:45 h.</option>
                  <option value="15:00">15:00 h.</option>
                  <option value="15:15">15:15 h.</option>
                  <option value="15:30">15:30 h.</option>
                  <option value="15:45">15:45 h.</option>
                  <option value="16:00">16:00 h.</option>
                  <option value="16:15">16:15 h.</option>
                  <option value="16:30">16:30 h.</option>
                  <option value="16:45">16:45 h.</option>
                  <option value="17:00">17:00 h.</option>
                  <option value="17:15">17:15 h.</option>
                  <option value="17:30">17:30 h.</option>
                  <option value="17:45">17:45 h.</option>
                  <option value="18:00">18:00 h.</option>
                  <option value="18:15">18:15 h.</option>
                  <option value="18:30">18:30 h.</option>
                  <option value="18:45">18:45 h.</option>
                  <option value="19:00">19:00 h.</option>
                  <option value="19:15">19:15 h.</option>
                  <option value="19:30">19:30 h.</option>
                  <option value="19:45">19:45 h.</option>
                  <option value="20:00">20:00 h.</option>
                  <option value="20:15">20:15 h.</option>
                  <option value="20:30">20:30 h.</option>
                  <option value="20:45">20:45 h.</option>
                  <option value="21:00">21:00 h.</option>
                  <option value="21:15">21:15 h.</option>
                  <option value="21:30">21:30 h.</option>
                  <option value="21:45">21:45 h.</option>
                  <option value="22:00">22:00 h.</option>
                  <option value="22:15">22:15 h.</option>
                  <option value="22:30">22:30 h.</option>
                  <option value="22:45">22:45 h.</option>
                  <option value="23:00">23:00 h.</option>
                  <option value="23:15">23:15 h.</option>
                  <option value="23:30">23:30 h.</option>
                  <option value="23:45">23:45 h.</option>
                </select>
              </label>

            </div>
          </div>

          <div className="btns">
            <button onClick={darDeBaja}>DAR DE BAJA</button>
            <button onClick={darDeAlta}>DAR DE ALTA</button>
          </div>
        </article>
         )}

        </section>

      </div>
      <footer>
        <p>Todos los derechos reservados</p>
      </footer>
    </div>

  );
}

export default App;
