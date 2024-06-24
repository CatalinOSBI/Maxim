import React, { useState, useEffect, useRef } from 'react'
import { useCart } from './CartContext';
import Payment from '../Stripe/Payment';
import './Cart.css'
import Ripple from '../Ripple Button/Ripple';

const CartContent = () => {

  const imageRef = useRef();
  const [ImageHeight, setImageHeight] = useState();
  const [displayTotal, setDisplayTotal] = useState();
  const {
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
    isSneakerInCart,
    setCartList,
  } = useCart();

  const trashIcon =
    <svg style={{ width: '19px', height: "19px," }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>

  useEffect(() => {

    if (imageRef.current) {

      const height = imageRef.current.clientHeight;
      setImageHeight(height + 'px');
    }

  }, []);

  // SUMMARY PRCE PER PRODUCT
  const listPrices = cartList.CartList.map((sneaker) =>
    <>
      <br />
      <p style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial' }} key={sneaker.id}>{sneaker.name}</p>

      <div className='listContainer'>

        <div className='listItem' >
          <p style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial' }} key={sneaker.id}>${sneaker.price} </p>
        </div>

        <div className='listItem' style={{ display: 'flex', justifyContent: 'end' }}>
          <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }} key={sneaker.id}>(x{sneaker.Quantity})</p>
        </div>

      </div>
    </>
  )

  // TOTAL PRICE
  useEffect(() => {
    updatePrice()
  }, [cartList.CartList]);

  //TOTAL PRICE STYLING
  const total =
    <div className='listContainer' style={{ borderBottom: 'none' }}>

      <div className='listItem'>
        <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>Total:</p>
      </div>

      <div className='listItem' style={{ display: 'flex', justifyContent: 'end' }}>
        <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>${displayTotal} </p>
      </div>

    </div>

  //Summary element
  const Summary =
    <div className='Summary'>

      <p style={{ fontFamily: "Helvetica Now Text Medium, Helvetica, Arial", fontSize: '1.4rem' }}>Summary: </p>
      {listPrices}
      <br />
      {total}
      {/* stripe button */}
      <Payment />

    </div>

  const updatePrice = () => {

    const totalPrice = cartList.CartList.reduce((total, sneaker) => {
      return total + sneaker.price * sneaker.Quantity
    }, 0);
    //remember the value of 'total' is represented by that 0 at the end

    setDisplayTotal(totalPrice.toFixed(2))
    //toFixed(2) makes it so only the first 2 decimals are shown

  }

  return (
    <>
      <div className='cartPage'>
        {/* If the cart is empty show Cart is empty message */}
        {cartList.CartList.length === 0 ? <h1>Your cart is empty.</h1> :
          <div id='productContainer' className='productCartContainer' style={{ justifyContent: `${cartList.CartList.length === 1 ? '' : 'center'}` }} > {/*dynamic justify Content*/}
            {cartList.CartList.map((sneaker) => (

              <div key={sneaker.id} className='cartProduct'>

                <img className='productCartImage' ref={imageRef} src={sneaker.image} alt='Sneaker' />

                <div className='infoBlock' >

                  <div className='infoTagContainer'>
                    <p className='productTag sName'>{sneaker.name}</p>
                    <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
                    <p className='productTag sPrice' style={{ textShadow: '0px 0px 25px rgba(0, 0, 0, 1)', right: '0%', top: '0%', position: 'absolute' }}>${sneaker.price}</p>
                    <p className='productTag Year' style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>{sneaker.release_year}</p>
                  </div>

                  <div className='infoButtonContainer' >

                    <button className='qtButton' onClick={() => handleRemoveQuantity(sneaker)}><span style={{ transform: 'translateY(-5.5%)' }}>-</span>
                      <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                    </button>

                    <p className='productTag sQt ' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', width: '40px' }}>Qt. <span style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>{sneaker.Quantity}</span></p>

                    <button className='qtButton' onClick={() => handleAddToCart(sneaker)}>+
                      <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                    </button>

                    <button style={{ position: 'absolute', right: '0' }} className='qtButton' onClick={() => handleRemoveFromCart(sneaker)}>
                      <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                      {trashIcon}
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        {Summary}

      </div>
    </>
  )
}

export default CartContent