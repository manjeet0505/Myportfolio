import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0f",
          secondary: "#0f0f1a",
          card: "rgba(255, 255, 255, 0.04)",
        },
        neon: {
          violet: "#7B2FFF",
          cyan: "#00F5FF",
          pink: "#FF2FBE",
        },
        text: {
          primary: "#F0F0FF",
          muted: "#6B7280",
          soft: "#A0A0B8",
        },
        border: {
          glass: "rgba(255, 255, 255, 0.08)",
          neon: "rgba(123, 47, 255, 0.4)",
        },
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)",
        "neon-gradient-pink": "linear-gradient(135deg, #7B2FFF 0%, #FF2FBE 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "hero-glow": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,47,255,0.25) 0%, transparent 70%)",
        "grid-pattern":
          "linear-gradient(rgba(123,47,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      boxShadow: {
        "neon-violet": "0 0 20px rgba(123, 47, 255, 0.5), 0 0 60px rgba(123, 47, 255, 0.2)",
        "neon-cyan": "0 0 20px rgba(0, 245, 255, 0.5), 0 0 60px rgba(0, 245, 255, 0.2)",
        "neon-pink": "0 0 20px rgba(255, 47, 190, 0.5), 0 0 60px rgba(255, 47, 190, 0.2)",
        glass: "0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        typewriter: "typewriter 3s steps(30) forwards",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(123,47,255,0.4)" },
          "100%": { boxShadow: "0 0 40px rgba(123,47,255,0.8), 0 0 80px rgba(0,245,255,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },
    },
  },
  plugins: [],
};

export default config;