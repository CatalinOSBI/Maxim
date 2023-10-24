import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function LoadingPage() {
  return (
    <SimpleScene />
  );
}

function RotatingCube() {

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    console.log(t)
  })
  return (
    <>
    <mesh rotation={[0, 0.01, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color='red' />
    </mesh>
    </>
  );
}

function SimpleScene() {
  const [cubeColor, setCubeColor] = useState("red");
  const clock = new THREE.Clock()
  clock.start()

  
  const changeCubeColor = () => {
    setCubeColor("blue");

    const t = clock.getElapsedTime()

 
    console.log(t)
  };



  return (
    <>
    <div>
      <button onClick={changeCubeColor}>Change Color to Blue</button>
      <Canvas 
        style={{ position: 'relative', height: '40vh', width: '100%', border: 'solid red' }}
        camera={{ fov: 75, position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0} />
        <RotatingCube cubeColor={cubeColor} />
        <OrbitControls />
      </Canvas>
    </div>
    <button onClick={changeCubeColor}>asd</button>
    </>
    
  );
}

export default LoadingPage;
