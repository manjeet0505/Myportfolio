"use client";

import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";

const TECH = [
  "Python", "FastAPI", "LangGraph", "RAG",
  "Next.js", "TypeScript", "PostgreSQL", "MongoDB",
];

const FOCUS = [
  {
    tag: "MedLoop AI",
    title: "Multi-agent systems",
    text: "LangGraph agents with JWT-secured patient management.",
  },
  {
    tag: "S3 Dashboard",
    title: "RAG & vector search",
    text: "Qdrant vector search behind the career intelligence tools.",
  },
  {
    tag: "End to end",
    title: "Full-stack delivery",
    text: "Next.js and FastAPI apps shipped to Vercel, Render and Railway.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 px-6">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-cyan-400" />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-cyan-400">
              About Me
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#F0F0FF] leading-tight mb-14">
            Who I <span className="neon-text">Am</span>
          </h2>
        </Reveal>

        {/* Main grid */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left: bio */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <Reveal delay={0.05}>
              <p className="text-base leading-[1.85] text-[#A0A0B8]">
                I'm a 2026 CS graduate from MDU who builds AI products end to end:{" "}
                <span className="text-[#F0F0FF] font-medium">multi-agent systems</span> and{" "}
                <span className="text-[#F0F0FF] font-medium">RAG pipelines</span> on the
                backend, and the Next.js apps around them. My IEEE-published paper is on LLM
                architecture.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base leading-[1.85] text-[#A0A0B8]">
                I'm looking for{" "}
                <span className="text-cyan-400 font-medium">SDE-1 and AI Engineer</span> roles
                where I can own features from idea to deployment. I've shipped my own projects
                on Vercel, Render and Railway.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="font-mono px-3 py-1 rounded-full text-[0.72rem] text-cyan-400 bg-white/[0.03] border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="font-heading px-6 py-3 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 transition"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="font-heading px-6 py-3 rounded-xl text-sm font-semibold text-white/80 border border-white/15 hover:border-violet-500/50 hover:text-white transition"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: stats + currently building */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-5 bg-white/[0.03] border border-white/10 hover:border-violet-500/40 transition-colors"
                  >
                    <div className="font-heading text-3xl font-bold mb-1 neon-text">
                      {s.value}
                    </div>
                    <div className="text-xs text-[#6B7280] leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-violet-500/[0.07] border border-violet-500/20">
                <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                <span className="text-sm text-[#A0A0B8]">
                  Currently building:{" "}
                  <span className="text-[#F0F0FF] font-medium">
                    Senior-Junior Connect, an AI-powered platform
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* What I work on */}
        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4 mt-14">
            {FOCUS.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-violet-500/40 transition-colors"
              >
                <span className="font-mono text-[0.65rem] tracking-widest uppercase text-cyan-400">
                  {f.tag}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#F0F0FF] mt-2 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#8A8AA3]">{f.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}