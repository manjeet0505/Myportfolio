import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export const personalInfo = {
  name: "Manjeet Kumar Mishra",
  initials: "MKM",
  tagline: "Full-Stack Developer",
  bio: "I craft fast, accessible, and visually stunning web experiences. From pixel-perfect UIs to scalable backend systems — I bring ideas to life with clean code and creative thinking.",
  email: "manjeet@example.com",
  location: "India",
  resumeUrl: "/Manjeet.pdf",
  avatar: "/profile.jpg",

  social: [
    { label: "GitHub",   url: "https://github.com/manjeet0505",   icon: FiGithub   },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/manjeet-mishra-175705260/", icon: FiLinkedin },
    { label: "Twitter",  url: "https://x.com/mishramanjeet26",  icon: FiTwitter  },
    { label: "Email",    url: "mailto:mishramanjeet26@gmail.com", icon: FiMail },
  ],
};

export const personal = personalInfo;

export const navLinks = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export const roles = [
  "Full-Stack Developer",
  "React Specialist",
  "Next.js Engineer",
  "UI Craftsman",
  "Problem Solver",
];
 
// ── Stats ──────────────────────────────────────────────────────
export const stats = [
  { value: "3+",  label: "Years Experience" },
  { value: "10+", label: "Projects Built"   },
  { value: "10+", label: "Happy Clients"    },
  { value: "∞",   label: "Coffees Drunk"    },
];
 
// ── Skills ─────────────────────────────────────────────────────
export type Skill = {
  name: string;
  icon: string;
  color: string;
  level: number; // 0–100
};
 
export type SkillGroup = {
  category: string;
  skills: Skill[];
};
 
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React",         icon: "react",      color: "#61DAFB", level: 92 },
      { name: "Next.js",       icon: "nextjs",     color: "#ffffff", level: 88 },
      { name: "TypeScript",    icon: "typescript", color: "#3178C6", level: 85 },
      { name: "Tailwind CSS",  icon: "tailwind",   color: "#38BDF8", level: 90 },
      { name: "Framer Motion", icon: "motion",     color: "#FF4D9E", level: 78 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js",    icon: "nodejs",      color: "#68A063", level: 85 },
      { name: "Express",    icon: "express",     color: "#ffffff", level: 82 },
      { name: "PostgreSQL", icon: "postgresql",  color: "#336791", level: 75 },
      { name: "MongoDB",    icon: "mongodb",     color: "#4DB33D", level: 78 },
      { name: "Prisma",     icon: "prisma",      color: "#2D3748", level: 72 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git",    icon: "git",    color: "#F05032", level: 90 },
      { name: "Docker", icon: "docker", color: "#2496ED", level: 70 },
      { name: "Vercel", icon: "vercel", color: "#ffffff", level: 88 },
      { name: "Figma",  icon: "figma",  color: "#F24E1E", level: 75 },
      { name: "VS Code",icon: "vscode", color: "#007ACC", level: 95 },
    ],
  },
];
 
// ── Projects ───────────────────────────────────────────────────
export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  accentColor: string;
};
 
export const projects: Project[] = [
  {
    id: "project-1",
    title: "S3 Dashboard: Smart Career Intelligence System",
    description:
      "AI-powered platform that helps students track progress, optimize skills, and get personalized career guidance.",
    longDescription:
      "Built with Next.js, MongoDB, and modern full-stack technologies, featuring AI-powered RAG chatbot, resume analysis, job recommendations, and real-time insights to help students track progress and accelerate their career growth.",
    image: "/projects/project-1.png",
    tags: ["Next.js", "TypeScript", "MONGODB", "Stripe", "Tailwind"],
    liveUrl: "https://s3frontend-seven.vercel.app/",
    githubUrl: "https://github.com/manjeet0505/s3dashboard",
    featured: true,
    year: "2025",
    accentColor: "#7B2FFF",
  },
  {
    id: "project-2",
    title: "Expense Tracker",
    description:
      "A full-stack expense tracker to manage, categorize, and visualize daily spending.",
    longDescription:
      " Built a full-stack expense tracking application using Next.js, MongoDB, and modern web technologies, enabling users to manage daily expenses, categorize transactions, and visualize spending patterns through interactive dashboards.",
    image: "/projects/project-2.png",
    tags: ["Node.js", "React", "MongoDB", "GeminiAPI"],
    liveUrl: "https://expense-bay-mu.vercel.app/",
    githubUrl: "https://github.com/manjeet0505/Expense",
    featured: true,
    year: "2024",
    accentColor: "#00F5FF",
  },
  {
    id: "project-3",
    title: "Noteflow",
    description:
      "A full-stack note-taking app with AI-powered assistance for smarter writing and productivity.",
    longDescription:
      "Built a full-stack note-taking application using Next.js, MongoDB, and modern web technologies, enabling users to create, organize, and manage notes with AI-powered assistance for smarter writing and productivity.",
    image: "/projects/project-3.png",
    tags: ["Nextjs","MongoDB", "Express"],
    githubUrl: "https://github.com/manjeet0505/noteflow",
    featured: false,
    year: "2024",
    accentColor: "#FF2FBE",
  },
];
 
export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects    = projects.filter((p) => !p.featured);
 
// ── Experience ─────────────────────────────────────────────────
export type Experience = {
  id: string;
  company: string;
  role: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Internship";
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
  technologies: string[];
  logoUrl?: string;
};
 
export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Awesome Company",
    role: "Senior Frontend Developer",
    type: "Full-time",
    startDate: "Jan 2024",
    endDate: "Present",
    description:
      "Leading the frontend architecture for a B2B SaaS product used by 50,000+ users worldwide.",
    highlights: [
      "Reduced bundle size by 40% through code splitting and lazy loading",
      "Built a design system used across 3 products",
      "Mentored 2 junior developers",
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    id: "exp-2",
    company: "Cool Startup",
    role: "Full-Stack Developer",
    type: "Full-time",
    startDate: "Mar 2022",
    endDate: "Dec 2023",
    description:
      "Full-stack development for an early-stage fintech startup, from MVP to scaling.",
    highlights: [
      "Built core banking dashboard from scratch",
      "Integrated 5 third-party payment APIs",
      "Improved API response time by 60%",
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    id: "exp-3",
    company: "Freelance",
    role: "Web Developer",
    type: "Freelance",
    startDate: "Jan 2021",
    endDate: "Feb 2022",
    description:
      "Worked with 10+ clients to build websites, landing pages, and web applications.",
    highlights: [
      "Delivered 12 projects on time and within budget",
      "Average client satisfaction score of 4.9/5",
    ],
    technologies: ["React", "WordPress", "Shopify", "PHP"],
  },
];