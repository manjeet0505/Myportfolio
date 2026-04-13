"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";

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

const TYPE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  "Full-time":  { bg: "rgba(123,47,255,0.12)", border: "rgba(123,47,255,0.35)", color: "#a78bfa" },
  "Part-time":  { bg: "rgba(0,245,255,0.08)",  border: "rgba(0,245,255,0.25)",  color: "#00F5FF" },
  "Freelance":  { bg: "rgba(255,47,190,0.1)",  border: "rgba(255,47,190,0.3)",  color: "#FF2FBE" },
  "Internship": { bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.3)",   color: "#22c55e" },
};

export default function Experience() {
  const [active, setActive] = useState<string>(experiences[0]?.id ?? "");
  const activeExp = experiences.find((e) => e.id === active) ?? experiences[0];

  return (
    <section id="experience" style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", top: "0%", left: "-15%", background: "rgba(123,47,255,0.07)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: "10%", right: "-10%", background: "rgba(0,245,255,0.05)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <FadeUp>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00F5FF", textTransform: "uppercase" as const }}>Experience</span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0F0FF", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Where I've{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Worked
            </span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6B7280", maxWidth: 480, lineHeight: 1.75, marginBottom: "3.5rem" }}>
            My professional journey — companies I've contributed to and the impact I've made.
          </p>
        </FadeUp>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "2rem", alignItems: "start" }}>

          {/* LEFT — Company list / timeline */}
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>

              {/* Vertical neon line */}
              <div style={{
                position: "absolute", left: 19, top: 0, bottom: 0, width: 2,
                background: "linear-gradient(180deg, #7B2FFF 0%, #00F5FF 50%, transparent 100%)",
                opacity: 0.3,
              }} />

              {experiences.map((exp, i) => {
                const isActive = active === exp.id;
                const typeStyle = TYPE_COLORS[exp.type] ?? TYPE_COLORS["Full-time"];
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActive(exp.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "1rem",
                      padding: "1.25rem 1rem",
                      background: isActive ? "rgba(123,47,255,0.1)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(123,47,255,0.4)" : "transparent"}`,
                      borderRadius: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                      transition: "all 0.25s",
                      marginBottom: "0.5rem",
                    }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Timeline dot */}
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: "0.1rem",
                      background: isActive ? GRAD : "rgba(255,255,255,0.08)",
                      border: `2px solid ${isActive ? "transparent" : "rgba(255,255,255,0.15)"}`,
                      boxShadow: isActive ? "0 0 12px rgba(123,47,255,0.7)" : "none",
                      transition: "all 0.25s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: isActive ? "#F0F0FF" : "#A0A0B8", transition: "color 0.25s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {exp.company}
                        </span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#6B7280", flexShrink: 0 }}>
                          {exp.endDate === "Present" ? (
                            <span style={{ color: "#22c55e" }}>● Present</span>
                          ) : exp.endDate}
                        </span>
                      </div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", color: isActive ? "#00F5FF" : "#6B7280", transition: "color 0.25s", marginBottom: "0.4rem" }}>
                        {exp.role}
                      </p>
                      <span style={{
                        display: "inline-block",
                        padding: "0.15rem 0.55rem",
                        background: typeStyle.bg,
                        border: `1px solid ${typeStyle.border}`,
                        borderRadius: "2rem",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.6rem",
                        color: typeStyle.color,
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </FadeUp>

          {/* RIGHT — Detail panel */}
          <FadeUp delay={0.2}>
            {activeExp && (
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Top gradient bar */}
                <div style={{ height: 3, background: GRAD }} />

                <div style={{ padding: "2rem" }}>

                  {/* Company + dates */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                        {/* Company logo placeholder */}
                        <div style={{
                          width: 44, height: 44, borderRadius: "0.75rem", flexShrink: 0,
                          background: "rgba(123,47,255,0.15)",
                          border: "1px solid rgba(123,47,255,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1rem",
                          color: "#7B2FFF",
                        }}>
                          {activeExp.company.charAt(0)}
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#F0F0FF", lineHeight: 1.1 }}>
                            {activeExp.company}
                          </h3>
                          <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "#00F5FF", marginTop: "0.2rem" }}>
                            {activeExp.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date badge */}
                    <div style={{
                      padding: "0.4rem 0.9rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2rem",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.72rem", color: "#A0A0B8",
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {activeExp.startDate} → {activeExp.endDate === "Present"
                        ? <span style={{ color: "#22c55e" }}>Present</span>
                        : activeExp.endDate}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.9rem", color: "#A0A0B8", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                    {activeExp.description}
                  </p>

                  {/* Divider */}
                  <div style={{ height: 1, background: "linear-gradient(90deg, rgba(123,47,255,0.4), rgba(0,245,255,0.4), transparent)", marginBottom: "1.75rem" }} />

                  {/* Highlights */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#7B2FFF", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
                      Key Achievements
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {activeExp.highlights.map((h, i) => (
                        <motion.div
                          key={h}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                        >
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.05rem" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7B2FFF" }} />
                          </div>
                          <span style={{ fontSize: "0.875rem", color: "#C0C0D8", lineHeight: 1.6 }}>{h}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tech used */}
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#7B2FFF", textTransform: "uppercase" as const, marginBottom: "0.875rem" }}>
                      Tech Stack
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {activeExp.technologies.map((tech) => (
                        <span key={tech} style={{
                          padding: "0.3rem 0.75rem",
                          background: "rgba(0,245,255,0.07)",
                          border: "1px solid rgba(0,245,255,0.2)",
                          borderRadius: "2rem",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.72rem", color: "#00F5FF",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </FadeUp>
        </div>

        {/* ── Bottom summary strip ───────────────────────────── */}
        <FadeUp delay={0.3}>
          <div style={{
            marginTop: "3rem",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem",
          }}>
            {[
              { label: "Companies Worked At", value: `${experiences.length}+` },
              { label: "Years of Experience",  value: "3+"    },
              { label: "Technologies Used",    value: "15+"   },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1rem",
                padding: "1.25rem 1.5rem",
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.75rem", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.4 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}