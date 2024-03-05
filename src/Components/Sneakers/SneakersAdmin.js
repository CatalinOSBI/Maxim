import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sneakers.css'
import { useCart } from '../Cart/CartContext';

function SneakersAdmin() {
  const [SneakersAdmin, setSneakersAdmin] = useState([]);

  const { handleAddCartNumberStorage,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
  } = useCart();

    //API

    useEffect(() => {
      axios.get(`http://localhost:1989/sneakers`).then((res) => {
        setSneakersAdmin(res.data);
      });
  
    }, []);

  //RENDER

  return (
    <>

      <div className='filterContainer'>
        <div id='productContainer' className='productContainer'>
          {SneakersAdmin.length > 0 ? (
            SneakersAdmin.map((sneaker) => (

              <div key={sneaker.id} className='Product'>
                <div className='tagContainer'>

                  <div className='contentWrapper'>

                    <img className='productImage' src={sneaker.image} alt='Sneaker' />

                    <Link to={`/Product/${sneaker.id}/${sneaker.type}`}>
                      <img className='productImagenoBG' src={sneaker.image_noBG} alt='Sneaker No BG' />
                    </Link>

                  </div>

                  <Link to={`/Product/${sneaker.id}/${sneaker.type}`} style={{ textDecoration: 'none' }}>
                    <p className='productTag sName'>{sneaker.name}</p>
                  </Link>

                  <p className='productTag sType' style={{ fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {sneaker.type}</p>
                  <p className='productTag sPrice' style={{ marginTop: '16px', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>${sneaker.price}</p>
                  <p className='productTag sYear' style={{ right: '0%', top: '0%', position: 'absolute' }}>{sneaker.release_year}</p>

                </div>

                <button style={{ width: '60px' }} onClick={() => handleAddToCart(sneaker)}>
                  Add To C
                </button>

              </div>
            ))

          ) : SneakersAdmin.length === 0 ? (
            <p>No Results Found</p>
          ) : (
            <p id='loading'>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SneakersAdmin