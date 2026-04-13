"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, Sparkles, Code2, Zap, Globe } from "lucide-react";
import { personalInfo } from "@/lib/data";

// ── Roles ─────────────────────────────────────────────────────────────────────
const ROLES = ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Open Source Builder"];

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay]   = useState("");
  const [wIdx, setWIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = words[wIdx];
    const id = setTimeout(() => {
      if (!deleting) {
        setDisplay(cur.slice(0, cIdx + 1));
        if (cIdx + 1 === cur.length) setTimeout(() => setDeleting(true), pause);
        else setCIdx(c => c + 1);
      } else {
        setDisplay(cur.slice(0, cIdx - 1));
        if (cIdx - 1 === 0) { setDeleting(false); setWIdx(w => (w + 1) % words.length); setCIdx(0); }
        else setCIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [cIdx, deleting, wIdx, words, speed, pause]);
  return display;
}

// ── Floating particles (client only) ─────────────────────────────────────────
function Particles() {
  const [pts, setPts] = useState<{ id: number; x: number; y: number; s: number; dur: number; del: number; cyan: boolean }[]>([]);
  useEffect(() => {
    setPts(Array.from({ length: 40 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 2.5 + 0.5, dur: Math.random() * 10 + 8,
      del: Math.random() * 6, cyan: Math.random() > 0.5,
    })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.cyan ? "#00F5FF" : "#7B2FFF" }}
          animate={{ opacity: [0, 0.8, 0], y: [0, -80], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function Mag({ children, className, style, onClick, href }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
  onClick?: () => void; href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} whileTap={{ scale: 0.95 }}
      onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - (r.left + r.width / 2)) * 0.25); y.set((e.clientY - (r.top + r.height / 2)) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {href
        ? <a href={href} className={className} style={style} target="_blank" rel="noreferrer">{children}</a>
        : <button type="button" onClick={onClick} className={className} style={style}>{children}</button>}
    </motion.div>
  );
}

// ── Stat badge ────────────────────────────────────────────────────────────────
function StatBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
      <Icon className="w-4 h-4" style={{ color: "#7B2FFF" }} />
      <div>
        <p className="text-xs font-mono" style={{ color: "#6B7280" }}>{label}</p>
        <p className="text-sm font-heading font-bold" style={{ color: "#F0F0FF" }}>{value}</p>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050508" }}>

      {/* ── Deep layered background ── */}
      {/* Base gradient */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(123,47,255,0.25) 0%, transparent 60%)" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(0,245,255,0.1) 0%, transparent 50%)" }} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 10% 60%, rgba(123,47,255,0.08) 0%, transparent 50%)" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(123,47,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Horizontal scan line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />

      {/* Orbs */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, top: "-20%", left: "60%", background: "#7B2FFF", filter: "blur(120px)", opacity: 0.12 }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, bottom: "0%", left: "-10%", background: "#00F5FF", filter: "blur(100px)", opacity: 0.08 }}
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

      <Particles />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* LEFT — text */}
          <div className="flex-1 flex flex-col items-start">

            {/* Available badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full"
                style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.4)", backdropFilter: "blur(8px)" }}>
                <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Sparkles className="w-4 h-4" style={{ color: "#00F5FF" }} />
                </motion.span>
                <span className="text-sm font-mono tracking-widest uppercase" style={{ color: "#00F5FF" }}>Available for work</span>
                <motion.span className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              </div>
            </motion.div>

            {/* Greeting line */}
            <motion.p initial={{ opacity: 0, x: -30 }} animate={mounted ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-mono mb-3" style={{ color: "#6B7280" }}>
              Hello, World! 👋 I&apos;m
            </motion.p>

            {/* BIG NAME — split into lines for impact */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
              <h1 className="font-heading font-black leading-[0.9] tracking-tight mb-4">
                {/* First name */}
                <span className="block text-6xl sm:text-8xl md:text-[7rem]" style={{ color: "#F0F0FF" }}>
                  Manjeet
                </span>
                {/* Last name with neon gradient */}
                <span className="block text-5xl sm:text-7xl md:text-[5.5rem]"
                  style={{ background: "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 60%, #7B2FFF 100%)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  <motion.span style={{ display: "inline-block", backgroundSize: "200%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                    Kumar Mishra
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 mb-6 h-10">
              <span className="w-2 h-6 rounded-sm" style={{ background: "linear-gradient(180deg,#7B2FFF,#00F5FF)" }} />
              <p className="text-lg sm:text-xl font-mono" style={{ color: "#F0F0FF" }}>
                {typed}
                <motion.span style={{ color: "#00F5FF" }} animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>_</motion.span>
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#6B7280" }}>
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-10">
              <Mag onClick={() => go("projects")}
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden cursor-pointer text-sm">
                <span className="absolute inset-0 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)" }} />
                <motion.span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)" }} />
                <motion.span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "-200%" }} whileHover={{ x: "200%" }} transition={{ duration: 0.5 }} />
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> View My Work
                </span>
              </Mag>

              <Mag href={personalInfo.resumeUrl}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-300"
                style={{ border: "1px solid rgba(123,47,255,0.5)", color: "#F0F0FF", background: "rgba(123,47,255,0.08)" }}>
                <Download className="w-4 h-4 group-hover:text-[#00F5FF] transition-colors" />
                <span className="group-hover:text-[#00F5FF] transition-colors">Resume</span>
              </Mag>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.75 }}
              className="flex items-center gap-4">
              {personalInfo.social.map(s => (
                <motion.a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{ scale: 1.1, borderColor: "rgba(0,245,255,0.5)", background: "rgba(0,245,255,0.08)" }}>
                  <s.icon size={16} style={{ color: "#6B7280" }} className="group-hover:text-[#00F5FF] transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — visual card */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={mounted ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-shrink-0 hidden lg:flex flex-col items-center gap-6">

            {/* Profile card */}
            <div className="relative">
              {/* Outer glow */}
              <motion.div className="absolute -inset-4 rounded-3xl"
                style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", filter: "blur(24px)", opacity: 0.3 }}
                animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

              {/* Card */}
              <div className="relative w-72 rounded-3xl overflow-hidden p-6 flex flex-col items-center gap-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>

                {/* Photo */}
                <div className="relative">
                  <motion.div className="absolute -inset-[2px] rounded-2xl"
                    style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)" }}
                    animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden z-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={personalInfo.avatar || ""} alt={personalInfo.name}
                      className="w-full h-full object-cover"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-heading font-black text-white -z-10"
                      style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)" }}>
                      {personalInfo.initials}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 z-20 w-4 h-4 rounded-full bg-green-400 border-2 border-[#050508] animate-pulse" />
                </div>

                {/* Name */}
                <div className="text-center">
                  <p className="text-xl font-heading font-black" style={{ color: "#F0F0FF" }}>Manjeet Kumar</p>
                  <p className="text-xl font-heading font-black mb-1" style={{ color: "#F0F0FF" }}>Mishra</p>
                  <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "#7B2FFF" }}>Full-Stack Developer</p>
                </div>

                {/* Divider */}
                <div className="w-full h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(123,47,255,0.5),transparent)" }} />

                {/* Mini stats */}
                <div className="w-full grid grid-cols-3 gap-2 text-center">
                  {[{ v: "3+", l: "Years" }, { v: "40+", l: "Projects" }, { v: "∞", l: "Coffees" }].map(s => (
                    <div key={s.l}>
                      <p className="text-lg font-heading font-black"
                        style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {s.v}
                      </p>
                      <p className="text-xs font-mono" style={{ color: "#6B7280" }}>{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="w-full flex items-center justify-center gap-2 py-2 rounded-xl"
                  style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.15)" }}>
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  <span className="text-xs font-mono" style={{ color: "#00F5FF" }}>Open to opportunities</span>
                </div>
              </div>
            </div>

            {/* Floating mini stat badges */}
            <div className="flex gap-3">
              <StatBadge icon={Code2} label="Stack" value="Full-Stack" />
              <StatBadge icon={Globe} label="Remote" value="Available" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => go("about")}>
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#6B7280" }}>Scroll Down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1.5px solid rgba(123,47,255,0.5)" }}>
            <motion.div className="w-1 h-2 rounded-full" style={{ background: "#7B2FFF" }}
              animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          </motion.div>
          <ArrowDown className="w-4 h-4 animate-bounce" style={{ color: "#7B2FFF" }} />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} />
    </section>
  );
}