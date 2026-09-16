"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const WIDTH = 2.8;
const HEIGHT = WIDTH * (616 / 937);

export function LogoCard3D() {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture("/paraiba-logo-full.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[WIDTH, HEIGHT]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.1}
        side={THREE.DoubleSide}
        metalness={0.2}
        roughness={0.4}
      />
    </mesh>
  );
}
