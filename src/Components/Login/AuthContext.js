import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [UserEmail, setUserEmail] = useState();
  const [UserDisplayName, setUserDisplayName] = useState();
  const [UserEmailVerified, setUserEmailVerified] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

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

  // const providerGoogle = new GoogleAuthProvider()

  const auth = getAuth(FireBaseApp)


  //get user data
  const handleGetUserData = () => { 
    const currentUser = auth.currentUser

    console.log(currentUser.displayName)
    console.log(currentUser.email)
    console.log(currentUser.emailVerified)
  }


  //check when user logs in/out
useEffect(() => {
  
  const unsubscribe = auth.onAuthStateChanged(user => {
    if(user){
      setUserEmail(user.email)
      setUserDisplayName(user.displayName)
      setUserEmailVerified(user.emailVerified)
      
      setIsLoggedIn(true)
    } else{
      setIsLoggedIn(false)
    }
  })

  return unsubscribe
}, []);

  //sign out
  const handleSignOut = (e) => {
      signOut(auth);
    console.log('User Signed Out - Button')
   }

  return (
    <AuthContext.Provider value={{handleSignOut, handleGetUserData, UserEmail, UserDisplayName, UserEmailVerified, IsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
