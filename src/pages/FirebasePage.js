import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, connectAuthEmulator, updateProfile, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useRef, useEffect, useState } from 'react'


const FirebasePage = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const thingRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordSignRef = useRef()
  const emailSignRef = useRef()
  const usernameSignRef = useRef()

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

  const providerGoogle = new GoogleAuthProvider()

  const auth = getAuth(FireBaseApp)
  connectAuthEmulator(auth, 'http://localhost:9099');


  

  // Google signin
  const handleGoogleSignIn = (e) => {
    e.preventDefault()
    signInWithPopup(auth, providerGoogle)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(credential)
        console.log(token)
        console.log(user)
      }).catch(error => {
        console.log(error.message)
      });

  }

//login
  const handleLogIn = async () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
  }

//signin
  const handleSignIn = async (e) => {
    e.preventDefault()
    const email = emailSignRef.current.value
    const password = passwordSignRef.current.value
    const username = usernameSignRef.current.value

    await createUserWithEmailAndPassword(auth, email, password)

    // Signed up 
    await updateProfile(auth.currentUser, { displayName: username })
    console.log('Signed Up')
  }

//get user data
  const handleGetUserData = () => { 
    const currentUser = auth.currentUser

    console.log(currentUser.displayName)
    console.log(currentUser.email)
    console.log(currentUser.emailVerified)
  }

  //sign out
  const handleSignOut = (e) => {

      signOut(auth);
    console.log('User Signed Out - Button')
   }

  //check if user is logged in or not


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '50px' }}>

      {/* login */}

      <div style={{ padding: '20px', boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', width: '300px', textAlign: 'center', backgroundColor: '#C5CAE9' }}>
        <h2 style={{ marginBottom: '20px' }}>Log In</h2>

        <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
          Email:
          <input type="text" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={emailRef} />
        </label>

        <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
          Password:
          <input type="password" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={passwordRef} />
        </label>

        <button onClick={handleLogIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log In
        </button>
      </div>
      {/* signin */}

      <div style={{ padding: '20px', boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', width: '300px', textAlign: 'center', backgroundColor: '#C5CAE9' }}>
        <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleSignIn}>

          <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
            Username:
            <input type="text" autoComplete="new-username" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={usernameSignRef} />
          </label>

          <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
            Email:
            <input type="text" autoComplete="email" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={emailSignRef} />
          </label>

          <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
            Password:
            <input type="password" autoComplete="new-password" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={passwordSignRef} />
          </label>

          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sign Up
          </button>
          
        </form>

        <button onClick={handleGoogleSignIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Use Google
          </button>

          <button onClick={handleGetUserData} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Get user Info
          </button>

          <button onClick={handleSignOut} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sign Out
          </button>

      </div>

    </div>
  );
};


export default FirebasePage