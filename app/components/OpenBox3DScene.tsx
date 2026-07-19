"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type OpenBox3DSceneProps = {
  boxColor: string;
  shoeImage?: string;
  reduceMotion: boolean;
};

type SceneRigProps = {
  boxColor: string;
  shoeImage?: string;
  progress: number;
};

function ShoeBillboardWithTexture({ shoeImage, progress }: { shoeImage: string; progress: number }) {
  const texture = useLoader(THREE.TextureLoader, shoeImage);

  const reveal = Math.max(0, (progress - 0.32) / 0.68);
  const y = -0.62 + reveal * 0.92;
  const z = -0.05 + reveal * 0.18;
  const scale = 0.92 + reveal * 0.2;

  return (
    <group position={[0, y, z]} rotation={[0.16, -0.18, 0]} scale={scale}>
      <mesh castShadow>
        <planeGeometry args={[1.95, 1.2]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.08}
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, -0.08]}>
        <planeGeometry args={[1.22, 0.54]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.16 * reveal} />
      </mesh>
    </group>
  );
}

function SceneRig({ boxColor, shoeImage, progress }: SceneRigProps) {
  const lidRef = useRef<THREE.Group | null>(null);
  const shoeRootRef = useRef<THREE.Group | null>(null);

  const lidOpen = Math.max(0, Math.min(1, progress / 0.32));
  const lidX = -Math.PI * (0.06 + lidOpen * 0.62);

  useFrame((_, delta) => {
    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.damp(lidRef.current.rotation.x, lidX, 10, delta);
    }

    if (shoeRootRef.current) {
      const targetY = Math.max(0, (progress - 0.32) / 0.68) * 0.04;
      shoeRootRef.current.position.y = THREE.MathUtils.damp(shoeRootRef.current.position.y, targetY, 7, delta);
    }
  });

  return (
    <group position={[0, -0.45, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
        <planeGeometry args={[4.5, 3.1]} />
        <shadowMaterial transparent opacity={0.24} />
      </mesh>

      <group>
        <RoundedBox args={[2.6, 0.86, 1.92]} radius={0.06} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color={boxColor} roughness={0.72} metalness={0.02} />
        </RoundedBox>

        <mesh position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.26, 1.54]} />
          <meshStandardMaterial color="#1d1610" roughness={0.94} metalness={0} transparent opacity={0.24} />
        </mesh>
      </group>

      <group ref={lidRef} position={[0, 0.44, -0.96]}>
        <group position={[0, 0, 0.96]}>
          <RoundedBox args={[2.64, 0.16, 1.94]} radius={0.05} smoothness={4} castShadow>
            <meshStandardMaterial color={boxColor} roughness={0.66} metalness={0.02} />
          </RoundedBox>

          <mesh position={[0, -0.11, 0.58]}>
            <planeGeometry args={[2.3, 1.08]} />
            <meshStandardMaterial color="#2a2119" roughness={0.9} metalness={0} transparent opacity={0.2} />
          </mesh>
        </group>
      </group>

      <group ref={shoeRootRef}>
        {shoeImage ? <ShoeBillboardWithTexture shoeImage={shoeImage} progress={progress} /> : null}
      </group>
    </group>
  );
}

export function OpenBox3DScene({ boxColor, shoeImage, reduceMotion }: OpenBox3DSceneProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(eased);

      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const renderProgress = reduceMotion ? 1 : progress;

  return (
    <div className="h-full w-full rounded-[0.3rem] border border-black/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),rgba(0,0,0,0.02)_55%)]">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 1.05, 3.75], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#f7f4ee"]} />
        <ambientLight intensity={0.72} />
        <directionalLight
          position={[3.5, 4.6, 2.8]}
          intensity={1.15}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-3, 4, 2]} intensity={0.45} angle={0.45} penumbra={0.35} />

        <SceneRig boxColor={boxColor} shoeImage={shoeImage} progress={renderProgress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
