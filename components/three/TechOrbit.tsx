"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { renderToStaticMarkup } from "react-dom/server";
import * as THREE from "three";
import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiFastapi, SiPostgresql,
  SiMongodb, SiOpenai, SiTypescript, SiPython,
} from "react-icons/si";

const TECH: {
  Icon: IconType; color: string; radius: number;
  speed: number; tilt: number; offset: number;
}[] = [
  { Icon: SiNextdotjs,  color: "#ffffff", radius: 3.5, speed: 0.30,  tilt: 0.4,  offset: 0 },
  { Icon: SiReact,      color: "#61dafb", radius: 3.5, speed: 0.30,  tilt: 0.4,  offset: 3.1 },
  { Icon: SiTypescript, color: "#3178c6", radius: 3.8, speed: -0.22, tilt: 1.0,  offset: 1 },
  { Icon: SiPython,     color: "#ffd43b", radius: 3.8, speed: -0.22, tilt: 1.0,  offset: 4.2 },
  { Icon: SiFastapi,    color: "#05998b", radius: 4.1, speed: 0.16,  tilt: -0.7, offset: 2 },
  { Icon: SiOpenai,     color: "#10a37f", radius: 4.1, speed: 0.16,  tilt: -0.7, offset: 5 },
  { Icon: SiPostgresql, color: "#336791", radius: 3.6, speed: 0.25,  tilt: 1.4,  offset: 0.5 },
  { Icon: SiMongodb,    color: "#47a248", radius: 3.6, speed: 0.25,  tilt: 1.4,  offset: 3.6 },
];

function makeTexture(Icon: IconType, color: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const svg = renderToStaticMarkup(<Icon size={64} />).replace(/currentColor/g, color);
    const img = new Image();
    img.onload = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "rgba(15,12,30,0.85)";
      ctx.strokeStyle = color + "99";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(6, 6, size - 12, size - 12, 28);
      ctx.fill();
      ctx.stroke();
      ctx.drawImage(img, 32, 32, 64, 64);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

function OrbitIcon({ Icon, color, radius, speed, tilt, offset }: (typeof TECH)[number]) {
  const ref = useRef<THREE.Sprite>(null);
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let alive = true;
    let created: THREE.CanvasTexture | null = null;
    makeTexture(Icon, color)
      .then((t) => {
        if (!alive) return t.dispose();
        created = t;
        setTex(t);
      })
      .catch(() => {});
    return () => {
      alive = false;
      created?.dispose();
    };
  }, [Icon, color]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * Math.sin(tilt),
      Math.sin(t) * radius * Math.cos(tilt)
    );
  });

  if (!tex) return null;

  return (
    <sprite ref={ref} scale={[0.4, 0.4, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} opacity={0.85} />
    </sprite>
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