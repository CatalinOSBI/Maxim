import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SneakersAdmin.css'
import { useCart } from '../Cart/CartContext';
import Ripple from '../Ripple Button/Ripple';

function SneakersAdmin() {
  const [SneakersAdmin, setSneakersAdmin] = useState([]);
  const [Reloader, setReloader] = useState();
  const [ActiveSneaker, setActiveSneaker] = useState();
  const [DynamicOpacity, setDynamicOpacity] = useState(0);
  const [DynamicOpacity2, setDynamicOpacity2] = useState(1);
  const [DynamicZ, setDynamicZ] = useState(0);

    //dynamic styling
    const dynamicStyle = (id) => ({
      zIndex:`${ActiveSneaker === id ? DynamicZ : '0'}`,
      opacity: `${ActiveSneaker === id ? DynamicOpacity : '0'}`,
  });

  const dynamicStyle2 = (id) => ({
    opacity: `${ActiveSneaker === id ? DynamicOpacity2: '1'}`,
    zIndex:'1'
});

    const handleUpdate = (id) => {
      setActiveSneaker(id)

      if (DynamicOpacity === 0) {
        setDynamicOpacity(1)
      } else {
        setDynamicOpacity(0)
      }

      if (DynamicOpacity2 === 1) {
        setDynamicOpacity2(0)
      } else {
        setDynamicOpacity2(1)
      }

      if (DynamicZ === 0) {
        setDynamicZ(44)
      } else {
        setDynamicZ(0)
      }

      }

  useEffect(() => {
    setReloader(1)
  }, []);

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

  }, [Reloader]);

  //DELETE

  const handleDeleteSneaker = (id) => {
    axios.delete(`http://localhost:1989/sneakers/${id}`);
    console.log('deleted' + ' ' + id)

    setReloader((prev) => prev + 1)

  };

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
                <div className='adminInfoBlock' style={{ ...dynamicStyle2(sneaker.id), marginLeft: '24px' }}>
                  <p>
                    <span>Name:</span> {sneaker.name}&nbsp; <br /><br />
                    <span>Type:</span> {sneaker.type}&nbsp; <br /><br />
                    <span>Release Year:</span> {sneaker.release_year}&nbsp; <br /><br />
                    <span>Price:</span> ${sneaker.price}
                  </p>
                </div>

                {/* Images */}
                <div className='adminInfoBlock' style={dynamicStyle2(sneaker.id)}>
                  <p>
                    <span>Image Source:</span> {sneaker.image}&nbsp; <br /><br />
                    <span>ImageNoBG Source:</span> {sneaker.image_noBG}
                  </p>
                </div>

                {/* Show Update Menu */}
                <div className='updateMenu' style={dynamicStyle(sneaker.id)}>

                  {/* Basic Info */}
                  <div className='adminInfoBlock' style={{ marginLeft: '24px' }}>
                    <p>
                      <span>Name: <input name='name' id='name' type='text' placeholder='name'/></span> &nbsp; <br /><br />
                      <span>Type: <input name='type' id='type' type='text' placeholder='type' /></span>&nbsp; <br /><br />
                      <span>Release Year: <input name='release_year' id='release_year' type='number' placeholder='release year'/></span>&nbsp; <br /><br />
                      <span>Price: <input name='price' id='price' type="number" placeholder='price' min="1" step="any" /></span>
                    </p>
                  </div>

                  {/* Images */}
                  <div className='adminInfoBlock'>
                    <p>
                      <span>Image Source: <input name='image' id='image' type='text' placeholder='image'/></span>&nbsp; <br /><br />
                      <span>ImageNoBG Source: <input name='image_noBG' id='image_noBG' type='text' placeholder='image_noBG'/></span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Buttons */}
              <div className='addButtonContainer'>
                <button onClick={() => handleUpdate(sneaker.id)}>Update
                  <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                </button>

                <button onClick={() => handleDeleteSneaker(sneaker.id)}>Delete
                  <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                </button>
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