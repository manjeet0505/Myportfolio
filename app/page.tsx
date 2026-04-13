import Navbar    from "@/components/layout/Navbar";
import Hero       from "@/components/sections/Hero";
import About      from "@/components/sections/About";
import Skills     from "@/components/sections/Skills";
import Projects   from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0f", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />

      {/* Contact + Footer placeholder */}
      <section id="contact" style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", color: "#6B7280" }}>
          Contact section — coming in Step 8 ↓
        </p>
      </section>
    </main>
  );
}