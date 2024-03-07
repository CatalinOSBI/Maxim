import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './Add.css'
import Button from '../../Components/Ripple Button/Button'
import Ripple from '../../Components/Ripple Button/Ripple'

const AddFunction = () => {

  const [TogglePreview, setTogglePreview] = useState(false);

  const handleTogglePreview = () => {
    setTogglePreview(!TogglePreview)
  }

  const Update_MySql_DB = async () => {

    await axios.post('http://localhost:1989/sneakers', Info)

    console.log('MySql DB Updated2')
    console.log(Info)
  }

  const [Info, setInfo] = useState({
    type: "",
    release_year: "",
    name: "",
    image: "",
    image_noBG: "",
    price: "",
  })

  const getData = (event) => {
    const name = event.target.name
    const value = event.target.value

    setInfo((previous) => {
      return { ...previous, [name]: value }
    })

  }

  return (
    <>
      <div className='adminAddContainer'>

        <div className='adminInfoBlock' style={{ height: '65%' }}>
          <input name='name' id='name' type='text' placeholder='name' onChange={getData} />
          <input name='type' id='type' type='text' placeholder='type' onChange={getData} />
          <input name='release_year' id='release_year' type='number' placeholder='release_year' onChange={getData} />
          <input name='price' id='price' type="number" placeholder='price (ex: 29.99)' min="1" step="any" onChange={getData} />
        </div>

        <div className='adminInfoBlock' style={{ height: '65%' }} >
          <input name='image' id='image' type='text' placeholder='image' onChange={getData} />
          <input name='image_noBG' id='image-noBG' type='text' placeholder='image_noBG' onChange={getData} />
        </div>

        <div className='addButtonContainer'>
          <button onClick={Update_MySql_DB}>Add Product
            <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
          </button>

          <button onClick={handleTogglePreview}>Toggle Preview
            <Ripple color={"rgba(255, 255, 255, 0.747)"} duration={800} />
          </button>

        </div>

      </div>

      {TogglePreview &&
        <div className='adminPreview'>
          <h1 style={{ position: 'absolute' }}>Preview:</h1>

          <div className='filterContainer'>
            <div className='addProductContainer'>
              <div className='Product'>
                <div className='tagContainer'>
                  <div className='contentWrapper'>

                    <img className='productImage' src={Info.image} alt='Sneaker' />
                    <img className='productImagenoBG' src={Info.image_noBG} alt='Sneaker No BG' />

                  </div>

                  <p className='productTag sName'>{Info.name}</p>
                  <p className='productTag sType' style={{ marginTop: '0', fontFamily: 'Helvetica Now Text Regular, Helvetica, Arial', fontSize: '0.9em' }}> {Info.type}</p>
                  <p className='productTag sPrice' style={{ marginTop: '16px', textShadow: '0px 0px 25px rgba(0, 0, 0, 1)' }}>${Info.price}</p>
                  <p className='productTag sYear' style={{ marginTop: '0', right: '0%', top: '0%', position: 'absolute' }}>{Info.release_year}</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}



export default AddFunction