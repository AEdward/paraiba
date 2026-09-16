"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { LogoCard3D } from "./LogoCard3D";

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} color="#f5faff" />
        <directionalLight position={[-2, -2, 3]} intensity={0.4} color="#f5faff" />
        <pointLight position={[-3, -1.5, 2.5]} intensity={14} color="#16CFC0" />
        <pointLight position={[3, 2.5, -1.5]} intensity={12} color="#08DCE8" />
        <LogoCard3D />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          rotateSpeed={0.7}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Suspense>
    </Canvas>
  );
}
