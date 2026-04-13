import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen">
      <Navbar />
      <Hero />
      <About />

      {/* Placeholders — replaced in upcoming steps */}
      <section id="skills" className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-3xl font-heading font-bold"
          style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Skills
        </p>
        <p className="text-white/40 text-sm">Coming in Step 5 ↓</p>
      </section>

      <section id="projects" className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-3xl font-heading font-bold"
          style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Projects
        </p>
        <p className="text-white/40 text-sm">Coming in Step 6 ↓</p>
      </section>

      <section id="experience" className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-3xl font-heading font-bold"
          style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Experience
        </p>
        <p className="text-white/40 text-sm">Coming in Step 7 ↓</p>
      </section>

      <section id="contact" className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-3xl font-heading font-bold"
          style={{ background: "linear-gradient(135deg,#7B2FFF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Contact
        </p>
        <p className="text-white/40 text-sm">Coming in Step 8 ↓</p>
      </section>
    </main>
  );
}