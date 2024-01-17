import React from 'react';
import { useCart } from './CartContext';

function CartButton() {
  const { cNumber, addNumber } = useCart();

  return (
    <>
      <button onClick={addNumber}>Add to Cart</button>
      <p>{cNumber} Number from CartButton File</p>
    </>
  );
}

export default CartButton;
