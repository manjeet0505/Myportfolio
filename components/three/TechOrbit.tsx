"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  SiNextdotjs, SiReact, SiFastapi, SiPostgresql,
  SiMongodb, SiOpenai, SiTypescript, SiPython,
} from "react-icons/si";

const TECH = [
  { Icon: SiNextdotjs,   color: "#ffffff", radius: 3.2, speed: 0.30, tilt: 0.4,  offset: 0 },
  { Icon: SiReact,       color: "#61dafb", radius: 3.2, speed: 0.30, tilt: 0.4,  offset: 3.1 },
  { Icon: SiTypescript,  color: "#3178c6", radius: 3.8, speed: -0.22, tilt: 1.0, offset: 1 },
  { Icon: SiPython,      color: "#ffd43b", radius: 3.8, speed: -0.22, tilt: 1.0, offset: 4.2 },
  { Icon: SiFastapi,     color: "#05998b", radius: 4.4, speed: 0.16, tilt: -0.7, offset: 2 },
  { Icon: SiOpenai,      color: "#10a37f", radius: 4.4, speed: 0.16, tilt: -0.7, offset: 5 },
  { Icon: SiPostgresql,  color: "#336791", radius: 3.5, speed: 0.25, tilt: 1.4,  offset: 0.5 },
  { Icon: SiMongodb,     color: "#47a248", radius: 3.5, speed: 0.25, tilt: 1.4,  offset: 3.6 },
];

function OrbitIcon({ Icon, color, radius, speed, tilt, offset }: (typeof TECH)[number]) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * Math.sin(tilt),
      Math.sin(t) * radius * Math.cos(tilt)
    );
  });

  return (
    <group ref={ref}>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          style={{
            padding: 8,
            borderRadius: 12,
            background: "rgba(15,12,30,0.7)",
            border: `1px solid ${color}55`,
            boxShadow: `0 0 16px ${color}55`,
            backdropFilter: "blur(4px)",
          }}
        >
          <Icon size={22} color={color} />
        </div>
      </Html>
    </group>
  );
}

export default function TechOrbit() {
  return (
    <>
      {TECH.map((t, i) => (
        <OrbitIcon key={i} {...t} />
      ))}
    </>
  );
}