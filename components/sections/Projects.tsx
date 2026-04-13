"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight, Layers } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects } from "@/lib/data";

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

// ── Featured card with 3D tilt ────────────────────────────────
function FeaturedCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const isEven = index % 2 === 0;

  return (
    <FadeUp delay={index * 0.12}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
        style={{
          rotateX: rotX, rotateY: rotY,
          transformPerspective: 1000,
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? "rgba(123,47,255,0.6)" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,47,255,0.12)" : "0 4px 24px rgba(0,0,0,0.3)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* top neon line */}
        <div style={{ height: 2, background: hovered ? GRAD : "rgba(123,47,255,0.3)", transition: "background 0.3s" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320 }}>

          {/* Image panel */}
          <div style={{
            order: isEven ? 2 : 1,
            position: "relative", overflow: "hidden",
            background: "rgba(123,47,255,0.05)",
            minHeight: 280,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* grid overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(123,47,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.08) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: `rgba(${project.accentColor === "#00F5FF" ? "0,245,255" : "123,47,255"},0.12)`, filter: "blur(40px)" }} />
            <Layers size={60} style={{ color: "rgba(123,47,255,0.25)", position: "relative" }} />

            {/* Hover overlay with links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(10,10,15,0.88)",
                backdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              }}
            >
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.6rem 1.25rem", borderRadius: "0.6rem",
                  background: GRAD, color: "#fff",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem",
                  textDecoration: "none", fontWeight: 500,
                }}>
                  <ExternalLink size={13} /> Live
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.6rem 1.25rem", borderRadius: "0.6rem",
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "#F0F0FF",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem",
                  textDecoration: "none",
                }}>
                  <FiGithub size={13} /> Code
                </a>
              )}
            </motion.div>
          </div>

          {/* Text panel */}
          <div style={{
            order: isEven ? 1 : 2,
            padding: "2.5rem",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: project.accentColor, letterSpacing: "0.12em" }}>FEATURED PROJECT</span>
              <span style={{ color: project.accentColor, fontSize: "0.75rem" }}>★</span>
            </div>

            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#F0F0FF", lineHeight: 1.15, marginBottom: "0.875rem" }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "0.28rem 0.7rem",
                  background: "rgba(123,47,255,0.1)",
                  border: "1px solid rgba(0,245,255,0.2)",
                  borderRadius: "2rem",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem",
                  color: "#00F5FF",
                }}>{tag}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem",
                  color: "#00F5FF", textDecoration: "none", fontWeight: 500,
                }}>
                  <ExternalLink size={13} /> Live Demo <ArrowUpRight size={12} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem",
                  color: "#6B7280", textDecoration: "none",
                }}>
                  <FiGithub size={13} /> View Code
                </a>
              )}
              <span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", color: "rgba(107,114,128,0.5)" }}>
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ── Small card ────────────────────────────────────────────────
function SmallCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={0.1 + index * 0.08}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "1.25rem",
          padding: "1.75rem",
          height: "100%",
          position: "relative", overflow: "hidden",
          boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(123,47,255,0.1)" : "none",
          transition: "border-color 0.3s, box-shadow 0.3s",
          cursor: "default",
        }}
      >
        {/* top accent bar */}
        <motion.div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          transformOrigin: "left",
        }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.2)" }}>
            <Layers size={20} style={{ color: "#7B2FFF" }} />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: hovered ? "rgba(255,255,255,0.08)" : "transparent", color: "#6B7280", textDecoration: "none", transition: "all 0.2s" }}>
                <FiGithub size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: hovered ? "rgba(0,245,255,0.1)" : "transparent", color: hovered ? "#00F5FF" : "#6B7280", textDecoration: "none", transition: "all 0.2s" }}>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#F0F0FF", marginBottom: "0.6rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ padding: "0.22rem 0.6rem", background: "rgba(123,47,255,0.1)", border: "1px solid rgba(0,245,255,0.15)", borderRadius: "2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#00F5FF" }}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{ fontSize: "0.65rem", color: "#6B7280", padding: "0.22rem 0.4rem", alignSelf: "center" }}>+{project.tags.length - 3}</span>
          )}
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={{ padding: "7rem 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient orb */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", top: "20%", right: "-15%", background: "rgba(0,245,255,0.06)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00F5FF", textTransform: "uppercase" }}>Projects</span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F0F0FF", lineHeight: 1.1, marginBottom: "1rem" }}>
            Things I've{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Built</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6B7280", maxWidth: 480, lineHeight: 1.75, marginBottom: "3.5rem" }}>
            A selection of projects I've crafted — from full-stack SaaS apps to open-source tools.
          </p>
        </FadeUp>

        {/* Featured projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "4rem" }}>
          {featured.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <FadeUp>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.5), rgba(0,245,255,0.5), transparent)" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#6B7280", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>OTHER PROJECTS</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.5), rgba(0,245,255,0.5), transparent)" }} />
              </div>
            </FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
              {others.map((p, i) => <SmallCard key={p.id} project={p} index={i} />)}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <FadeUp>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.8rem 1.75rem",
              background: "transparent",
              color: "#F0F0FF",
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.9rem",
              border: "1px solid rgba(123,47,255,0.4)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(123,47,255,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#7B2FFF";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(123,47,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(123,47,255,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              <FiGithub size={16} />
              View All on GitHub
              <ArrowUpRight size={15} />
            </a>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}