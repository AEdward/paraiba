"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { CrystalMark3D } from "./CrystalMark3D";

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 6.2], fov: 42 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#f5faff" />
        <directionalLight position={[-2, -2, 3]} intensity={0.4} color="#f5faff" />
        <pointLight position={[-3, -1.5, 2.5]} intensity={12} color="#16CFC0" />
        <pointLight position={[3, 2.5, -1.5]} intensity={10} color="#08DCE8" />
        <CrystalMark3D />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.4}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Suspense>
    </Canvas>
  );
}
