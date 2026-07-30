/**
 * Shared source of truth for the /realizacje list and its detail pages.
 * Copy for nowy-relaks and gdynia-padel-club is verbatim from the existing
 * approved case study text (WebsitesCaseStudies.tsx) — no new figures added.
 */

export interface CaseStudyProject {
  slug: string;
  label: string;
  title: string;
  /** Short 1–2 sentence summary for the /realizacje list row. */
  teaser: string;
  /** Full approved description, shown on the project's own detail page. */
  description: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  /** "deep-dive" renders the existing CustomerSuccessSection instead of the standard template. */
  variant: "standard" | "deep-dive";
}

export const caseStudyProjects: CaseStudyProject[] = [
  {
    slug: "nowy-relaks",
    label: "Deweloper",
    title: "Nowy Relaks — Filipek Investment",
    teaser:
      "Deweloper domów jednorodzinnych pod Białą Podlaską zamienił darmowy szablon na stronę zaprojektowaną od podstaw — z pełną prezentacją inwestycji i formularzem zapytań trafiającym prosto do zespołu sprzedaży.",
    description:
      "Nowy Relaks to inwestycja domów jednorodzinnych pod Białą Podlaską, prowadzona przez dewelopera Filipek Investment. Wcześniej firma korzystała z darmowego szablonu, który nie budował zaufania i nie prezentował oferty w sposób, na jaki inwestycja zasługuje. Zaprojektowaliśmy i wdrożyliśmy stronę od podstaw, z pełną prezentacją lokalizacji, etapów budowy oraz galerii wnętrz. Dodaliśmy przejrzysty formularz zapytań o dostępność konkretnych domów, trafiający wprost do zespołu sprzedaży. Efekt: nowocześniejszy wizerunek marki i więcej zapytań o zakup.",
    image: "/casestudy/nowyrelaks-after.jpg",
    imageAlt: "Strona inwestycji Nowy Relaks zaprojektowana przez WeUnite",
    liveUrl: "https://www.nowyrelaks.fi-invest.pl/",
    variant: "standard",
  },
  {
    slug: "gdynia-padel-club",
    label: "Klub sportowy",
    title: "Gdynia Padel Club",
    teaser:
      "Klub sportowy w Gdyni zyskał dynamiczny system rezerwacji online zintegrowany z dostępnością kortów — mniej pracy administracyjnej, wygodniejsza ścieżka rezerwacji dla graczy.",
    description:
      "Gdynia Padel Club to klub sportowy w Gdyni, dla którego zbudowaliśmy stronę prezentującą korty i pełną ofertę zajęć. Kluczowym wyzwaniem było umożliwienie klientom szybkiej rezerwacji terminu bez telefonowania do recepcji. Wdrożyliśmy dynamiczny system rezerwacji online, zintegrowany z bieżącą dostępnością kortów. Strona prezentuje też cennik, wydarzenia i social media klubu w jednym miejscu. Efekt: mniej pracy administracyjnej dla zespołu i wygodniejsza ścieżka rezerwacji dla graczy.",
    image: "/casestudy/gdyniapadelclub.jpg",
    imageAlt: "Strona Gdynia Padel Club zaprojektowana przez WeUnite",
    liveUrl: "https://www.gdyniapadelclub.pl/",
    variant: "standard",
  },
  {
    slug: "pierwsze-trzezwe-pokolenie",
    label: "Fundacja · Kampania społeczna",
    title: "Pierwsze Trzeźwe Pokolenie",
    teaser:
      "Kampania społeczna zbudowana od zera: ponad 27,2 mln kontaktów z marką, blisko 27 500 nowych obserwujących i patronat 5 placówek oświatowych — w 6 miesięcy.",
    description:
      "Architektura i komunikacja kampanii Pierwsze Trzeźwe Pokolenie (Fundacja Columbus) — od zera, w 6 miesięcy: strategia, ambasadorowie, treści wideo i realne wsparcie edukacyjne w placówkach oświatowych.",
    image: "/casestudy/logo-ptp.png",
    imageAlt: "Kadr z podcastu wideo nagranego dla Pierwszego Trzeźwego Pokolenia",
    variant: "deep-dive",
  },
  {
    slug: "creo-gedania",
    label: "Edukacja prywatna",
    title: "Creo Gedania — 10 nowych uczniów z dwóch rolek",
    teaser:
      "Micro-influencer marketing i precyzyjne Meta Ads + TikTok Ads: dwie rolki z lokalną twórczynią wygenerowały ponad 50 000 ukierunkowanych wyświetleń i 10 nowych zapisów do szkoły.",
    description:
      "Przed Dniami Otwartymi prywatna szkoła Creo Gedania potrzebowała precyzyjnego dotarcia do rodziców z Trójmiasta. Napisaliśmy scenariusz pod nagranie z mikroinfluencerką @poznajtrojmiasto i wsparliśmy materiały targetowanymi kampaniami Meta Ads i TikTok Ads. Efekt: ponad 50 000 ukierunkowanych wyświetleń i 10 nowych uczniów zapisanych bezpośrednio po obejrzeniu materiałów.",
    image: "/casestudy/casestudy2.jpg",
    imageAlt: "Uczniowie i nauczycielka przed budynkiem szkoły Creo Gedania w Gdańsku",
    variant: "deep-dive",
  },
];

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}
