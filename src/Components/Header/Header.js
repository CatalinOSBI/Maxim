import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthContext';
import './Header.css'

function Header() {
  const { UserEmail, IsLoggedIn, UserDisplayName, handleSignOut, UserRole,handleCheckUserRole } = useAuth()

  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <header>
      <div className='headerContainer'>

        <div className='cartCircle'>
          <p className='cartNumber'>{storedCartNumber}</p>
        </div>

    <button onClick={() => {console.log(IsLoggedIn)} }>Check if user is logged in</button>
    <button onClick={handleSignOut}>Sign Out</button>
    <button onClick={handleCheckUserRole}>Pass Role</button>

    <p style={{marginRight:'20px', color:'white'}}>{UserDisplayName}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserEmail}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserRole}</p>

      </div>
    </header>
  );
}

export default Header;