import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { syne, dmSans } from "@/lib/fonts";
import { routing, type AppLocale } from "@/i18n/routing";
import { RootProviders } from "@/components/shared/RootProviders";
import { BASE_URL, buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "common.seo" });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("defaultDescription"),
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
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "pl_PL",
      url: BASE_URL,
      siteName: "WeUnite",
      title: t("defaultTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("defaultTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("ogDescription"),
      images: ["/opengraph-image"],
    },
  };
}

async function buildJsonLd(locale: AppLocale) {
  const t = await getTranslations({ locale, namespace: "common.seo" });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${BASE_URL}/#business`,
        name: "WeUnite",
        url: BASE_URL,
        description: t("businessDescription"),
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
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
        description: t("websiteDescription"),
        inLanguage: locale === "en" ? "en-US" : "pl-PL",
      },
      {
        "@type": "Service",
        name: t("serviceWebsite"),
        provider: { "@id": `${BASE_URL}/#business` },
        description: t("serviceWebsiteDescription"),
        areaServed: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "Service",
        name: t("serviceSocialMedia"),
        provider: { "@id": `${BASE_URL}/#business` },
        description: t("serviceSocialMediaDescription"),
        areaServed: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "Service",
        name: t("serviceAutomation"),
        provider: { "@id": `${BASE_URL}/#business` },
        description: t("serviceAutomationDescription"),
        areaServed: { "@type": "Country", name: "Poland" },
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = await buildJsonLd(locale as AppLocale);

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <RootProviders>{children}</RootProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
