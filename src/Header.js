import React from 'react';
import { useCart } from './CartContext';
import './Header.css'

function Header() {
  const { cNumber } = useCart();

  return (
    <header>
      <div className='headerContainer'>
        <div className='cartCircle'>
          <p className='cartNumber'>{cNumber}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
