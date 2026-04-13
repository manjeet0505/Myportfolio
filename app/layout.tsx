import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // ✅ Required for resolving OG/Twitter images correctly
  metadataBase: new URL("https://manjeetkumarmishra.dev"),

  title: {
    default: "Manjeet Kumar Mishra — Full-Stack Developer",
    template: "%s | Manjeet Kumar Mishra",
  },
  description:
    "Full-Stack Developer crafting modern, performant web experiences. Specializing in React, Next.js, Node.js, and everything in between.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Manjeet Kumar Mishra",
  ],
  authors: [{ name: "Manjeet Kumar Mishra" }],
  creator: "Manjeet Kumar Mishra",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manjeetkumarmishra.dev",
    title: "Manjeet Kumar Mishra — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting modern, performant web experiences.",
    siteName: "Manjeet Kumar Mishra Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Manjeet Kumar Mishra" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Manjeet Kumar Mishra — Full-Stack Developer",
    description: "Full-Stack Developer crafting modern, performant web experiences.",
    creator: "@mishramanjeet26",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Only reference favicon.ico which Next.js handles automatically
  // Place favicon.ico in the /app directory (not /public) for App Router
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0a0a0f] text-[#F0F0FF] font-body antialiased overflow-x-hidden">
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {children}
      </body>
    </html>
  );
}