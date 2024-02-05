import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF} from '@react-three/drei';

function Model() {
  return (
    <Scene />
  );
}

function Sneaker(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF("./Assets/Sneaker/scene.glb");

  
  
  useFrame((state,delta) => {
    const timer = state.clock.getElapsedTime()

    ref.current.rotation.set(1.8+ Math.cos(timer / 1) / 4, 1 + Math.cos(timer / 1.8) /2,  0.3)
    ref.current.position.x += delta * 1.20
    ref.current.position.y = Math.cos(timer / 1) / 15
   
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <group scale={0.001} >
        <group rotation={[0, 0, 0]} >
          <group rotation={[Math.PI, 0, 0]} scale={65} >
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

export default Model