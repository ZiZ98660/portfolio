'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

interface GLBModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
  autoRotate?: boolean;
}

export default function GLBModel({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0],
  rotationSpeed = 0.01,
  autoRotate = true
}: GLBModelProps) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={scale} 
      position={position}
    />
  );
}

