import type { APIRoute, GetStaticPaths } from "astro";
import { hero, playground } from "../../data/home";
import { site } from "../../data/site";
import { getPlayground, getWork } from "../../lib/content";
import { renderOgImage } from "../../lib/og";

type Card = Parameters<typeof renderOgImage>[0];

// One image per page: /og/home.png, /og/work/<slug>.png, /og/playground.png, /og/playground/<slug>.png.
export const getStaticPaths = (async () => {
  const work = await getWork();
  const items = await getPlayground();
  const games = items.filter((item) => item.data.type === "game");

  const cards: { slug: string; card: Card }[] = [
    { slug: "home", card: { kicker: `${site.location} · Portfolio`, title: hero.title, description: hero.lead } },
    ...work.map((entry, i) => ({
      slug: `work/${entry.id}`,
      card: {
        kicker: `Case study ${String(i + 1).padStart(2, "0")} · ${entry.data.year}`,
        title: entry.data.title,
        description: entry.data.oneLiner,
        cover: entry.data.cover,
      },
    })),
    ...(items.length > 0
      ? [{ slug: "playground", card: { kicker: "Creative work", title: playground.title, description: playground.intro } }]
      : []),
    ...games.map((entry) => ({
      slug: `playground/${entry.id}`,
      card: {
        kicker: `Playground · Game · ${entry.data.year}`,
        title: entry.data.title,
        description: entry.data.summary,
        cover: entry.data.cover,
      },
    })),
  ];

  return cards.map(({ slug, card }) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await renderOgImage((props as { card: Card }).card), {
    headers: { "Content-Type": "image/png" },
  });
