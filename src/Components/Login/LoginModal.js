import React, { useState, useEffect, useRef } from 'react'
import './Modal.css'
import { useAuth } from './AuthContext';
import Ripple from '../Ripple Button/Ripple';
import './Google.css'

function LoginModal() {

  const modalOverlayRef = useRef()

  const { handleCloseModal,
    OpenModal,
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
  } = useAuth()

  const [modalA, setmodalA] = useState(false);
  const [modalB, setmodalB] = useState(false);
  const [modalC, setmodalC] = useState(false);

  useEffect(() => {

    setmodalA(true)
    setmodalB(false)
    setmodalC(false)
    handleHideErrors()

  }, [OpenModal]);

  const handleShowModalA = () => {
    setmodalB(false)
    setmodalC(false)
    setmodalA(true)
    handleHideErrors()
  }

  const handleShowModalB = () => {
    setmodalA(false)
    setmodalC(false)
    setmodalB(true)
    handleHideErrors()
  }

  const handleShowModalC = () => {
    setmodalA(false)
    setmodalC(true)
    setmodalB(false)
    handleHideErrors()
  }

  //google button
  const gButton =
    <button className="gsi-material-button" onClick={handleGoogleLogIn}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="gsi-material-button-contents">Continue with Google</span>
        <span style={{ display: 'none' }}>Continue with Google</span>
      </div>
    </button>

  //remove overflow when modal is open
  if (OpenModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  //event listener for esc.
  const handleEscapeKeyPress = (e) => {
    if (modalOverlayRef.current) {
      if (e.key === "Escape") {
        handleCloseModal()
      }
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {

      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

  return (
    <>
      {OpenModal &&
        <div className='modalOverlay' ref={modalOverlayRef} style={{ opacity: dynamicOpacity }}>
          <div className='modalContainer' style={{ opacity: dynamicOpacity }}>
            <button className='closeButton' onClick={handleCloseModal}>X</button>

            {/* login */}
            {modalA &&
              <>
                <div className='modal A' >
                  <h2 style={{ marginBottom: '20px', fontFamily: 'Zabal', fontSize: '3rem' }}>Log In</h2>

                  <form name='formA'>
                    <div className='formContainer' style={{ position: 'relative' }}>

                      <label>
                        Email:
                        <input name='email' type="text" autoComplete='email' ref={emailRef} />
                      </label>

                      <label>
                        Password:
                        <input name='password' type="password" autoComplete='off' ref={passwordRef} />
                      </label>

                      {/* Error Messages */}
                      {ErrorA1 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[01] Both fields must be filled.</p>
                      }

                      {ErrorA2 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[02] Invalid Email or password.</p>
                      }

                      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <button onClick={handleLogIn} className='addToCartButton'>
                          Log In
                          <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                        </button>

                        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <h3 >
                            <span style={{ fontFamily: 'Helvetica Now Text Medium' }}>Or</span>
                          </h3>

                          {gButton}


                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div className='modalInfo' style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '0' }}>
                    <p>Don't have an account?
                      <span onClick={handleShowModalB} style={{ cursor: 'pointer' }}> Sign Up</span>
                    </p>

                    <p>
                      <span onClick={handleShowModalC} style={{ cursor: 'pointer' }}>Forgot your password?</span>
                    </p>
                  </div>
                </div>

                {/* demo accounts */}
                <div className="demoModal">
                  
                <p>User Account:</p>
                <p>email: MaxiM@gmail.com</p>  
                <p>password: MaxiMUser</p>
                <br></br>
                <p>Admin Account:</p>
                <p>email: MaxiMAdmin@gmail.com</p>  
                <p>password: MaxiMAdmin</p>
                  
                </div>
              </>
            }

            {/* create account /signup */}
            {modalB &&
              <>
                <div className='modal B'>
                  <h2 style={{ marginBottom: '20px', fontFamily: 'Zabal', fontSize: '3rem' }}>Sign Up</h2>
                  <form name='formB' >
                    <div className='formContainer'>

                      <label>
                        Username:
                        <input type="text" autoComplete="new-username" ref={usernameSignRef} />
                      </label>

                      <label>
                        Email:
                        <input name='email' type="email" autoComplete="email" ref={emailSignRef} />
                      </label>

                      <label>
                        Password:
                        <input type="password" name='new-password' autoComplete="new-password" ref={passwordSignRef} />
                      </label>

                      <label>
                        Confirm-Password:
                        <input type="password" name='new-password' autoComplete="new-password" ref={conPasswordSignRef} />
                      </label>

                      {/* Error Messages */}
                      {ErrorB1 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[03] All fields must be filled.</p>
                      }

                      {ErrorB2 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[04] Invalid Email.</p>
                      }

                      {ErrorB3 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[05] Password should be at least 6 characters.</p>
                      }

                      {ErrorB4 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[06] Passwords must match.</p>
                      }

                      {ErrorB5 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[07] Email already in use</p>
                      }

                      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <button onClick={handleSignIn} className='addToCartButton'>
                          Sign Up
                        </button>
                      </div>

                    </div>
                  </form>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div className='modalInfo' style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '0' }}>
                    <p>Already have an account?
                      <span onClick={handleShowModalA} style={{ cursor: 'pointer' }}> Log In</span>
                    </p>

                    <p>
                      <span onClick={handleShowModalC} style={{ cursor: 'pointer' }}>Forgot your password?</span>
                    </p>
                  </div>
                </div>
              </>
            }

            {/* forgot password */}
            {modalC &&
              <>
                <div className='modal C'>
                  <h2 style={{ marginBottom: '20px', fontFamily: 'Zabal', fontSize: '3rem' }}>Password-Reset</h2>
                  <form name='formC' >
                    <div className='formContainer'>

                      <label >
                        Email:
                        <input name='email' type="email" autoComplete="email" ref={emailResetPasswordRef} />
                      </label>

                      {/* Error Messages */}
                      {ErrorC1 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[03] All fields must be filled.</p>
                      }

                      {ErrorB2 &&
                        <p style={{ fontFamily: 'Helvetica Now Text Medium', color: '#e60000', marginBottom: '1vh' }}>[04] Invalid Email.</p>
                      }

                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button onClick={handleResetPassword} className='addToCartButton'>
                          Reset Password
                        </button>

                      </div>
                    </div>
                  </form>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div className='modalInfo' style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '0' }}>
                    <p>Don't have an account?
                      <span onClick={handleShowModalB} style={{ cursor: 'pointer' }}> Sign Up</span>
                    </p>

                    <p>Already have an account?
                      <span onClick={handleShowModalA} style={{ cursor: 'pointer' }}> Log In</span>
                    </p>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      }
    </>
  )
}

export default LoginModal
