'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Points, PointsMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ExerciseDemoProps {
  exerciseType: 'pullup' | 'pushup' | 'squat' | 'handstand';
}

function ExerciseModel({ type }: { type: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const [animationState, setAnimationState] = useState('idle');

  // Simple animations for different exercises
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    switch (type) {
      case 'pullup':
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
        break;
      case 'pushup':
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        break;
      case 'squat':
        meshRef.current.rotation.x = -Math.sin(state.clock.elapsedTime * 3) * 0.4;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
        break;
      case 'handstand':
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 3) * 0.15;
        break;
    }
  });

  const getModelPath = () => {
    switch (type) {
      case 'pullup': return '/models/pullup-character.glb';
      case 'pushup': return '/models/pushup-character.glb';
      case 'squat': return '/models/squat-character.glb';
      case 'handstand': return '/models/handstand-character.glb';
      default: return '/models/generic-character.glb';
    }
  };

  try {
    const { scene } = useGLTF(getModelPath());

    return (
      <primitive
        ref={meshRef}
        object={scene}
        scale={type === 'handstand' ? 2 : 1.5}
        position={type === 'handstand' ? [0, -0.5, 0] : [0, -1, 0]}
      />
    );
  } catch (error) {
    // Fallback: Create simple geometric representation
    return (
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="#F97316" />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#64748B" />
        </mesh>
      </group>
    );
  }
}

function MuscleActivation({ type }: { type: string }) {
  const points = useRef<THREE.Points>(null);
  const [intensity, setIntensity] = useState(0.5);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime;
      const positions = points.current.geometry.attributes.position.array as Float32Array;

      // Animate muscle activation points
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Add pulsing effect based on exercise type
        const pulse = Math.sin(time * (type === 'pullup' ? 3 : type === 'pushup' ? 4 : 2)) * 0.5 + 0.5;
        positions[i] = x * (1 + pulse * intensity * 0.3);
        positions[i + 1] = y * (1 + pulse * intensity * 0.3);
        positions[i + 2] = z * (1 + pulse * intensity * 0.3);
      }

      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Generate muscle activation points based on exercise type
  const getPointsGeometry = () => {
    const pointsCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  };

  return (
    <Points ref={points} geometry={getPointsGeometry()}>
      <PointsMaterial
        size={0.05}
        color={type === 'pullup' ? '#10B981' : type === 'pushup' ? '#F97316' : type === 'squat' ? '#6366F1' : '#EC4899'}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ThreeDExerciseDemo({ exerciseType }: ExerciseDemoProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ width: '100%', height: '400px' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <ExerciseModel type={exerciseType} />
        <MuscleActivation type={exerciseType} />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />

        <gridHelper args={[20, 20]} rotation={[0, 0, 0]} position={[0, -2, 0]} />
      </Canvas>

      <div className="absolute bottom-4 left-4 bg-navy/80 backdrop-blur p-3 rounded-lg text-sm">
        <div className="font-semibold text-orange mb-1">Muscle Activation Heatmap</div>
        <div className="text-slate-300 text-xs">
          {exerciseType === 'pullup' && 'Primary: Latissimus, Biceps'}
          {exerciseType === 'pushup' && 'Primary: Pectorals, Triceps'}
          {exerciseType === 'squat' && 'Primary: Quadriceps, Glutes'}
          {exerciseType === 'handstand' && 'Primary: Shoulders, Core'}
        </div>
      </div>
    </div>
  );
}