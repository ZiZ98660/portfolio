'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Fallback avatar component if no 3D model is available
// To use a custom 3D model, uncomment the useGLTF import above
// and replace this component with: const { scene } = useGLTF('/models/avatar.glb');
function FallbackAvatar() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Head */}
      <mesh ref={meshRef} position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.25, -0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.25, -0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

export default function Avatar3D() {
  // You can load a 3D model here using useGLTF
  // Example: const { scene } = useGLTF('/models/avatar.glb');
  // return <primitive object={scene} scale={1} position={[0, 0, 0]} />
  
  // For now, using fallback avatar
  return <FallbackAvatar />;
}

