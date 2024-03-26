import React from 'react';
import Model from './Model';
import Underlay from './Underlay';
import { useMediaQuery } from 'react-responsive';

function LoadingScreen() {

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  return (
    <>
    <Underlay />
    <Model
    //  onLoad={setTimeout(() => {window.location.href="Home"; }, isPhone ? 5000 : 5500)} 
    />
    </>
  );
}


export default LoadingScreen;
