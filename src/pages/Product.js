import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import './CSS pages/product.css'
import SneakersSimilar from '../Components/Sneakers/SneakerSimilar';
import Ripple from '../Components/Ripple Button/Ripple';
import { useCart } from '../Components/Cart/CartContext';
import Footer from '../Components/Footer';

function Product() {


  let location = useLocation()
  let id = location.pathname.split('/')[2]
  let type = location.pathname.split('/')[3]

  const CartIcon = 
  <svg style={{ width: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="black" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>

  const {
    handleAddToCart,
    setDynamicOpacity,
    dynamicOpacity
  } = useCart();

  //Post request to fill in the inputs with the current data
  const [Sneakers, setSneakers] = useState('')

  useEffect(() => {

    axios.get("http://localhost:1989/sneakers/" + id)

      .then(res => {
        setSneakers(res.data[0])

      })
    // Putting the API Response in an array      
  }, [location]);

  const productContent =
    <>
      <div className='productPageContainer'>
        <div className='giantCircle'></div>
        <img className='productPageImage' src={Sneakers.image} />
        <div className='productInformation'>

          <section>
            <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial', fontSize: '2rem' }}>{Sneakers.name} </p>
            <p style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '1.3em', color: '#383838' }}>{Sneakers.type}</p>
          </section>

          <section>
            <p style={{ marginTop: '16px', fontSize: '1.3em', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)', fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>${Sneakers.price}</p>
          </section>

          <section className='sectionBottom' style={{ position: 'absolute', bottom: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button style={{ position: 'relative', bottom: '0' }} className='addToCartButton' onClick={() => handleAddToCart(Sneakers)} >Add to Cart
              <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
            </button>
            <div className='littleCart' style={{opacity:dynamicOpacity}}>
              {CartIcon}
              <p>+1</p>
            </div>
          </section>
        </div>
      </div>

      <div className='similarProductsContainer'>
        <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial', fontSize: '1.5rem', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>Similar Products:</p>
        <SneakersSimilar Type={type} />
      </div>

    </>

  return (
    <>

      <Header />
      <LoginModal />
      {productContent}
      <Footer />
    </>
  )
}



export default Product