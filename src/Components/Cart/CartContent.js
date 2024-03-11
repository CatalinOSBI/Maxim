import React, { useState, useEffect, useRef } from 'react'
import { useCart } from './CartContext';
import Payment from '../Stripe/Payment';
import './Cart.css'

const CartContent = () => {

  const imageRef = useRef();
  const [ImageHeight, setImageHeight] = useState();
  const [displayTotal, setDisplayTotal] = useState();
  const {
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
  } = useCart();

  useEffect(() => {

      const height = imageRef.current.clientHeight;
      setImageHeight(height+'px');

  }, []);

  // SUMMARY PRCE PER PRODUCT
  const listPrices = cartList.CartList.map((sneaker) =>
    <>
      <br />
      <p key={sneaker.id}>{sneaker.name}</p>

      <div className='listContainer'>

        <div className='listItem' >
          <p key={sneaker.id}>${sneaker.price} </p>
        </div>

        <div className='listItem' style={{ display: 'flex', justifyContent: 'end' }}>
          <p key={sneaker.id}>(x{sneaker.Quantity})</p>
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
        <p>Total:</p>
      </div>

      <div className='listItem' style={{ display: 'flex', justifyContent: 'end' }}>
        <p>${displayTotal} </p>
      </div>

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
      <div id='productContainer' className='productCartContainer' >
        {cartList.CartList.map((sneaker) => (

          <div key={sneaker.id} className='cartProduct'>



            <img className='productCartImage' ref={imageRef} src={sneaker.image} alt='Sneaker' />

            <div className='infoBlock' >

              <div className='infoTagContainer'>
                <p className='productTag sName'>{sneaker.name}</p>
                <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
                <p className='productTag sPrice' style={{ textShadow: '0px 0px 25px rgba(0, 0, 0, 1)', right: '0%', top: '0%', position: 'absolute' }}>${sneaker.price}</p>
                <p className='productTag ' style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>{sneaker.release_year}</p>
              </div>

            <div className='infoButtonContainer' >
              <button onClick={() => handleAddToCart(sneaker)}>Add</button>
              <button onClick={() => handleRemoveQuantity(sneaker)}>Remove 1</button>
              <button onClick={() => handleRemoveFromCart(sneaker)}>Remove All</button>
            </div>

            </div>


          </div>
        ))

        }
      </div>

      <p>Summary: </p>
      {listPrices}

      <br />

      {total}

      {/* stripe button */}
      <Payment />

    </>
  )
}

export default CartContent