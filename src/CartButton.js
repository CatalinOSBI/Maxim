import React, { useEffect } from 'react';
import { useCart } from './CartContext';

function CartButton() {
  const { cNumber, addNumber, addNumberStorage } = useCart();
  const storedNumber = localStorage.getItem('cNumber Local Storage')

  return (
    <>
      <button onClick={addNumber}>Add to Cart</button>
      <p>{cNumber} Number from CartButton File</p>

      <button onClick={addNumberStorage}>Add to Cart localStorage</button>
      <p>{storedNumber} Number from Lcoal Storage</p>
    </>
  );
}

export default CartButton;
