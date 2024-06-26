import React from 'react';
import Model from './Model';
import Overlay from './Overlay';
import { useMediaQuery } from 'react-responsive';

function LoadingScreen() {

  const isPhone = useMediaQuery({query:'(max-width: 600px)'})

  return (
    <>
    <Model onLoad={setTimeout(() => {window.location.href="Home"; }, isPhone ? 5000 : 5100)}/>
    <Overlay />
    </>
  );
}


export default LoadingScreen;
