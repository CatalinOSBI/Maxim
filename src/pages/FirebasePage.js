import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import React, {useRef} from 'react'

const FirebasePage = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const firebaseConfig = {
    apiKey: "AIzaSyAYmAqt2FF5wzU3JG-S0AKQOgNweObybiI",
    authDomain: "maxim-dev-d00ec.firebaseapp.com",
    projectId: "maxim-dev-d00ec",
    storageBucket: "maxim-dev-d00ec.appspot.com",
    messagingSenderId: "981508913289",
    appId: "1:981508913289:web:6adf80d3f58259b2bc6e58"
  };
  
  // Initialize Firebase
  const FireBaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(FireBaseApp);
  connectAuthEmulator(auth, 'http://localhost:3002');

  const logIn = async () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log(userCredential.user)
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ padding: '20px', boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', width: '300px', textAlign: 'center', backgroundColor: '#C5CAE9' }}>
        <h2 style={{marginBottom:'20px'}}>Login</h2>

          <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
            Email:
            <input type="text" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={emailRef}/>
          </label>
          <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
            Password:
            <input type="password" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={passwordRef}/>
          </label>
          <button onClick={logIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Log In
          </button>

      </div>
    </div>
  );
};


  export default FirebasePage