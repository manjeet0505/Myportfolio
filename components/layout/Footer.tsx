"use client";

import { motion } from "framer-motion";
import { FiArrowUp, FiMail } from "react-icons/fi";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-black/20 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="mx-auto max-w-[1100px] px-6 pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <button type="button" onClick={scrollToTop} className="text-left" aria-label="Back to top">
              <span className="font-heading text-xl font-bold tracking-tight">
                <span className="text-white">Manjeet</span>
                <span className="text-white/40"> Kumar Mishra</span>
              </span>
            </button>
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-cyan-400">
              Full-Stack · AI Engineer
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8A8AA3]">
              Building AI products end to end, from multi-agent backends to the interfaces around them.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono text-[0.68rem] text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Open to SDE-1 &amp; AI Engineer roles
            </span>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-white/35">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#8A8AA3] transition-colors hover:text-cyan-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-white/35">Connect</p>
            <a
              href="mailto:mishramanjeet26@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-300"
            >
              <FiMail size={15} /> Say hello
            </a>
            <div className="mt-4 flex items-center gap-2">
              {personalInfo.social.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -3 }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#9CA3AF] transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:text-cyan-400"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
              <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ y: -3 }}
                aria-label="Scroll to top"
                suppressHydrationWarning
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-400 transition-colors hover:border-violet-400"
              >
                <FiArrowUp size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[#4B5563]">© 2026 {personalInfo.name}. All rights reserved.</p>
          <p className="font-mono text-[0.7rem] text-[#4B5563]">
            Built with <span className="neon-text font-semibold">Next.js</span> &amp;{" "}
            <span className="neon-text font-semibold">Framer Motion</span> · Deployed on{" "}
            <span className="neon-text font-semibold">Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}