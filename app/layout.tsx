import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter-tight", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const title = `${site.name} — ${site.role}`;
const description = `${site.name} builds fast, polished web and mobile apps — React, Next.js, React Native, Python, Django, real-time systems and ML.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description: "I build fast, polished web & mobile apps. Open to full-time roles.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#060B1A" };

// Marks JS as available before first paint so pre-animation states apply without a flash.
const boot = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
