import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [storageCartNumber, setstorageCartNumber] = useState(0)
  const [test, settest] = useState(1)

  //Cart States(Variabless)
  const [cartList, setCartList] = useState(
    //checking for when the user first loads the page (if its the first time than load the empty Cart / load the items he already had in the cart)
    // study this later
    (() => {
       const localStorageCart = localStorage.getItem('Shopping Cart');
      return localStorageCart ? JSON.parse(localStorageCart) : { CartList: [] };
    })
  );
  
    //UseEffect for Cart(LocalStorage)
    useEffect(() => {
      
      localStorage.setItem('Shopping Cart', JSON.stringify(cartList))
      localStorage.setItem('cNumber Local Storage', cartList.CartList.length)
      setstorageCartNumber(cartList.CartList.length)
  
    }, [cartList]);
  
    //check if the product is inside the cart
    const isSneakerInCart = (sneakerToCheck) => {
      return cartList.CartList.some((product) => product.id === sneakerToCheck.id);
    };
  
  //Add Quantity  
  const handleAddQuantity = (newSneaker) => {
    const sneakerIsInCart = isSneakerInCart(newSneaker);
    const mapFunction = (product) =>
      product.id === newSneaker.id ? { ...product, Quantity: product.Quantity + 1 } : product
  
    if (sneakerIsInCart) {
      // Sneaker is already in cart
      console.log('Porduct already in cart');
  
      setCartList((prev) => ({
        CartList: prev.CartList.map( mapFunction )
      }));
  
    } else {
      // Sneaker is not in cart
      console.log('Porduct not in cart');
  
      const update = { ...newSneaker, Quantity: 1 }
  
      setCartList((prev) => ({
        CartList: [...prev.CartList, update],
      }));

    }
  };
  
  const handleTest = () => { 
    const mapFunction2 = (product) =>
      product.Quantity === 1 ? console.log('Quantity is 1, this product should be removed on the next check') : console.log('That was not the last product in the cart, did not remove the product')
  
    cartList.CartList.map(mapFunction2)
   }
  
  //remove quantity  
  const handleRemoveQuantity = (newSneaker) => {
    const sneakerIsInCart = isSneakerInCart(newSneaker);
    const mapFunction = (product) =>
      product.id === newSneaker.id ? { ...product, Quantity: product.Quantity - 1 } : product
  
    if (sneakerIsInCart) {
      // Sneaker is already in cart
      console.log('Porduct already in cart');
  
      setCartList((prev) => ({
        CartList: prev.CartList.map( mapFunction ),
      }));
      
      //if theres only 1 product left in the cart after product removal / delete that product
      const mapFunction2 = (product) =>
        product.Quantity === 1 ? handleRemoveFromCart(newSneaker) : console.log('That was not the last product in the cart, did not remove the product')
  
      cartList.CartList.map( mapFunction2 )
      
    } else {
      // Sneaker is not in cart
      console.log('Porduct not in cart');
  
      const update = { ...newSneaker, Quantity: 1 }
  
      setCartList((prev) => ({
        CartList: [...prev.CartList, update],
      }));
  
    }
  
  };
  
  // Add item to cart
    const handleAddToCart = (newSneaker) => { 
  
      handleAddQuantity(newSneaker)
  
     }
  
  // Remove item from cart   
     const handleRemoveFromCart = (removedSneaker) => { 
  
      console.log('Deleted product from cart')
  
      setCartList((prev) => ({
        CartList: prev.CartList.filter((sneaker) => sneaker.id !== removedSneaker.id),
      }));
  
      }

  const handleAddCartNumberStorage = () => {
    setstorageCartNumber(prev => prev + 1)
    localStorage.setItem('cNumber Local Storage', storageCartNumber)
  }

  const handleRemoveCartNumberStorage = () => {
    setstorageCartNumber(prev => prev - 1)
    localStorage.setItem('cNumber Local Storage', storageCartNumber)
  }

  const handleReset = () => {

    localStorage.setItem('cNumber Local Storage', 0)
    setstorageCartNumber(1)
    settest(prev => prev + 1)

  }

  return (
    <CartContext.Provider value={{ 
      handleAddCartNumberStorage,
      handleRemoveCartNumberStorage,
      handleReset,
      cartList,
      setCartList,
      handleAddQuantity,
      handleRemoveQuantity,
      handleAddToCart,
      handleRemoveFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
