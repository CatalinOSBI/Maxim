import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SneakersAdmin.css'
import { useCart } from '../Cart/CartContext';
import Ripple from '../Ripple Button/Ripple';
import { useMediaQuery } from 'react-responsive';

function SneakersAdmin() {
  const [SneakersAdmin, setSneakersAdmin] = useState([]);
  const [Reloader, setReloader] = useState();
  const [ActiveSneaker, setActiveSneaker] = useState();
  const [DynamicOpacity, setDynamicOpacity] = useState(0);
  const [DynamicOpacity2, setDynamicOpacity2] = useState(1);
  const [DynamicZ, setDynamicZ] = useState(0);
  const [Data, setData] = useState();

  //dynamic styling
  const dynamicStyle = (id) => ({
    zIndex: `${ActiveSneaker === id ? DynamicZ : '0'}`,
    opacity: `${ActiveSneaker === id ? DynamicOpacity : '0'}`,
  });

  const dynamicStyle2 = (id) => ({
    opacity: `${ActiveSneaker === id ? DynamicOpacity2 : '1'}`,
    zIndex: '1'
  });

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

  ////////////////////////////////////// UPDATE //////////////////////////////////////
  const [Info, setInfo] = useState({
    type: "",
    release_year: "",
    name: "",
    image: "",
    image_noBG: "",
    price: "",
  })

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

  //Api call
  useEffect(() => {

    axios.get("http://localhost:1989/sneakers/" + ActiveSneaker)

      .then(res => {
        setData(res.data[0])

      })

    console.log(Data)

  }, [ActiveSneaker]);

  const originalData = (id) => {
    document.getElementById(id + 'type').value = Data.type
    document.getElementById(id + 'year').value = Data.release_year
    document.getElementById(id + 'name').value = Data.name
    document.getElementById(id + 'image').value = Data.image
    document.getElementById(id + 'image_noBG').value = Data.image_noBG
    document.getElementById(id + 'price').value = Data.price

    setInfo(Data)

  }

  const handleUpdateSneaker = async (id) => {

    console.log(Info)

    await axios.put('http://localhost:1989/sneakers/' + id, Info)
      .then(res => {
        console.log('PUT Request Successful');
        console.log('Response Data:', res.data);
      })
      .catch(error => {
        console.error('Error:', error);
      },);

    setReloader((prev) => prev + 1)

    handleUpdate(id)

  }

  const handleGetData = (event) => {
    const name = event.target.name
    const value = event.target.value

    setInfo((previous) => {
      return { ...previous, [name]: value }
    })

    console.log(Info)

  }

  ////////////////////////////////////// UPDATE //////////////////////////////////////
  const isPhone = useMediaQuery({query:'(max-width: 600px)'})
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
                <div className='adminInfoBlock' style={{ ...dynamicStyle2(sneaker.id), marginLeft: `${isPhone ? '0' : '24px'}` }}>
                  <p>
                    <span>Name:</span> {sneaker.name}&nbsp; <br /><br />
                    <span>Type:</span> {sneaker.type}&nbsp; <br /><br />
                    <span>Release Year:</span> {sneaker.release_year}&nbsp; <br /><br />
                    <span>Price:</span> ${sneaker.price}
                  </p>
                </div>

                {/* Images */}
                <div className='adminInfoBlock' style={{...dynamicStyle2(sneaker.id), marginTop:'0'}}>
                  <p>
                    <span>Image Source:</span> {sneaker.image}&nbsp; <br /><br />
                    <span>ImageNoBG Source:</span> {sneaker.image_noBG}
                  </p>
                </div>

                {/* Show Update Menu */}
                <div className='updateMenu' style={dynamicStyle(sneaker.id)}>

                  {/* Basic Info */}
                  <div className='adminInfoBlock' style={{ marginLeft: `${isPhone ? '0' : '24px'}` }}>
                    <p>
                      <span>Name: <input onChange={handleGetData} name='name' id={sneaker.id + 'name'} type='text' placeholder='name' /></span> &nbsp; <br /><br />
                      <span>Type: <input onChange={handleGetData} name='type' id={sneaker.id + 'type'} type='text' placeholder='type' /></span>&nbsp; <br /><br />
                      <span>Release Year: <input onChange={handleGetData} name='release_year' id={sneaker.id + 'year'} type='number' placeholder='release year' /></span>&nbsp; <br /><br />
                      <span>Price: <input onChange={handleGetData} name='price' id={sneaker.id + 'price'} type="number" placeholder='price' min="1" step="any" /></span>
                    </p>
                  </div>

                  {/* Images */}
                  <div className='adminInfoBlock'>
                    <p>
                      <span>Image Source: <input onChange={handleGetData} name='image' id={sneaker.id + 'image'} type='text' placeholder='image' /></span>&nbsp; <br /><br />
                      <span>ImageNoBG Source: <input onChange={handleGetData} name='image_noBG' id={sneaker.id + 'image_noBG'} type='text' placeholder='image_noBG' /></span>
                    </p>

                    <div className='profileMenuContentBottom'>
                      <button style={{ width: 'fit-content' }} onClick={() => originalData(sneaker.id)}>Get Original Data
                      </button>

                      <button onClick={() => handleUpdateSneaker(sneaker.id)}>Confirm
                      </button>

                      <button onClick={() => handleUpdate(sneaker.id)} style={{ marginRight: "2%" }}>Cancel
                      </button>
                    </div>
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