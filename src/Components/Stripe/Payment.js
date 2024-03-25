import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutButton from './CheckoutButton';
import { useCart } from '../Cart/CartContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_1); // Replace with your actual Stripe publishable key

function PaymentPage() {
  const { cartList } = useCart();

  return (
    <div>
      {/* Stripe Interface */}

        <Elements stripe={stripePromise}>
          <CheckoutButton ShoppingCart={cartList.CartList} />
        </Elements>

    </div>
  );
}

export default PaymentPage