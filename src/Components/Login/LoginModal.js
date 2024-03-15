import React, { useState, useEffect, useRef } from 'react'
import './Modal.css'
import { useAuth } from './AuthContext';
import Ripple from '../Ripple Button/Ripple';

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
    usernameSignRef,
    handleSignIn,
    handleResetPassword,
    emailResetPasswordRef,
  } = useAuth()

  const [modalA, setmodalA] = useState(false);
  const [modalB, setmodalB] = useState(false);
  const [modalC, setmodalC] = useState(false);

  useEffect(() => {

    setmodalA(true)
    setmodalB(false)
    setmodalC(false)

  }, [OpenModal]);

  const handleShowModalA = () => {
    setmodalB(false)
    setmodalC(false)
    setmodalA(true)
  }

  const handleShowModalB = () => {
    setmodalA(false)
    setmodalC(false)
    setmodalB(true)
  }

  const handleShowModalC = () => {
    setmodalA(false)
    setmodalC(true)
    setmodalB(false)
  }

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
        <div className='modalOverlay' ref={modalOverlayRef}>
          <div className='modalContainer'>
            <button className='closeButton' onClick={handleCloseModal}>X</button>

            {/* login */}
            {modalA &&
              <div className='modal A' >
                <h2 style={{ marginBottom: '20px', fontFamily:'Zabal', fontSize:'3rem' }}>Log In</h2>

                <form>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Email:
                    <input type="text" autoComplete='email' style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={emailRef} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Password:
                    <input name='password' type="password" autoComplete='off' style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} ref={passwordRef} />
                  </label>

                  <button onClick={handleLogIn} className='addToCartButton'>
                    Log In
                    <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                  </button>

                  <button onClick={handleGoogleLogIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', marginBottom: '20px' }}>
                    Use Google
                  </button>

                </form>

              </div>
            }

            {/* create account /signup */}
            {modalB &&
              <div className='modal B'>
                <h2 style={{ marginBottom: '20px', fontFamily:'Zabal', fontSize:'3rem' }}>Sign Up</h2>
                <form >

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Username:
                    <input type="text" autoComplete="new-username" ref={usernameSignRef} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Email:
                    <input name='email' type="email" autoComplete="email" ref={emailSignRef} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Password1:
                    <input type="password" name='new-password' autoComplete="new-password" ref={passwordSignRef} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Password:
                    <input type="password" name='new-password' autoComplete="new-password" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <button onClick={handleSignIn} className='addToCartButton'>
                    Sign Up
                  </button>

                </form>

              </div>
            }

            {/* forgot password */}
            {modalC &&
              <div className='modal C'>
                <h2 style={{ marginBottom: '20px', fontFamily:'Zabal', fontSize:'3rem' }}>Password-Reset</h2>
                <form >

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Email:
                    <input name='email' type="email" autoComplete="email" ref={emailResetPasswordRef} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <button onClick={handleResetPassword} className='addToCartButton'>
                    Reset Password
                  </button>

                </form>

              </div>
            }

            <button onClick={handleShowModalA}>Log In</button>
            <button onClick={handleShowModalB}>Sign Up</button>
            <button onClick={handleShowModalC}>Forgot Password</button>

          </div>
        </div>
      }

    </>
  )
}

export default LoginModal