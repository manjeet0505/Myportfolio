import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Security Headers ────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to ALL routes
        source: "/(.*)",
        headers: [
          // 1. Prevent DNS prefetching leaks
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // 2. XSS Protection (legacy browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // 3. Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // 4. Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // 5. Control referrer info
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // 6. Restrict browser features/APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // 7. Force HTTPS (HSTS) — enable after deploying to Vercel with HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // 8. Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Allow inline styles + Tailwind/Framer Motion runtime styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow Google Fonts + EmailJS CDN
              "font-src 'self' https://fonts.gstatic.com",
              // Allow scripts: self + EmailJS CDN
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net",
              // Allow images: self + data URIs (for Next.js Image optimization)
              "img-src 'self' data: blob: https:",
              // Allow connections: EmailJS API
              "connect-src 'self' https://api.emailjs.com",
              // Block all frames
              "frame-src 'none'",
              // Block object embeds
              "object-src 'none'",
              // Upgrade insecure requests
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ─── CORS for API routes ─────────────────────────────────────────────────
  // If you add /app/api/* routes, this lets you control CORS per-route.
  // For static portfolio, headers above cover everything.
  // Example API route CORS: add these in your route.ts handler:
  //   response.headers.set("Access-Control-Allow-Origin", "https://yourdomain.com")
  //   response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  //   response.headers.set("Access-Control-Allow-Headers", "Content-Type")

  // ─── Performance & Build ─────────────────────────────────────────────────
  reactStrictMode: true,
  poweredByHeader: false,        // Remove "X-Powered-By: Next.js" header (security)
  compress: true,                // Enable gzip compression
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [],
  },
};

export default nextConfig;