"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Download, Zap } from "lucide-react";
import { heroRoles, heroStats, personalInfo } from "@/lib/data";

// Three.js only loads in the browser, and only when the device can handle it
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = words[wIdx];
    const id = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(cur.slice(0, cIdx + 1));
          if (cIdx + 1 === cur.length) setTimeout(() => setDeleting(true), pause);
          else setCIdx((c) => c + 1);
        } else {
          setDisplay(cur.slice(0, cIdx - 1));
          if (cIdx - 1 === 0) {
            setDeleting(false);
            setWIdx((w) => (w + 1) % words.length);
            setCIdx(0);
          } else setCIdx((c) => c - 1);
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(id);
  }, [cIdx, deleting, wIdx, words, speed, pause]);

  return display;
}

// Button that leans toward the cursor
function Magnetic({
  children,
  className,
  style,
  onClick,
  href,
  download,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {href ? (
        <a href={href} download={download} className={className} style={style}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={className} style={style}>
          {children}
        </button>
      )}
    </motion.div>
  );
}

export default function Hero() {
  const typed = useTypewriter(heroRoles);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const [show3d, setShow3d] = useState(false);

  // 3D only on wider screens and when the visitor hasn't asked for reduced motion
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow3d(!calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  // Parallax: layers move at different speeds as you scroll away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
   <section
  ref={sectionRef}
  id="home"
  className="relative min-h-screen flex items-center overflow-hidden"
>
      {/* Ambient light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(123,47,255,0.25) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 85% 70%, rgba(0,245,255,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Grid (slow parallax) */}
      <motion.div
        className="absolute inset-x-0 -top-20 -bottom-20 bg-grid-pattern opacity-60"
        style={{ y: gridY }}
      />

      {/* 3D network (fast parallax) */}
      {show3d && (
        <motion.div
          className="absolute inset-y-0 right-0 w-full lg:w-[62%] pointer-events-none opacity-50 md:opacity-100"
          style={{ y: sceneY }}
        >
          <HeroScene active={inView} />
        </motion.div>
      )}

      {/* Readability fade between text and scene */}
      <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: "linear-gradient(90deg, rgba(5,5,8,0.75) 0%, rgba(5,5,8,0.45) 38%, transparent 70%)",
  }}
/>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          {/* Left: text */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full"
              style={{
                background: "rgba(123,47,255,0.15)",
                border: "1px solid rgba(123,47,255,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-xs sm:text-sm font-mono text-neon-cyan">
                Open to SDE-1 &amp; AI Engineer roles
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base font-mono mb-4 text-text-muted"
            >
              B.Tech CS · MDU · Class of 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading font-black leading-[0.92] tracking-tight mb-5"
            >
              <span className="block text-6xl sm:text-8xl lg:text-[6.5rem] text-text-primary">
                Manjeet
              </span>
              <span className="block text-5xl sm:text-7xl lg:text-[5rem] neon-text">
                Kumar Mishra
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mb-6 h-9"
            >
              <span className="w-1.5 h-6 rounded-sm bg-neon-gradient" />
              <p className="text-lg sm:text-xl font-mono text-text-primary">
                {typed}
                <span className="text-neon-cyan animate-blink">_</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl text-text-soft"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Magnetic
                onClick={() => go("projects")}
                className="relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm bg-neon-gradient shadow-neon-violet hover:brightness-110 transition"
              >
                <Zap className="w-4 h-4" /> View My Work
              </Magnetic>

              <Magnetic
                href={personalInfo.resumeUrl}
                download
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-text-primary border border-neon-violet/50 bg-neon-violet/10 hover:border-neon-cyan hover:text-neon-cyan transition"
              >
                <Download className="w-4 h-4" /> Resume
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-3"
            >
              {personalInfo.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted bg-white/5 border border-white/10 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:-translate-y-0.5 transition"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: credential card */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl animate-glow"
                style={{
                  background: "linear-gradient(135deg,#7B2FFF,#00F5FF)",
                  filter: "blur(28px)",
                  opacity: 0.25,
                }}
              />
              <div
                className="relative w-72 rounded-3xl p-6 flex flex-col items-center gap-5"
                style={{
                  background: "rgba(10,10,15,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-2xl bg-neon-gradient" />
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 -z-10 flex items-center justify-center text-2xl font-heading font-black text-white bg-neon-gradient">
                      {personalInfo.initials}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-heading font-extrabold text-text-primary">
                    {personalInfo.name}
                  </p>
                  <p className="text-xs font-mono mt-1 text-neon-violet">{personalInfo.tagline}</p>
                </div>

                <div className="w-full h-px neon-divider" />

                <div className="w-full grid grid-cols-3 gap-2 text-center">
                  {heroStats.map((s) => (
                    <div key={s.label}>
                      <p className="text-xl font-heading font-black neon-text">{s.value}</p>
                      <p className="text-[0.65rem] font-mono leading-tight mt-0.5 text-text-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <button
        type="button"
        onClick={() => go("about")}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-text-muted hover:text-neon-cyan transition"
      >
        <span className="text-[0.65rem] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-neon-violet" />
      </button>

      {/* <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }}
      /> */}
    </section>
  );
}