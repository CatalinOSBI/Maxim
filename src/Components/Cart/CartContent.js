import React, { useState, useEffect } from 'react'
import { useCart } from './CartContext';
import Payment from '../Stripe/Payment';
import './Cart.css'

const CartContent = () => {

  const [displayTotal, setDisplayTotal] = useState();
  const {
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
  } = useCart();

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
      <div id='productContainer' >
        {cartList.CartList.map((sneaker) => (

          <div key={sneaker.id} className='Product'>

            <div className='tagContainer'>

              <img src={sneaker.image} alt='Sneaker' />

              <p className='productTag sName'>{sneaker.name}</p>

              <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
              <p className='productTag sPrice' style={{ marginTop: '16px', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>${sneaker.price}</p>
              <p className='productTag sYear' style={{ right: '0%', top: '0%', position: 'absolute' }}>{sneaker.release_year}</p>
              <button onClick={() => handleAddToCart(sneaker)}>Add</button>
              <button onClick={() => handleRemoveQuantity(sneaker)}>Remove 1</button>
              <button onClick={() => handleRemoveFromCart(sneaker)}>Remove All</button>

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