import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ImageMetadata } from "astro";
import satori from "satori";
import sharp from "sharp";
import { site } from "../data/site";

// Open Graph images (1200 × 630), rendered at build time in the Spec Sheet style:
// satori lays out the card and turns text into paths, sharp rasterises it to PNG.

export const OG_SIZE = { width: 1200, height: 630 } as const;

const PAPER = "#F3F1EC";
const INK = "#141414";
const INK_BODY = "#2B2A27";
const INK_2 = "#55524C";
const RULE = "#CFCAC0";
const SIGNAL = "#2337E6";

// satori reads WOFF but not WOFF2, so these come from the Fontsource packages directly.
const fontFile = (pkg: string, file: string) =>
  readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

let fonts: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    fontFile("instrument-serif", "instrument-serif-latin-400-normal.woff"),
    fontFile("instrument-serif", "instrument-serif-latin-400-italic.woff"),
    fontFile("geist", "geist-latin-400-normal.woff"),
    fontFile("geist-mono", "geist-mono-latin-500-normal.woff"),
  ]).then(([serif, serifItalic, sans, mono]) => [
    { name: "Serif", data: serif, weight: 400, style: "normal" },
    { name: "Serif", data: serifItalic, weight: 400, style: "italic" },
    { name: "Sans", data: sans, weight: 400, style: "normal" },
    { name: "Mono", data: mono, weight: 500, style: "normal" },
  ]));

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

const label = (text: string, color = INK_2) =>
  h("div", { fontFamily: "Mono", fontSize: 18, letterSpacing: 1.1, textTransform: "uppercase", color }, text);

/** "Where <em>hardware</em> meets" → one span per word (flex items drop spaces), emphasised words in italic. */
const titleWords = (title: string) =>
  title
    .split(/(<em>.*?<\/em>)/)
    .flatMap((part) => {
      const italic = part.startsWith("<em>");
      return part
        .replace(/<\/?em>/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => h("span", italic ? { fontStyle: "italic" } : {}, word));
    });

/** The cover as a data URI, sized for the panel: landscape keeps 16:10, portrait is cropped from the top. */
async function coverPanel(cover: ImageMetadata) {
  // Imported images carry their file path as a non-enumerable property that isn't in the public type.
  const { fsPath } = cover as ImageMetadata & { fsPath?: string };
  if (!fsPath) return undefined;
  const portrait = cover.height > cover.width;
  const size = portrait ? { width: 300, height: 440 } : { width: 520, height: 325 };
  const png = await sharp(fsPath)
    .resize(size.width * 2, size.height * 2, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
  return { src: `data:image/png;base64,${png.toString("base64")}`, ...size };
}

export async function renderOgImage(card: {
  kicker: string;
  title: string;
  description?: string;
  cover?: ImageMetadata;
}): Promise<Uint8Array<ArrayBuffer>> {
  const image = card.cover ? await coverPanel(card.cover) : undefined;
  const titleSize = card.title.length > 48 ? 68 : card.title.length > 24 ? 84 : 112;

  const text = h(
    "div",
    { display: "flex", flexDirection: "column", flex: 1, justifyContent: "flex-end", gap: 24, paddingRight: image ? 48 : 0 },
    label(card.kicker, SIGNAL),
    h(
      "div",
      { display: "flex", flexWrap: "wrap", columnGap: titleSize * 0.24, fontFamily: "Serif", fontSize: titleSize, lineHeight: 1, color: INK },
      ...titleWords(card.title),
    ),
    ...(card.description
      ? [h("div", { fontFamily: "Sans", fontSize: 28, lineHeight: 1.4, color: INK_BODY, maxWidth: 620 }, card.description)]
      : []),
  );

  const panel = image
    ? h(
        "div",
        { display: "flex", alignSelf: "flex-end", border: `1px solid ${RULE}`, backgroundColor: "#E8E5DE" },
        { type: "img", props: { src: image.src, width: image.width, height: image.height, style: { display: "flex" } } },
      )
    : undefined;

  const svg = await satori(
    h(
      "div",
      {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 64px 64px",
        backgroundColor: PAPER,
      },
      h(
        "div",
        { display: "flex", justifyContent: "space-between", paddingBottom: 18, borderBottom: `2px solid ${INK}` },
        label(site.name, INK),
        label(site.role),
      ),
      h("div", { display: "flex", flex: 1, paddingTop: 40 }, text, ...(panel ? [panel] : [])),
    ) as unknown as Parameters<typeof satori>[0],
    { ...OG_SIZE, fonts: await loadFonts() },
  );

  return Uint8Array.from(await sharp(Buffer.from(svg)).png().toBuffer());
}
