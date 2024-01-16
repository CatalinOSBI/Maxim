import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows} from '@react-three/drei';

function Model() {
  return (
    <Scene />
  );
}

function Boot(props) {
  const modelRef = useRef()
  const { nodes, materials } = useGLTF("./Assets/Boot/Boot.glb");

  return (
    <group {...props} dispose={null} ref={modelRef} >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RealBoot_FabricForBoot001_0.geometry}
          material={materials["FabricForBoot.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RealBoot_FabricForBoot_0.geometry}
          material={materials.FabricForBoot}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RealBoot_LeatherForBoot_0.geometry}
          material={materials.LeatherForBoot}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RealBoot_RubberForBoot_0.geometry}
          material={materials.RubberForBoot}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RealBoot_RubberWithPatternForBoot_0.geometry}
          material={materials.RubberWithPatternForBoot}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle028_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.149, -0.116, 0.04]}
          rotation={[0.397, -0.833, 0.183]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle029_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.15, -0.102, 0.048]}
          rotation={[0.446, -0.98, 0.222]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle030_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.149, -0.087, 0.057]}
          rotation={[0.609, -1.224, 0.369]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle031_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.149, -0.075, 0.068]}
          rotation={[0.894, -1.365, 0.643]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle032_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.148, -0.066, 0.085]}
          rotation={[1.935, -1.447, 1.673]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle033_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.147, -0.063, 0.1]}
          rotation={[2.102, -1.443, 1.84]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle034_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.145, -0.062, 0.117]}
          rotation={[2.796, -1.358, 2.524]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle035_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.14, -0.062, 0.134]}
          rotation={[3.082, -1.197, 2.8]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle036_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.133, -0.063, 0.151]}
          rotation={[3.055, -1.224, -3.09]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle037_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.128, -0.062, 0.167]}
          rotation={[2.97, -1.285, 2.693]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle038_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.2, -0.115, 0.039]}
          rotation={[0.211, 0.631, 0.129]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle039_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.202, -0.099, 0.046]}
          rotation={[0.605, 0.751, -0.147]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle040_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.204, -0.085, 0.056]}
          rotation={[0.536, 0.757, -0.1]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle041_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.205, -0.073, 0.067]}
          rotation={[0.663, 1.026, -0.195]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle042_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.204, -0.067, 0.083]}
          rotation={[1.175, 1.21, -0.867]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle043_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.203, -0.066, 0.099]}
          rotation={[1.632, 1.48, -1.375]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle044_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.204, -0.065, 0.116]}
          rotation={[2.658, 1.362, -2.427]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle045_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.208, -0.066, 0.133]}
          rotation={[3.048, 1.241, -2.843]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle046_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.213, -0.064, 0.15]}
          rotation={[2.65, 1.135, -2.547]}
          scale={0.004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle047_MetalForBoot_0.geometry}
          material={materials.MetalForBoot}
          position={[0.22, -0.063, 0.169]}
          rotation={[2.438, 1.045, -2.514]}
          scale={0.004}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RealBootLine_FabricForBoot002_0.geometry}
        material={materials["FabricForBoot.002"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

function Scene() {

  return (
    <>
    <div >
      <Canvas 
        style={{ position: 'absolute', height: '100vh', width: '100vw'}}
        camera={{ position: [0, 10, 35] }}
        >

      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <Environment preset="warehouse" />
      <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />
      <Boot position={[-20,-3,-5]} scale={[1,1,1]} />
      <OrbitControls/>
      </Canvas>
    </div>
    </>
  
  );
}

export default Model