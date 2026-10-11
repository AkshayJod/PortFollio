// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no other file needs to change.
//  Sections with an empty list are hidden automatically.
// ─────────────────────────────────────────────────────────────

export type Category = "web" | "mobile" | "ml" | "python";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: Category;
  featured?: boolean;
  repo?: string;
  live?: string;
  private?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  points?: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  note?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export const portfolio = {
  name: "Akshay Khobragade",
  initials: "AK",
  // TODO: confirm your headline (copy it from LinkedIn)
  roles: ["Full-Stack Developer", "React & React Native Developer", "Python / Django Developer", "ML Enthusiast"],
  tagline:
    "I build fast, polished web and mobile apps — from real-time video and chat platforms to learning management systems used by students and schools.",
  location: "India", // TODO: city, e.g. "Pune, India"
  availability: "Open to opportunities",
  photo: "", // TODO: put a photo in /public and set e.g. "profile.jpg" — falls back to initials
  resume: "", // TODO: put your résumé in /public and set e.g. "Akshay_Khobragade_Resume.pdf"

  links: {
    github: "https://github.com/AkshayJod",
    linkedin: "https://www.linkedin.com/in/akshay-khobragade-4a281a263/",
    email: "", // TODO: add the email you want public
  },

  about: [
    "I'm a developer who enjoys turning ideas into products people actually use. Most of my work sits across the stack: React and TypeScript on the front end, React Native with Expo for mobile, and Python/Django or Node on the back end.",
    "Recently I've been building a learning management platform — a mobile app and several web frontends for students, parents and schools. Before that I shipped real-time apps with WebSockets and video, and explored machine learning for medical diagnosis.",
  ],

  stats: [
    { value: "25+", label: "Repositories" },
    { value: "10+", label: "Projects shipped" },
    { value: "2022", label: "Building since" },
  ],

  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Vite", "HTML5", "CSS3", "Responsive UI"] },
    { group: "Mobile", items: ["React Native", "Expo"] },
    { group: "Backend", items: ["Python", "Django", "Node.js", "WebSockets", "REST APIs"] },
    { group: "Data & ML", items: ["Machine Learning", "Jupyter", "Pandas", "scikit-learn"] },
    { group: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code"] },
  ],

  // category drives the filter tabs: web | mobile | ml | python
  projects: [
    {
      title: "ABL LMS Mobile App",
      description:
        "Mobile learning management app for students, parents and school learning workflows — courses, progress and communication in one place.",
      tags: ["React Native", "Expo", "TypeScript"],
      category: "mobile",
      featured: true,
      private: true,
    },
    {
      title: "LMS Web Platform",
      description:
        "B2B and B2C web frontends for the learning platform, deployed on Vercel, sharing a design language with the mobile app.",
      tags: ["React", "Vite", "Vercel"],
      category: "web",
      featured: true,
      private: true,
    },
    {
      title: "FusionMeet",
      description: "Browser-based video meeting app for real-time calls and collaboration.",
      tags: ["JavaScript", "WebRTC", "Node.js"],
      category: "web",
      featured: true,
      repo: "https://github.com/AkshayJod/FusionMeet",
    },
    {
      title: "Real-time Chat App",
      description: "Real-time chat application with a Django backend and WebSockets for instant messaging.",
      tags: ["Python", "Django", "WebSockets"],
      category: "python",
      repo: "https://github.com/AkshayJod/Realtime_chatapp",
    },
    {
      title: "Breast Cancer Detection",
      description:
        "Machine learning model that classifies tumours as benign or malignant from key diagnostic features.",
      tags: ["Python", "Machine Learning", "Jupyter"],
      category: "ml",
      repo: "https://github.com/AkshayJod/BreastCancerDetection",
    },
    {
      title: "FinTejo",
      description: "Finance-focused web application.", // TODO: describe
      tags: ["JavaScript"],
      category: "web",
      repo: "https://github.com/AkshayJod/FinTejo",
    },
    {
      title: "Recipe Finder",
      description: "Recipe discovery app for searching and browsing dishes.",
      tags: ["JavaScript"],
      category: "web",
      repo: "https://github.com/AkshayJod/Recipe",
    },
    {
      title: "Discord Bot",
      description: "Custom Discord bot written in Python.",
      tags: ["Python", "discord.py"],
      category: "python",
      repo: "https://github.com/AkshayJod/DiscordBot",
    },
    {
      title: "Netflix Clone",
      description: "Pixel-faithful recreation of the Netflix landing page.",
      tags: ["HTML", "CSS"],
      category: "web",
      repo: "https://github.com/AkshayJod/NetflixClone",
    },
    {
      title: "Nike Landing Page",
      description: "Modern product landing page inspired by Nike's design language.",
      tags: ["HTML", "CSS"],
      category: "web",
      repo: "https://github.com/AkshayJod/NikeDesign",
    },
  ] satisfies Project[] as Project[],

  // TODO: add from LinkedIn. Example entry:
  // { role: "Software Developer", company: "Company", period: "Jan 2025 — Present",
  //   location: "Remote", points: ["What you built", "Impact / numbers"] }
  experience: [] as Experience[],

  // TODO: add from LinkedIn. Example entry:
  // { degree: "B.E. Computer Engineering", school: "College", period: "2020 — 2024", note: "CGPA 8.5" }
  education: [] as Education[],

  // TODO: optional. Example: { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2025", url: "" }
  certifications: [] as Certification[],
};
