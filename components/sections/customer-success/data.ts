/**
 * Structural content for the "Pierwsze Trzeźwe Pokolenie" customer success case
 * study — ids, images, hrefs, and the client-reported numbers (locale
 * invariant). Translatable copy (titles, roles, blurbs, labels, details) lives
 * in messages/{locale}/home.json under `customerSuccess`, keyed by the same
 * `id` used here. Numbers are the client-reported 6-month results — keep them
 * in sync with the source report before editing copy.
 */

export const TOTAL_REACH = 27_200_000;

/** Rounded-down headline figure for the scroll-scrubbed opening counter. */
export const HERO_REACH = 27_000_000;

const plNumber = new Intl.NumberFormat("pl-PL");

/** U+00A0 / U+202F — which one Intl emits is ICU-version dependent. */
const NON_BREAKING_SPACES = /[  ]/g;

/**
 * Groups thousands the Polish way, but with a breakable space instead of the
 * non-breaking one `Intl` emits. Display sizes are set so these numbers always
 * fit on one line; this only changes the failure mode — an unexpectedly narrow
 * box wraps the number instead of letting it overlap the next column.
 */
export function formatCount(value: number): string {
  return plNumber.format(value).replace(NON_BREAKING_SPACES, " ");
}

export interface Challenge {
  id: string;
}

export interface Strategist {
  id: string;
  name: string;
  image: string;
  /** Optional headline numbers rendered as chips under the blurb; values are locale invariant, labels come from messages. */
  statValues?: string[];
  href?: string;
}

export interface PlatformResult {
  id: string;
  platform: string;
  value: number;
  /** Share of total reach, 0–1 — drives the bar width. */
  share: number;
}

export const challenges: Challenge[] = [
  { id: "cringe" },
  { id: "attention" },
  { id: "offline" },
];

export const strategists: Strategist[] = [
  {
    id: "glinka",
    name: "Bartłomiej Glinka",
    image: "/entrepreneurs/Bartłomej.jpg",
  },
  {
    id: "kusznierewicz",
    name: "Mateusz Kusznierewicz",
    image: "/entrepreneurs/mateusz-kusznierewicz.jpeg",
  },
  {
    id: "tchorzewski",
    name: "Łukasz Tchórzewski",
    image: "/entrepreneurs/lukasz-tchorzewski.jpg",
    statValues: ["11 000+", "200 000+"],
    href: "https://youtu.be/nlATQ0SZveE",
  },
];

export const schools: string[] = [
  "CREO Gedania",
  "Liceum Columbus w Gdańsku",
  "V Liceum Ogólnokształcące w Gdańsku",
];

export const headlineStats = [
  { id: "reach", value: TOTAL_REACH, suffix: "+" },
  { id: "followers", value: 27_464, suffix: "" },
  { id: "schools", value: 5, suffix: "" },
];

export const platformResults: PlatformResult[] = [
  { id: "tiktok", platform: "TikTok", value: 8_800_000, share: 0.32 },
  { id: "youtube", platform: "YouTube", value: 9_349_396, share: 0.34 },
  { id: "meta", platform: "Meta", value: 9_062_184, share: 0.33 },
];
