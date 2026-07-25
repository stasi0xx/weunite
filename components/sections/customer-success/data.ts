/**
 * Content for the "Pierwsze Trzeźwe Pokolenie" customer success case study.
 * Numbers are the client-reported 6-month results — keep them in sync with the
 * source report before editing copy.
 */

export const TOTAL_REACH = 27_200_000;

/** Rounded-down headline figure for the scroll-scrubbed opening counter. */
export const HERO_REACH = 27_000_000;

const plNumber = new Intl.NumberFormat("pl-PL");

/** U+00A0 / U+202F — which one Intl emits is ICU-version dependent. */
const NON_BREAKING_SPACES = /[  ]/g;

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
  title: string;
  body: string;
}

export interface Strategist {
  id: string;
  name: string;
  role: string;
  blurb: string;
  image: string;
  imageAlt: string;
  /** Optional headline numbers rendered as chips under the blurb. */
  stats?: { value: string; label: string }[];
  href?: string;
  hrefLabel?: string;
}

export interface PlatformResult {
  id: string;
  platform: string;
  value: number;
  /** Share of total reach, 0–1 — drives the bar width. */
  share: number;
  metric: string;
  details: string[];
}

export const challenges: Challenge[] = [
  {
    id: "cringe",
    title: "Ominąć efekt cringe’u",
    body:
      "Trzeźwość kojarzy się młodym z nudnymi pogadankami i zakazami, które prowokują do buntu. Musieliśmy zbudować komunikację bez szkolnego tonu i grożenia palcem — zatrzymać inicjację alkoholową inspiracją, nie strachem.",
  },
  {
    id: "attention",
    title: "Wygrać z przebodźcowaniem",
    body:
      "Algorytmy TikToka i YouTube’a promują szybką rozrywkę. Naszym zadaniem było przemycić głęboką, edukacyjną wartość w formacie, który realnie utrzyma uwagę widza.",
  },
  {
    id: "offline",
    title: "Przełożyć online na offline",
    body:
      "Bańka w internecie to za mało. Wyzwaniem było stworzenie realnego narzędzia wsparcia edukacyjnego, które trafi fizycznie do placówek oświatowych.",
  },
];

export const strategists: Strategist[] = [
  {
    id: "glinka",
    name: "Bartłomiej Glinka",
    role: "Inicjator projektu",
    blurb:
      "Ubrał projekt w ramy biznesowe i rozwojowe. Pokazał pokoleniu Z, że dyscyplina to waluta przyszłości — a nie kolejny zakaz do złamania.",
    image: "/entrepreneurs/Bartłomej.jpg",
    imageAlt: "Bartłomiej Glinka, inicjator projektu Pierwsze Trzeźwe Pokolenie",
  },
  {
    id: "kusznierewicz",
    name: "Mateusz Kusznierewicz",
    role: "Ambasador · Mistrz Olimpijski",
    blurb:
      "Legenda polskiego sportu. Jego twarz stała się symbolem alternatywy dla używek — dowodem, że prawdziwe emocje i sukces leżą w sporcie i pasji.",
    image: "/entrepreneurs/mateusz-kusznierewicz.jpeg",
    imageAlt:
      "Mateusz Kusznierewicz — ambasador kampanii Pierwsze Trzeźwe Pokolenie",
  },
  {
    id: "tchorzewski",
    name: "Łukasz Tchórzewski",
    role: "„Alkoholik z TikToka”",
    blurb:
      "Postawiliśmy na brutalnie szczery storytelling. Długi podcast wideo zbudował lojalność i czas oglądania, a krótkie formaty z tej samej rozmowy poszły wiralowo.",
    image: "/entrepreneurs/lukasz-tchorzewski.jpg",
    imageAlt:
      "Kadr z podcastu wideo nagranego z Łukaszem Tchórzewskim dla Pierwszego Trzeźwego Pokolenia",
    stats: [
      { value: "11 000+", label: "wyświetleń podcastu" },
      { value: "200 000+", label: "wyświetleń skrótów" },
    ],
    href: "https://youtu.be/nlATQ0SZveE",
    hrefLabel: "Zobacz podcast",
  },
];

export const schools: string[] = [
  "CREO Gedania",
  "Liceum Columbus w Gdańsku",
  "V Liceum Ogólnokształcące w Gdańsku",
];

export const headlineStats = [
  {
    id: "reach",
    value: TOTAL_REACH,
    suffix: "+",
    label: "kontaktów z marką w całym ekosystemie",
  },
  {
    id: "followers",
    value: 27_464,
    suffix: "",
    label: "nowych obserwujących — pozyskanych od absolutnego zera",
  },
  {
    id: "schools",
    value: 5,
    suffix: "",
    label: "placówek oświatowych z patronatem i plakatami kampanii",
  },
];

export const platformResults: PlatformResult[] = [
  {
    id: "tiktok",
    platform: "TikTok",
    value: 8_800_000,
    share: 0.32,
    metric: "wyświetleń",
    details: [
      "Hitowy materiał: 2,74 mln wyświetleń",
      "4 kolejne wideo powyżej 1,1 mln",
      "Konto zbudowane do 17,7 tys. obserwujących",
    ],
  },
  {
    id: "youtube",
    platform: "YouTube",
    value: 9_349_396,
    share: 0.34,
    metric: "wyświetleń",
    details: [
      "57 900 godzin spędzonych na oglądaniu",
      "Najlepszy Short: 1,16 mln wyświetleń",
      "Format długi + krótki z jednego nagrania",
    ],
  },
  {
    id: "meta",
    platform: "Meta",
    value: 9_062_184,
    share: 0.33,
    metric: "zasięgu organicznego",
    details: [
      "Wzrost zasięgu o +118 370%",
      "Ponad 330 000 interakcji",
      "Facebook + Instagram, bez budżetu na reklamy",
    ],
  },
];
