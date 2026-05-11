import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "./providers";
import CookieBanner from "@/components/ui/CookieBanner";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});


const BASE_URL = "https://www.weunite.pl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "WeUnite — Strony internetowe i marketing dla domków letniskowych",
    template: "%s | WeUnite",
  },
  description:
    "Profesjonalne strony internetowe z systemem rezerwacji i płatności online dla właścicieli domków letniskowych. Obsługa social media i automatyzacje. Bezpłatna konsultacja i wizualizacja strony.",
  keywords: [
    "strony internetowe domki letniskowe",
    "system rezerwacji online domki",
    "marketing domki letniskowe",
    "obsługa social media",
    "agencja marketingowa",
    "strona z rezerwacją",
    "WeUnite",
    "automatyzacje biznesowe",
  ],
  authors: [{ name: "WeUnite", url: BASE_URL }],
  creator: "WeUnite",
  publisher: "WeUnite",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE_URL,
    siteName: "WeUnite",
    title: "WeUnite — Strony internetowe i marketing dla domków letniskowych",
    description:
      "Profesjonalne strony z systemem rezerwacji online dla właścicieli domków letniskowych. Bezpłatna konsultacja i wizualizacja.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WeUnite — Strony internetowe i marketing dla domków letniskowych",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeUnite — Strony internetowe i marketing dla domków letniskowych",
    description:
      "Profesjonalne strony z systemem rezerwacji online dla właścicieli domków letniskowych. Bezpłatna konsultacja i wizualizacja.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${BASE_URL}/#business`,
      name: "WeUnite",
      url: BASE_URL,
      description:
        "Agencja marketingowa specjalizująca się w stronach internetowych z systemami rezerwacji online, obsłudze social media i automatyzacjach dla właścicieli domków letniskowych.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Gdyńska G/9",
        addressLocality: "Gdańsk",
        postalCode: "80-340",
        addressCountry: "PL",
      },
      telephone: "+48537732320",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Poland",
      },
      image: `${BASE_URL}/opengraph-image`,
      sameAs: [
        "https://www.instagram.com/ianite.pl/",
        "https://www.facebook.com/jan.hofman.94801",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "WeUnite",
      description:
        "Profesjonalne strony internetowe z systemem rezerwacji online dla właścicieli domków letniskowych.",
      inLanguage: "pl-PL",
    },
    {
      "@type": "Service",
      name: "Strona internetowa z systemem rezerwacji dla domków letniskowych",
      provider: { "@id": `${BASE_URL}/#business` },
      description:
        "Profesjonalna strona internetowa z zintegrowanym systemem rezerwacji i płatności online — dedykowana dla właścicieli domków letniskowych i obiektów noclegowych.",
      areaServed: { "@type": "Country", name: "Poland" },
    },
    {
      "@type": "Service",
      name: "Obsługa social media",
      provider: { "@id": `${BASE_URL}/#business` },
      description:
        "Regularne tworzenie treści, kampanie reklamowe na Facebooku i Instagramie oraz wzrost zasięgów organicznych.",
      areaServed: { "@type": "Country", name: "Poland" },
    },
    {
      "@type": "Service",
      name: "Automatyzacje biznesowe",
      provider: { "@id": `${BASE_URL}/#business` },
      description:
        "Automatyzacja procesów biznesowych — sekwencje e-mail, przypomnienia o rezerwacjach i powiadomienia bez ręcznej pracy 24/7.",
      areaServed: { "@type": "Country", name: "Poland" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          {children}
          <Toaster />
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  );
}
