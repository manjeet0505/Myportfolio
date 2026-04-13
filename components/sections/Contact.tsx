"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin, Clock } from "lucide-react";
import { personalInfo } from "@/lib/data";

const INFO_CARDS = [
  { icon: Mail,    label: "Email",         value: personalInfo.email,      href: `mailto:${personalInfo.email}` },
  { icon: MapPin,  label: "Location",      value: "India",                 href: null },
  { icon: Clock,   label: "Response time", value: "Within 24 hours",       href: null },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSubmit =
    form.name.trim() && form.email.trim() && form.message.trim() && status !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-violet-400 tracking-widest uppercase mb-3">
            get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Have a project in mind or just want to say hi? Drop me a message and I'll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left: info cards + socials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {INFO_CARDS.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/8 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0 group-hover:bg-violet-500/25 transition">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-white/80 hover:text-cyan-400 transition">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/80">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links from data */}
            <div className="flex gap-3 mt-2">
              {personalInfo.social?.map((s) => {
                const Icon = s.icon as React.ElementType;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition"
                    aria-label={s.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 relative rounded-3xl bg-white/4 border border-white/10 overflow-hidden"
          >
            {/* Neon top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

            <div className="p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500/15 flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm mb-6">
                      Thanks for reaching out. I'll reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-5 py-2 rounded-full border border-violet-500/40 text-violet-400 text-sm hover:bg-violet-500/10 transition"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-white/40 mb-1.5 font-medium">Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-white/40 mb-1.5 font-medium">Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-white/40 mb-1.5 font-medium">Subject</label>
                        <input
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Project inquiry, Freelance, etc."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-white/40 mb-1.5 font-medium">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell me about your project..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition resize-none"
                        />
                      </div>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                        >
                          <AlertCircle size={15} />
                          {errorMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={16} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}