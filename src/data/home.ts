// Homepage copy that isn't tied to a single content entry. Source: brief/02-content.md.

export const hero = {
  title: "I build software where AI, interfaces and <em>hardware</em> meet.",
  lead: "Recent Multimedia & Creative Technology graduate from Erasmushogeschool Brussel. I'm looking for a junior role as an AI engineer, software developer or fullstack developer.",
};

export const work = {
  title: "Selected work",
  intro: "Two systems I designed, built and tested end to end, on my own.",
};

export const principles = [
  {
    title: "Measure before claiming.",
    body: "Every model choice in DeckForge is backed by a logged experiment. I picked the base model because it fits the hardware, and the write-up says so, even though another model scored higher.",
  },
  {
    title: "Keep the intelligence explainable.",
    body: "SK8Sense detects tricks with rules I can read, test and tune. The language model only comes in afterwards, to turn measured data into coaching.",
  },
  {
    title: "Write down what broke.",
    body: "Both projects keep a record of what failed and how it was fixed: a GPU driver crash during a demo run, Bluetooth dropping on battery power, a sensor bus that couldn't handle vibration.",
  },
];

export const playground = {
  title: "Playground",
  intro: "Games, 3D and other things I make when nobody asked for them.",
};

export const about = {
  // TODO(input): confirm or drop the sentence about skateboarding before it goes into the paragraph.
  body: [
    "I'm Kylian, a developer based in Belgium. At Erasmushogeschool Brussel I studied Multimedia & Creative Technology, which taught me to move between code, interfaces and physical prototypes. What I enjoy most is the whole path, from a sensor reading or a model output to an interface someone can actually use.",
  ],
  skills: [
    { group: "Backend", items: ["Python", "FastAPI", "Pydantic", "Java", "Spring Boot", "REST APIs"] },
    { group: "Frontend", items: ["JavaScript", "TypeScript", "React", "Vue.js", "Three.js / React Three Fiber", "HTML/CSS"] },
    { group: "Mobile", items: ["React Native (Expo)", "Zustand"] },
    { group: "Data & AI", items: ["MySQL", "Firebase / Firestore", "PyTorch", "Stable Diffusion", "LoRA", "IP-Adapter", "Claude API"] },
    { group: "Hardware", items: ["ESP32", "C++ (Arduino / PlatformIO)", "Bluetooth Low Energy", "I²C sensors", "3D printing"] },
    { group: "Quality & tooling", items: ["Git/GitHub", "GitHub Actions", "pytest", "Vitest", "Playwright"] },
    { group: "Automation", items: ["Zapier", "Odoo", "FareHarbor"] },
    // TODO(input): add the 3D tool next to Unity once confirmed.
    { group: "Creative", items: ["Unity"] },
  ],
  education: {
    period: "2023 – 2026",
    degree: "Bachelor in Multimedia and Creative Technology",
    school: "Erasmushogeschool Brussel",
    note: "Graduated September 2026",
  },
  languages: ["Dutch", "English", "French"],
};

export const contact = {
  title: "Let's talk.",
  body: "If you're hiring a junior developer who's comfortable across AI, web and hardware, I'd like to hear from you.",
};
