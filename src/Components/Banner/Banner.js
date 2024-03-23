import React, { useRef, useEffect, useState } from 'react'
import ContentBanner from './ContentBanner.png';
import SecondBanner from './SecondBanner';
import './Banner.css'

function Banner() {
  const containerRef = useRef();
  const [containerHeight] = useState(0);


  useEffect(() => {
    const handleCheckResize = () => {

      // get the users width
      const clientWidth = containerRef.current.clientWidth;
      // calculate height based on the users width ex: ( if client width = 1920, height = (1920/16) * 9 wich equals 1080 ) - 1920 x 1080 (16/9 ratio)
      const containerHeight = (clientWidth / 16) * 1.5;

      // add height to container
      containerRef.current.style.height = `${containerHeight}px`;
    };

    handleCheckResize();
    // event listener
    window.addEventListener('resize', handleCheckResize);

    return () => {
      window.removeEventListener('resize', handleCheckResize);
    };
  }, []);

const goToPreview = () => { 
  window.location.href = "/Preview"
 }


  return (
    <>
      <div className='bannerContainer'  >
        <img className='bannerImage' src={ContentBanner} alt='Banner' />
      </div>

      <div onClick={goToPreview} className='banner3DContainer' style={{ height: containerHeight, position: 'relative' }} ref={containerRef}>
        <SecondBanner />
      </div>
    </>
  )
}

export default Banner