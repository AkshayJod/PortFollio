// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Email / résumé buttons appear automatically once they're set.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Akshay Khobragade",
  first: "Akshay",
  last: "Khobragade",
  role: "Full-Stack Developer",
  lead: "I build fast, polished web & mobile apps — from real-time video platforms to learning systems used by schools.",
  kinetic: ["Code", "with", "taste."],
  status: "Open to full-time roles",

  links: {
    linkedin: "https://www.linkedin.com/in/akshay-khobragade-4a281a263/",
    github: "https://github.com/AkshayJod",
    email: "", // TODO: add the email you want public
    resume: "", // TODO: put the PDF in public/assets/files and set "assets/files/resume.pdf"
  },

  stats: [
    { to: 25, suffix: "+", label: "Repositories" },
    { to: 10, suffix: "+", label: "Projects shipped" },
    { to: 4, suffix: "", label: "Disciplines" },
    { to: 2022, from: 2000, suffix: "", label: "Building since" },
  ],

  stack: ["React", "Next.js", "TypeScript", "React Native", "Expo", "Python", "Django", "Node.js", "WebSockets", "WebRTC", "Machine Learning"],

  pillars: [
    {
      title: "Interfaces",
      promise: "Web that feels instant.",
      body: "Interfaces with real attention to speed, motion and the last 10% of polish — built to stay fast as they grow.",
      chips: ["React", "Next.js", "TypeScript", "Vite"],
      glyph: "web",
    },
    {
      title: "Mobile",
      promise: "Apps people keep.",
      body: "Cross-platform apps with a native feel — shipped to real students, parents and schools.",
      chips: ["React Native", "Expo", "TypeScript"],
      glyph: "mobile",
    },
    {
      title: "Systems & AI",
      promise: "Back ends that hold up. Models that learn.",
      body: "APIs, real-time WebSocket and WebRTC systems, and ML prototypes that answer real questions.",
      chips: ["Python", "Django", "Node.js", "WebSockets", "ML"],
      glyph: "sys",
    },
  ],

  chapters: [
    { title: "The first commit.", body: "I learned by rebuilding the sites I admired — Netflix, Nike — pixel by pixel, until polish became a habit." },
    { title: "Going real-time.", body: "Then I wanted things to move: a Django + WebSockets chat app, FusionMeet for live video calls, a Discord bot people actually used." },
    { title: "Teaching machines.", body: "Curiosity pulled me into machine learning — I trained a model that helps classify tumours as benign or malignant." },
    { title: "Shipping for real users.", body: "Today I build a learning platform end to end: a React Native app and web frontends for students, parents and schools." },
  ],

  capabilities: [
    { title: "Product engineering", body: "From idea to shipped, owning the whole stack." },
    { title: "Mobile apps", body: "Cross-platform React Native & Expo apps with a native feel." },
    { title: "Real-time systems", body: "WebSockets, WebRTC and live data that never lags." },
    { title: "APIs & back ends", body: "Django and Node services — clean, and boring in the best way." },
    { title: "ML prototypes", body: "From notebook to a model that answers a real question." },
  ],

  toolkit: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Vite", "HTML5", "CSS3"] },
    { group: "Mobile", items: ["React Native", "Expo"] },
    { group: "Backend", items: ["Python", "Django", "Node.js", "WebSockets", "REST APIs"] },
    { group: "Data & ML", items: ["Machine Learning", "Jupyter", "Pandas", "scikit-learn"] },
    { group: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code"] },
  ],

  cases: [
    {
      title: ["ABL LMS", "Mobile App"],
      kind: "Mobile · Featured",
      body: "A learning-management app for students, parents and schools — courses, progress and communication in one place.",
      tags: ["React Native", "Expo", "TypeScript"],
      art: "phone",
      repo: "",
    },
    {
      title: ["LMS Web", "Platform"],
      kind: "Web · Featured",
      body: "B2B and B2C web frontends for the same learning platform — deployed on Vercel and sharing one design language with the app.",
      tags: ["React", "Vite", "Vercel"],
      art: "browser",
      repo: "",
    },
    {
      title: ["Fusion", "Meet"],
      kind: "Real-time · Featured",
      body: "A browser-based video meeting app for real-time calls and collaboration — no installs, just a link.",
      tags: ["JavaScript", "WebRTC", "Node.js"],
      art: "meet",
      repo: "https://github.com/AkshayJod/FusionMeet",
    },
  ],

  projects: [
    { title: "Real-time Chat App", tags: "Django · WebSockets", repo: "https://github.com/AkshayJod/Realtime_chatapp" },
    { title: "Breast Cancer Detection", tags: "Python · ML", repo: "https://github.com/AkshayJod/BreastCancerDetection" },
    { title: "FinTejo", tags: "Finance · JavaScript", repo: "https://github.com/AkshayJod/FinTejo" },
    { title: "Recipe Finder", tags: "JavaScript", repo: "https://github.com/AkshayJod/Recipe" },
    { title: "Discord Bot", tags: "Python · discord.py", repo: "https://github.com/AkshayJod/DiscordBot" },
    { title: "Netflix Clone", tags: "HTML · CSS", repo: "https://github.com/AkshayJod/NetflixClone" },
    { title: "Nike Landing Page", tags: "HTML · CSS", repo: "https://github.com/AkshayJod/NikeDesign" },
  ],
};

export const pad = (n: number) => String(n).padStart(2, "0");
