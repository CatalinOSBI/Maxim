import React, {useRef} from 'react'
import './Modal.css'
import { useAuth } from './AuthContext';

function LoginModal() {

const { handleCloseModal, OpenModal, handleGoogleLogIn, handleLogIn, emailRef, passwordRef} = useAuth()

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

        <button onClick={handleGoogleLogIn} style={{ width: '100%', padding: '10px', backgroundColor: '#303F9F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop:'20px', marginBottom:'20px' }}>
            Use Google
          </button>

      </div>

          </div>        
        </div>
    }
    </>
  )
}

export default LoginModal