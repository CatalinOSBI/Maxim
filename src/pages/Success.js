import { Link } from 'react-router-dom'
import './CSS pages/success.css'
import React from 'react'

const Success = () => {

  const divStyle = () => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '4%'
  })

  return (
    <div style={divStyle()}>
      <p className='L' style={{ textAlign: 'center' }}>Payment Processed Successfully <span className='wiggle'>!</span></p>
      <Link to={'/home'}>
        <button className='addToCartButton'>Go Back</button>
      </Link>
    </div>
  )
}

export default Success