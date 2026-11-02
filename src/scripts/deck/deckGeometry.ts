import { BufferAttribute, BufferGeometry } from "three";

// Ported from DeckForge (apps/web/src/deck/deckGeometry.ts), the same procedural deck the
// app previews on. Only the Prototype 0 "inverted UV" demonstration flag is left out.
//
// Coordinate system: Y is up, the deck length runs along Z with the NOSE at +Z and the TAIL
// at -Z, and the width runs along X. UVs on the decal face (the underside): u 0→1 across the
// width, v 0 at the tail and 1 at the nose. With three.js' default flipY, the top row of the
// decal image lands at the nose. Material groups: 0 = decal face, 1 = top + rim.

export const DECK_LENGTH = 3.2;
export const DECK_WIDTH = 0.82;
export const DECK_THICKNESS = 0.045;
export const CONCAVE_DEPTH = 0.03;
// The nose kick is higher than the tail kick, as on a real deck.
export const NOSE_KICK_RISE = 0.17;
export const TAIL_KICK_RISE = 0.12;
const KICK_REGION = 0.18;
const TIP_ROUNDING = 0.12;
const MIN_TIP_PROFILE = 0.08;
const SEGMENTS_LENGTH = 48;
const SEGMENTS_WIDTH = 16;

/** Half-width profile along the length (t in [0,1]), popsicle shaped. */
function widthProfile(t: number): number {
  const round = (s: number) => Math.max(MIN_TIP_PROFILE, Math.sqrt(Math.max(0, 2 * s - s * s)));
  if (t < TIP_ROUNDING) return round(t / TIP_ROUNDING);
  if (t > 1 - TIP_ROUNDING) return round((1 - t) / TIP_ROUNDING);
  return 1;
}

/** Vertical displacement of the deck surface: concave across, kicktails at the ends. */
function surfaceHeight(u: number, v: number): number {
  const concave = CONCAVE_DEPTH * (2 * u - 1) ** 2;
  let kick = 0;
  if (v < KICK_REGION) {
    const s = (KICK_REGION - v) / KICK_REGION;
    kick = TAIL_KICK_RISE * s * s;
  } else if (v > 1 - KICK_REGION) {
    const s = (v - (1 - KICK_REGION)) / KICK_REGION;
    kick = NOSE_KICK_RISE * s * s;
  }
  return concave + kick;
}

export function createDeckGeometry(): BufferGeometry {
  const nL = SEGMENTS_LENGTH;
  const nW = SEGMENTS_WIDTH;
  const rows = nL + 1;
  const cols = nW + 1;

  // Two vertex grids: bottom (decal face) then top, sharing x/z.
  const positions: number[] = [];
  const uvs: number[] = [];
  const gridIndex = (layer: 0 | 1, i: number, j: number) => layer * rows * cols + i * cols + j;

  for (let layer = 0 as 0 | 1; layer <= 1; layer++) {
    for (let i = 0; i < rows; i++) {
      const v = i / nL;
      const z = (v - 0.5) * DECK_LENGTH;
      const half = (DECK_WIDTH / 2) * widthProfile(v);
      for (let j = 0; j < cols; j++) {
        const u = j / nW;
        const x = (u - 0.5) * 2 * half;
        const y = surfaceHeight(u, v) + (layer === 1 ? DECK_THICKNESS : 0);
        positions.push(x, y, z);
        uvs.push(u, v);
      }
    }
  }

  const indices: number[] = [];

  // Bottom faces (decal face), wound to face -Y.
  for (let i = 0; i < nL; i++) {
    for (let j = 0; j < nW; j++) {
      const a = gridIndex(0, i, j);
      const b = gridIndex(0, i, j + 1);
      const c = gridIndex(0, i + 1, j);
      const d = gridIndex(0, i + 1, j + 1);
      indices.push(a, b, c, b, d, c);
    }
  }
  const bottomIndexCount = indices.length;

  // Top faces, wound to face +Y.
  for (let i = 0; i < nL; i++) {
    for (let j = 0; j < nW; j++) {
      const a = gridIndex(1, i, j);
      const b = gridIndex(1, i, j + 1);
      const c = gridIndex(1, i + 1, j);
      const d = gridIndex(1, i + 1, j + 1);
      indices.push(a, c, b, b, c, d);
    }
  }

  // Rim: ordered perimeter loop of grid coordinates, connected bottom-to-top.
  const perimeter: Array<[number, number]> = [];
  for (let j = 0; j < cols - 1; j++) perimeter.push([0, j]); // tail edge
  for (let i = 0; i < rows - 1; i++) perimeter.push([i, nW]); // right side
  for (let j = cols - 1; j > 0; j--) perimeter.push([nL, j]); // nose edge
  for (let i = rows - 1; i > 0; i--) perimeter.push([i, 0]); // left side

  for (let p = 0; p < perimeter.length; p++) {
    const [i0, j0] = perimeter[p];
    const [i1, j1] = perimeter[(p + 1) % perimeter.length];
    const b0 = gridIndex(0, i0, j0);
    const b1 = gridIndex(0, i1, j1);
    const t0 = gridIndex(1, i0, j0);
    const t1 = gridIndex(1, i1, j1);
    indices.push(b0, b1, t1, b0, t1, t0);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);
  geometry.addGroup(0, bottomIndexCount, 0);
  geometry.addGroup(bottomIndexCount, indices.length - bottomIndexCount, 1);
  geometry.computeVertexNormals();
  return geometry;
}
