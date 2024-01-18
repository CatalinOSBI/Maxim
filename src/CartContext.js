import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cNumber, setcNumber] = useState(0);
  const [storageNumber, setstorageNumber] = useState(1)
  const [test, settest] = useState(1)

  const addNumber = () => {
    setcNumber(prevcNumber => prevcNumber + 1);
  };

  const addNumberStorage = () => {
    setstorageNumber (prev => prev + 1)
    localStorage.setItem('cNumber Local Storage', storageNumber.toString())
   }

   const Reset = () => { 

    localStorage.setItem('cNumber Local Storage', 0)
    setstorageNumber(1)
    settest(prev => prev + 1)

    }

  return (
    <CartContext.Provider value={{ cNumber, addNumber, addNumberStorage, Reset }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
