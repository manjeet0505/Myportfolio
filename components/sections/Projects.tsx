"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects, type Project } from "@/lib/data";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function splitTitle(title: string) {
  const [name, ...rest] = title.split(/:\s*/);
  return { name, tagline: rest.join(": ") };
}

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

// Cursor-follow spotlight: updates CSS vars directly, no re-renders
function useSpotlight(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { ref, onPointerMove };
}

function Spotlight({ color }: { color: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), ${color}1f, transparent 60%)`,
      }}
    />
  );
}

function Placeholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 25% 20%, ${accent}30, transparent 55%), radial-gradient(circle at 80% 90%, rgba(123,47,255,0.18), transparent 50%), #0f0f1a`,
      }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="relative px-6 text-center font-heading text-3xl font-bold tracking-tight text-white/80 sm:text-4xl">
        {name}
      </span>
    </div>
  );
}

function StatusPill({ project }: { project: Project }) {
  if (project.liveUrl) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-emerald-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Live
      </span>
    );
  }
  if (project.inDevelopment) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        In development
      </span>
    );
  }
  return null;
}

// ── Featured card ─────────────────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const spot = useSpotlight(!reduce);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  // Catch images that already failed before hydration
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const { name, tagline } = splitTitle(project.title);
  const accent = project.accentColor;
  const isEven = index % 2 === 0;
  const showImage = !!project.image && !failed;
  const host = hostOf(project.liveUrl);
  const hasLinks = !!project.liveUrl || !!project.githubUrl;

  return (
    <motion.div
      ref={spot.ref}
      onPointerMove={spot.onPointerMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl bg-white/[0.03]"
      style={{
        border: `1px solid ${hovered ? `${accent}80` : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.5), 0 0 50px ${accent}1a`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        className="h-0.5"
        style={{ background: hovered ? GRAD : `${accent}55`, transition: "background 0.3s" }}
      />
      <Spotlight color={accent} />

      <div className="relative grid md:grid-cols-12">
        {/* Screenshot in a browser frame */}
        <div className={`flex items-center p-4 sm:p-6 md:col-span-7 md:p-8 ${isEven ? "md:order-2" : "md:order-1"}`}>
         <motion.div
  ref={frameRef}
  initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
  className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c0c14] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
>
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[0.65rem] text-white/40">
                {host ?? "coming soon"}
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              {showImage ? (
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <motion.img
                    ref={imgRef}
                    src={project.image}
                    alt={`${name} screenshot`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover object-top"
                    style={{ y, scale: 1.15 }}
                  />
                </div>
              ) : (
                <Placeholder name={name} accent={accent} />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(10,10,15,0.25) 0%, transparent 60%)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center p-6 sm:p-8 md:col-span-5 md:p-10 ${isEven ? "md:order-1" : "md:order-2"}`}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="select-none font-heading text-5xl font-bold leading-none"
              style={{ color: "transparent", WebkitTextStroke: `1px ${accent}77` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <StatusPill project={project} />
            <span className="font-mono text-[0.7rem] text-white/35">{project.year}</span>
          </div>

          <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-[#F0F0FF] sm:text-3xl">
            {name}
          </h3>
          {tagline && (
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: accent }}>
              {tagline}
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-[#8A8AA3]">{project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <motion.ul
              variants={list}
              initial={reduce ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-5 flex flex-col gap-2.5"
            >
              {project.highlights.map((h) => (
                <motion.li key={h} variants={item} className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-[#A0A0B8]">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                  <span>{h}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/20 bg-violet-500/10 px-2.5 py-1 font-mono text-[0.66rem] text-cyan-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-500"
                style={{ boxShadow: `0 0 24px ${accent}40` }}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <FiGithub size={14} /> Code
              </a>
            )}
            {!hasLinks && (
              <span className="font-mono text-xs text-white/40">Demo and repo links coming soon</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Small card ────────────────────────────────────────────────
function SmallCard({ project, index, number }: { project: Project; index: number; number: number }) {
  const reduce = useReducedMotion();
  const spot = useSpotlight(!reduce);
  const { name, tagline } = splitTitle(project.title);
  const accent = project.accentColor;
  const href = project.liveUrl ?? project.githubUrl;
  const shown = project.tags.slice(0, 4);
  const extra = project.tags.length - shown.length;

  return (
    <motion.div
      ref={spot.ref}
      onPointerMove={spot.onPointerMove}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20"
    >
      <Spotlight color={accent} />
      <div
        className="absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      <div className="relative mb-5 flex items-start justify-between">
        <span
          className="select-none font-heading text-4xl font-bold leading-none"
          style={{ color: "transparent", WebkitTextStroke: `1px ${accent}77` }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <div className="relative z-10 flex gap-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} source code`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <FiGithub size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live demo`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="relative font-heading text-lg font-bold tracking-tight text-[#F0F0FF]">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      {tagline && (
        <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em]" style={{ color: accent }}>
          {tagline}
        </p>
      )}
      <p className="relative mt-3 text-[0.82rem] leading-relaxed text-[#8A8AA3]">{project.description}</p>

      <div className="relative mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {shown.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-400/15 bg-violet-500/10 px-2.5 py-1 font-mono text-[0.64rem] text-cyan-400"
          >
            {tag}
          </span>
        ))}
        {extra > 0 && <span className="px-1 font-mono text-[0.64rem] text-white/35">+{extra}</span>}
        <span className="ml-auto font-mono text-[0.68rem] text-white/30">{project.year}</span>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Projects() {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-[1100px]">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-cyan-400 shadow-[0_0_8px_#00F5FF]" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-cyan-400">Projects</span>
          </div>
          <h2 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-[#F0F0FF] md:text-5xl">
            Things I&apos;ve <span className="neon-text">Built</span>
          </h2>
          <p className="max-w-lg text-[0.95rem] leading-relaxed text-[#6B7280]">
            AI products and full-stack apps, built end to end, from the agent logic to the interface.
          </p>
        </motion.div>

        {/* Featured */}
        <div className="mb-16 flex flex-col gap-8">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Others */}
        {others.length > 0 && (
          <>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              <span className="whitespace-nowrap font-mono text-[0.68rem] tracking-[0.12em] text-[#6B7280]">
                OTHER PROJECTS
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <SmallCard key={p.id} project={p} index={i} number={featured.length + i + 1} />
              ))}

              <motion.a
                href="https://github.com/manjeet0505"
                target="_blank"
                rel="noopener noreferrer"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: others.length * 0.08 }}
                className="group flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-6 text-center transition-colors hover:border-violet-500/50 hover:bg-violet-500/[0.05]"
              >
                <FiGithub size={28} className="text-white/70 transition-colors group-hover:text-cyan-400" />
                <span className="font-heading text-base font-semibold text-[#F0F0FF]">More on GitHub</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-white/40 transition-colors group-hover:text-cyan-400">
                  github.com/manjeet0505 <ArrowUpRight size={12} />
                </span>
              </motion.a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}