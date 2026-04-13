"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Coffee, Briefcase, Code2, Download } from "lucide-react";
import { personalInfo, stats } from "@/lib/data";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.12 },
  }),
};

const GRAD   = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const MUTED  = "#6B7280";
const WHITE  = "#F0F0FF";
const GLASS  = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";

// ── Stat icons ────────────────────────────────────────────────────────────────
const STAT_ICONS = [Briefcase, Code2, Coffee];

// ── Animated counter ──────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, index, inView }: {
  label: string; value: string; icon: React.ElementType; index: number; inView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl text-center overflow-hidden group"
      style={{ background: GLASS, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}
      whileHover={{ scale: 1.04, borderColor: "rgba(123,47,255,0.5)" }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,47,255,0.15), transparent 70%)" }} />

      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
        style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>
        <Icon className="w-5 h-5" style={{ color: "#7B2FFF" }} />
      </div>

      <span className="text-3xl font-heading font-black"
        style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {value}
      </span>
      <span className="text-sm font-mono tracking-wide" style={{ color: MUTED }}>{label}</span>
    </motion.div>
  );
}

// ── Tech pill ─────────────────────────────────────────────────────────────────
const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Tailwind CSS", "Framer Motion", "Docker",
];

// ── About ─────────────────────────────────────────────────────────────────────
export default function About() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden" style={{ background: "#0a0a0f" }}>

      {/* Subtle top separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(123,47,255,0.6), transparent)" }} />

      {/* Ambient orb */}
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#7B2FFF", filter: "blur(160px)", opacity: 0.07 }} />
      <div className="absolute -left-40 bottom-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "#00F5FF", filter: "blur(140px)", opacity: 0.06 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: GRAD }} />
          <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: "#7B2FFF" }}>About Me</span>
        </motion.div>

        {/* Heading */}
        <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl font-heading font-black mb-16" style={{ color: WHITE }}>
          Crafting digital <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>experiences</span>
          <br />that matter.
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Avatar + bio ── */}
          <div className="flex flex-col gap-8">

            {/* Avatar card */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="relative flex items-center gap-6 p-6 rounded-2xl"
              style={{ background: GLASS, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>

              {/* Avatar circle */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-heading font-black"
                  style={{ background: GRAD, color: "#fff", boxShadow: "0 0 40px rgba(123,47,255,0.4)" }}>
                  {personalInfo.initials}
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0a0a0f] animate-pulse" />
              </div>

              <div>
                <p className="text-xl font-heading font-bold" style={{ color: WHITE }}>{personalInfo.name}</p>
                <p className="text-sm font-mono" style={{ color: "#7B2FFF" }}>{personalInfo.tagline}</p>
                <div className="flex items-center gap-1 mt-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: MUTED }} />
                  <span className="text-xs font-mono" style={{ color: MUTED }}>{personalInfo.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Bio paragraphs */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-4">
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: MUTED }}>
                I&apos;m a <span style={{ color: WHITE }}>passionate full-stack developer</span> with a love for
                building products that live at the intersection of great design and clean engineering.
                I thrive in fast-paced environments where I can own features end-to-end.
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: MUTED }}>
                When I&apos;m not pushing pixels or debugging APIs, you&apos;ll find me contributing to open source,
                exploring new technologies, or writing about my learnings. I believe in{" "}
                <span style={{ color: WHITE }}>shipping fast, learning faster.</span>
              </p>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: MUTED }}>
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono transition-all duration-300 cursor-default hover:scale-105"
                    style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.25)", color: "#00F5FF" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: GRAD, color: "#fff", boxShadow: "0 0 24px rgba(123,47,255,0.3)" }}>
                <Download className="w-4 h-4" />
                Download Full Resume
              </a>
            </motion.div>
          </div>

          {/* ── Right: Stats + info cards ── */}
          <div className="flex flex-col gap-8">

            {/* Stat cards grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <StatCard key={s.label} label={s.label} value={s.value} icon={STAT_ICONS[i]} index={i + 2} inView={inView} />
              ))}
            </div>

            {/* What I do card */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="p-6 rounded-2xl"
              style={{ background: GLASS, border: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#7B2FFF" }}>
                What I bring to the table
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { title: "End-to-End Development", desc: "From database schema to pixel-perfect UI — I own the full stack." },
                  { title: "Performance First",       desc: "I obsess over Core Web Vitals, bundle sizes, and query efficiency." },
                  { title: "Design-Aware Engineering",desc: "I bridge the gap between Figma files and production code." },
                  { title: "Rapid Shipping",          desc: "I prototype fast, iterate faster, and never break the build." },
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#7B2FFF" }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: WHITE }}>{point.title}</p>
                      <p className="text-sm" style={{ color: MUTED }}>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Currently working on */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", backdropFilter: "blur(12px)" }}>
              <motion.div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#00F5FF]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }} />
              <div>
                <p className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color: "#00F5FF" }}>
                  Currently building
                </p>
                <p className="text-sm font-semibold" style={{ color: WHITE }}>
                  An AI-powered SaaS dashboard — launching Q2 2026
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}