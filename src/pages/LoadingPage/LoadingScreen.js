import React from 'react';
import './Underlay.css';
import Model from './Model';
import Underlay from './Underlay';

function LoadingScreen() {

  return (
    <>
    <Underlay />
    <Model onLoad={setTimeout(() => {window.location.href="Page2"; }, 5500)} />
    </>
  );
}


export default LoadingScreen;
