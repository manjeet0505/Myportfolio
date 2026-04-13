"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma,
  SiGit, SiDocker, SiVercel, SiFigma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc"; // ✅ correct VS Code icon

const VIOLET = "#7B2FFF";
const CYAN = "#00F5FF";
const GRAD = `linear-gradient(135deg, ${VIOLET}, ${CYAN})`;

const ICON_MAP: Record<string, { component: React.ElementType; color: string }> = {
  react:      { component: SiReact,      color: "#61DAFB" },
  nextjs:     { component: SiNextdotjs,  color: "#ffffff" },
  typescript: { component: SiTypescript, color: "#3178C6" },
  tailwind:   { component: SiTailwindcss,color: "#38BDF8" },
  motion:     { component: SiFramer,     color: "#FF4D9E" },
  nodejs:     { component: SiNodedotjs,  color: "#68A063" },
  express:    { component: SiExpress,    color: "#ffffff" },
  postgresql: { component: SiPostgresql, color: "#336791" },
  mongodb:    { component: SiMongodb,    color: "#4DB33D" },
  prisma:     { component: SiPrisma,     color: "#A5F3FC" },
  git:        { component: SiGit,        color: "#F05032" },
  docker:     { component: SiDocker,     color: "#2496ED" },
  vercel:     { component: SiVercel,     color: "#ffffff" },
  figma:      { component: SiFigma,      color: "#F24E1E" },
  vscode:     { component: VscVscode,    color: "#007ACC" }, // ✅ fixed
};

const skillGroups = [
  {
    category: "Frontend",
    label: "UI & Interfaces",
    skills: [
      { name: "React",         icon: "react",      level: 92 },
      { name: "Next.js",       icon: "nextjs",     level: 88 },
      { name: "TypeScript",    icon: "typescript", level: 85 },
      { name: "Tailwind CSS",  icon: "tailwind",   level: 90 },
      { name: "Framer Motion", icon: "motion",     level: 78 },
    ],
  },
  {
    category: "Backend",
    label: "APIs & Databases",
    skills: [
      { name: "Node.js",    icon: "nodejs",     level: 85 },
      { name: "Express",    icon: "express",    level: 82 },
      { name: "PostgreSQL", icon: "postgresql", level: 75 },
      { name: "MongoDB",    icon: "mongodb",    level: 78 },
      { name: "Prisma",     icon: "prisma",     level: 72 },
    ],
  },
  {
    category: "Tools & DevOps",
    label: "Dev Environment",
    skills: [
      { name: "Git",     icon: "git",    level: 90 },
      { name: "Docker",  icon: "docker", level: 70 },
      { name: "Vercel",  icon: "vercel", level: 88 },
      { name: "Figma",   icon: "figma",  level: 75 },
      { name: "VS Code", icon: "vscode", level: 95 },
    ],
  },
];

const allSkills = skillGroups.flatMap((g) => g.skills);

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient orb */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(123,47,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: VIOLET, textTransform: "uppercase" as const, display: "block", marginBottom: "1rem" }}>
            02. SKILLS
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F0F0FF", lineHeight: 1.1, marginBottom: "1rem" }}>
            Tools I{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Master</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontSize: "1rem", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
            A curated stack I use daily to build fast, accessible, production-ready products.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {skillGroups.map((group, gi) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + gi * 0.12 }}>

              {/* Group header */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: VIOLET, textTransform: "uppercase" as const }}>
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#F0F0FF" }}>
                  {group.category}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#6B7280" }}>
                  {group.label}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
              </div>

              {/* Skills row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
                {group.skills.map((skill, si) => {
                  const iconData = ICON_MAP[skill.icon];
                  const Icon = iconData?.component;
                  const iconColor = iconData?.color ?? CYAN;

                  return (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.25 + gi * 0.1 + si * 0.06 }}
                      whileHover={{ y: -4, scale: 1.03 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px",
                        padding: "1.25rem",
                        cursor: "default",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${iconColor}40`;
                        el.style.background = `${iconColor}08`;
                        el.style.boxShadow = `0 8px 32px ${iconColor}15`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.07)";
                        el.style.background = "rgba(255,255,255,0.03)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ marginBottom: "0.9rem" }}>
                        {Icon ? (
                          <Icon style={{ fontSize: "2rem", color: iconColor, filter: `drop-shadow(0 0 8px ${iconColor}60)` }} />
                        ) : (
                          <div style={{ width: "2rem", height: "2rem", borderRadius: "6px", background: `${iconColor}20`, border: `1px solid ${iconColor}40` }} />
                        )}
                      </div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#F0F0FF", marginBottom: "0.6rem" }}>
                        {skill.name}
                      </p>
                      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.4 + gi * 0.1 + si * 0.07, ease: "easeOut" }}
                          style={{ height: "100%", background: `linear-gradient(90deg, ${iconColor}, ${iconColor}80)`, borderRadius: "2px" }}
                        />
                      </div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#4B5563", marginTop: "0.4rem", textAlign: "right" as const }}>
                        {skill.level}%
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite marquee strip — icon + name only, no duplication */}
      <div style={{ marginTop: "4rem", overflow: "hidden", padding: "1.5rem 0", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "1.5rem", width: "max-content" }}
        >
          {/* Duplicate array for seamless loop */}
          {[...allSkills, ...allSkills].map((skill, i) => {
            const iconData = ICON_MAP[skill.icon];
            const Icon = iconData?.component;
            const iconColor = iconData?.color ?? CYAN;
            return (
              <div
                key={`marquee-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "999px",
                  whiteSpace: "nowrap" as const,
                  flexShrink: 0,
                }}
              >
                {Icon && (
                  <Icon style={{ color: iconColor, fontSize: "1rem", flexShrink: 0 }} />
                )}
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#9CA3AF" }}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}