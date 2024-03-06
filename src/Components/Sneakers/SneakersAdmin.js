import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SneakersAdmin.css'
import { useCart } from '../Cart/CartContext';
import { createRipples } from 'react-ripples';

function SneakersAdmin() {
  const [SneakersAdmin, setSneakersAdmin] = useState([]);

  const { handleAddCartNumberStorage,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveQuantity,
    cartList,
  } = useCart();

  const MyRipples = createRipples({
    color: 'rgba(255, 255, 255, 0.336)',
    during: 800,
  });

  //API

  useEffect(() => {
    axios.get(`http://localhost:1989/sneakers`).then((res) => {
      setSneakersAdmin(res.data);
    });

  }, []);

  //RENDER

  return (
    <>
      <div id='adminProductContainer' className='adminProductContainer'>
        {SneakersAdmin.length > 0 ? (
          SneakersAdmin.map((sneaker) => (

            <div key={sneaker.id} className='adminProduct'>

              <img className='adminProductImage' src={sneaker.image} alt='Sneaker' />

              <div className='adminProductInformation'>

                {/* Basic Info */}
                <div className='adminInfoBlock' style={{marginLeft:'24px'}}>
                  <p>
                    <span>Name:</span> {sneaker.name}&nbsp; <br /><br />
                    <span>Type:</span> {sneaker.type}&nbsp; <br /><br />
                    <span>Release Year:</span> {sneaker.release_year}&nbsp; <br /><br />
                    <span>Price:</span> {sneaker.price}
                  </p>
                </div>

                {/* Images */}
                <div className='adminInfoBlock'>
                  <p>
                    <span>Image Source:</span> {sneaker.image}&nbsp; <br /><br />
                    <span>ImageNoBG Source:</span> {sneaker.image_noBG}
                  </p>
                </div>

                {/* Buttons */}
                <div className='adminButtonContainer'>
                <MyRipples>
                  <button style={{marginBottom:'24%'}}>Update</button>
                </MyRipples>

                <MyRipples>
                  <button>Delete</button>
                  </MyRipples>
                </div>

              </div>
            </div>
          ))

        ) : SneakersAdmin.length === 0 ? (
          <p>No Results Found</p>
        ) : (
          <p id='loading'>Loading...</p>
        )}
      </div>
    </>
  );
}

export default SneakersAdmin