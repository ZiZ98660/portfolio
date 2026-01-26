'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particles3DProps {
  count?: number;
  speed?: number;
}

export default function Particles3D({ count = 1000, speed = 0.5 }: Particles3DProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.cos((i / 100) * Math.PI * 2) * factor;
      const y = Math.sin((i / 100) * Math.PI * 2) * factor;
      const z = (i / 100) * factor;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const points = useMemo(() => {
    return new Float32Array(
      particles.flatMap((p) => [p.x, p.y, p.z])
    );
  }, [particles]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
          count={particles.length}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

