"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { ArrowDown, Download, ExternalLink, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

const ROLES = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Builder",
  "Performance Optimizer",
];

// ── Typewriter ────────────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const id = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Particles (client-only to avoid SSR mismatch) ─────────────────────────────
interface Particle { id: number; x: number; y: number; size: number; duration: number; delay: number; dx: number; cyan: boolean; }

function Particles() {
  const [list, setList] = useState<Particle[]>([]);
  useEffect(() => {
    setList(Array.from({ length: 24 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1, duration: Math.random() * 6 + 6,
      delay: Math.random() * 4, dx: Math.random() * 20 - 10, cyan: i % 3 === 0,
    })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {list.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.cyan ? "#00F5FF" : "#7B2FFF" }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -60], x: [0, p.dx] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sg" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke="#7B2FFF" strokeWidth="0.7" />
          </pattern>
          <pattern id="lg" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M300 0L0 0 0 300" fill="none" stroke="#00F5FF" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sg)" />
        <rect width="100%" height="100%" fill="url(#lg)" />
      </svg>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #0a0a0f 78%)" }} />
    </div>
  );
}

// ── Orbs (fixed coords, no random) ───────────────────────────────────────────
function Orbs() {
  const orbs = [
    { l: "8%",  t: "14%", s: 420, c: "#7B2FFF", d: 8,  dl: 0 },
    { l: "68%", t: "7%",  s: 320, c: "#00F5FF", d: 10, dl: 2 },
    { l: "76%", t: "56%", s: 360, c: "#7B2FFF", d: 9,  dl: 1 },
    { l: "3%",  t: "66%", s: 260, c: "#00F5FF", d: 11, dl: 3 },
  ];
  return <>
    {orbs.map((o, i) => (
      <motion.div key={i} className="absolute rounded-full pointer-events-none"
        style={{ left: o.l, top: o.t, width: o.s, height: o.s, background: o.c, filter: `blur(${o.s * 0.55}px)`, opacity: 0.14 }}
        animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
        transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", delay: o.dl }}
      />
    ))}
  </>;
}

// ── Magnetic button ───────────────────────────────────────────────────────────
interface MagProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
}
function MagneticButton({ children, className, style, onClick, href }: MagProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} whileTap={{ scale: 0.96 }}
      onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - (r.left + r.width / 2)) * 0.3); y.set((e.clientY - (r.top + r.height / 2)) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {href
        ? <a href={href} className={className} style={style} target="_blank" rel="noreferrer">{children}</a>
        : <button type="button" onClick={onClick} className={className} style={style}>{children}</button>
      }
    </motion.div>
  );
}

// ── Glitch name ───────────────────────────────────────────────────────────────
function GlitchName({ name }: { name: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{name}</span>
      <motion.span aria-hidden className="absolute inset-0 z-0 select-none text-[#ff003c]"
        style={{ clipPath: "inset(0 0 50% 0)" }}
        animate={{ x: [-2, 2, 0], opacity: [0, 0.55, 0] }}
        transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 5 }}
      >{name}</motion.span>
      <motion.span aria-hidden className="absolute inset-0 z-0 select-none text-[#00F5FF]"
        style={{ clipPath: "inset(50% 0 0 0)" }}
        animate={{ x: [2, -2, 0], opacity: [0, 0.55, 0] }}
        transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 5, delay: 0.06 }}
      >{name}</motion.span>
    </span>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const MUTED = "#6B7280";
const WHITE = "#F0F0FF";

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(ROLES);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0a0a0f" }}>
      <GridBg />
      <Orbs />
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full backdrop-blur-sm"
              style={{ border: "1px solid rgba(123,47,255,0.4)", background: "rgba(123,47,255,0.1)" }}>
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles className="w-4 h-4" style={{ color: "#00F5FF" }} />
              </motion.span>
              <span className="text-sm font-mono tracking-widest uppercase" style={{ color: "#00F5FF" }}>Available for work</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={item} className="text-5xl sm:text-7xl md:text-[5.5rem] font-heading font-black leading-[0.92] tracking-tight mb-6">
            <span className="block" style={{ color: WHITE }}>Hi, I&apos;m</span>
            <span className="block" style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              <GlitchName name={personalInfo.name} />
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item} className="h-10 flex items-center justify-center mb-6">
            <p className="text-xl sm:text-2xl font-mono" style={{ color: MUTED }}>
              {"< "}<span className="font-semibold" style={{ color: "#00F5FF" }}>{typed}</span>
              <motion.span style={{ color: "#7B2FFF" }} animate={{ opacity: [1, 0] }} transition={{ duration: 0.55, repeat: Infinity }}>|</motion.span>
              {" />"}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="max-w-2xl text-lg sm:text-xl leading-relaxed mb-12" style={{ color: MUTED }}>
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <MagneticButton onClick={() => scrollTo("projects")}
              className="group relative flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden cursor-pointer">
              <span className="absolute inset-0" style={{ background: GRAD }} />
              <motion.span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.45 }} />
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> View My Work
              </span>
            </MagneticButton>

            <MagneticButton href={personalInfo.resumeUrl}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer hover:bg-[#00F5FF]/5"
              style={{ border: "1px solid rgba(123,47,255,0.5)", color: "#00F5FF" }}>
              <Download className="w-4 h-4" />
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-5 mb-16">
            {personalInfo.social.map((s) => (
              <motion.a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 transition-colors duration-300"
                style={{ color: MUTED }}
                whileHover={{ y: -3 }}
              >
                <s.icon size={20} />
                <span className="text-sm font-mono hidden sm:block">{s.label}</span>
              </motion.a>
            ))}
            <div className="hidden sm:block w-14 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(123,47,255,.5),transparent)" }} />
            <span className="hidden sm:block text-xs font-mono tracking-widest uppercase" style={{ color: MUTED }}>Let&apos;s connect</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button variants={item} type="button" onClick={() => scrollTo("about")}
            className="flex flex-col items-center gap-2 transition-colors duration-300 cursor-pointer"
            style={{ color: MUTED }} whileHover={{ color: "#7B2FFF" } as never} aria-label="Scroll to About">
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <motion.div className="w-6 h-10 rounded-full flex items-start justify-center pt-1"
              style={{ border: "1px solid rgba(123,47,255,0.4)" }}
              animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <motion.div className="w-1 h-2.5 rounded-full" style={{ background: "#7B2FFF" }}
                animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            </motion.div>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.button>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} />
    </section>
  );
}