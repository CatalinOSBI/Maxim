import React, {useState} from 'react'
import './Modal.css'
import { useAuth } from './AuthContext';

function LoginModal() {

const { handleCloseModal, OpenModal} = useAuth()

  return (
    <>
    {OpenModal && 
        <div className='modalOverlay'>
            <button onClick={handleCloseModal}>X</button>
        </div>
    }
    </>
  )
}

export default LoginModal