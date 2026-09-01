import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { BASE_URL, buildAlternates } from "@/lib/seo";

// `/dziekujemy` is deliberately left out: it's `noindex` (a post-conversion
// thank-you page, not something to advertise to crawlers), matching how
// `/booking` was already excluded from this sitemap for the same reason.
const PAGES: Array<{
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/strony-internetowe", changeFrequency: "monthly", priority: 0.8 },
  { path: "/social-media", changeFrequency: "monthly", priority: 0.8 },
  { path: "/realizacje", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/realizacje/nowy-relaks",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    path: "/realizacje/gdynia-padel-club",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    path: "/realizacje/pierwsze-trzezwe-pokolenie",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    path: "/realizacje/creo-gedania",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  { path: "/wizualizacja", changeFrequency: "monthly", priority: 0.5 },
  { path: "/regulamin", changeFrequency: "yearly", priority: 0.3 },
  { path: "/polityka-prywatnosci", changeFrequency: "yearly", priority: 0.3 },
  { path: "/polityka-cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${getPathname({ href: path, locale })}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: buildAlternates(path, locale).languages,
      },
    }))
  );
}
