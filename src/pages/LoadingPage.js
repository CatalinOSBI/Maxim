import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function LoadingPage() {
  return (
    <SimpleScene />
  );
}

function Sneaker(props) {
const Sneaker = useGLTF('./sneaker.glb')

useFrame((state) => {
    const t = state.clock.getElapsedTime()
    console.log()
  })
  return (
    <>
      <primitive object={Sneaker.scene}/>
    </>
  );
}

function SimpleScene() {

  const clock = new THREE.Clock()
  clock.start()

  
  const changeCubeColor = () => {
    const t = clock.getElapsedTime()
    console.log(t)
  };



  return (
    <>
    <div>
      <button onClick={changeCubeColor}>Change Color to Blue</button>
      <Canvas 
        style={{ position: 'relative', height: '50vh', width: '50vw', border: 'solid red'}}
        camera={{ fov: 75, position: [0, 0, 2] }}>
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <OrbitControls enablePan={true} />
      <Sneaker/>
      </Canvas>
    </div>
    <button onClick={changeCubeColor}>asd</button>
    </>
    
  );
}

export default LoadingPage;
