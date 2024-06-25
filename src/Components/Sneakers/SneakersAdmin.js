import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SneakersAdmin.css'
import Ripple from '../Ripple Button/Ripple';

function SneakersAdmin() {
  const [SneakersAdmin, setSneakersAdmin] = useState([]);
  const [Reloader, setReloader] = useState();
  const [ActiveSneaker, setActiveSneaker] = useState();
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [Data, setData] = useState();


  useEffect(() => {
    setReloader(1)
  }, []);

  //API

  useEffect(() => {
    axios.get(`https://maxim-backend-s8un.onrender.com/sneakers`).then((res) => {
      setSneakersAdmin(res.data);
    });

  }, [Reloader]);

  //DELETE

  const handleDeleteSneaker = async (id) => {
    await axios.delete(`https://maxim-backend-s8un.onrender.com/sneakers/${id}`);
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
    setShowUpdateMenu(!showUpdateMenu)
  }

  //Api call
  useEffect(() => {

    axios.get("https://maxim-backend-s8un.onrender.com/sneakers/" + ActiveSneaker)

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

    await axios.put('https://maxim-backend-s8un.onrender.com/sneakers/' + id, Info)
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

  //RENDER
  return (
    <>
      <div id='adminProductContainer' className='adminProductContainer'>
        {SneakersAdmin.length > 0 ? (
          SneakersAdmin.map((sneaker) => (

            <div key={sneaker.id} className='adminProduct'>

              <div className='adminProductImageContainer'>
                <img className='adminProductImage' src={sneaker.image} alt='Sneaker' />

                {/* Buttons */}
                <div className='addButtonContainer' style={{ width: '100%' }}>
                  <button style={{ width: '100%' }} onClick={() => handleUpdate(sneaker.id)}>Update
                    <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                  </button>

                  <button style={{ width: '100%' }} onClick={() => handleDeleteSneaker(sneaker.id)}>Delete
                    <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                  </button>
                </div>
              </div>

              <div className='adminProductInformation'>

                {/* Show Update Menu */}
                {showUpdateMenu && ActiveSneaker == sneaker.id ?
                  <div className='updateMenu'>

                    {/* Basic Info */}
                    <div className='adminInfoBlock'>
                      <p>Name: <input onChange={handleGetData} name='name' id={sneaker.id + 'name'} type='text' placeholder='name' /></p>
                      <p>Type: <input onChange={handleGetData} name='type' id={sneaker.id + 'type'} type='text' placeholder='type' /></p>
                      <p>Release Year: <input onChange={handleGetData} name='release_year' id={sneaker.id + 'year'} type='number' placeholder='release year' /></p>
                      <p>Price: <input onChange={handleGetData} name='price' id={sneaker.id + 'price'} type="number" placeholder='price' min="1" step="any" /></p>
                    </div>

                    {/* Images */}
                    <div className='adminInfoBlock'>
                      <p>Image Source: <input onChange={handleGetData} name='image' id={sneaker.id + 'image'} type='text' placeholder='image' /></p>
                      <p>ImageNoBG Source: <input onChange={handleGetData} name='image_noBG' id={sneaker.id + 'image_noBG'} type='text' placeholder='image_noBG' /></p>
                    </div>

                    <div className='adminButtonContainer'>
                      <button onClick={() => originalData(sneaker.id)}>Get Original Data
                        <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                      </button>

                      <button onClick={() => handleUpdateSneaker(sneaker.id)}>Confirm
                        <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                      </button>

                      <button onClick={() => handleUpdate(sneaker.id)} style={{ marginRight: "2%" }}>Cancel
                        <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
                      </button>
                    </div>

                  </div>

                  : //Else
                  <>
                    {/* Show Update Menu */}
                    {/* Basic Info */}
                    <div className='adminInfoBlock'>
                      <p> Name: <span className='bold'>{sneaker.name}</span></p>
                      <p> Type: <span className='bold'>{sneaker.type}</span></p>
                      <p> Release Year: <span className='bold'>{sneaker.release_year}</span></p>
                      <p> Price: <span className='bold'> ${sneaker.price}</span></p>
                    </div>

                    {/* Images */}
                    <div className='adminInfoBlock' style={{ marginTop: '0' }}>
                      <p> Image Source: <span className='bold'>{sneaker.image}</span></p>
                      <p> ImageNoBG Source: <span className='bold'>{sneaker.image_noBG}</span></p>
                    </div>
                  </>
                }

              </div>
            </div>
          ))

        ) : (
          <p id='loading'>Loading...</p>
        )}
      </div>
    </>
  );
}

export default SneakersAdmin