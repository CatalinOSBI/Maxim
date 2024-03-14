import React from 'react'
import './Ad.css'
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'

const Ad = () => {
  return (
    <div style={{ width:'100%', display:'flex', justifyContent:'center', marginBottom:'4%'}}>

    <div className='adContainer'>

      <div className='imageWrapper'>
        <img className='adImage' src={image1} />
        <p className='adText'>Tailored</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image2} />
        <p className='adText'>To</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image3} />
        <p className='adText'>Your</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image4} />
        <p className='adText'>Style</p>
      </div>

    </div>

    </div>
  )
}

export default Ad