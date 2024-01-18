import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cNumber, setcNumber] = useState(0);
  const [storageNumber, setstorageNumber] = useState(0)

  const addNumber = () => {
    setcNumber(prevcNumber => prevcNumber + 1);
  };

  const addNumberStorage = () => {
    setstorageNumber (prev => prev + 1)
    localStorage.setItem('cNumber Local Storage', storageNumber.toString())
   }

  return (
    <CartContext.Provider value={{ cNumber, addNumber, addNumberStorage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
