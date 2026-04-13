"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Star, ArrowUpRight, Layers } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects } from "@/lib/data";

const GRAD  = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";
const MUTED = "#6B7280";
const WHITE = "#F0F0FF";
const GLASS = "rgba(255,255,255,0.04)";

// ── Fade-up wrapper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ── 3-D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]),  { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r   = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };

  return (
    <motion.div ref={ref} className={className} style={{ ...style, rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <FadeUp delay={index * 0.15}>
      <TiltCard
        style={{
          background: GLASS,
          backdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "1.25rem",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,47,255,0.15)"
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className={`grid md:grid-cols-2 gap-0`}
          style={{ minHeight: 340 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image panel */}
          <div
            className={`relative overflow-hidden ${isEven ? "md:order-2" : "md:order-1"}`}
            style={{ minHeight: 260, background: "rgba(123,47,255,0.06)" }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(123,47,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Top glow */}
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: GRAD, opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s" }}
            />
            {/* Accent number */}
            <div className="absolute top-4 left-4 font-mono text-xs"
              style={{ color: "rgba(123,47,255,0.4)", letterSpacing: "0.1em" }}>
              0{index + 1}
            </div>
            {/* Icon placeholder (replace with screenshot later) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers size={64} style={{ color: "rgba(123,47,255,0.2)" }} />
            </div>
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-500"
                  style={{ background: GRAD, color: "#fff" }}>
                  <ExternalLink size={14} /> Live
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: WHITE }}>
                  <FiGithub size={14} /> Code
                </a>
              )}
            </motion.div>
          </div>

          {/* Text panel */}
          <div
            className={`flex flex-col justify-center p-8 ${isEven ? "md:order-1" : "md:order-2"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs" style={{ color: project.accentColor, letterSpacing: "0.12em" }}>
                FEATURED PROJECT
              </span>
              <Star size={12} style={{ color: project.accentColor }} />
            </div>

            <h3 className="font-heading font-800 text-2xl mb-3" style={{ color: WHITE, lineHeight: 1.15 }}>
              {project.title}
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: MUTED }}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs font-500 group"
                  style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>
                  <ExternalLink size={13} />
                  Live Demo
                  <motion.span className="inline-block" animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
                    <ArrowUpRight size={13} />
                  </motion.span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs"
                  style={{ color: MUTED, textDecoration: "none" }}>
                  <FiGithub size={13} />
                  View Code
                </a>
              )}
              <span className="ml-auto font-mono text-xs" style={{ color: "rgba(107,114,128,0.5)" }}>
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </FadeUp>
  );
}

// ── Small card ────────────────────────────────────────────────────────────────
function SmallCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeUp delay={0.1 + index * 0.08}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: GLASS,
          border: `1px solid ${hovered ? "rgba(123,47,255,0.45)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "1rem",
          padding: "1.5rem",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s",
          boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4)" : "none",
          cursor: "default",
        }}
      >
        {/* Top neon bar */}
        <motion.div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: project.accentColor === "#00F5FF" ? GRAD : `linear-gradient(90deg, ${project.accentColor}, transparent)`,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.2)" }}>
            <Layers size={18} style={{ color: "var(--neon-violet)" }} />
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                style={{
                  background: hovered ? "rgba(255,255,255,0.08)" : "transparent",
                  color: MUTED, transition: "all 0.2s",
                }}>
                <FiGithub size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                style={{
                  background: hovered ? "rgba(0,245,255,0.1)" : "transparent",
                  color: hovered ? "var(--neon-cyan)" : MUTED, transition: "all 0.2s",
                }}>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-heading font-700 text-base mb-2" style={{ color: WHITE }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED, fontSize: "0.8rem" }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tech-tag" style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem" }}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{ fontSize: "0.65rem", color: MUTED, padding: "0.2rem 0.4rem", alignSelf: "center" }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects    = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding" style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div className="orb orb-cyan" style={{ width: 500, height: 500, top: "20%", right: "-15%", opacity: 0.06, animationDelay: "2s" }} />

      <div className="container-custom">
        {/* Header */}
        <FadeUp>
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            Things I've{" "}
            <span style={{
              background: GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Built
            </span>
          </h2>
          <p className="mt-3 mb-14 max-w-xl text-sm leading-relaxed" style={{ color: MUTED }}>
            A selection of projects I've crafted — from full-stack SaaS apps to open-source tools.
          </p>
        </FadeUp>

        {/* Featured */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Divider */}
        {otherProjects.length > 0 && (
          <>
            <FadeUp>
              <div className="flex items-center gap-4 mb-10">
                <div className="neon-divider flex-1" />
                <span className="font-mono text-xs" style={{ color: MUTED, whiteSpace: "nowrap", letterSpacing: "0.1em" }}>
                  OTHER PROJECTS
                </span>
                <div className="neon-divider flex-1" />
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {otherProjects.map((p, i) => (
                <SmallCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <FadeUp>
          <div className="flex justify-center">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2"
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