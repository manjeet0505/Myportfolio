"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, personal } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section highlight
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 10, 15, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.06)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-[72px]">

            {/* ── Logo ────────────────────────────────────────── */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="relative group flex items-center gap-3 no-underline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Initials badge */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-heading font-800 text-sm relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #7B2FFF, #00F5FF)",
                  boxShadow: "0 0 16px rgba(123,47,255,0.5)",
                }}
              >
                <span className="relative z-10">{personal.initials}</span>
                {/* shimmer sweep */}
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  }}
                />
              </div>

              {/* Name */}
              <span className="font-heading font-700 text-[var(--text-primary)] text-base hidden sm:block">
                {personal.name}
              </span>
            </motion.a>

            {/* ── Desktop Nav Links ────────────────────────────── */}
            <ul className="hidden md:flex items-center gap-1 list-none p-0 m-0">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="relative px-4 py-2 font-body text-sm font-500 rounded-lg transition-all duration-200 group"
                      style={{
                        color: isActive
                          ? "var(--neon-cyan)"
                          : "var(--text-soft)",
                        background: isActive
                          ? "rgba(0,245,255,0.06)"
                          : "transparent",
                      }}
                    >
                      <span className="relative z-10 group-hover:text-[var(--text-primary)] transition-colors duration-200">
                        {link.label}
                      </span>

                      {/* hover bg */}
                      <span
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      />

                      {/* active / hover underline */}
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                        style={{
                          width: isActive ? "60%" : "0%",
                          background:
                            "linear-gradient(90deg, var(--neon-violet), var(--neon-cyan))",
                          boxShadow: isActive
                            ? "0 0 8px var(--neon-cyan)"
                            : "none",
                        }}
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* ── Right side CTA + hamburger ───────────────────── */}
            <div className="flex items-center gap-3">
              {/* Resume button — desktop only */}
              <motion.a
                href={personal.resumeUrl}
                download
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-600 text-sm transition-all duration-300"
                style={{
                  background: "rgba(123,47,255,0.1)",
                  border: "1px solid rgba(123,47,255,0.35)",
                  color: "var(--neon-cyan)",
                }}
                whileHover={{
                  background: "rgba(123,47,255,0.2)",
                  borderColor: "rgba(123,47,255,0.7)",
                  boxShadow: "0 0 20px rgba(123,47,255,0.3)",
                  y: -1,
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Download size={14} />
                Resume
              </motion.a>

              {/* Hamburger — mobile only */}
              <motion.button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-primary)",
                }}
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 flex flex-col"
              style={{
                background: "rgba(10, 10, 20, 0.97)",
                backdropFilter: "blur(40px)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 h-[72px]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="font-heading font-700 text-base text-[var(--text-primary)]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--text-muted)",
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <ul className="flex flex-col gap-1 p-4 flex-1 list-none m-0">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-3 rounded-xl font-heading font-600 text-base transition-all duration-200"
                      style={{
                        color:
                          activeSection === link.href.replace("#", "")
                            ? "var(--neon-cyan)"
                            : "var(--text-soft)",
                        background:
                          activeSection === link.href.replace("#", "")
                            ? "rgba(0,245,255,0.06)"
                            : "transparent",
                      }}
                    >
                      <span className="font-mono text-xs text-[var(--neon-violet)] mr-3">
                        0{i + 1}.
                      </span>
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer footer */}
              <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <a
                  href={personal.resumeUrl}
                  download
                  className="btn-neon w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <Download size={15} />
                    Download Resume
                  </span>
                </a>
              </div>

              {/* Decorative orb */}
              <div
                className="orb orb-violet absolute w-40 h-40 -top-10 -right-10 opacity-40"
                style={{ animationDelay: "0s" }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}