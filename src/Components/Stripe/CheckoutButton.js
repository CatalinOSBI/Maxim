import React from 'react'
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = (ShoppingCart) => {

  const stripe = useStripe()

  const handleCheckout = async () => { 
    try {

      const response = await axios.post('http://localhost:1989/api/create-checkout-session', ShoppingCart )

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
    <button onClick={handleCheckout}>
      Checkout (Stripe)
    </button>
  )
}

export default CheckoutButton