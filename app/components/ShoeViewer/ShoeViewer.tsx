"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type ShoeViewerProps = {
  activeChapter: number;
};

function ShoeProxyModel() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    group.current.position.y = Math.sin(t * 1.2) * 0.06;
    group.current.rotation.y += 0.0026;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.02;
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0.1, 0.12, 0]}>
        <boxGeometry args={[2.2, 0.7, 1]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.26} metalness={0.13} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.64, 0.45, 0]}>
        <boxGeometry args={[0.95, 0.35, 0.95]} />
        <meshStandardMaterial color="#151515" roughness={0.38} metalness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.75, 0.25, 0]}>
        <sphereGeometry args={[0.43, 24, 24]} />
        <meshStandardMaterial color="#ebebeb" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh receiveShadow position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 64]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.62} metalness={0.22} />
      </mesh>
    </group>
  );
}

export function ShoeViewer({ activeChapter }: ShoeViewerProps) {
  return (
    <div className="relative h-[400px] w-full rounded-3xl border border-white/10 bg-white/[0.02] sm:h-[520px]">
      <Canvas camera={{ position: [0, 1.3, 4.6], fov: 36 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 2]} intensity={2.1} castShadow color="#fff6dc" />
        <pointLight position={[-3, 2.5, -1]} intensity={1.3} color="#0d5dff" />
        <ShoeProxyModel key={activeChapter} />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={7.5} />
        <Environment preset="studio" />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}
