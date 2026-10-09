"use client";

import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";

const TECH = [
  "Python", "FastAPI", "LangGraph", "RAG",
  "Next.js", "TypeScript", "PostgreSQL", "MongoDB",
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
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-cyan-400" />
            <span
              className="text-[0.7rem] tracking-[0.15em] uppercase text-cyan-400"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              About Me
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#F0F0FF] leading-tight mb-14"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Who I{" "}
            <span
              style={{
                background: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Am
            </span>
          </h2>
        </Reveal>

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
                I'm looking for <span className="text-cyan-400 font-medium">SDE-1 and AI Engineer</span>{" "}
                roles where I can own features from idea to deployment. I've shipped my own
                projects on Vercel, Render and Railway.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[0.72rem] text-cyan-400 bg-white/[0.03] border border-white/10"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
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
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 transition"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white/80 border border-white/15 hover:border-violet-500/50 hover:text-white transition"
                  style={{ fontFamily: "Syne, sans-serif" }}
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
                    <div
                      className="text-3xl font-extrabold mb-1"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        background: GRAD,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
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
      </div>
    </section>
  );
}