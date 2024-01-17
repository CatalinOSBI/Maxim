import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cNumber, setcNumber] = useState(0);

  const addNumber = () => {
    setcNumber(prevcNumber => prevcNumber + 1);
  };

  return (
    <CartContext.Provider value={{ cNumber, addNumber }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
