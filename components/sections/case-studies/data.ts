/**
 * Shared source of truth for the /realizacje list and its detail pages —
 * locale-invariant structure only (slug, image, liveUrl, variant). Translatable
 * copy (label, title, teaser, description, imageAlt) lives in
 * messages/{locale}/caseStudies.json under `projects`, keyed by the same
 * `slug` used here (camelCased: nowy-relaks -> nowyRelaks).
 */

export interface CaseStudyProject {
  slug: string;
  image: string;
  liveUrl?: string;
  /** "deep-dive" renders the existing CustomerSuccessSection instead of the standard template. */
  variant: "standard" | "deep-dive";
}

export const caseStudyProjects: CaseStudyProject[] = [
  {
    slug: "nowy-relaks",
    image: "/casestudy/nowyrelaks-after.jpg",
    liveUrl: "https://www.nowyrelaks.fi-invest.pl/",
    variant: "standard",
  },
  {
    slug: "gdynia-padel-club",
    image: "/casestudy/gdyniapadelclub.jpg",
    liveUrl: "https://www.gdyniapadelclub.pl/",
    variant: "standard",
  },
  {
    slug: "pierwsze-trzezwe-pokolenie",
    image: "/casestudy/logo-ptp.png",
    variant: "deep-dive",
  },
  {
    slug: "creo-gedania",
    image: "/casestudy/casestudy2.jpg",
    variant: "deep-dive",
  },
];

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}

/** `nowy-relaks` -> `nowyRelaks`, matching the message keys under `caseStudies.projects`. */
export function toProjectMessageKey(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}
