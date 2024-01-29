import React from 'react';
import { useCart } from './CartContext';

function CartButton() {
  const { addCartNumberStorage, Reset } = useCart();
  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <>
      <p>{storedCartNumber} Number from Lcoal Storage</p>
      <button onClick={addCartNumberStorage}>Add to Cart localStorage</button>

      <p>Reset Storage Number</p>
      <button onClick={Reset}>Reset</button>
    </>
  );
}

export default CartButton;
