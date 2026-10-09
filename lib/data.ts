import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export const personalInfo = {
  name: "Manjeet Kumar Mishra",
  initials: "MKM",
  tagline: "AI Engineer & Full-Stack Developer",
  bio: "I build AI products end to end: multi-agent systems, RAG pipelines and the full-stack apps around them. 2026 CS graduate, ranked 1st in my university, IEEE-published on LLM architecture.",
  email: "mishramanjeet26@gmail.com",
  location: "India",
  resumeUrl: "/Manjeet.pdf",
  avatar: "/profile.jpg",

  social: [
    { label: "GitHub", url: "https://github.com/manjeet0505", icon: FiGithub },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/manjeet-mishra-175705260/", icon: FiLinkedin },
    { label: "Twitter", url: "https://x.com/mishramanjeet26", icon: FiTwitter },
    { label: "Email", url: "mailto:mishramanjeet26@gmail.com", icon: FiMail },
  ],
};

export const personal = personalInfo;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Typewriter roles in the Hero
export const heroRoles = [
  "AI Engineer",
  "Full-Stack Developer",
  "Multi-Agent Systems",
  "RAG Pipelines",
];

// Small credential card in the Hero
export const heroStats = [
  { value: "IEEE", label: "Published paper" },
  { value: "#1", label: "University rank" },
  { value: "3", label: "Internships" },
];

// About section stat cards (2x2 grid)
export const stats = [
  { value: "3", label: "Internships completed" },
  { value: "IEEE", label: "Paper on LLM architecture" },
  { value: "#1", label: "University rank, MDU" },
  { value: "8.5", label: "CGPA" },
];

// ── Projects ─────────────────────────────────────────────────────────
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
  highlights?: string[];
  inDevelopment?: boolean;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "S3 Dashboard: Career Intelligence Platform",
    description:
      "Multi-agent career platform with a mock interview agent, skill-gap analysis scored on live market demand, a resume scorer and a drag-and-drop job tracker.",
    longDescription:
      "Next.js 14 frontend and FastAPI backend with Qdrant vector search and MongoDB usage tracking.",
    image: "/projects/project-1.png",
    tags: ["Next.js 14", "FastAPI", "Qdrant", "MongoDB", "GPT-4o"],
    highlights: [
  "Resume scorer with per-dimension rubrics and weighted averaging, so scores stay consistent",
  "Career roadmap agent pulling real job postings through the JSearch API",
  "Freemium plan checks with per-feature usage limits on the FastAPI backend",
],
    liveUrl: "https://s3frontend-seven.vercel.app/",
    githubUrl: "https://github.com/manjeet0505/s3dashboard",
    featured: true,
    year: "2025",
    accentColor: "#7B2FFF",
  },
  {
    id: "project-4",
    title: "MedLoop AI: Multi-Agent Patient Care",
    description:
      "Multi-agent patient care platform built on LangGraph, with JWT-secured patient management and invite-based onboarding.",
    // TODO: add a screenshot at /public/projects/project-4.png and the live/GitHub links
    image: "/projects/project-4.png",
    tags: ["LangGraph", "FastAPI", "PostgreSQL", "JWT Auth", "OpenAI"],
    featured: true,
    year: "2026",
    accentColor: "#00F5FF",
  },
  {
    id: "project-2",
    title: "Expense Tracker",
    description:
      "A full-stack expense tracker to manage, categorize, and visualize daily spending.",
    longDescription:
      "Full-stack expense tracking app that lets users manage daily expenses, categorize transactions, and visualize spending patterns through interactive dashboards.",
    image: "/projects/project-2.png",
    tags: ["Node.js", "React", "MongoDB", "GeminiAPI"],
    liveUrl: "https://expense-bay-mu.vercel.app/",
    githubUrl: "https://github.com/manjeet0505/Expense",
    featured: false,
    year: "2024",
    accentColor: "#00F5FF",
  },
  {
    id: "project-3",
    title: "Noteflow",
    description:
      "A full-stack note-taking app with AI-powered assistance for smarter writing and productivity.",
    longDescription:
      "Note-taking app to create, organize and manage notes, with AI assistance for writing.",
    image: "/projects/project-3.png",
    tags: ["Next.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/manjeet0505/noteflow",
    featured: false,
    year: "2024",
    accentColor: "#FF2FBE",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

// ── Experience ───────────────────────────────────────────────────────
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
  // TODO: add the AIsignal internship here (role, dates, what you built).
  // Copy one of the entries below as a template.
  {
    id: "exp-1",
    company: "Next24Technology",
    role: "Web Developer",
    type: "Internship",
    startDate: "Jul 2023",
    endDate: "Sep 2023",
    description:
      "Web Developer Intern contributing to frontend and backend work: responsive UI components, API integration and performance improvements.",
    highlights: [
      "Developed responsive and user-friendly UI components using modern web technologies",
      "Integrated REST APIs to enable seamless data flow between frontend and backend",
      "Improved application performance through code optimization and efficient rendering",
      "Collaborated with team members to implement features and fix bugs in a timely manner",
    ],
    technologies: ["React", "Tailwind", "CSS3", "JavaScript"],
  },
  {
    id: "exp-2",
    company: "Webs Jyoti",
    role: "Full-Stack Developer",
    type: "Internship",
    startDate: "Jul 2024",
    endDate: "Nov 2024",
    description:
      "Full-Stack Developer Intern at an early-stage fintech startup, building frontend interfaces, backend APIs and third-party integrations.",
    highlights: [
      "Developed and maintained full-stack features for a fintech dashboard using modern web technologies",
      "Integrated third-party APIs for payments and financial services",
      "Designed and optimized backend APIs for efficient data handling and improved performance",
      "Built responsive and user-friendly UI components to enhance user experience",
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    id: "exp-3",
    company: "Freelance",
    role: "Full-Stack & AI Developer",
    type: "Freelance",
    startDate: "Jan 2026",
    endDate: "Present",
    description:
      "Building full-stack and AI-powered web applications, from idea to deployment.",
    highlights: [
      "Built multi-agent AI products with LangChain, FastAPI and vector search",
      "Owned projects from idea to deployment on Vercel, Render and Railway",
      "Designed responsive, user-friendly interfaces",
      "Improved application performance and scalability",
    ],
    technologies: [
      "Next.js 14",
      "FastAPI",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Qdrant",
      "LangChain",
      "OpenAI API",
      "Docker",
      "Vercel",
    ],
  },
];