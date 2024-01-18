import React from 'react';
import { useCart } from './CartContext';

function CartButton() {
  const { cNumber, addNumber, addNumberStorage, Reset } = useCart();
  const storedNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <>
      <p>{cNumber} Number from CartButton File</p>
      <button onClick={addNumber}>Add to Cart</button>

      <p>{storedNumber} Number from Lcoal Storage</p>
      <button onClick={addNumberStorage}>Add to Cart localStorage</button>
      
      <p>Reset Storage Number</p>
      <button onClick={Reset}>Reset</button>
    </>
  );
}

export default CartButton;
