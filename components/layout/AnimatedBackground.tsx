"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = glow.current;
    if (!el) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#05060a",
      }}
    >
      <style>{`
        .amb-blob { position:absolute; border-radius:9999px; filter:blur(130px); opacity:.2; will-change:transform; }
.amb-1 { width:520px; height:520px; top:-10%; left:-8%; background:#0891b2; animation:amb1 22s ease-in-out infinite alternate; }
.amb-2 { width:600px; height:600px; top:35%; right:-12%; background:#5b21b6; animation:amb2 28s ease-in-out infinite alternate; }
.amb-3 { width:460px; height:460px; bottom:-12%; left:25%; background:#1e40af; animation:amb3 25s ease-in-out infinite alternate; }
        @keyframes amb1 { to { transform:translate3d(180px,140px,0) scale(1.15); } }
        @keyframes amb2 { to { transform:translate3d(-220px,-120px,0) scale(.9); } }
        @keyframes amb3 { to { transform:translate3d(160px,-160px,0) scale(1.2); } }
        .amb-grid { position:absolute; inset:0;
          background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
          background-size:56px 56px;
          -webkit-mask-image:radial-gradient(ellipse 75% 65% at 50% 40%,#000 30%,transparent 100%);
          mask-image:radial-gradient(ellipse 75% 65% at 50% 40%,#000 30%,transparent 100%); }
        .amb-cursor { position:absolute; left:0; top:0; width:600px; height:600px;
          background:radial-gradient(circle,rgba(0,245,255,.07),transparent 65%);
          transition:transform .15s ease-out; will-change:transform; }
        @media (pointer:coarse) { .amb-cursor { display:none; } }
      `}</style>
      <div className="amb-blob amb-1" />
      <div className="amb-blob amb-2" />
      <div className="amb-blob amb-3" />
      <div className="amb-grid" />
      <div ref={glow} className="amb-cursor" />
    </div>
  );
}