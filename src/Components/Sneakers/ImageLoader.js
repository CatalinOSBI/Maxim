import React, { useState } from 'react'

const ImageLoader = ({ imgSrc, className }) => {

  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  return (

    <div className='loadingImage' style={{ animation:isImageLoading ? '' :'none' }}>
      <img className={className} src={imgSrc} alt='Comic Cover' onLoad={handleImageLoad} style={{ opacity: isImageLoading ? '0' : '' }} />
    </div>

  )
}

export default ImageLoader