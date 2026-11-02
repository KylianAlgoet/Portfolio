import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const fact = z.object({
  label: z.string(),
  value: z.string(),
});

const decision = z.object({
  title: z.string(),
  ref: z.string().optional(),
  alternatives: z.string().optional(),
  why: z.string(),
  tradeoff: z.string().optional(),
});

// Case studies. Structured data lives in frontmatter; the prose sections
// (question, what I built, how it works, how I tested it) live in the MDX body.
const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().int(),
      draft: z.boolean().default(false),
      kicker: z.string(),
      year: z.string(),
      oneLiner: z.string(),
      summary: z.string(),
      indexSummary: z.string(),
      description: z.string(),
      role: z.string(),
      context: z.string(),
      stack: z.array(z.string()),
      tags: z.array(z.string()),
      repo: z.url(),
      report: z.object({ label: z.string(), href: z.url() }).optional(),
      cover: image(),
      coverAlt: z.string(),
      coverCaption: z.string(),
      built: z.array(z.string()).min(1),
      quote: z.string().optional(),
      facts: z.array(fact).max(4),
      specs: z.array(fact).max(6),
      decisions: z.array(decision),
      limits: z.array(z.string()),
      next: z.array(z.string()),
    }),
});

// Creative work. A "game" gets its own page (body: What it is / What I made / What I learned);
// renders and animations open in the lightbox. Videos live in public/media/playground/.
const playground = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/playground" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(["game", "render", "animation"]),
      year: z.string(),
      tools: z.array(z.string()),
      summary: z.string(),
      order: z.number().int().default(100),
      draft: z.boolean().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      video: z.string().startsWith("/").optional(),
      role: z.string().optional(),
      link: z.object({ label: z.string(), href: z.url() }).optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    }),
});

const experience = defineCollection({
  loader: file("./src/content/experience.yaml"),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    kind: z.string(),
    period: z.string(),
    body: z.string(),
    tags: z.array(z.string()),
  }),
});

// The short "More on GitHub" list under Selected work.
const repos = defineCollection({
  loader: file("./src/content/repos.yaml"),
  schema: z.object({
    name: z.string(),
    url: z.url(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, playground, experience, repos };
