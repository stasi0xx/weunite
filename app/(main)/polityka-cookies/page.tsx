import type { Metadata } from "next"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Informacje o plikach cookies stosowanych przez serwis WeUnite oraz o tym, jak nimi zarządzać.",
  alternates: { canonical: "https://www.weunite.pl/polityka-cookies" },
  robots: { index: true, follow: true },
}

export default function PolitykaCookiesPage() {
  return (
    <LegalPageLayout title="Polityka cookies" lastUpdated="10 maja 2026 r.">

      <LegalSection title="1. Czym są pliki cookies?">
        <p>
          Pliki cookies (ciasteczka) to małe pliki tekstowe przechowywane na Twoim urządzeniu
          (komputerze, tablecie, smartfonie) przez przeglądarkę internetową. Są powszechnie
          stosowane do zapewnienia prawidłowego działania stron, zapamiętywania preferencji
          użytkownika oraz zbierania statystyk.
        </p>
        <p>
          Pliki cookies nie zawierają wirusów ani złośliwego oprogramowania. Możesz je usunąć
          lub zablokować w ustawieniach swojej przeglądarki w dowolnym momencie.
        </p>
      </LegalSection>

      <LegalSection title="2. Jakie cookies stosujemy?">
        <div className="space-y-6">

          <div>
            <p className="font-medium text-foreground mb-2">
              a) Niezbędne cookies (techniczne)
            </p>
            <p className="mb-2">
              Wymagane do prawidłowego działania Serwisu. Bez nich kluczowe funkcje — takie
              jak formularz kontaktowy czy system rezerwacji — nie byłyby dostępne.
              Nie wymagają Twojej zgody.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-foreground">Nazwa</th>
                    <th className="text-left py-2 pr-4 font-medium text-foreground">Cel</th>
                    <th className="text-left py-2 font-medium text-foreground">Czas życia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">sb-*</td>
                    <td className="py-2 pr-4">Sesja użytkownika (Supabase Auth — panel admina)</td>
                    <td className="py-2">Sesja / 1 tydzień</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">
              b) Analityczne cookies
            </p>
            <p className="mb-2">
              Używamy narzędzia <strong>PostHog</strong> do zbierania anonimowych danych o
              sposobie korzystania z Serwisu (np. odwiedzane strony, czas spędzony na stronie,
              źródło wejścia). Dane te pomagają nam poprawiać jakość Serwisu. Pliki te są
              stosowane wyłącznie po wyrażeniu przez Ciebie zgody.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-foreground">Nazwa</th>
                    <th className="text-left py-2 pr-4 font-medium text-foreground">Cel</th>
                    <th className="text-left py-2 font-medium text-foreground">Czas życia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">ph_*</td>
                    <td className="py-2 pr-4">Identyfikator sesji analitycznej (PostHog)</td>
                    <td className="py-2">1 rok</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">posthog</td>
                    <td className="py-2 pr-4">Rozróżnianie unikalnych użytkowników (PostHog)</td>
                    <td className="py-2">1 rok</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm">
              Więcej informacji:{" "}
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Polityka prywatności PostHog
              </a>
              .
            </p>
          </div>

        </div>
      </LegalSection>

      <LegalSection title="3. Podstawa prawna stosowania cookies">
        <LegalList
          items={[
            "Cookies niezbędne — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na zapewnieniu prawidłowego działania Serwisu) oraz art. 173 Prawa telekomunikacyjnego — nie wymagają zgody.",
            "Cookies analityczne — art. 6 ust. 1 lit. a RODO (zgoda użytkownika) — stosowane wyłącznie po wyrażeniu zgody w bannerze cookies.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Jak zarządzać plikami cookies?">
        <p>
          Możesz samodzielnie zarządzać plikami cookies w ustawieniach swojej przeglądarki.
          Możesz je zablokować, usunąć lub wybrać, które typy akceptujesz. Instrukcje dla
          najpopularniejszych przeglądarek:
        </p>
        <LegalList
          items={[
            "Google Chrome: Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn",
            "Mozilla Firefox: Opcje → Prywatność i bezpieczeństwo → Ciasteczka i dane witryn",
            "Microsoft Edge: Ustawienia → Pliki cookie i uprawnienia witryn",
            "Safari: Preferencje → Prywatność",
          ]}
        />
        <p>
          Zablokowanie wszystkich cookies może wpłynąć na działanie Serwisu — w szczególności
          formularz kontaktowy i system rezerwacji mogą nie działać prawidłowo.
        </p>
        <p>
          Możesz również zrezygnować z analityki PostHog, klikając odpowiednią opcję w bannerze
          cookies wyświetlanym przy pierwszej wizycie w Serwisie.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies podmiotów trzecich">
        <p>
          Serwis może korzystać z narzędzi podmiotów trzecich, które mogą umieszczać własne
          pliki cookies na Twoim urządzeniu. Dotyczy to w szczególności PostHog (analityka).
          Podmioty te mają własne polityki prywatności i cookies — WeUnite nie ma wpływu na
          stosowane przez nich pliki cookies.
        </p>
      </LegalSection>

      <LegalSection title="6. Zmiany niniejszej Polityki">
        <p>
          Możemy aktualizować niniejszą Politykę Cookies, np. w związku ze zmianą stosowanych
          narzędzi lub wymogów prawnych. Nowa wersja zostanie opublikowana w Serwisie wraz
          z datą wejścia w życie.
        </p>
      </LegalSection>

    </LegalPageLayout>
  )
}
