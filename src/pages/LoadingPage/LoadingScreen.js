import React from 'react';
import Model from './Model';
import Underlay from './Underlay';

function LoadingScreen() {

  return (
    <>
    <Underlay />
    <Model onLoad={setTimeout(() => {window.location.href="Home"; }, 5500)} />
    </>
  );
}


export default LoadingScreen;
