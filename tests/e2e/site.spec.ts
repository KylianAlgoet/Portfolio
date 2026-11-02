import { expect, test, type Page } from "@playwright/test";

// Smoke tests for the acceptance criteria in brief/01-handoff.md §9.

const pages = ["/", "/work/deckforge-ai/", "/work/sk8sense/"];

const hasHorizontalScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

test.describe("homepage", () => {
  test("shows who, what and both projects in the first screen", async ({ page, isMobile }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "I build software where AI, interfaces and hardware meet.",
    );

    const index = page.getByRole("navigation", { name: "Selected work" }).getByRole("link");
    await expect(index).toHaveCount(2);
    await expect(index.nth(0)).toContainText("DeckForge AI");
    await expect(index.nth(1)).toContainText("SK8Sense");

    if (isMobile) {
      // The project index starts within one screen height.
      await expect(index.nth(0)).toBeInViewport({ ratio: 0.1 });
    } else {
      await expect(page.getByRole("link", { name: "Kylian Algoet" })).toBeInViewport();
      await expect(page.getByRole("banner").getByRole("link", { name: "CV ↓" })).toBeInViewport();
      await expect(page.getByRole("banner").getByRole("link", { name: "GitHub ↗" })).toBeInViewport();
      await expect(index.nth(1)).toBeInViewport();
    }
  });

  test("serves the CV as a PDF", async ({ request }) => {
    const response = await request.get("/cv.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");
  });

  test("hides drafts in production", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#playground")).toHaveCount(0);
    const playground = await page.request.get("/playground/");
    expect(playground.status()).toBe(404);
  });
});

test.describe("case studies", () => {
  for (const path of pages.slice(1)) {
    test(`${path} has the six sections, a repository link and a next project`, async ({ page, isMobile }) => {
      await page.goto(path);
      await expect(page.locator(".prose > h2")).toHaveText([
        "The question",
        "What I built",
        "Key decisions",
        "How it works",
        "How I tested it",
        "Limits and next steps",
      ]);
      await expect(page.getByRole("link", { name: "Repository ↗" })).toHaveAttribute("href", /github\.com\/KylianAlgoet\//);
      await expect(page.getByRole("navigation", { name: "Next project" }).getByRole("link")).toBeVisible();

      const toc = page.getByRole("navigation", { name: "On this page" });
      if (isMobile) await expect(toc).toBeHidden();
      else await expect(toc.getByRole("link")).toHaveCount(6);
    });
  }

  test("the Trick Trace explains the firmware rules", async ({ page }) => {
    await page.goto("/work/sk8sense/");
    const trace = page.locator("[data-trace]");
    await expect(trace).toContainText("Trick Trace");
    await expect(trace).toContainText("|gx| ≥ 220");
  });

  test("the 3D deck only loads three.js when asked", async ({ page }) => {
    const sceneRequests: string[] = [];
    page.on("request", (request) => {
      if (/\/_astro\/scene\..*\.js$/.test(request.url())) sceneRequests.push(request.url());
    });

    await page.goto("/work/deckforge-ai/");
    const deck = page.locator("[data-deck]");
    await deck.scrollIntoViewIfNeeded();
    expect(sceneRequests).toHaveLength(0);

    await deck.getByRole("button", { name: "Rotate the deck in 3D" }).click();
    // Either the live deck (WebGL) or the stated fallback, never a silent failure.
    await expect(deck.locator("canvas").or(deck.getByText(/3D isn't available|couldn't load/))).toBeVisible();
    if (await deck.locator("canvas").isVisible()) {
      expect(sceneRequests).toHaveLength(1);
      await expect(deck.getByRole("button", { name: "Reset view" })).toBeVisible();
    }
  });
});

test.describe("navigation and layout", () => {
  test("every internal link resolves", async ({ page, request }) => {
    const targets = new Set<string>();
    for (const path of [...pages, "/does-not-exist/"]) {
      await page.goto(path);
      const hrefs = await page.locator("a[href^='/']").evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
      hrefs.forEach((href) => targets.add(href));
    }

    for (const href of targets) {
      const [path, hash] = href.split("#");
      const response = await request.get(path || "/");
      expect(response.status(), href).toBe(200);
      if (hash) {
        await page.goto(path || "/");
        await expect(page.locator(`[id="${hash}"]`), href).toHaveCount(1);
      }
    }
  });

  test("no page scrolls sideways at 360 px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    for (const path of [...pages, "/does-not-exist/"]) {
      await page.goto(path);
      expect(await hasHorizontalScroll(page), path).toBe(false);
    }
  });

  test("the mobile menu traps focus and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "The menu button only shows below 960 px");
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();

    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: /Work/ })).toBeVisible();
    expect(await menu.evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("the theme choice is remembered", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dark" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
  });

  test("content is visible straight away with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/sk8sense/");
    const hidden = await page
      .locator("[data-reveal]")
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
    expect(hidden).toBe(0);
  });

  test("unknown pages return a 404 with a way back", async ({ page }) => {
    const response = await page.goto("/does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page didn't land.");
    await expect(page.getByRole("link", { name: "Back to the homepage" })).toHaveAttribute("href", "/");
  });
});

test.describe("search and sharing", () => {
  for (const path of pages) {
    test(`${path} has a title, description, canonical URL and a working OG image`, async ({ page, request }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Kylian Algoet/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));

      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      const response = await request.get(new URL(image!).pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");

      const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
      expect(() => JSON.parse(jsonLd!)).not.toThrow();
    });
  }

  test("robots.txt points to the sitemap", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("sitemap-index.xml");
    expect((await request.get("/sitemap-index.xml")).status()).toBe(200);
  });
});
