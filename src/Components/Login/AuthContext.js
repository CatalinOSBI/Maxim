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
  const [UserAccountCreationTime, setUserAccountCreationTime] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [ErrorA1, setErrorA1] = useState(false);
  const [ErrorA2, setErrorA2] = useState(false);
  const [ErrorB1, setErrorB1] = useState(false);
  const [ErrorB2, setErrorB2] = useState(false);
  const [ErrorB3, setErrorB3] = useState(false);
  const [ErrorB4, setErrorB4] = useState(false);
  const [ErrorB5, setErrorB5] = useState(false);
  const [ErrorC1, setErrorC1] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const conPasswordSignRef = useRef()
  const emailSignRef = useRef()
  const passwordSignRef = useRef()
  const usernameSignRef = useRef()
  const emailResetPasswordRef = useRef()

  // Modal Vars
  const [OpenModal, setOpenModal] = useState(false);
  const [dynamicOpacity, setDynamicOpacity] = useState(0);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_1,
    authDomain: process.env.REACT_APP_FIREBASE_2,
    projectId: process.env.REACT_APP_FIREBASE_3,
    storageBucket: process.env.REACT_APP_FIREBASE_4,
    messagingSenderId: process.env.REACT_APP_FIREBASE_5,
    appId: process.env.REACT_APP_FIREBASE_6
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
    console.log(currentUser)
  }

  //reset password
  const handleResetPassword = async (e) => {
    e.preventDefault()

    const email = emailResetPasswordRef.current.value

    try {
      if (email === "") {
        setErrorC1(true)
        setErrorB2(false)
        return //break

      } else {
        setErrorC1(false)
        setErrorB2(false)

        await sendPasswordResetEmail(auth, email)
        console.log('Email Sent (Password-Reset)')
      }

    } catch (error) {
      setErrorB2(true)
    }

  }

  const handleSendVerificationEmail = async () => {

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
        setUserAccountCreationTime(user.metadata.creationTime.slice(5, 16))
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
            await setDoc(docPath, docData, { merge: true })
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
  const handleSignOut = (e) => {;

    signOut(auth);
    window.location.href="/Maxim/#/Home"
    window.location.reload()
    console.log('User Signed Out - Button')
  }

  //signin
  const handleSignIn = async (e) => {
    e.preventDefault()
    const email = emailSignRef.current.value
    const password = passwordSignRef.current.value
    const username = usernameSignRef.current.value
    const conpassword = conPasswordSignRef.current.value

    try {

      //MaxiM errors
      if (email === '' || password === '' || username === "" || conpassword === "") {
        setErrorB1(true) //all of this true false mumbo jumbo is to show only 1 error at a time
        setErrorB2(false)
        setErrorB3(false)
        setErrorB4(false)
        setErrorB5(false)
        return //break

      } else if (password !== conpassword) {
        setErrorB4(true)
        setErrorB1(false)
        setErrorB2(false)
        setErrorB3(false)
        setErrorB5(false)
        return //break

      } else {
        setErrorB1(false)
        setErrorB2(false)
        setErrorB3(false)
        setErrorB4(false)
        setErrorB5(false)

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

    } catch (error) { //firebase Errors
      console.log(error.message)
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        setErrorB2(true)
      } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        setErrorB3(true)
      } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        setErrorB5(true)
      }
    }

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
        handleCheckUserRole()
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

    //check if fields are filled
    if (email === '' || password === '') {
      setErrorA1(true)
      setErrorA2(false)
      return

    } else {

      setErrorA1(false)

      try {
        setErrorA2(false)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user)
        handleCloseModal()
        handleCheckUserRole()

        //firebase errors
      } catch (error) {
        console.log('error', error.message)
        setErrorA2(true)
      }
    }

  }

  /////////////
  //  ERRORS //
  /////////////

  const handleHideErrors = () => {
    setErrorA1(false)
    setErrorA2(false)
    setErrorB1(false)
    setErrorB2(false)
    setErrorB3(false)
    setErrorB3(false)
    setErrorB4(false)
    setErrorB5(false)
    setErrorC1(false)
  }

  ////////////
  //  MODAL //
  ////////////

  //Open modal
  const handleOpenModal = () => {
    setOpenModal(true)
    setTimeout(() => { setDynamicOpacity(1) }, 1)

  }
  //Close Modal
  const handleCloseModal = () => {
    setDynamicOpacity(0)
    setTimeout(() => { setOpenModal(false) }, 218)
    handleHideErrors()
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
      conPasswordSignRef,
      usernameSignRef,
      handleSignIn,
      handleResetPassword,
      emailResetPasswordRef,
      UserAccountCreationTime,
      setDynamicOpacity,
      dynamicOpacity,
      handleHideErrors,
      ErrorA1,
      ErrorA2,
      ErrorB1,
      ErrorB2,
      ErrorB3,
      ErrorB4,
      ErrorB5,
      ErrorC1,
    }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
