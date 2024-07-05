import React from 'react'
import './Ad.css'
import { useMediaQuery } from 'react-responsive';

const Ad = () => {

  const imageA = `./Assets/Images/1.jpg`
  const imageB = `./Assets/Images/2.jpg`
  const imageC = `./Assets/Images/3.jpg`
  const imageD = `./Assets/Images/4.jpg`
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '4vh' }}>

      <div className='adContainer'>

        <div className='imageWrapper' style={{ transform: `${isPhone ? 'translateX(-16%)' : ''}` }}>
          <img className='adImage' src={imageA} alt='BannerA' />
          <p className='adText'>Tailored</p>
        </div>

        <div className='imageWrapper'>
          <img className='adImage' src={imageB} style={{ transform: `${isPhone ? 'translateX(25%)' : ''}` }} alt='BannerB' />
          <p className='adText'>To</p>
        </div>

        <div className='imageWrapper'>
          <img className='adImage' src={imageC} style={{ transform: `${isPhone ? 'translateX(-25%)' : ''}` }} alt='BannerC' />
          <p className='adText'>Your</p>
        </div>

        <div className='imageWrapper'>
          <img className='adImage' src={imageD} style={{ transform: `${isPhone ? 'translate(25%)' : ''}` }} alt='BannerD' />
          <p className='adText'>Style</p>
        </div>

      </div>

    </div>
  )
}

export default Ad