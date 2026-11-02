// Site-wide facts. Every value here is confirmed by Kylian's CV (Nov 2026).

export const site = {
  name: "Kylian Algoet",
  role: "AI & Automation / Fullstack Developer",
  location: "Belgium",
  description:
    "Kylian Algoet is a junior developer in Belgium who builds software where AI, interfaces and hardware meet. Selected work: DeckForge AI and SK8Sense.",
  email: "kylianalgoet12@gmail.com",
  github: "https://github.com/KylianAlgoet",
  linkedin: "https://www.linkedin.com/in/kylian-algoet-1912232a2",
  cv: "/cv.pdf",
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Playground", href: "/#playground" },
  { label: "About", href: "/#about" },
] as const;
