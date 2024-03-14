import React from 'react'
import Header from '../Components/Header'
import LoginModal from '../Components/Login/LoginModal'
import CartContent from '../Components/Cart/CartContent'
import Footer from '../Components/Footer'

function CartPage() {
  return (
    <>
      <Header />
      <LoginModal />
      <CartContent/>
      <Footer/>
    </>
  )
}

export default CartPage