// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// The public URL, used for canonical links, Open Graph images and the sitemap.
// SITE_URL wins (set it once there is a custom domain); on Vercel the production
// domain is picked up automatically; locally it falls back to the dev server.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:4321");

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Instrument Serif",
      cssVariable: "--font-serif",
      weights: [400],
      styles: ["normal", "italic"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-sans",
      weights: [400, 500, 600],
      styles: ["normal"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      styles: ["normal"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
});
