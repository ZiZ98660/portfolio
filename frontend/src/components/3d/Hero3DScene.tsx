'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Preload the model
useGLTF.preload('/image/Confidence_Moment_1122095035_generate.glb');

function RotatingModel() {
  const { scene } = useGLTF('/image/Confidence_Moment_1122095035_generate.glb');
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={2} 
      position={[0, 0, 0]}
    />
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9945FF" wireframe />
    </mesh>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
          
          {/* 3D Model */}
          <RotatingModel />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            autoRotate={false}
          />
          
          {/* Environment removed to avoid HDR loading issues - using manual lighting instead */}
        </Suspense>
      </Canvas>
    </div>
  );
}

