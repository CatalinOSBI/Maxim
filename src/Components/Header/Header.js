import React from 'react';
import { useCart } from '../Cart/CartContext';
import './Header.css'

function Header() {
  const { cNumber } = useCart();

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

      </div>
    </header>
  );
}

export default Header;