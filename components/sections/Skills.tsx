"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPython, SiFastapi,
  SiGit, SiDocker, SiVercel, SiOpenai, SiHuggingface,
} from "react-icons/si";
import type { IconType } from "react-icons";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const FONT_DISPLAY = "var(--font-display), sans-serif";
const FONT_BODY = "var(--font-inter), sans-serif";
const FONT_MONO = "var(--font-jetbrains), monospace";

const TABS = ["All", "Frontend", "Backend", "Tools & DevOps", "AI & LLM"] as const;
type Tab = (typeof TABS)[number];

// ── Projects (colors match the dots on each skill card) ───────
type ProjectId = "s3" | "medloop" | "expense" | "noteflow" | "portfolio";
type Project = { id: ProjectId; name: string; color: string; blurb: string };

const PROJECTS: Project[] = [
  { id: "s3",        name: "S3 Dashboard",   color: "#9B6BFF", blurb: "Multi-agent career platform with mock interviews, skill-gap analysis and a resume scorer." },
  { id: "medloop",   name: "MedLoop AI",     color: "#00F5FF", blurb: "Multi-agent patient care platform on LangGraph with JWT-secured onboarding." },
  { id: "expense",   name: "Expense Tracker", color: "#F4A261", blurb: "Full-stack expense tracker with categories and spending dashboards." },
  { id: "noteflow",  name: "Noteflow",       color: "#FF2FBE", blurb: "Full-stack note-taking app with AI writing assistance." },
  { id: "portfolio", name: "This Portfolio", color: "#22C55E", blurb: "Next.js, Framer Motion and a Three.js hero scene." },
];

const PROJECT_MAP = Object.fromEntries(PROJECTS.map((p) => [p.id, p])) as Record<ProjectId, Project>;

type Skill = {
  name: string;
  abbr?: string; // text/emoji fallback for tools without react-icons
  color: string;
  category: "Frontend" | "Backend" | "Tools & DevOps" | "AI & LLM";
  icon?: IconType;
  projects: ProjectId[]; // drives the colored dots + hover readout
  note?: string;         // extra context (internships, freelance)
  exploring?: boolean;   // learning, not shipped in a project yet
};

