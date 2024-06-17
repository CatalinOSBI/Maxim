import React from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import Ripple from '../Ripple Button/Ripple';

const CheckoutButton = (ShoppingCart) => {

  const stripe = useStripe()

  const handleCheckout = async () => {
    try {

      const response = await axios.post('https://maxim-backend-s8un.onrender.com/api/create-checkout-session', ShoppingCart)

      const session = response.data

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })

      if (result.error) {
        console.error(result.error.message);
      }

    } catch (error) {

      console.log(error.message)

    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', overflow: 'hidden' }}>
      <button className='addToCartButton' onClick={handleCheckout}>Checkout
        <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
      </button>
    </div>
  )
}

export default CheckoutButton