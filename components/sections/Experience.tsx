"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { experiences, personalInfo, type Experience as Exp } from "@/lib/data";

const GRAD = "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)";

const TYPE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  "Full-time": { bg: "rgba(123,47,255,0.12)", border: "rgba(123,47,255,0.35)", color: "#a78bfa" },
  "Part-time": { bg: "rgba(0,245,255,0.08)", border: "rgba(0,245,255,0.25)", color: "#00F5FF" },
  Freelance: { bg: "rgba(255,47,190,0.1)", border: "rgba(255,47,190,0.3)", color: "#FF2FBE" },
  Internship: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", color: "#22c55e" },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Date helpers (no Date object, so no server/client mismatch) ─
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function monthIndex(s: string) {
  const [m, y] = s.trim().split(/\s+/);
  const mi = MONTHS.indexOf((m ?? "").slice(0, 3).toLowerCase());
  return Number(y) * 12 + (mi < 0 ? 0 : mi);
}

function duration(start: string, end: string) {
  if (end === "Present") return null;
  const n = monthIndex(end) - monthIndex(start) + 1;
  if (!Number.isFinite(n) || n <= 0) return null;
  return n === 1 ? "1 mo" : `${n} mos`;
}

// Latest first
const sorted: Exp[] = [...experiences].sort((a, b) => monthIndex(b.startDate) - monthIndex(a.startDate));

// ── Cursor-follow spotlight ───────────────────────────────────
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

// ── One timeline entry ────────────────────────────────────────
function Entry({ exp }: { exp: Exp }) {
  const reduce = useReducedMotion();
  const spot = useSpotlight(!reduce);
  const liRef = useRef<HTMLLIElement>(null);
  const seen = useInView(liRef, { once: true, margin: "0px 0px -45% 0px" });

  const current = exp.endDate === "Present";
  const dur = duration(exp.startDate, exp.endDate);
  const typeStyle = TYPE_COLORS[exp.type] ?? TYPE_COLORS["Full-time"];
  const year = exp.startDate.split(" ")[1];

  return (
    <li ref={liRef} className="relative pb-12 pl-10 last:pb-0 md:pl-14">
      {/* Timeline dot */}
      <span className="absolute left-0 top-8 flex h-[22px] w-[22px] items-center justify-center">
        {current && <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/40" />}
        <span
          className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: seen ? "transparent" : "rgba(255,255,255,0.18)",
            background: seen ? GRAD : "#0a0a0f",
            boxShadow: seen ? "0 0 16px rgba(123,47,255,0.7)" : "none",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-500"
            style={{ opacity: seen ? 1 : 0 }}
          />
        </span>
      </span>

      {/* Card */}
      <motion.div
        ref={spot.ref}
        onPointerMove={spot.onPointerMove}
        initial={reduce ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-[border-color,box-shadow] duration-300 hover:border-violet-500/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(123,47,255,0.12)]"
      >
        <div className="h-0.5 bg-gradient-to-r from-violet-500/60 via-cyan-400/40 to-transparent" />

        {/* spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(123,47,255,0.14), transparent 60%)",
          }}
        />

        {/* year watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-5 select-none font-heading text-7xl font-bold leading-none sm:text-8xl"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
        >
          {year}
        </span>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-500/30 bg-violet-500/15 font-heading text-lg font-bold text-violet-300">
                {exp.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={exp.logoUrl} alt={`${exp.company} logo`} className="h-full w-full object-cover" />
                ) : (
                  exp.company.charAt(0)
                )}
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#F0F0FF] sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-sm text-cyan-400">{exp.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.65rem] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Current
                </span>
              )}
              <span
                className="rounded-full border px-2.5 py-1 font-mono text-[0.65rem]"
                style={{ background: typeStyle.bg, borderColor: typeStyle.border, color: typeStyle.color }}
              >
                {exp.type}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-[#8A8AA3]">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {exp.startDate} → {current ? <span className="text-emerald-400">Present</span> : exp.endDate}
            </span>
            {dur && <span className="text-white/35">· {dur}</span>}
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-[#A0A0B8]">{exp.description}</p>

          {/* Highlights */}
          <p className="mb-3 mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-violet-400">
            What I did
          </p>
          <motion.ul
            variants={list}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex max-w-2xl flex-col gap-2.5"
          >
            {exp.highlights.map((h) => (
              <motion.li key={h} variants={item} className="flex items-start gap-3 text-sm leading-snug text-[#C0C0D8]">
                <Check size={15} className="mt-0.5 shrink-0 text-cyan-400" />
                <span>{h}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {exp.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-2.5 py-1 font-mono text-[0.68rem] text-cyan-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </li>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Experience() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Stats come straight from the data, so they can never overclaim
  const internships = sorted.filter((e) => e.type === "Internship").length;
  const freelance = sorted.filter((e) => e.type === "Freelance").length;
  const techCount = new Set(sorted.flatMap((e) => e.technologies.map((t) => t.toLowerCase()))).size;
  const since = sorted.length ? sorted[sorted.length - 1].startDate.split(" ")[1] : "";

  const stats = [
    { value: String(internships), label: internships === 1 ? "Internship" : "Internships" },
    { value: String(freelance), label: "Freelance" },
    { value: String(techCount), label: "Technologies used" },
    { value: since, label: "Building since" },
  ];

  return (
    <section id="experience" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-cyan-400 shadow-[0_0_8px_#00F5FF]" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-cyan-400">Experience</span>
          </div>
          <h2 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-[#F0F0FF] md:text-5xl">
            Where I&apos;ve <span className="neon-text">Worked</span>
          </h2>
          <p className="max-w-lg text-[0.95rem] leading-relaxed text-[#6B7280]">
            Internships and freelance work: what I built, with what, and where. Latest first.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="font-heading text-2xl font-bold neon-text">{s.value}</div>
              <div className="mt-0.5 text-xs text-[#6B7280]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <ol ref={listRef} className="relative">
          <div className="absolute bottom-2 left-[10px] top-2 w-0.5 rounded-full bg-white/10" />
          <motion.div
            className="absolute bottom-2 left-[10px] top-2 w-0.5 origin-top rounded-full"
            style={{
              scaleY: reduce ? 1 : fill,
              background: "linear-gradient(180deg, #7B2FFF, #00F5FF)",
              boxShadow: "0 0 10px rgba(123,47,255,0.6)",
            }}
          />
          {sorted.map((exp) => (
            <Entry key={exp.id} exp={exp} />
          ))}
        </ol>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-16 flex flex-col items-start justify-between gap-5 rounded-3xl border border-violet-500/25 bg-violet-500/[0.06] p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="font-heading text-lg font-bold tracking-tight text-[#F0F0FF]">
              Looking for an SDE-1 or AI Engineer?
            </p>
            <p className="mt-1 text-sm text-[#8A8AA3]">The resume has the full picture. Or just say hi.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <Download size={14} /> Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}