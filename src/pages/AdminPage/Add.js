import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import './Add.css'
import Ripple from '../../Components/Ripple Button/Ripple'
import { useMediaQuery } from 'react-responsive';
import ImageLoader from '../../Components/Sneakers/ImageLoader'

const AddFunction = () => {

  const [TogglePreview, setTogglePreview] = useState(true);
  const [DynamicOpacity, setDynamicOpacity] = useState(0);
  const [Type, setType] = useState([]);
  const typeRef = useRef()
  const yearRef = useRef()
  const nameRef = useRef()
  const imageRef = useRef()
  const imageNoBGRef = useRef()
  const priceRef = useRef()

  //Api call

  useEffect(() => {
    axios.get(`https://maxim-backend-s8un.onrender.com/sneakers3/column/${'type'}`)
      .then((res) => {
        setType(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //Type Map
  const typeList = Type.map((item) =>
    <option key={item.index} value={item.type}>{item.type}</option>
  )

  const handleTogglePreview = () => {
    setTogglePreview(!TogglePreview)

  }

  const Update_MySql_DB = async () => {

    await axios.post('https://maxim-backend-s8un.onrender.com/sneakers', Info)

    console.log('MySql DB Updated2')

    setDynamicOpacity(1)

    setTimeout(() => { 
      setDynamicOpacity(0)
     }, 800)

  //Clear state
     setInfo({
        type: "",
        release_year: "",
        name: "",
        image: "",
        image_noBG: "",
        price: "",
      })

  //Clear inputs    
      typeRef.current.value=''
      yearRef.current.value=''
      nameRef.current.value=''
      imageRef.current.value=''
      imageNoBGRef.current.value=''
      priceRef.current.value=''

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

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  return (
    <>
      <div className='adminAddContainer'>

        <div className='adminInfoBlock' style={{ height:`${isPhone ? '120%' : '65%'}`, gap:'0' }}>
          <input name='name' id='name' type='text' placeholder='name' onChange={getData} ref={nameRef}/>
          {/* <select name="type" id="type" onChange={getData} ref={typeRef}>
            <option value='Choose Type'>Choose Type</option>
            {typeList}
          </select> */}
          <input name='type' id='type' type='text' placeholder='type' onChange={getData} ref={typeRef}/>
          <input name='release_year' id='release_year' type='number' placeholder='release_year' onChange={getData} ref={yearRef} />
          <input name='price' id='price' type="number" placeholder='price (ex: 29.99)' min="1" step="any" onChange={getData} ref={priceRef} />
        </div>

        <div className='adminInfoBlock' style={{ height: '65%', gap:'0' }} >
          <input name='image' id='image' type='text' placeholder='image' onChange={getData} ref={imageRef}/>
          <input name='image_noBG' id='image-noBG' type='text' placeholder='image_noBG' onChange={getData} ref={imageNoBGRef} />
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
          <h1 style={{ position: 'absolute', top:'0', right:'0', opacity: DynamicOpacity, transition: 'All 0.8s' }}>Product Added</h1>

          <div className='filterContainer'>
            <div className='addProductContainer'>
              <div className='Product'>
                <div className='tagContainer'>
                  <div className='contentWrapper'>

                    <ImageLoader imgSrc={Info.image} className='productImage'/>
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