import React, {useRef, useEffect, useState} from 'react'
import ContentBanner from './ContentBanner.png';
import SecondBanner from './SecondBanner';
import './Banner.css'
import Overlay from './Overlay'

function Banner() {
const imageRef = useRef()
const divRef = useRef()
const [imageHeight, setImageHeight] = useState(0);




  return (
    <>
      <div className='bannerContainer' ref={imageRef}>
        <img className='bannerImage'  src={ContentBanner} alt='Banner' />
      </div>

    <p>{imageHeight}</p>

      <div className='banner3DContainer'>
        <div className='bannerImage' >
          <SecondBanner />
        </div>
      </div>

      <button onClick={() => {console.log(imageRef.current.offsetHeight)}}>test</button>
    </>
  )
}

export default Banner