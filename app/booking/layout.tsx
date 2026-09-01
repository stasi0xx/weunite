import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { syne, dmSans } from "@/lib/fonts";
import { RootProviders } from "@/components/shared/RootProviders";
import plMessages from "@/messages/pl";

export const metadata: Metadata = {
  title: "Rezerwacja rozmowy strategicznej",
  robots: { index: false, follow: false },
};

/**
 * Its own root layout (Next.js "multiple root layouts" pattern) — /booking stays
 * outside the locale system entirely (see docs/specs/0001-multi-language-support),
 * so it can no longer rely on the removed shared app/layout.tsx for <html>/<body>.
 */
export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* /booking stays Polish only, entirely outside the locale routing
            system (docs/specs/0001-multi-language-support) — this provider is
            static, not routed, so the shared components in RootProviders
            (e.g. CookieBanner) that call useTranslations still work here. */}
        <NextIntlClientProvider locale="pl" messages={plMessages}>
          <RootProviders>{children}</RootProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
