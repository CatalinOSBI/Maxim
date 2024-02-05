import React from 'react';
import { useCart } from './CartContext';

function CartButton() {
  const { handleAddCartNumberStorage, handleReset } = useCart();
  const storedCartNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <>
      <p>{storedCartNumber} Number from Lcoal Storage</p>
      <button onClick={handleAddCartNumberStorage}>Add to Cart localStorage</button>

      <p>Reset Storage Number</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default CartButton;
