"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/lib/data";

const GRAD  = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const MUTED = "#6B7280";
const WHITE = "#F0F0FF";
const GLASS = "rgba(255,255,255,0.04)";

// ── Reusable fade-up ──────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ name, icon, level, delay }: {
  name: string; icon: string; level: number; delay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{icon}</span>
          <span className="text-sm font-semibold" style={{ color: WHITE }}>{name}</span>
        </div>
        <motion.span
          className="text-xs font-mono tabular-nums"
          style={{ color: "#7B2FFF" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}>
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: GRAD }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: delay + 0.2 }}
        />
        {/* Shimmer on fill */}
        <motion.div
          className="absolute inset-y-0 w-16 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
          initial={{ left: "-10%" }}
          animate={inView ? { left: `${level - 5}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

// ── Hexagon skill card ────────────────────────────────────────────────────────
function HexCard({ name, icon, level, delay }: {
  name: string; icon: string; level: number; delay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default overflow-hidden"
      style={{ background: GLASS, border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,47,255,0.2), transparent 70%)" }} />

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "transparent", border: "1px solid rgba(0,245,255,0.3)" }}
      />

      {/* Icon */}
      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center text-xl"
        style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.25)" }}>
        <span>{icon}</span>
        {/* Glow dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
          style={{ background: `conic-gradient(from 0deg, #7B2FFF ${level}%, rgba(255,255,255,0.05) ${level}%)` }}
        />
      </div>

      <span className="text-sm font-semibold text-center" style={{ color: WHITE }}>{name}</span>

      {/* Level bar */}
      <div className="w-full">
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: GRAD }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: delay + 0.3 }}
          />
        </div>
        <p className="text-[10px] font-mono text-right mt-1" style={{ color: MUTED }}>{level}%</p>
      </div>
    </motion.div>
  );
}

// ── Category tab ──────────────────────────────────────────────────────────────
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="relative px-5 py-2.5 rounded-xl text-sm font-semibold font-mono transition-all duration-300 cursor-pointer"
      style={{ color: active ? WHITE : MUTED, background: active ? "rgba(123,47,255,0.2)" : "transparent" }}>
      {active && (
        <motion.div layoutId="tab-bg" className="absolute inset-0 rounded-xl"
          style={{ border: "1px solid rgba(123,47,255,0.5)", background: "rgba(123,47,255,0.15)" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

// ── Proficiency ring ──────────────────────────────────────────────────────────
function ProficiencyRing({ level, label }: { level: number; label: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const r = 36, circ = 2 * Math.PI * r;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="96" height="96" viewBox="0 0 96 96">
          {/* Track */}
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          {/* Progress */}
          <motion.circle cx="48" cy="48" r={r} fill="none"
            stroke="url(#ring-grad)" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (circ * level) / 100 } : {}}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          />
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B2FFF" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xl font-heading font-black"
          style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {level}
        </span>
      </div>
      <span className="text-xs font-mono text-center" style={{ color: MUTED }}>{label}</span>
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const current = skillGroups[activeTab];

  return (
    <section id="skills" className="relative py-32 overflow-hidden" style={{ background: "#0a0a0f" }}>

      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,245,255,0.5), transparent)" }} />

      {/* Ambient orbs */}
      <div className="absolute left-1/2 top-0 w-[600px] h-[300px] -translate-x-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)" }} />
      <div className="absolute -right-32 bottom-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "#7B2FFF", filter: "blur(150px)", opacity: 0.07 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Label */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: GRAD }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: "#00F5FF" }}>Tech Stack</span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.08}>
          <h2 className="text-4xl sm:text-5xl font-heading font-black mb-4" style={{ color: WHITE }}>
            Tools I{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              master
            </span>{" "}
            every day.
          </h2>
          <p className="text-lg mb-12" style={{ color: MUTED }}>
            A curated set of technologies I use to build fast, scalable, and beautiful products.
          </p>
        </FadeUp>

        {/* ── Top summary rings ── */}
        <FadeUp delay={0.12}>
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start mb-16 p-6 rounded-2xl"
            style={{ background: GLASS, border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
            <ProficiencyRing level={93} label="Frontend" />
            <ProficiencyRing level={85} label="Backend" />
            <ProficiencyRing level={88} label="DevOps" />
            <ProficiencyRing level={79} label="UI/UX" />
            <div className="hidden sm:flex flex-col justify-center gap-2 ml-4">
              <p className="text-sm font-mono" style={{ color: MUTED }}>Overall proficiency based on</p>
              <p className="text-2xl font-heading font-black" style={{ color: WHITE }}>3+ years</p>
              <p className="text-sm font-mono" style={{ color: MUTED }}>of hands-on experience</p>
            </div>
          </div>
        </FadeUp>

        {/* ── Category tabs ── */}
        <FadeUp delay={0.16}>
          <div className="flex gap-2 mb-8 flex-wrap">
            {skillGroups.map((g, i) => (
              <Tab key={g.category} label={g.category} active={activeTab === i} onClick={() => setActiveTab(i)} />
            ))}
          </div>
        </FadeUp>

        {/* ── Two-column layout ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Left — Skill bars */}
            <div className="p-6 rounded-2xl flex flex-col gap-5"
              style={{ background: GLASS, border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-5 rounded-full" style={{ background: GRAD }} />
                <p className="text-sm font-mono tracking-widest uppercase" style={{ color: "#7B2FFF" }}>
                  {current.category} — Proficiency
                </p>
              </div>
              {current.skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} icon={s.icon} level={s.level} delay={i * 0.07} />
              ))}
            </div>

            {/* Right — Hex cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {current.skills.map((s, i) => (
                <HexCard key={s.name} name={s.name} icon={s.icon} level={s.level} delay={i * 0.07} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom — all tech logos strip ── */}
        <FadeUp delay={0.2}>
          <div className="mt-16">
            <p className="text-xs font-mono tracking-widest uppercase mb-6 text-center" style={{ color: MUTED }}>
              All technologies I work with
            </p>
            <div className="relative overflow-hidden rounded-2xl py-5 px-4"
              style={{ background: GLASS, border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }} />

              {/* Scrolling strip */}
              <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...skillGroups.flatMap(g => g.skills), ...skillGroups.flatMap(g => g.skills)].map((s, i) => (
                  <div key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
                    style={{ background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.15)" }}>
                    <span className="text-base">{s.icon}</span>
                    <span className="text-sm font-mono whitespace-nowrap" style={{ color: WHITE }}>{s.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}