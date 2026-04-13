"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma,
  SiGit, SiDocker, SiVercel, SiFigma, SiOpenai, SiHuggingface,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";

const TABS = ["All", "Frontend", "Backend", "Tools & DevOps", "AI & LLM"] as const;
type Tab = typeof TABS[number];

const PROFICIENCY = ["Expert", "Proficient", "Learning"] as const;
type Prof = typeof PROFICIENCY[number];

const PROF_STYLE: Record<Prof, { bg: string; border: string; color: string }> = {
  Expert:     { bg: "rgba(123,47,255,0.12)", border: "rgba(123,47,255,0.4)", color: "#a78bfa" },
  Proficient: { bg: "rgba(0,245,255,0.08)",  border: "rgba(0,245,255,0.3)",  color: "#00F5FF" },
  Learning:   { bg: "rgba(255,47,190,0.08)", border: "rgba(255,47,190,0.3)", color: "#FF2FBE" },
};

type Skill = {
  name: string;
  icon?: React.ElementType; // react-icon
  abbr?: string;            // text/emoji fallback for tools without react-icons
  color: string;
  category: "Frontend" | "Backend" | "Tools & DevOps" | "AI & LLM";
  prof: Prof;
};

const SKILLS: Skill[] = [
  // ── Frontend ──────────────────────────────────────────────
  { name: "React",         icon: SiReact,       color: "#61DAFB", category: "Frontend",       prof: "Expert"     },
  { name: "Next.js",       icon: SiNextdotjs,   color: "#ffffff", category: "Frontend",       prof: "Expert"     },
  { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6", category: "Frontend",       prof: "Expert"     },
  { name: "Tailwind CSS",  icon: SiTailwindcss, color: "#38BDF8", category: "Frontend",       prof: "Expert"     },
  { name: "Framer Motion", icon: SiFramer,      color: "#FF4D9E", category: "Frontend",       prof: "Proficient" },
  // ── Backend ───────────────────────────────────────────────
  { name: "Node.js",       icon: SiNodedotjs,   color: "#68A063", category: "Backend",        prof: "Expert"     },
  { name: "Express",       icon: SiExpress,     color: "#ffffff", category: "Backend",        prof: "Expert"     },
  { name: "PostgreSQL",    icon: SiPostgresql,  color: "#336791", category: "Backend",        prof: "Proficient" },
  { name: "MongoDB",       icon: SiMongodb,     color: "#4DB33D", category: "Backend",        prof: "Proficient" },
  { name: "Prisma",        icon: SiPrisma,      color: "#A5F3FC", category: "Backend",        prof: "Proficient" },
  // ── Tools & DevOps ────────────────────────────────────────
  { name: "Git",           icon: SiGit,         color: "#F05032", category: "Tools & DevOps", prof: "Expert"     },
  { name: "Docker",        icon: SiDocker,      color: "#2496ED", category: "Tools & DevOps", prof: "Proficient" },
  { name: "Vercel",        icon: SiVercel,      color: "#ffffff", category: "Tools & DevOps", prof: "Expert"     },
  { name: "Figma",         icon: SiFigma,       color: "#F24E1E", category: "Tools & DevOps", prof: "Proficient" },
  { name: "VS Code",       icon: VscVscode,     color: "#007ACC", category: "Tools & DevOps", prof: "Expert"     },
  // ── AI & LLM ──────────────────────────────────────────────
  { name: "OpenAI",        icon: SiOpenai,      color: "#ffffff", category: "AI & LLM",       prof: "Expert"     },
  { name: "Claude AI",     abbr: "✦",           color: "#CC785C", category: "AI & LLM",       prof: "Proficient" },
  { name: "LangChain",     abbr: "🦜",          color: "#1C7C54", category: "AI & LLM",       prof: "Proficient" },
  { name: "LangSmith",     abbr: "LS",          color: "#F4A261", category: "AI & LLM",       prof: "Learning"   },
  { name: "RAG",           abbr: "RAG",         color: "#9B5DE5", category: "AI & LLM",       prof: "Proficient" },
  { name: "Hugging Face",  icon: SiHuggingface, color: "#FFD21E", category: "AI & LLM",       prof: "Learning"   },
  { name: "Vector DB",     abbr: "VDB",         color: "#00B4D8", category: "AI & LLM",       prof: "Learning"   },
  { name: "Prompt Eng.",   abbr: "PE",          color: "#7B2FFF", category: "AI & LLM",       prof: "Proficient" },
];

// ── Renders icon or styled text abbr ──────────────────────────
function SkillIcon({ skill, hovered }: { skill: Skill; hovered: boolean }) {
  if (skill.icon) {
    const Icon = skill.icon;
    return (
      <Icon style={{
        fontSize: "1.75rem", color: skill.color,
        filter: hovered ? `drop-shadow(0 0 8px ${skill.color}80)` : "none",
        transition: "filter 0.3s",
      }} />
    );
  }
  const isEmoji  = skill.abbr && [...skill.abbr].length === 1 && skill.abbr.charCodeAt(0) > 255;
  const isSymbol = skill.abbr === "✦";
  return (
    <span style={{
      fontSize: isEmoji || isSymbol ? "1.6rem" : skill.abbr!.length <= 2 ? "1.1rem" : "0.72rem",
      fontWeight: 800,
      fontFamily: "JetBrains Mono, monospace",
      color: skill.color,
      letterSpacing: "-0.02em",
      filter: hovered ? `drop-shadow(0 0 8px ${skill.color}90)` : "none",
      transition: "filter 0.3s",
      lineHeight: 1,
    }}>
      {skill.abbr}
    </span>
  );
}

// ── Skill card ────────────────────────────────────────────────
function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const prof  = PROF_STYLE[skill.prof];
  const isAI  = skill.category === "AI & LLM";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `${skill.color}0d`
          : isAI ? "rgba(255,77,158,0.03)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          hovered
            ? `${skill.color}50`
            : isAI ? "rgba(255,77,158,0.12)" : "rgba(255,255,255,0.07)"
        }`,
        borderRadius: "1.25rem",
        padding: "1.5rem 1.25rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "0.875rem",
        cursor: "default",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s",
        boxShadow: hovered ? `0 12px 40px ${skill.color}18` : "none",
      }}
    >
      {/* AI pill marker */}
      {isAI && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          padding: "0.1rem 0.4rem",
          background: "rgba(255,77,158,0.15)",
          border: "1px solid rgba(255,77,158,0.25)",
          borderRadius: "4px",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.48rem", color: "#FF4D9E",
          letterSpacing: "0.06em",
        }}>AI</div>
      )}

      {/* Corner glow */}
      {hovered && (
        <div style={{
          position: "absolute", top: 0, right: 0, width: 80, height: 80,
          background: `radial-gradient(circle at top right, ${skill.color}20, transparent 70%)`,
          pointerEvents: "none", borderRadius: "0 1.25rem 0 0",
        }} />
      )}

      {/* Icon box */}
      <div style={{
        width: 56, height: 56, borderRadius: "1rem",
        background: hovered ? `${skill.color}15` : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? `${skill.color}35` : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s",
        boxShadow: hovered ? `0 0 20px ${skill.color}30` : "none",
      }}>
        <SkillIcon skill={skill} hovered={hovered} />
      </div>

      {/* Name */}
      <p style={{
        fontFamily: "Syne, sans-serif", fontWeight: 700,
        fontSize: "0.85rem",
        color: hovered ? "#F0F0FF" : "#C0C0D8",
        textAlign: "center", transition: "color 0.3s", lineHeight: 1.25,
      }}>
        {skill.name}
      </p>

      {/* Proficiency badge */}
      <span style={{
        padding: "0.2rem 0.6rem",
        background: prof.bg, border: `1px solid ${prof.border}`,
        borderRadius: "2rem",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "0.6rem", color: prof.color, letterSpacing: "0.05em",
      }}>
        {skill.prof}
      </span>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered        = activeTab === "All" ? SKILLS : SKILLS.filter((s) => s.category === activeTab);
  const expertCount     = SKILLS.filter((s) => s.prof === "Expert").length;
  const proficientCount = SKILLS.filter((s) => s.prof === "Proficient").length;
  const aiCount         = SKILLS.filter((s) => s.category === "AI & LLM").length;

  return (
    <section id="skills" ref={ref} style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Orbs */}
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(123,47,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "rgba(0,245,255,0.04)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00F5FF", textTransform: "uppercase" as const }}>Tech Stack</span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0F0FF", lineHeight: 1.1, marginBottom: "1rem" }}>
            Tools I{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>master</span>
            {" "}every day.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6B7280", maxWidth: 480, lineHeight: 1.75 }}>
            A curated set of technologies I use to build fast, scalable, and AI-powered products.
          </p>
        </motion.div>

        {/* Summary chips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
          {[
            { label: `${SKILLS.length} Technologies`, color: "#7B2FFF", border: "rgba(123,47,255,0.3)", bg: "rgba(123,47,255,0.1)"  },
            { label: `${expertCount} Expert`,          color: "#a78bfa", border: "rgba(123,47,255,0.3)", bg: "rgba(123,47,255,0.08)" },
            { label: `${proficientCount} Proficient`,  color: "#00F5FF", border: "rgba(0,245,255,0.25)", bg: "rgba(0,245,255,0.07)"  },
            { label: `${aiCount} AI / LLM Tools`,      color: "#FF4D9E", border: "rgba(255,77,158,0.3)", bg: "rgba(255,77,158,0.08)" },
          ].map((chip) => (
            <span key={chip.label} style={{ padding: "0.35rem 0.9rem", background: chip.bg, border: `1px solid ${chip.border}`, borderRadius: "2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", color: chip.color }}>
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {TABS.map((tab) => {
            const isAITab = tab === "AI & LLM";
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                suppressHydrationWarning
                style={{
                  padding: "0.55rem 1.25rem", borderRadius: "0.75rem",
                  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.85rem",
                  cursor: "pointer", transition: "all 0.25s",
                  background: isActive
                    ? isAITab ? "linear-gradient(135deg, #FF4D9E, #7B2FFF)" : "linear-gradient(135deg, #7B2FFF, #5b1fd4)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? "transparent" : isAITab ? "rgba(255,77,158,0.2)" : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? "#fff" : isAITab ? "#FF4D9E" : "#A0A0B8",
                  boxShadow: isActive ? (isAITab ? "0 0 20px rgba(255,77,158,0.3)" : "0 0 20px rgba(123,47,255,0.35)") : "none",
                }}
              >
                {isAITab ? "✦ AI & LLM" : tab}
              </button>
            );
          })}
        </motion.div>

        {/* AI callout banner */}
        <AnimatePresence>
          {(activeTab === "AI & LLM" || activeTab === "All") && (
            <motion.div
              key="ai-callout"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: "1.5rem", padding: "0.9rem 1.25rem", background: "linear-gradient(135deg, rgba(255,77,158,0.06), rgba(123,47,255,0.08))", border: "1px solid rgba(255,77,158,0.15)", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🤖</span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: "#FF4D9E", fontWeight: 600 }}>AI / LLM stack</span> — Building intelligent apps with LLMs, RAG pipelines, AI agents, and vector search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} delay={i * 0.04} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", padding: "1.25rem 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "1rem", width: "max-content" }}>
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={`m-${i}`} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1rem",
              background: skill.category === "AI & LLM" ? "rgba(255,77,158,0.05)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${skill.category === "AI & LLM" ? "rgba(255,77,158,0.15)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "999px", whiteSpace: "nowrap" as const, flexShrink: 0,
            }}>
              {skill.icon ? (
                <skill.icon style={{ color: skill.color, fontSize: "0.9rem" }} />
              ) : (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: skill.color, fontFamily: "JetBrains Mono, monospace", lineHeight: 1 }}>
                  {skill.abbr}
                </span>
              )}
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#6B7280" }}>
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}