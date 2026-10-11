"use client";

import { useEffect } from "react";
import { initExperience } from "@/lib/experience";

// Boots smooth scroll, GSAP timelines, scenes, cursor and menu once the page has hydrated.
export default function Experience() {
  useEffect(() => initExperience(), []);
  return null;
}
