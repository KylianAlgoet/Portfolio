import { detectTricks, type Detection, type Sample } from "./trick-detection";

// Recorded tricks from the SK8Sense board: one CSV per trick in src/data/traces/,
// named after the trick that was attempted (ollie.csv, kickflip.csv, bs-shuv.csv …).
// Columns: t_ms, gx, gy, gz (°/s). A header row is optional; extra columns are ignored.
const files = import.meta.glob<string>("../data/traces/*.csv", { query: "?raw", import: "default", eager: true });

const ATTEMPTED: Record<string, string> = {
  kickflip: "Kickflip",
  heelflip: "Heelflip",
  ollie: "Ollie",
  "bs-shuv": "Backside shove-it",
  "fs-shuv": "Frontside shove-it",
  shuv: "Shove-it",
};
const ORDER = Object.keys(ATTEMPTED);

/** One axis as [t, value] pairs, for the chart. */
export type Series = {
  key: "gx" | "gy" | "gz";
  points: [number, number][];
  decisive?: boolean;
};

export type Recording = {
  id: string;
  /** What the skater attempted, from the file name. */
  attempted: string;
  samples: Sample[];
  /** Approximate sample rate, from the median time step. */
  hz: number;
  /** The window the firmware rules decided on: the first one that found a trick, else the last. */
  detection: Detection | undefined;
};

function parse(csv: string): Sample[] {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(/[,;\t]/).map((cell) => cell.trim()));
  const header = rows[0].some((cell) => Number.isNaN(Number(cell))) ? rows.shift()!.map((h) => h.toLowerCase()) : null;
  const col = (names: string[], fallback: number) => {
    const i = header?.findIndex((h) => names.includes(h)) ?? -1;
    return i >= 0 ? i : fallback;
  };
  const [ti, xi, yi, zi] = [col(["t_ms", "t", "time", "millis"], 0), col(["gx"], 1), col(["gy"], 2), col(["gz"], 3)];

  const samples = rows
    .map((row) => ({ t: Number(row[ti]), gx: Number(row[xi]), gy: Number(row[yi]), gz: Number(row[zi]) }))
    .filter((s) => [s.t, s.gx, s.gy, s.gz].every(Number.isFinite));
  const t0 = samples[0]?.t ?? 0;
  return samples.map((s) => ({ ...s, t: s.t - t0 }));
}

function sampleRate(samples: Sample[]) {
  const steps = samples
    .slice(1)
    .map((s, i) => s.t - samples[i].t)
    .sort((a, b) => a - b);
  const median = steps[Math.floor(steps.length / 2)] || 10;
  return Math.round(1000 / median);
}

export function getRecordings(): Recording[] {
  return Object.entries(files)
    .map(([path, csv]) => {
      const id = path.split("/").pop()!.replace(/\.csv$/, "");
      const base = id.replace(/-\d+$/, "");
      const samples = parse(csv);
      const detections = detectTricks(samples);
      return {
        id,
        attempted: ATTEMPTED[base] ?? base.replace(/[-_]/g, " "),
        samples,
        hz: sampleRate(samples),
        detection: detections.find((d) => d.trick !== "none") ?? detections.at(-1),
      };
    })
    .filter((rec) => rec.samples.length > 1)
    .sort((a, b) => {
      const rank = (rec: Recording) => (ORDER.indexOf(rec.id.replace(/-\d+$/, "")) + 1 || 99);
      return rank(a) - rank(b) || a.id.localeCompare(b.id);
    });
}
