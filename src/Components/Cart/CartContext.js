import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [storageCartNumber, setstorageCartNumber] = useState(1)
  const [test, settest] = useState(1)


  const addCartNumberStorage = () => {
    setstorageCartNumber(prev => prev + 1)
    localStorage.setItem('cNumber Local Storage', storageCartNumber.toString())
  }

  const Reset = () => {

    localStorage.setItem('cNumber Local Storage', 0)
    setstorageCartNumber(1)
    settest(prev => prev + 1)

  }

  return (
    <CartContext.Provider value={{ addCartNumberStorage, Reset }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
