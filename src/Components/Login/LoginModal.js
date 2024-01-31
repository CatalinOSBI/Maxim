import React, { useState, useEffect } from 'react'
import './Modal.css'
import { useAuth } from './AuthContext';

function LoginModal() {

  const { handleCloseModal, OpenModal, handleGoogleLogIn, handleLogIn, emailRef, passwordRef } = useAuth()
  const [modalA, setmodalA] = useState(false);
  const [modalB, setmodalB] = useState(false);

  useEffect(() => {

    setmodalA(true)
    setmodalB(false)

  }, [OpenModal]);

  const handleShowModalA = () => {
    setmodalB(false)
    setmodalA(true)
  }

  const handleShowModalB = () => {
    setmodalA(false)
    setmodalB(true)
  }

  //remove overflow when modal is open
  if (OpenModal) {
    document.body.classList.add('modal-active')
  } else {
    document.body.classList.remove('modal-active')
  }

  return (
    <>
      {OpenModal &&
        <div className='modalOverlay'>
          <div className='modalContainer'>
            <button onClick={handleCloseModal}>X</button>

            {modalA &&
              <div className='modal A' >
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

                <button onClick={handleGoogleLogIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', marginBottom: '20px' }}>
                  Use Google
                </button>

              </div>
            }

            {modalB &&
              <div className='modal B'>
                <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
                <form >

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Username:
                    <input type="text" autoComplete="new-username" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Email:
                    <input type="text" autoComplete="email" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <label style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}>
                    Password:
                    <input type="password" autoComplete="new-password" style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
                  </label>

                  <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sign Up
                  </button>

                </form>

                <button onClick={() => console.log('asd')} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', marginBottom: '20px' }}>
                  Use Google Sign In
                </button>

                <button onClick={() => console.log('asd')} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: `pointer`, marginBottom: '20px' }}>
                  Get user Info
                </button>

                <button onClick={() => console.log('asd')} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>
                  Sign Out
                </button>

                <button onClick={() => console.log('asd')} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>
                  Check User Role
                </button>

              </div>
            }
            <button onClick={handleShowModalB}>Sign Up</button>
            <button onClick={handleShowModalA}>Log In</button>

          </div>
        </div>
      }

    </>
  )
}

export default LoginModal