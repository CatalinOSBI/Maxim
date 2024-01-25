import React from 'react';
import { useCart } from '../Cart/CartContext';
import { useAuth } from '../Login/AuthContext';
import './Header.css'

function Header() {
  const { cNumber } = useCart();
  const { UserEmail, IsLoggedIn, UserDisplayName, handleSignOut } = useAuth()

  const storedNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <header>
      <div className='headerContainer'>
        <div className='cartCircle'>
          <p className='cartNumber'>{cNumber}</p>
        </div>

        <div className='cartCircle'>
          <p className='cartNumber'>{storedNumber}</p>
        </div>

    <button onClick={() => {console.log(IsLoggedIn)} }>{UserEmail}</button>
    <button onClick={handleSignOut}>{UserDisplayName}</button>

      </div>
    </header>
  );
}

export default Header;