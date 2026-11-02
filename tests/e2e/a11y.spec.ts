import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// WCAG 2.2 AA scan of every page in both themes. Reduced motion keeps the scroll reveals
// from leaving half-faded text behind, which would skew the contrast checks.

const pages = ["/", "/work/deckforge-ai/", "/work/sk8sense/", "/does-not-exist/"];

for (const theme of ["light", "dark"] as const) {
  for (const path of pages) {
    test(`${path} has no WCAG A/AA violations (${theme})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme });
      await page.goto(path);

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const summary = violations.map((v) => `${v.impact} · ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }
}
