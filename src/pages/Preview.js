
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF} from '@react-three/drei';

function Preview() {
  return (
    <Scene/>
  )
}

function Scene() {

    return (
      <>
      <div >
        <Canvas 
          style={{ position: 'absolute', height: '100vh', width: '100vw'}}
          camera={{ fov: 75, position: [0, 0, 2] }}>
          {/* <color attach='background' args={[bgColor]}/> */}
        <ambientLight intensity={1.1} />
        <spotLight position={[1, 6, 1.5]} angle={2} penumbra={1} intensity={500} castShadow shadow-mapSize={[2048, 2048]} color='darkred' />
        <spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={150} castShadow={true} shadow-mapSize={[256, 256]} color="red" />
        <spotLight position={[-2, 4.8, 0.3]} angle={3} penumbra={1} intensity={80} castShadow={true} shadow-mapSize={[256, 256]} color="red" />
        <spotLight position={[-1.5, 13.6, -0.3]} angle={0.6} penumbra={1} intensity={1000} castShadow={true} shadow-mapSize={[256, 256]} color="red" />
        <hemisphereLight position={[0.272,10,0]} intensity={0.7}/>
        <Sneaker position={[-2.5,0,0.3]} scale={[0.7,0.7,0.7]}/>
        </Canvas>
      </div>
      </>
    
    );
  }

export default Preview