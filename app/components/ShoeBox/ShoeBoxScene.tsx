"use client";

import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import type { Group } from "three";

type ShoeBoxSceneProps = {
  opened: boolean;
};

function ShoeBoxMesh({ opened }: ShoeBoxSceneProps) {
  const boxRef = useRef<Group>(null);
  const lidRef = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (boxRef.current) {
      boxRef.current.rotation.y = Math.sin(time * 0.35) * 0.16;
      boxRef.current.rotation.x = Math.sin(time * 0.25) * 0.05;
    }

    if (lidRef.current) {
      const target = opened ? -0.9 : -0.05;
      lidRef.current.rotation.x += (target - lidRef.current.rotation.x) * 0.08;
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={boxRef} position={[0, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 1.05, 1.9]} />
          <meshStandardMaterial roughness={0.26} metalness={0.42} color="#111111" />
        </mesh>

        <group ref={lidRef} position={[0, 0.56, -0.86]}>
          <mesh castShadow receiveShadow position={[0, 0.05, 0.86]}>
            <boxGeometry args={[2.86, 0.18, 1.95]} />
            <meshStandardMaterial roughness={0.18} metalness={0.5} color="#191919" />
          </mesh>
        </group>

        <mesh position={[0, 0.02, 0]}>
          <planeGeometry args={[2.3, 1.2]} />
          <meshBasicMaterial color={opened ? "#f1e6bf" : "#3f3f3f"} transparent opacity={opened ? 0.22 : 0.05} />
        </mesh>
      </group>
    </Float>
  );
}

function ShoeBoxSceneBase({ opened }: ShoeBoxSceneProps) {
  return (
    <Canvas camera={{ position: [0, 1.1, 4.4], fov: 34 }} shadows dpr={[1, 1.8]}>
      <ambientLight intensity={0.18} />
      <spotLight
        castShadow
        intensity={opened ? 2.8 : 1.6}
        position={[2.2, 4.5, 3]}
        angle={0.32}
        penumbra={0.65}
        color={opened ? "#f1e6bf" : "#ffffff"}
      />
      <pointLight intensity={0.9} position={[-2, 1, -1]} color="#0d5dff" />
      <ShoeBoxMesh opened={opened} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#090909" roughness={0.65} metalness={0.2} />
      </mesh>
      <Environment preset="city" />
    </Canvas>
  );
}

export const ShoeBoxScene = memo(ShoeBoxSceneBase);
