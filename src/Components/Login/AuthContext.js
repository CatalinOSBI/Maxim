import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore,  doc, getDoc} from 'firebase/firestore'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [UserRole, setUserRole] = useState();
  const [UserEmail, setUserEmail] = useState();
  const [UserDisplayName, setUserDisplayName] = useState();
  const [UserEmailVerified, setUserEmailVerified] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()

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


  //check when user logs in/out
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email)
        setUserDisplayName(user.displayName)
        setUserEmailVerified(user.emailVerified)

        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })

    return unsubscribe
  }, []);

  //sign out
  const handleSignOut = (e) => {
    signOut(auth);
    console.log('User Signed Out - Button')
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
        handleCloseModal()
        handleCheckUserRole()
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
      passwordRef
    }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
