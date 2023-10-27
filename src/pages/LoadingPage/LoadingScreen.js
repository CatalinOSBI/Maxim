import React, { useRef, useState } from 'react';
import Model from './Model';
import Underlay from './Underlay';

function LoadingScreen() {
  return (
    <>
    <Underlay />
    <Model />
    </>
  );
}


export default LoadingScreen;