// IMPORTANT: `projects` arrays are the proof. Edit them if anything is not accurate.
const SKILLS: Skill[] = [
  // ── Frontend ──────────────────────────────────────────────
  { name: "React",         icon: SiReact,       color: "#61DAFB", category: "Frontend", projects: ["s3", "medloop", "expense", "noteflow", "portfolio"], note: "Next24 & Webs Jyoti internships" },
  { name: "Next.js",       icon: SiNextdotjs,   color: "#ffffff", category: "Frontend", projects: ["s3", "medloop", "noteflow", "portfolio"] },
  { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6", category: "Frontend", projects: ["s3", "medloop", "portfolio"] },
  { name: "Tailwind CSS",  icon: SiTailwindcss, color: "#38BDF8", category: "Frontend", projects: ["portfolio"], note: "Next24 internship" },
  { name: "Framer Motion", icon: SiFramer,      color: "#FF4D9E", category: "Frontend", projects: ["medloop", "portfolio"] },
  // ── Backend ───────────────────────────────────────────────
  { name: "Python",        icon: SiPython,      color: "#FFD43B", category: "Backend", projects: ["s3", "medloop"] },
  { name: "FastAPI",       icon: SiFastapi,     color: "#05998B", category: "Backend", projects: ["s3", "medloop"] },
  { name: "Node.js",       icon: SiNodedotjs,   color: "#68A063", category: "Backend", projects: ["expense", "noteflow"], note: "Webs Jyoti internship" },
  { name: "Express",       icon: SiExpress,     color: "#ffffff", category: "Backend", projects: ["noteflow"] },
  { name: "PostgreSQL",    icon: SiPostgresql,  color: "#336791", category: "Backend", projects: ["medloop"], note: "Webs Jyoti internship" },
  { name: "MongoDB",       icon: SiMongodb,     color: "#4DB33D", category: "Backend", projects: ["s3", "expense", "noteflow"] },
  { name: "JWT Auth",      abbr: "JWT",          color: "#D63AFF", category: "Backend", projects: ["medloop"] },
  // ── Tools & DevOps ────────────────────────────────────────
  { name: "Git",           icon: SiGit,         color: "#F05032", category: "Tools & DevOps", projects: [], note: "Every project" },
  { name: "Docker",        icon: SiDocker,      color: "#2496ED", category: "Tools & DevOps", projects: [], note: "Freelance deployments" },
  { name: "Vercel",        icon: SiVercel,      color: "#ffffff", category: "Tools & DevOps", projects: ["s3", "expense", "portfolio"] },
  // ── AI & LLM ──────────────────────────────────────────────
  { name: "OpenAI / GPT-4o", icon: SiOpenai,    color: "#ffffff", category: "AI & LLM", projects: ["s3", "medloop"] },
  { name: "LangGraph",     abbr: "LG",           color: "#1C7C54", category: "AI & LLM", projects: ["medloop"] },
  { name: "LangChain",     abbr: "🦜",           color: "#2FA876", category: "AI & LLM", projects: [], note: "Freelance AI products" },
  { name: "RAG",           abbr: "RAG",          color: "#9B5DE5", category: "AI & LLM", projects: ["s3"] },
  { name: "Qdrant",        abbr: "QD",           color: "#DC244C", category: "AI & LLM", projects: ["s3"] },
  { name: "Gemini API",    abbr: "GM",           color: "#4285F4", category: "AI & LLM", projects: ["expense"] },
  { name: "Claude AI",     abbr: "✦",            color: "#CC785C", category: "AI & LLM", projects: [], note: "AI-assisted development" },
  { name: "LangSmith",     abbr: "LS",           color: "#F4A261", category: "AI & LLM", projects: [], exploring: true },
  { name: "Hugging Face",  icon: SiHuggingface,  color: "#FFD21E", category: "AI & LLM", projects: [], exploring: true },
];

function describe(skill: Skill): string {
  const parts = skill.projects.map((id) => PROJECT_MAP[id].name);
  if (skill.note) parts.push(skill.note);
  if (parts.length === 0) return skill.exploring ? "Exploring, not shipped in a project yet" : "";
  return parts.join(" · ");
}

function MarqueeIcon({ icon: Icon, color }: { icon: IconType; color: string }) {
  return <Icon style={{ color, fontSize: "0.9rem" }} />;
}

// ── Renders icon or styled text abbr ──────────────────────────
function SkillIcon({ skill, lit }: { skill: Skill; lit: boolean }) {
  if (skill.icon) {
    const Icon = skill.icon;
    return (
      <Icon
        style={{
          fontSize: "1.75rem",
          color: skill.color,
          filter: lit ? `drop-shadow(0 0 8px ${skill.color}80)` : "none",
          transition: "filter 0.3s",
        }}
      />
    );
  }
  const abbr = skill.abbr ?? "";
  const isEmoji = abbr.length > 0 && [...abbr].length === 1 && abbr.charCodeAt(0) > 255;
  return (
    <span
      style={{
        fontSize: isEmoji ? "1.6rem" : abbr.length <= 2 ? "1.1rem" : "0.72rem",
        fontWeight: 700,
        fontFamily: FONT_MONO,
        color: skill.color,
        letterSpacing: "-0.02em",
        filter: lit ? `drop-shadow(0 0 8px ${skill.color}90)` : "none",
        transition: "filter 0.3s",
        lineHeight: 1,
      }}
    >
      {abbr}
    </span>
  );
}

// ── Skill card ────────────────────────────────────────────────
function SkillCard({
  skill, delay, activeProject, onHover,
}: {
  skill: Skill;
  delay: number;
  activeProject: ProjectId | null;
  onHover: (s: Skill | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isAI = skill.category === "AI & LLM";
  const matched = activeProject ? skill.projects.includes(activeProject) : false;
  const dimmed = !!activeProject && !matched;
  const glow = matched && activeProject ? PROJECT_MAP[activeProject].color : skill.color;
  const lit = hovered || matched;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.04 }}
      onMouseEnter={() => { setHovered(true); onHover(skill); }}
      onMouseLeave={() => { setHovered(false); onHover(null); }}
      style={{
        position: "relative",
        background: lit ? `${glow}0d` : isAI ? "rgba(255,77,158,0.03)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${lit ? `${glow}${matched ? "80" : "50"}` : isAI ? "rgba(255,77,158,0.12)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "1.25rem",
        padding: "1.5rem 1.25rem 1.25rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "0.8rem",
        cursor: "default",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s, filter 0.3s",
        boxShadow: lit ? `0 12px 40px ${glow}${matched ? "28" : "18"}` : "none",
        filter: dimmed ? "grayscale(1) opacity(0.3)" : "none",
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
          fontFamily: FONT_MONO, fontSize: "0.48rem", color: "#FF4D9E", letterSpacing: "0.06em",
        }}>AI</div>
      )}

      {/* Corner glow */}
      {lit && (
        <div style={{
          position: "absolute", top: 0, right: 0, width: 80, height: 80,
          background: `radial-gradient(circle at top right, ${glow}20, transparent 70%)`,
          pointerEvents: "none", borderRadius: "0 1.25rem 0 0",
        }} />
      )}

      {/* Icon box */}
      <div style={{
        width: 56, height: 56, borderRadius: "1rem",
        background: lit ? `${glow}15` : "rgba(255,255,255,0.05)",
        border: `1px solid ${lit ? `${glow}35` : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s",
        boxShadow: lit ? `0 0 20px ${glow}30` : "none",
      }}>
        <SkillIcon skill={skill} lit={lit} />
      </div>

      {/* Name */}
      <p style={{
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "0.85rem",
        color: lit ? "#F0F0FF" : "#C0C0D8",
        textAlign: "center", transition: "color 0.3s", lineHeight: 1.25, margin: 0,
      }}>
        {skill.name}
      </p>

      {/* Proof: colored dots = projects that used this skill */}
      <div style={{ minHeight: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
        {skill.projects.length > 0 ? (
          skill.projects.map((id) => (
            <span
              key={id}
              title={PROJECT_MAP[id].name}
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: PROJECT_MAP[id].color,
                boxShadow: `0 0 6px ${PROJECT_MAP[id].color}80`,
                opacity: activeProject && activeProject !== id ? 0.25 : 1,
                transition: "opacity 0.3s",
              }}
            />
          ))
        ) : skill.exploring ? (
          <span style={{
            padding: "0.15rem 0.55rem",
            background: "rgba(255,47,190,0.08)", border: "1px solid rgba(255,47,190,0.3)",
            borderRadius: "2rem", fontFamily: FONT_MONO, fontSize: "0.58rem", color: "#FF2FBE", letterSpacing: "0.05em",
          }}>exploring</span>
        ) : (
          <span style={{ fontFamily: FONT_MONO, fontSize: "0.58rem", color: "#6B7280", textAlign: "center", lineHeight: 1.35 }}>
            {skill.note}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const filtered = activeTab === "All" ? SKILLS : SKILLS.filter((s) => s.category === activeTab);
  const aiCount = SKILLS.filter((s) => s.category === "AI & LLM").length;
  const project = activeProject ? PROJECT_MAP[activeProject] : null;
  const projectSkillCount = activeProject ? SKILLS.filter((s) => s.projects.includes(activeProject)).length : 0;

  return (
    <section id="skills" ref={ref} style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Orbs */}
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(123,47,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "rgba(0,245,255,0.04)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
            <span style={{ fontFamily: FONT_MONO, fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00F5FF", textTransform: "uppercase" as const }}>Tech Stack</span>
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: "-0.02em", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0F0FF", lineHeight: 1.1, marginBottom: "1rem" }}>
            Tools I{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>build with.</span>
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "#6B7280", maxWidth: 520, lineHeight: 1.75 }}>
            Every dot below is a project I actually shipped with that tool. Pick a project to see exactly what it was built with.
          </p>
        </motion.div>

        {/* Summary chips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            { label: `${SKILLS.length} Technologies`, color: "#7B2FFF", border: "rgba(123,47,255,0.3)", bg: "rgba(123,47,255,0.1)" },
            { label: `${PROJECTS.length} Projects`,   color: "#00F5FF", border: "rgba(0,245,255,0.25)", bg: "rgba(0,245,255,0.07)" },
            { label: `${aiCount} AI / LLM Tools`,     color: "#FF4D9E", border: "rgba(255,77,158,0.3)", bg: "rgba(255,77,158,0.08)" },
          ].map((chip) => (
            <span key={chip.label} style={{ padding: "0.35rem 0.9rem", background: chip.bg, border: `1px solid ${chip.border}`, borderRadius: "2rem", fontFamily: FONT_MONO, fontSize: "0.72rem", color: chip.color }}>
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* Project filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.12 }} style={{ marginBottom: "1.75rem" }}>
          <p style={{ fontFamily: FONT_MONO, fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#6B7280", marginBottom: "0.6rem" }}>
            Built with · pick a project
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {PROJECTS.map((p) => {
              const on = activeProject === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(on ? null : p.id)}
                  aria-pressed={on}
                  suppressHydrationWarning
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.45rem 0.95rem", borderRadius: "2rem",
                    fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "0.8rem",
                    cursor: "pointer", transition: "all 0.25s",
                    background: on ? `${p.color}1f` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${on ? `${p.color}99` : "rgba(255,255,255,0.08)"}`,
                    color: on ? "#F0F0FF" : "#A0A0B8",
                    boxShadow: on ? `0 0 18px ${p.color}33` : "none",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 6px ${p.color}90` }} />
                  {p.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
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
                  fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "0.85rem",
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
              style={{ marginBottom: "1rem", padding: "0.9rem 1.25rem", background: "linear-gradient(135deg, rgba(255,77,158,0.06), rgba(123,47,255,0.08))", border: "1px solid rgba(255,77,158,0.15)", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🤖</span>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: "#FF4D9E", fontWeight: 600 }}>AI / LLM stack</span> — Building intelligent apps with LLMs, RAG pipelines, AI agents, and vector search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Readout: hover a skill or pick a project */}
        <div
          aria-live="polite"
          style={{
            minHeight: "3.75rem", marginBottom: "1.25rem", padding: "0.6rem 1rem",
            display: "flex", alignItems: "center",
            borderRadius: "0.75rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: FONT_MONO, fontSize: "0.74rem", color: "#9CA3AF", lineHeight: 1.6,
          }}
        >
          {hoveredSkill ? (
            <span>
              <span style={{ color: hoveredSkill.color, fontWeight: 500 }}>{hoveredSkill.name}</span>
              <span style={{ color: "#4B5563" }}> → </span>
              {describe(hoveredSkill)}
            </span>
          ) : project ? (
            <span>
              <span style={{ color: project.color, fontWeight: 500 }}>{project.name}</span>
              <span style={{ color: "#4B5563" }}> — </span>
              {project.blurb}
              <span style={{ color: "#4B5563" }}> · {projectSkillCount} technologies highlighted</span>
            </span>
          ) : (
            <span style={{ color: "#6B7280" }}>Hover a skill to see where I used it, or pick a project above.</span>
          )}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                delay={i * 0.03}
                activeProject={activeProject}
                onHover={setHoveredSkill}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", padding: "1.25rem 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.div
          animate={reduce ? { x: "0%" } : { x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "1rem", width: "max-content" }}
        >
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={`m-${i}`} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1rem",
              background: skill.category === "AI & LLM" ? "rgba(255,77,158,0.05)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${skill.category === "AI & LLM" ? "rgba(255,77,158,0.15)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "999px", whiteSpace: "nowrap" as const, flexShrink: 0,
            }}>
              {skill.icon ? (
                <MarqueeIcon icon={skill.icon} color={skill.color} />
              ) : (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: skill.color, fontFamily: FONT_MONO, lineHeight: 1 }}>
                  {skill.abbr}
                </span>
              )}
              <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "#6B7280" }}>
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}