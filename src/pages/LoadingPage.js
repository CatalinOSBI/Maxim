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
  const ref = useRef()
  const { nodes, materials } = useGLTF("./Sneaker/scene.glb");

  useFrame(() => {
    ref.current.position.y = -0.5;
    ref.current.position.x = 0

  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <group rotation={[0, 0, 0]} scale={0.001} ref={ref}>
        <group rotation={[0, 0, 0]} ref={ref}>
          <group rotation={[Math.PI, 0, 0]} scale={65} ref={ref}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_0_bladeblinn31SG_0.geometry}
              material={materials.bladeblinn31SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_1_blinn6SG_0.geometry}
              material={materials.blinn6SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_10_blinn5SG_0.geometry}
              material={materials.blinn5SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_2_blinn7SG_0.geometry}
              material={materials.blinn7SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_3_blinn1SG001_0.geometry}
              material={materials["blinn1SG.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_4_blinn1SG002_0.geometry}
              material={materials["blinn1SG.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_5_blinn2SG_0.geometry}
              material={materials.material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_6_blinn2SG001_0.geometry}
              material={materials["blinn2SG.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_7_blinn2SG_0.geometry}
              material={materials.material_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_8_blinn3SG_0.geometry}
              material={materials.blinn3SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_9_blinn4SG_0.geometry}
              material={materials.blinn4SG}
            />
          </group>
        </group>
      </group>
    </group>
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
      <Environment preset="dawn" background blur={1} />
      <OrbitControls enablePan={false} autoRotate={false} />
      <Sneaker/>
      </Canvas>
    </div>
    <button onClick={changeCubeColor}>asd</button>
    </>
    
  );
}

export default LoadingPage;


// useFrame((state) => {
//   const t = state.clock.getElapsedTime()
//   console.log()
// })
