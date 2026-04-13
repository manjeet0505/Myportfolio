import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export const personalInfo = {
  name: "Manjeet Kumar Mishra",
  initials: "MKM",
  tagline: "Full-Stack Developer",
  bio: "I craft fast, accessible, and visually stunning web experiences. From pixel-perfect UIs to scalable backend systems — I bring ideas to life with clean code and creative thinking.",
  email: "manjeet@example.com",
  location: "India",
  resumeUrl: "/resume.pdf",
  avatar: "/profile.jpg",

  social: [
    { label: "GitHub",   url: "https://github.com",   icon: FiGithub   },
    { label: "LinkedIn", url: "https://linkedin.com", icon: FiLinkedin },
    { label: "Twitter",  url: "https://twitter.com",  icon: FiTwitter  },
    { label: "Email",    url: "mailto:manjeet@example.com", icon: FiMail },
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

export const stats = [
  { label: "Years Experience", value: "3+"  },
  { label: "Projects Built",   value: "40+" },
  { label: "Coffees Drunk",    value: "∞"   },
];

export const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React",         icon: "⚛️", level: 95 },
      { name: "Next.js",       icon: "▲",  level: 92 },
      { name: "TypeScript",    icon: "TS", level: 90 },
      { name: "Tailwind",      icon: "🌊", level: 93 },
      { name: "Framer Motion", icon: "🎬", level: 82 },
      { name: "Three.js",      icon: "🎲", level: 65 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js",    icon: "🟢", level: 88 },
      { name: "Express",    icon: "🚂", level: 85 },
      { name: "PostgreSQL", icon: "🐘", level: 80 },
      { name: "MongoDB",    icon: "🍃", level: 78 },
      { name: "Prisma",     icon: "◈",  level: 82 },
      { name: "GraphQL",    icon: "◉",  level: 72 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git",    icon: "🌿", level: 95 },
      { name: "Docker", icon: "🐳", level: 75 },
      { name: "AWS",    icon: "☁️", level: 68 },
      { name: "Vercel", icon: "▲",  level: 92 },
      { name: "Figma",  icon: "🎨", level: 78 },
      { name: "Jest",   icon: "🃏", level: 80 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "NexaCommerce",
    description: "A full-stack e-commerce platform with real-time inventory, Stripe payments, and an AI-powered product recommendation engine.",
    image: "/projects/nexacommerce.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "CodeCollab",
    description: "Real-time collaborative code editor with multi-cursor support, syntax highlighting for 40+ languages, and built-in video chat.",
    image: "/projects/codecollab.png",
    tags: ["React", "WebSockets", "Node.js", "Monaco Editor", "WebRTC"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 3,
    title: "AIPortfolio",
    description: "An AI-powered portfolio analyzer that scrapes GitHub activity, generates insights, and creates dynamic visual reports.",
    image: "/projects/aiportfolio.png",
    tags: ["Python", "FastAPI", "OpenAI", "React", "D3.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: 4,
    title: "TaskFlow",
    description: "Drag-and-drop project management tool with Kanban boards, time tracking, and team analytics dashboard.",
    image: "/projects/taskflow.png",
    tags: ["Vue.js", "Pinia", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    period: "Jan 2023 – Present",
    description: "Led the redesign of the core dashboard, reducing load time by 60%. Mentored 3 junior devs and established component library used across 5 products.",
    tags: ["React", "TypeScript", "GraphQL", "AWS"],
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    period: "Jun 2021 – Dec 2022",
    description: "Built and shipped 4 major features end-to-end. Integrated Stripe billing, designed REST APIs, and improved test coverage from 30% to 85%.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Creative Agency",
    location: "India",
    period: "Jan 2020 – May 2021",
    description: "Developed 12+ client landing pages with pixel-perfect precision. Introduced component-based architecture and cut development time by 40%.",
    tags: ["React", "SASS", "Figma", "WordPress"],
  },
];