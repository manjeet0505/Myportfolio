"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin, Phone, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const EMAIL = "mishramanjeet26@gmail.com";
const PHONE = "9540932794";
const LINKEDIN = "https://linkedin.com/in/manjeet-mishra-175705260";
const GITHUB = "https://github.com/manjeet0505";

type FormValues = { name: string; email: string; message: string };
type Status = "idle" | "loading" | "success" | "error";

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors hover:border-cyan-400/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--x) var(--y), rgba(34,211,238,0.15), transparent 70%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-white/40 transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90">
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls =
  "peer w-full rounded-xl border border-white/10 bg-black/30 px-4 pb-2.5 pt-5 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fade} transition={{ duration: 0.6 }} className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to SDE-1 / AI Engineer roles
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              great together
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Hiring, collaborating, ya bas hi bolna hai? Message bhej, 24 ghante ke andar reply aayega.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: info cards */}
          <motion.div {...fade} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4 lg:col-span-2">
            <SpotlightCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Mail size={20} /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/40">Email</p>
                  <p className="truncate text-sm text-white">{EMAIL}</p>
                </div>
                <button onClick={copyEmail} aria-label="Copy email"
                  className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-cyan-400/40 hover:text-cyan-300">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-5">
              <a href={`tel:+91${PHONE}`} className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Phone size={20} /></div>
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <p className="text-sm text-white">+91 {PHONE}</p>
                </div>
              </a>
            </SpotlightCard>

            <SpotlightCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/10 text-sky-300"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs text-white/40">Location</p>
                  <p className="text-sm text-white">Gurugram, India · open to remote</p>
                </div>
              </div>
            </SpotlightCard>

            <div className="flex gap-4 pt-2">
              {[{ href: GITHUB, Icon: FaGithub, label: "GitHub" }, { href: LINKEDIN, Icon: FaLinkedin, label: "LinkedIn" }].map(
                ({ href, Icon, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm text-white/70 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-white">
                    <Icon size={18} /> {label}
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...fade} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <SpotlightCard className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Your name" error={errors.name?.message}>
                    <input placeholder=" " className={inputCls} {...register("name", { required: "Naam toh bata" })} />
                  </Field>
                  <Field label="Email address" error={errors.email?.message}>
                    <input type="email" placeholder=" " className={inputCls}
                      {...register("email", { required: "Email chahiye", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email sahi nahi hai" } })} />
                  </Field>
                </div>
                <Field label="Your message" error={errors.message?.message}>
                  <textarea rows={5} placeholder=" " className={`${inputCls} resize-none`}
                    {...register("message", { required: "Kuch toh likh", minLength: { value: 10, message: "Thoda aur detail mein (min 10 chars)" } })} />
                </Field>

                <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-60">
                  <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
                  {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {status === "loading" ? "Sending..." : "Send message"}
                </motion.button>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-300">
                      <CheckCircle size={18} /> Message bhej diya. Jaldi reply karunga!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
                      <AlertCircle size={18} /> Kuch gadbad hui. Direct email kar de.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}