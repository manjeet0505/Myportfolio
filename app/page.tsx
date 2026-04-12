export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="section-label justify-center">Status</p>
        <h1 className="section-title neon-text">
          Foundation Ready ✓
        </h1>
        <p className="text-[var(--text-muted)] font-mono text-sm">
          Sections will appear here as we build them step by step.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <span className="tech-tag">Next.js ✓</span>
          <span className="tech-tag">Tailwind ✓</span>
          <span className="tech-tag">Fonts ✓</span>
          <span className="tech-tag">Design Tokens ✓</span>
        </div>
      </div>
    </main>
  );
}