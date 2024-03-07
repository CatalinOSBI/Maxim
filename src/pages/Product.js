import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import Header from '../Components/Header';
import LoginModal from '../Components/Login/LoginModal';
import './CSS pages/product.css'
import SneakersSimilar from '../Components/Sneakers/SneakerSimilar';

function Product() {

  let location = useLocation()
  let id = location.pathname.split('/')[2]
  let type = location.pathname.split('/')[3]

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

          <section className='sectionTop'>
            <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial', fontSize: '2rem' }}>{Sneakers.name} </p>
            <p style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '1.3em', color: '#383838' }}>{Sneakers.type}</p>
          </section>

          <section className='sectionTop'>
            <p style={{ marginTop: '16px', fontSize: '1.3em', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)', fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial' }}>${Sneakers.price}</p>
          </section>

          <section className='sectionTop' style={{ position: 'absolute', bottom: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button style={{ position: 'relative', bottom: '0' }} className='addToCartButton' >Add to Cart</button>
          </section>
        </div>
      </div>

      <div className='similarProductsContainer'>
        <p style={{ fontFamily: 'Helvetica Now Text Medium, Helvetica, Arial', fontSize: '1.5rem', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>Similar Products:</p>
          <SneakersSimilar Type= {type}/>
      </div>

    </>

  return (
    <>

      <Header />
      <LoginModal />
      {productContent}
    </>
  )
}



export default Product