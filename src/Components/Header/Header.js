import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import { useCart } from '../Cart/CartContext';
import './Header.css'

function Header() {
  const { UserEmail, 
          IsLoggedIn, 
          UserDisplayName, 
          handleSignOut, 
          UserRole,
          handleCheckUserRole, 
          handleOpenModal, 
          } = useAuth()

  const { cNumber, reset } = useCart();

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
    <button onClick={handleOpenModal}>Sign In</button>

    <button>
      <Link to={'/AdminPage'}>Go to Admin Page</Link>
    </button>

    <p style={{marginRight:'20px', color:'white'}}>{UserDisplayName}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserEmail}</p>

    <p style={{marginRight:'20px', color:'white'}}>{UserRole}</p>

      </div>
    </header>
  );
}

export default Header;