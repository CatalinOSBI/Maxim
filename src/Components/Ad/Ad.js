import React from 'react'
import './Ad.css'
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'
import { useMediaQuery } from 'react-responsive';

const Ad = () => {

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  return (
    <div style={{ width:'100%', display:'flex', justifyContent:'center', marginBottom:'4vh'}}>

    <div className='adContainer'>

      <div className='imageWrapper' style={{transform:`${isPhone ? 'translateX(-16%)' :''}`}}>
        <img className='adImage' src={image1} />
        <p className='adText'>Tailored</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image2} style={{transform:`${isPhone ? 'translateX(25%)' :''}`}} />
        <p className='adText'>To</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image3} style={{transform:`${isPhone ? 'translateX(-25%)' :''}`}} />
        <p className='adText'>Your</p>
      </div>

      <div className='imageWrapper'>
        <img className='adImage' src={image4} style={{transform:`${isPhone ? 'translate(25%)' :''}`}} />
        <p className='adText'>Style</p>
      </div>

    </div>

    </div>
  )
}

export default Ad