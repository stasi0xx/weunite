/**
 * Structural content for the "Creo Gedania" case study — ids and numbers
 * (locale invariant). Translatable copy (titles, bodies, labels) lives in
 * messages/{locale}/creoGedania.json, keyed by the same `id` used here.
 * Numbers are the client-reported results from the source case study brief;
 * keep in sync before editing copy.
 */

export interface ChapterItem {
  id: string;
}

export const challenges: ChapterItem[] = [{ id: "niche" }, { id: "trust" }];

export const strategySteps: ChapterItem[] = [
  { id: "script" },
  { id: "creator" },
  { id: "ads" },
];

export const videoRef = {
  handle: "@poznajtrojmiasto",
  href: "https://www.tiktok.com/@poznajtrojmiasto/video/7368743327748967712",
};

export const headlineStat = {
  value: 10,
  suffix: "",
};

export const secondaryStat = {
  value: 50_000,
  suffix: "+",
};
