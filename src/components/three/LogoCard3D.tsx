"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const NAVY = "#061426";
const WIDTH = 2.6;
const HEIGHT = WIDTH * (616 / 937);
const DEPTH = 0.28;

export function LogoCard3D() {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture("/paraiba-logo-3d-face.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    const t = state.clock.elapsedTime;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={mesh} castShadow>
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      <meshStandardMaterial attach="material-0" color={NAVY} metalness={0.3} roughness={0.5} />
      <meshStandardMaterial attach="material-1" color={NAVY} metalness={0.3} roughness={0.5} />
      <meshStandardMaterial attach="material-2" color={NAVY} metalness={0.3} roughness={0.5} />
      <meshStandardMaterial attach="material-3" color={NAVY} metalness={0.3} roughness={0.5} />
      <meshStandardMaterial attach="material-4" map={texture} metalness={0.2} roughness={0.4} />
      <meshStandardMaterial attach="material-5" color={NAVY} metalness={0.3} roughness={0.5} />
    </mesh>
  );
}
