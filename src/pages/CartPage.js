import React from 'react'
import Header from '../Components/Header'
import LoginModal from '../Components/Login/LoginModal'
import CartContent from '../Components/Cart/CartContent'

function CartPage() {
  return (
    <>
      <Header />
      <LoginModal />
      <CartContent/>
    </>
  )
}

export default CartPage