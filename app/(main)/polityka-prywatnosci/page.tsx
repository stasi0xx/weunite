import type { Metadata } from "next"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Dowiedz się, jakie dane osobowe zbiera WeUnite, w jakim celu i na jakiej podstawie prawnej je przetwarza.",
  alternates: { canonical: "https://www.weunite.pl/polityka-prywatnosci" },
  robots: { index: true, follow: true },
}

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPageLayout title="Polityka prywatności" lastUpdated="10 maja 2026 r.">

      <LegalSection title="1. Administrator danych osobowych">
        <p>
          Administratorem Twoich danych osobowych jest WeUnite z siedzibą przy{" "}
          <strong>ul. Gdyńskiej G/9, 80-340 Gdańsk</strong>.
        </p>
        <p>
          Kontakt z Administratorem:{" "}
          <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
            info@weunite.pl
          </a>{" "}
          lub telefonicznie: +48 537 732 320.
        </p>
      </LegalSection>

      <LegalSection title="2. Jakie dane zbieramy i skąd">
        <p>Zbieramy dane wyłącznie wtedy, gdy sam je nam przekazujesz:</p>
        <LegalList
          items={[
            "Formularz kontaktowy (Lead): imię i nazwisko, adres e-mail, rodzaj działalności, zainteresowanie usługą.",
            "System rezerwacji rozmowy: imię i nazwisko, adres e-mail, wybrany termin spotkania.",
            "Korespondencja e-mailowa: dane zawarte w treści wiadomości.",
          ]}
        />
        <p>
          Nie zbieramy danych wrażliwych (art. 9 RODO) ani danych dotyczących dzieci poniżej
          16. roku życia. Serwis nie jest kierowany do osób niepełnoletnich.
        </p>
      </LegalSection>

      <LegalSection title="3. Cele i podstawy prawne przetwarzania">
        <p>Twoje dane przetwarzamy w następujących celach:</p>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-1">
              a) Obsługa zapytania i wysyłka bezpłatnej konsultacji
            </p>
            <p>
              Podstawa prawna: art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy lub
              podjęcia działań przed jej zawarciem) oraz art. 6 ust. 1 lit. a RODO (zgoda
              wyrażona przez wypełnienie formularza).
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">
              b) Automatyczna sekwencja e-mailowa (Dzień 0 / Dzień 2 / Dzień 4)
            </p>
            <p>
              Podstawa prawna: art. 6 ust. 1 lit. a RODO (zgoda) — możesz zrezygnować w
              każdej chwili, klikając link „wypisz się" w dowolnym e-mailu.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">
              c) Obsługa rezerwacji rozmowy i przypomnienia (48h / 24h / 1h)
            </p>
            <p>
              Podstawa prawna: art. 6 ust. 1 lit. b RODO (wykonanie umowy / działania
              przed zawarciem umowy).
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">
              d) Marketing własnych usług WeUnite
            </p>
            <p>
              Podstawa prawna: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes
              Administratora) — tylko wobec osób, które wcześniej wyraziły zainteresowanie
              ofertą.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">
              e) Analityka i poprawa jakości Serwisu
            </p>
            <p>
              Podstawa prawna: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes) —
              za pomocą narzędzi analitycznych (PostHog) zbieramy anonimowe/pseudonimizowane
              dane o sposobie korzystania z Serwisu.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="4. Okres przechowywania danych">
        <LegalList
          items={[
            "Dane z formularza kontaktowego i systemu rezerwacji: do momentu realizacji obsługi zapytania, a następnie przez 3 lata od ostatniego kontaktu lub do momentu złożenia skutecznego sprzeciwu.",
            "Dane do celów marketingowych: do wycofania zgody lub złożenia sprzeciwu.",
            "Dane niezbędne do ustalenia, dochodzenia lub obrony roszczeń: przez okres przedawnienia roszczeń wynikający z przepisów prawa (co do zasady 3 lata dla roszczeń związanych z działalnością gospodarczą).",
            "Logi systemowe i dane analityczne: do 13 miesięcy.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Odbiorcy danych (podprocesatorzy)">
        <p>
          Twoje dane mogą być przekazywane wyłącznie zaufanym podmiotom przetwarzającym dane w
          naszym imieniu, na podstawie umów powierzenia przetwarzania danych:
        </p>
        <LegalList
          items={[
            "Supabase Inc. (USA) — baza danych i przechowywanie rekordów leadów oraz slotów rezerwacji. Dane przechowywane w regionie EU (Frankfurt). Przekazanie odbywa się na podstawie Standardowych Klauzul Umownych (art. 46 RODO).",
            "Resend Inc. (USA) — wysyłka wiadomości e-mail (potwierdzenia, sekwencje, przypomnienia). Przekazanie odbywa się na podstawie Standardowych Klauzul Umownych.",
            "Vercel Inc. (USA) — hosting aplikacji. Dane przechowywane w regionie EU. Przekazanie na podstawie Standardowych Klauzul Umownych.",
            "PostHog Inc. (USA/EU) — narzędzie analityczne. Dane mogą być przechowywane w regionie EU. Przekazanie na podstawie Standardowych Klauzul Umownych.",
          ]}
        />
        <p>
          Nie sprzedajemy Twoich danych osobowych osobom trzecim ani nie udostępniamy ich w
          celach reklamowych podmiotom zewnętrznym.
        </p>
      </LegalSection>

      <LegalSection title="6. Twoje prawa">
        <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
        <LegalList
          items={[
            "Prawo dostępu do danych (art. 15 RODO) — możesz zażądać kopii swoich danych.",
            "Prawo do sprostowania (art. 16 RODO) — możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych.",
            "Prawo do usunięcia danych (prawo do bycia zapomnianym, art. 17 RODO) — możesz żądać usunięcia danych, gdy nie są już niezbędne do celów, dla których zostały zebrane.",
            "Prawo do ograniczenia przetwarzania (art. 18 RODO) — możesz żądać ograniczenia przetwarzania w określonych przypadkach.",
            "Prawo do przenoszenia danych (art. 20 RODO) — przysługuje w zakresie danych przetwarzanych na podstawie zgody lub umowy.",
            "Prawo do sprzeciwu (art. 21 RODO) — możesz wnieść sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie, w tym marketingu bezpośredniego.",
            "Prawo do cofnięcia zgody — w każdej chwili, bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem.",
          ]}
        />
        <p>
          Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem{" "}
          <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
            info@weunite.pl
          </a>
          . Odpowiemy w terminie 30 dni od otrzymania żądania.
        </p>
        <p>
          Masz również prawo do wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony
          Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa,{" "}
          <a
            href="https://uodo.gov.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            uodo.gov.pl
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Bezpieczeństwo danych">
        <p>
          Stosujemy odpowiednie techniczne i organizacyjne środki bezpieczeństwa, aby chronić
          Twoje dane przed nieautoryzowanym dostępem, utratą lub zniszczeniem, w tym:
        </p>
        <LegalList
          items={[
            "szyfrowane połączenie HTTPS (TLS),",
            "kontrolę dostępu do panelu administracyjnego (uwierzytelnianie Supabase Auth),",
            "ograniczenie dostępu do danych wyłącznie do uprawnionych pracowników WeUnite,",
            "regularne przeglądy uprawnień i konfiguracji bezpieczeństwa.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Profilowanie i zautomatyzowane podejmowanie decyzji">
        <p>
          Twoje dane nie są wykorzystywane do profilowania ani do zautomatyzowanego podejmowania
          decyzji wywołujących skutki prawne lub podobnie istotne skutki w rozumieniu art. 22 RODO.
          Sekwencja e-mailowa jest automatyczna, ale jej wysyłka nie jest decyzją wywołującą skutki
          prawne.
        </p>
      </LegalSection>

      <LegalSection title="9. Zmiany niniejszej Polityki">
        <p>
          Możemy aktualizować niniejszą Politykę Prywatności. O każdej istotnej zmianie
          poinformujemy poprzez zamieszczenie nowej wersji w Serwisie wraz z datą wejścia w życie.
          Zalecamy regularne zapoznawanie się z jej treścią.
        </p>
      </LegalSection>

    </LegalPageLayout>
  )
}
