/**
 * Content for the "Creo Gedania" case study — micro-influencer + paid ads
 * campaign for a private school's Open Days. Numbers are the client-reported
 * results from the source case study brief; keep in sync before editing copy.
 */

export interface ChapterItem {
  id: string;
  title: string;
  body: string;
}

export const challenges: ChapterItem[] = [
  {
    id: "niche",
    title: "Trafić w bardzo wąską niszę",
    body: "Rodzice dzieci w wieku szkolnym, mieszkający na terenie Trójmiasta. Szerokie, tradycyjne kampanie reklamowe niosły ryzyko przepalenia budżetu na osoby spoza regionu.",
  },
  {
    id: "trust",
    title: "Uwiarygodnić placówkę i zaangażować lokalnie",
    body: "Przed Dniami Otwartymi szkoła potrzebowała formatu, który natychmiast zbuduje zaufanie i zaangażuje lokalną społeczność — nie kolejnego bannera reklamowego.",
  },
];

export const strategySteps: ChapterItem[] = [
  {
    id: "script",
    title: "Scenariusz napisany pod jeden cel",
    body: "Po konsultacjach z dyrekcją szkoły nasz zespół napisał precyzyjny scenariusz — mocno akcentujący indywidualne podejście do ucznia i przedstawiający placówkę jako innowacyjny unikat na światową skalę. Zamiast suchego komunikatu: autentyczna opowieść.",
  },
  {
    id: "creator",
    title: "Lokalna twórczyni, trafna społeczność",
    body: "Do kampanii wytypowaliśmy mikroinfluencerkę @poznajtrojmiasto — twórczynię aktywną na TikToku i Instagramie, której społeczność to niemal dokładne przecięcie naszej grupy docelowej.",
  },
  {
    id: "ads",
    title: "Boost przez Meta Ads i TikTok Ads",
    body: "Opublikowane materiały wsparliśmy precyzyjnym targetowaniem płatnym, docierając dokładnie do wyselekcjonowanej grupy trójmiejskich rodziców i gwarantując najwyższą jakość wyświetleń.",
  },
];

export const videoRef = {
  handle: "@poznajtrojmiasto",
  href: "https://www.tiktok.com/@poznajtrojmiasto/video/7368743327748967712",
  label: "Zobacz oryginalny materiał na TikToku",
};

export const headlineStat = {
  value: 10,
  suffix: "",
  label: "nowych uczniów zapisanych do szkoły po obejrzeniu materiałów",
};

export const secondaryStat = {
  value: 50_000,
  suffix: "+",
  label: "ukierunkowanych wyświetleń dzięki synergii zasięgu organicznego i Meta/TikTok Ads",
};

export const qualitativeHighlight =
  "Kampania wywołała duże zainteresowanie wydarzeniem i zbudowała realny ruch offline — rodzice odwiedzali placówkę z dziećmi jeszcze przed oficjalnymi zapisami.";
