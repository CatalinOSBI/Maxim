import React from 'react'
import ContentBanner from './ContentBanner.png';
import './Banner.css'

function Banner() {
  return (
    <div className='bannerContainer'>
      <img className='bannerImage' src={ContentBanner} alt='Banner' />
    </div>
  )
}

export default Banner