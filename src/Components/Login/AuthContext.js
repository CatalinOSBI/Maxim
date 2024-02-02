import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [UserRole, setUserRole] = useState();
  const [UserEmail, setUserEmail] = useState();
  const [UserDisplayName, setUserDisplayName] = useState();
  const [UserEmailVerified, setUserEmailVerified] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const emailSignRef = useRef()
  const passwordSignRef = useRef()
  const usernameSignRef = useRef()
  const emailResetPasswordRef = useRef()

  // Modal Vars
  const [OpenModal, setOpenModal] = useState(false);

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
  const FireStoreDB = getFirestore(FireBaseApp)


  //get user data
  const handleGetUserData = () => {
    const currentUser = auth.currentUser

    console.log(currentUser.displayName)
    console.log(currentUser.email)
    console.log(currentUser.emailVerified)
  }

  //reset password
  const handleResetPassword = async (e) => {
    e.preventDefault()

    const email = emailResetPasswordRef.current.value

    await sendPasswordResetEmail(auth, email)
    console.log('Email Sent (Password-Reset)')
  }

  const handleSendVerificationEmail = async() => {

    await sendEmailVerification(auth.currentUser)
    console.log('Email Sent (Verification-Email)')
  }

  //check when user logs in/out
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)

        setUserEmail(user.email)
        setUserDisplayName(user.displayName)
        setUserEmailVerified(user.emailVerified)
      } else {
        setIsLoggedIn(false)
      }
    })

    return unsubscribe
  }, []);

  //Update userDB  
  const handleUpdateUserDB = async () => {
    const currentUser = auth.currentUser

    if (currentUser) {
      const uID = currentUser.uid

      // DB Object
      const docData = {
        role: "user"
      }

      // DB Doc Path
      const docPath = doc(FireStoreDB, `users/${uID}`);
      try {
        ;
        // Check if Document exists 
        const myDocument = await getDoc(docPath)

        if (myDocument.exists()) {
          const documentData = myDocument.data()

          // Check if UserRole is defined or not/ IF document does exist
          console.log('CHECKING USER ROLE')
          if (documentData.role === '') {
            console.log('UserRole is undefined')
            console.log('Updating User DB...')
            await setDoc(docPath, docData)
          } else {
            console.log(`UserRole is already set (${documentData.role})`)
            console.log('Did not update User DB')
          }

          //if it the document does not exist create one
        } else {
          await setDoc(docPath, docData)
          console.log('Updated User DB (New User)')
        }

      } catch (error) {
        console.log(error)

      }
    }
  }

  //sign out
  const handleSignOut = (e) => {
    signOut(auth);
    console.log('User Signed Out - Button')
    window.location.reload()
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
    console.log('Updated Username')
    console.log('Signed Up')

    // Add user to DB
    await handleUpdateUserDB()
    // Send Verfication Email
    await handleSendVerificationEmail()
    window.location.reload()
  }

  //check user role
  const handleCheckUserRole = async () => {

    const uID = auth.currentUser.uid
    //doc path
    const docPath = doc(FireStoreDB, `users/${uID}`);
    //waiting to retireve document
    const myDocument = await getDoc(docPath)

    if (myDocument.exists()) {
      const docData = myDocument.data()

      console.log(docData.role)
      setUserRole(docData.role)
    }
  }

  // Google LogIn
  const handleGoogleLogIn = async (e) => {
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
        // Signed up w/ google...
        handleUpdateUserDB()
        handleCloseModal()
      }).catch(error => {
        console.log(error.message)
      });
  }

  //login
  const handleLogIn = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
    handleCloseModal()
    handleCheckUserRole()
  }

  ////////////
  //  MODAL //
  ////////////

  //Open modal
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  //Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <AuthContext.Provider value={{
      handleSignOut,
      handleGetUserData,
      UserEmail,
      UserDisplayName,
      UserEmailVerified,
      IsLoggedIn,
      UserRole,
      handleCheckUserRole,
      OpenModal,
      setOpenModal,
      handleCloseModal,
      handleOpenModal,
      handleGoogleLogIn,
      handleLogIn,
      emailRef,
      passwordRef,
      emailSignRef,
      passwordSignRef,
      usernameSignRef,
      handleSignIn,
      handleResetPassword,
      emailResetPasswordRef,
    }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
