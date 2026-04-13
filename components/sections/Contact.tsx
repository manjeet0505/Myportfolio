"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { FiSend, FiUser, FiMessageSquare, FiCheck, FiArrowRight, FiMail } from "react-icons/fi";

const VIOLET = "#7B2FFF";
const CYAN = "#00F5FF";
const GRAD = `linear-gradient(135deg, ${VIOLET}, ${CYAN})`;

const contactItems = [
  { icon: "⚡", title: "Fast Response", desc: "Usually within 24 hours" },
  { icon: "🤝", title: "Open to Roles", desc: "SDE · Full Stack · AI Engineer" },
  { icon: "🌍", title: "Location", desc: `${personalInfo.location} · Remote OK` },
];

const socialColors: Record<string, { color: string; bg: string; border: string }> = {
  GitHub:   { color: "#ffffff",  bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)" },
  LinkedIn: { color: "#0A66C2",  bg: "rgba(10,102,194,0.08)",  border: "rgba(10,102,194,0.25)"  },
  Twitter:  { color: "#1DA1F2",  bg: "rgba(29,161,242,0.07)",  border: "rgba(29,161,242,0.2)"   },
  Email:    { color: CYAN,       bg: "rgba(0,245,255,0.06)",   border: "rgba(0,245,255,0.2)"    },
};

type FormState = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
    setTimeout(() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }, 3500);
  };

  const inputBase: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
    padding: "14px 16px 14px 44px", color: "#F0F0FF",
    fontFamily: "Inter, sans-serif", fontSize: "0.9rem",
    outline: "none", transition: "all 0.3s ease", boxSizing: "border-box",
  };
  const inputFocused: React.CSSProperties = {
    ...inputBase, border: "1px solid rgba(123,47,255,0.5)",
    background: "rgba(123,47,255,0.04)",
    boxShadow: "0 0 0 3px rgba(123,47,255,0.08)",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "7rem 0 6rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", letterSpacing: "0.2em", color: VIOLET, textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            05. CONTACT
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#F0F0FF", lineHeight: 1.1, marginBottom: "1rem" }}>
            Let&apos;s Build Something{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Together</span>
          </h2>
          <p style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontSize: "1rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Open to full-time roles, freelance projects, and interesting collaborations. Drop a message — I respond fast.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2rem", alignItems: "start" }} className="contact-grid">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {contactItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }} whileHover={{ x: 4 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#F0F0FF", fontSize: "0.88rem", marginBottom: "2px" }}>{item.title}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontSize: "0.8rem" }}>{item.desc}</p>
                </div>
                <FiArrowRight style={{ marginLeft: "auto", color: VIOLET, opacity: 0.5 }} />
              </motion.div>
            ))}

            <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(123,47,255,0.3), rgba(0,245,255,0.1), transparent)", margin: "0.25rem 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#4B5563", textTransform: "uppercase" }}>Find me on</p>

              {personalInfo.social.map((s, i) => {
                const c = socialColors[s.label] ?? { color: CYAN, bg: "rgba(0,245,255,0.06)", border: "rgba(0,245,255,0.2)" };
                const Icon = s.icon;
                return (
                  <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: 0.55 + i * 0.1 }}
                    whileHover={{ x: 6 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.85rem 1rem", background: c.bg, border: `1px solid ${c.border}`, borderRadius: "12px", textDecoration: "none", transition: "all 0.3s ease" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ color: c.color, fontSize: "1rem" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#F0F0FF", fontSize: "0.82rem", marginBottom: "1px" }}>{s.label}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", color: c.color, fontSize: "0.72rem", opacity: 0.8 }}>
                        {s.url.replace("mailto:", "").replace("https://", "")}
                      </p>
                    </div>
                    <FiArrowRight style={{ marginLeft: "auto", color: c.color, opacity: 0.4 }} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2rem", backdropFilter: "blur(16px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: GRAD }} />
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#F0F0FF", marginBottom: "0.4rem" }}>Send a Message</h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontSize: "0.82rem", marginBottom: "1.75rem" }}>I&apos;ll get back to you within 24 hours ✦</p>

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "3rem 1rem", textAlign: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0,245,255,0.1)", border: "2px solid rgba(0,245,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FiCheck style={{ color: CYAN, fontSize: "1.8rem" }} />
                  </div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F0F0FF" }}>Message Sent! 🎉</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontSize: "0.85rem" }}>I&apos;ll reply as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ position: "relative" }}>
                    <FiUser style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused === "name" ? VIOLET : "#4B5563", fontSize: "0.9rem", pointerEvents: "none" }} />
                    <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} style={focused === "name" ? inputFocused : inputBase} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <FiMail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused === "email" ? VIOLET : "#4B5563", fontSize: "0.9rem", pointerEvents: "none" }} />
                    <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={focused === "email" ? inputFocused : inputBase} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <FiMessageSquare style={{ position: "absolute", left: "14px", top: "16px", color: focused === "message" ? VIOLET : "#4B5563", fontSize: "0.9rem", pointerEvents: "none" }} />
                    <textarea name="message" placeholder="Tell me about your project or opportunity..." rows={5} value={form.message} onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...(focused === "message" ? inputFocused : inputBase), resize: "none", paddingTop: "14px", lineHeight: 1.6 }} />
                  </div>
                  <motion.button onClick={handleSubmit} disabled={status === "sending" || !form.name || !form.email || !form.message}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%", padding: "14px", borderRadius: "12px", border: "none",
                      background: (!form.name || !form.email || !form.message) ? "rgba(123,47,255,0.2)" : GRAD,
                      color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem",
                      cursor: (!form.name || !form.email || !form.message) ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      boxShadow: (!form.name || !form.email || !form.message) ? "none" : "0 0 24px rgba(123,47,255,0.3)",
                      opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1,
                      transition: "all 0.3s ease",
                    }}>
                    {status === "sending" ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%" }} /> Sending...</>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}