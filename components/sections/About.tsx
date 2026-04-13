"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const STAT_ICONS = ["🗓️", "🚀", "😊", "☕"];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >{children}</motion.div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", top: "-10%", left: "-10%", background: "rgba(123,47,255,0.07)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: "0%", right: "-5%", background: "rgba(0,245,255,0.05)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Section header ─────────────────────────────────── */}
        <FadeUp>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00F5FF", textTransform: "uppercase" }}>About Me</span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0F0FF", lineHeight: 1.1, marginBottom: "4rem" }}>
            Who I{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Am</span>
          </h2>
        </FadeUp>

        {/* ── Main grid ─────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* LEFT — Photo + bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Photo card */}
            <FadeUp delay={0.1}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1.5rem",
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* gradient top line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />

                {/* Photo */}
                <div style={{
                  width: 100, height: 100, borderRadius: "1rem", flexShrink: 0, position: "relative",
                  background: GRAD, padding: 2,
                  boxShadow: "0 0 30px rgba(123,47,255,0.5)",
                }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "calc(1rem - 2px)", overflow: "hidden", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = "flex";
                      }}
                    />
                    <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#F0F0FF" }}>
                      {personalInfo.initials}
                    </div>
                  </div>
                  {/* online dot */}
                  <div style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#22c55e", border: "2px solid #0a0a0f", boxShadow: "0 0 10px rgba(34,197,94,0.7)" }} />
                </div>

                {/* Name / role / badge */}
                <div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#F0F0FF", marginBottom: "0.3rem" }}>
                    {personalInfo.name}
                  </h3>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "#00F5FF", marginBottom: "0.75rem" }}>
                    {personalInfo.tagline}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "2rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                    <span style={{ fontSize: "0.72rem", color: "#22c55e", fontFamily: "JetBrains Mono, monospace" }}>Available for work</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Bio */}
            <FadeUp delay={0.2}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1.25rem",
                padding: "1.75rem",
              }}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#A0A0B8", marginBottom: "1rem" }}>
                  I'm a{" "}
                  <span style={{ color: "#00F5FF", fontWeight: 500 }}>Full-Stack Developer</span>
                  {" "}passionate about crafting performant, pixel-perfect web experiences.
                  I love turning complex problems into elegant, intuitive solutions.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#A0A0B8" }}>
                  When I'm not coding, I'm exploring new tech and contributing to{" "}
                  <span style={{ color: "#F0F0FF", fontWeight: 500 }}>open-source</span>.
                </p>
              </div>
            </FadeUp>

            {/* Tech pills */}
            <FadeUp delay={0.3}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"].map((t) => (
                  <span key={t} style={{
                    padding: "0.35rem 0.85rem",
                    background: "rgba(123,47,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    borderRadius: "2rem",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    color: "#00F5FF",
                  }}>{t}</span>
                ))}
              </div>
            </FadeUp>

            {/* Resume button */}
            <FadeUp delay={0.35}>
              <a href={personalInfo.resumeUrl} download style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8rem 1.75rem",
                background: "linear-gradient(135deg, #7B2FFF, #5b1fd4)",
                color: "#fff",
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.9rem",
                border: "none", borderRadius: "0.75rem",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(123,47,255,0.4)",
              }}>
                ↓ Download Resume
              </a>
            </FadeUp>
          </div>

          {/* RIGHT — Stats + what I bring */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Stat cards 2×2 grid */}
            <FadeUp delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {stats.map((s, i) => (
                  <motion.div key={s.label}
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "1.25rem",
                      padding: "1.5rem",
                      display: "flex", flexDirection: "column", gap: "0.5rem",
                      cursor: "default",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    {/* corner glow */}
                    <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "rgba(123,47,255,0.08)", borderRadius: "0 1.25rem 0 100%", pointerEvents: "none" }} />
                    <div style={{ fontSize: "1.5rem" }}>{STAT_ICONS[i]}</div>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {s.value}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#6B7280", letterSpacing: "0.03em" }}>{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* What I bring */}
            <FadeUp delay={0.3}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1.25rem",
                padding: "1.75rem",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #7B2FFF, #00F5FF, transparent)" }} />
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F0F0FF", marginBottom: "1.25rem" }}>
                  What I bring to the table
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Clean, maintainable, well-documented code",
                    "Strong eye for UI/UX and design details",
                    "End-to-end ownership from idea to deploy",
                    "Fast learner — always up-to-date with tech",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ color: "#00F5FF", flexShrink: 0, marginTop: "0.1rem" }}>▹</span>
                      <span style={{ fontSize: "0.875rem", color: "#A0A0B8", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Currently building */}
            <FadeUp delay={0.4}>
              <div style={{
                padding: "1rem 1.25rem",
                borderRadius: "1rem",
                background: "rgba(123,47,255,0.08)",
                border: "1px solid rgba(123,47,255,0.25)",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7B2FFF", boxShadow: "0 0 10px #7B2FFF", flexShrink: 0 }} />
                <span style={{ fontSize: "0.85rem", color: "#A0A0B8" }}>
                  Currently building:{" "}
                  <span style={{ color: "#F0F0FF", fontWeight: 500 }}>something awesome 🚀</span>
                </span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}