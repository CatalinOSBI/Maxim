import React from 'react';
import './Underlay.css'

function Underlay() {

  return (
    <div className='Background'>
        <div className='Slider' style={{animation: `Slide linear 3.8s`}}></div>
        <div className='Square top'></div>
        <div className='Square bottom'></div>
        <h1 className='Title'>MaxiM</h1>   
    </div>
  )
}

export default Underlay