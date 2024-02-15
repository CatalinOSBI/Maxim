import React, {useRef, useEffect, useState} from 'react'
import ContentBanner from './ContentBanner.png';
import SecondBanner from './SecondBanner';
import './Banner.css'
import Overlay from './Overlay'

function Banner() {
  const containerRef = useRef();
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const handleCheckResize = () => {

      // get the users width
      const clientWidth = containerRef.current.clientWidth;
      // calculate height based on the users width ex: ( if client width = 1920, height = (1920/16) * 9 wich equals 1080 ) - 1920 x 1080 (16/9 ratio)
      const containerHeight = (clientWidth / 16) * 9;

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




  return (
    <>
      <div className='bannerContainer' >
      </div>
        <img className='bannerImage' src={ContentBanner} alt='Banner' />

      <div className='banner3DContainer' style={{ height: containerHeight }} ref={containerRef}>
          <SecondBanner />

      </div>

      <button >test</button>
    </>
  )
}

export default Banner