// A line-for-line port of the trick detection in SK8Sense's firmware/src/main.cpp
// (detectTrick + classifyPeakWindow). Keep it in sync with the firmware: the site
// claims these are the board's rules, so they must stay exactly that.

export const RULES = {
  FLIP_GX_MIN: 220,
  FLIP_DOMINANCE: 1.35,
  OLLIE_GY_MIN: 150,
  SHUV_GZ_MIN: 170,
  SHUV_DOMINANCE: 1.25,
  GYRO_MIN: 70,
  TRICK_HOLD_MS: 400,
  PEAK_WINDOW_MS: 480,
  PEAK_QUIET_MS: 80,
} as const;

/** Rotation rates in °/s on the board axes: gx flip (length), gy pop (pitch), gz shove-it (yaw). */
export type Sample = { t: number; gx: number; gy: number; gz: number };

export type Trick = "kickflip" | "heelflip" | "bs_shuv" | "fs_shuv" | "ollie" | "none";

export const TRICK_NAMES: Record<Trick, string> = {
  kickflip: "Kickflip",
  heelflip: "Heelflip",
  bs_shuv: "Backside shove-it",
  fs_shuv: "Frontside shove-it",
  ollie: "Ollie",
  none: "No trick",
};

export type Detection = {
  trick: Trick;
  /** First active sample of the window and the sample where the firmware decided. */
  start: number;
  end: number;
  peak: { gx: number; gy: number; gz: number };
  /** Which axis decided, for highlighting. */
  axis: "gx" | "gy" | "gz" | null;
  /** The rule that matched, written out with the measured values. */
  rule: string;
};

const r = (v: number) => Math.round(Math.abs(v));

export function classifyPeakWindow(peak: Detection["peak"]): Pick<Detection, "trick" | "axis" | "rule"> {
  const flipPeak = Math.abs(peak.gx);
  const olliePeak = Math.abs(peak.gy);
  const shuvPeak = Math.abs(peak.gz);

  if (shuvPeak >= RULES.SHUV_GZ_MIN && flipPeak < RULES.FLIP_GX_MIN && shuvPeak >= olliePeak * RULES.SHUV_DOMINANCE) {
    const trick = peak.gz > 0 ? "bs_shuv" : "fs_shuv";
    return {
      trick,
      axis: "gz",
      rule: `|gz| ${r(peak.gz)} ≥ ${RULES.SHUV_GZ_MIN}, |gx| ${r(peak.gx)} < ${RULES.FLIP_GX_MIN}, ≥ ${RULES.SHUV_DOMINANCE} × |gy| ${r(peak.gy)}`,
    };
  }

  if (flipPeak >= RULES.FLIP_GX_MIN && flipPeak >= olliePeak * RULES.FLIP_DOMINANCE) {
    const trick = peak.gx > 0 ? "kickflip" : "heelflip";
    return {
      trick,
      axis: "gx",
      rule: `|gx| ${r(peak.gx)} ≥ ${RULES.FLIP_GX_MIN} and ≥ ${RULES.FLIP_DOMINANCE} × |gy| ${r(peak.gy)}`,
    };
  }

  if (olliePeak >= RULES.OLLIE_GY_MIN) {
    return { trick: "ollie", axis: "gy", rule: `|gy| ${r(peak.gy)} ≥ ${RULES.OLLIE_GY_MIN}` };
  }

  return { trick: "none", axis: null, rule: "No rule matched" };
}

/** Runs the firmware's peak-window logic over a recording, sample by sample. */
export function detectTricks(samples: Sample[]): Detection[] {
  const detections: Detection[] = [];
  let holdUntil = 0;
  let windowStart: number | null = null;
  let lastActive = 0;
  let peak = { gx: 0, gy: 0, gz: 0 };

  for (const { t, gx, gy, gz } of samples) {
    if (t < holdUntil) continue;

    const active = Math.hypot(gx, gy, gz) > RULES.GYRO_MIN;
    if (active) {
      if (windowStart === null) windowStart = t;
      lastActive = t;
      if (Math.abs(gx) > Math.abs(peak.gx)) peak.gx = gx;
      if (Math.abs(gy) > Math.abs(peak.gy)) peak.gy = gy;
      if (Math.abs(gz) > Math.abs(peak.gz)) peak.gz = gz;
    }

    if (windowStart === null) continue;

    const quietEnough = !active && t - lastActive >= RULES.PEAK_QUIET_MS;
    const windowDone = t - windowStart >= RULES.PEAK_WINDOW_MS;
    if (!quietEnough && !windowDone) continue;

    const result = classifyPeakWindow(peak);
    detections.push({ ...result, start: windowStart, end: t, peak });
    windowStart = null;
    peak = { gx: 0, gy: 0, gz: 0 };
    if (result.trick !== "none") holdUntil = t + RULES.TRICK_HOLD_MS;
  }

  return detections;
}
