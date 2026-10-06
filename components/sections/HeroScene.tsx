"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 110;
const LINK_DISTANCE = 1.2;

// Seeded RNG so the network looks the same on every load
function makeRng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Network() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { pointGeo, lineGeo } = useMemo(() => {
    const rand = makeRng(7);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const radius = 2.2 + rand() * 0.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }

    const pointPositions = new Float32Array(NODE_COUNT * 3);
    nodes.forEach((n, i) => n.toArray(pointPositions, i * 3));

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );

    return { pointGeo, lineGeo };
  }, []);

  useEffect(() => {
    return () => {
      pointGeo.dispose();
      lineGeo.dispose();
    };
  }, [pointGeo, lineGeo]);

  useFrame((_, delta) => {
    const ease = Math.min(1, delta * 2);
    if (tilt.current) {
      tilt.current.rotation.x += (mouse.current.y * 0.3 - tilt.current.rotation.x) * ease;
      tilt.current.rotation.y += (mouse.current.x * 0.4 - tilt.current.rotation.y) * ease;
    }
    if (spin.current) spin.current.rotation.y += delta * 0.15;
    if (core.current) {
      core.current.rotation.y -= delta * 0.3;
      core.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color="#7B2FFF" transparent opacity={0.3} />
        </lineSegments>
        <points geometry={pointGeo}>
          <pointsMaterial color="#00F5FF" size={0.07} sizeAttenuation transparent opacity={0.9} />
        </points>
      </group>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      className="!pointer-events-none"
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Network />
    </Canvas>
  );
}