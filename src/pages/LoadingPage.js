import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function LoadingPage() {
  return (
    <SimpleScene/>
  )
}

function RotatingCube() {
  return (
    <mesh rotation={[0, 0.01, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

function SimpleScene() {
  return (
    <Canvas  style={{ position: "absolute" }} // Set Canvas to cover the whole page
    camera={{ fov: 75, position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <RotatingCube />
      <OrbitControls />
    </Canvas>
  );
}

export default LoadingPage
