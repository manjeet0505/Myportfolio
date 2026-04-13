"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { FiArrowUp } from "react-icons/fi";

const VIOLET = "#7B2FFF";
const CYAN = "#00F5FF";
const GRAD = `linear-gradient(135deg, ${VIOLET}, ${CYAN})`;

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>

      {/* Top gradient line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${VIOLET}55, ${CYAN}33, transparent)` }} />

      {/* Background glow */}
      <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "200px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(123,47,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} style={{ cursor: "pointer" }} onClick={scrollToTop}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {personalInfo.initials}
            </span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#4B5563", display: "block", letterSpacing: "0.1em", marginTop: "2px" }}>
              Full-Stack · AI Engineer
            </span>
          </motion.div>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#6B7280", textDecoration: "none", padding: "0.4rem 0.75rem", borderRadius: "8px", transition: "all 0.25s ease" }}
                onMouseEnter={(e) => { const el = e.target as HTMLElement; el.style.color = "#F0F0FF"; el.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.color = "#6B7280"; el.style.background = "transparent"; }}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + scroll-to-top */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {personalInfo.social.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }} aria-label={s.label}
                  style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", textDecoration: "none", fontSize: "0.95rem", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = CYAN; el.style.borderColor = "rgba(0,245,255,0.3)"; el.style.background = "rgba(0,245,255,0.06)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#9CA3AF"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.background = "rgba(255,255,255,0.04)"; }}>
                  <Icon />
                </motion.a>
              );
            })}

            <motion.button onClick={scrollToTop} whileHover={{ y: -3, scale: 1.1 }}
            suppressHydrationWarning
              style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(123,47,255,0.1)", border: "1px solid rgba(123,47,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: VIOLET, cursor: "pointer", marginLeft: "0.25rem" }}>
              <FiArrowUp />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1.5rem" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: "Inter, sans-serif", color: "#4B5563", fontSize: "0.78rem" }}>
            © 2026 {personalInfo.name} · All rights reserved
          </p>
          <p style={{ fontFamily: "JetBrains Mono, monospace", color: "#4B5563", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
            Built with{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>Next.js</span>
            {" "}&amp;{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>Framer Motion</span>
            {" "}✦ Deployed on{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}