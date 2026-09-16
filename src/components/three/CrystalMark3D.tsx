"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WAIST = 0.45;
const SHOULDER_Y = 1.15;
const SHOULDER_X = 0.42;
const TIP_Y = 2.15;
const DEPTH = 0.18;

const CYAN_A = "#16CFC0";
const CYAN_B = "#08DCE8";
const BLUE_A = "#087CFF";
const BLUE_B = "#073B8F";

function useTriangleGeometry(points: [number, number][]) {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    shape.lineTo(points[1][0], points[1][1]);
    shape.lineTo(points[2][0], points[2][1]);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 1,
    });
    geometry.translate(0, 0, -DEPTH / 2);
    return geometry;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Facet({ rotation, colorA, colorB }: { rotation: number; colorA: string; colorB: string }) {
  const inner: [number, number] = [0, WAIST];
  const left: [number, number] = [-SHOULDER_X, SHOULDER_Y];
  const right: [number, number] = [SHOULDER_X, SHOULDER_Y];
  const tip: [number, number] = [0, TIP_Y];

  const leftGeo = useTriangleGeometry([inner, left, tip]);
  const rightGeo = useTriangleGeometry([inner, tip, right]);

  const midY = (WAIST + TIP_Y) / 2;

  return (
    <group rotation={[0, 0, rotation]}>
      <mesh geometry={leftGeo}>
        <meshStandardMaterial color={colorA} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh geometry={rightGeo}>
        <meshStandardMaterial color={colorB} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, midY, -DEPTH]}>
        <boxGeometry args={[0.03, TIP_Y - WAIST, 0.03]} />
        <meshStandardMaterial color="#061426" transparent opacity={0.45} roughness={0.6} />
      </mesh>
      <mesh position={[0, TIP_Y, 0.02]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial
          color="#F5FAFF"
          emissive="#F5FAFF"
          emissiveIntensity={0.15}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export function CrystalMark3D() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.6) * 0.12;
    group.current.rotation.x = 0.15 + Math.sin(t * 0.4) * 0.03;
  });

  const facets = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const isCyan = i % 2 === 0;
        return {
          rotation: (i * Math.PI) / 3,
          colorA: isCyan ? CYAN_A : BLUE_A,
          colorB: isCyan ? CYAN_B : BLUE_B,
        };
      }),
    [],
  );

  return (
    <group ref={group}>
      {facets.map((p, i) => (
        <Facet key={i} rotation={p.rotation} colorA={p.colorA} colorB={p.colorB} />
      ))}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#061426" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.28]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#08DCE8"
          emissive="#08DCE8"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}
