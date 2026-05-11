import type { Metadata } from "next"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu internetowego WeUnite.",
  alternates: { canonical: "https://www.weunite.pl/regulamin" },
  robots: { index: true, follow: true },
}

export default function RegulaminsPage() {
  return (
    <LegalPageLayout title="Regulamin" lastUpdated="10 maja 2026 r.">

      <LegalSection title="§ 1. Postanowienia ogólne">
        <p>
          Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod
          adresem <strong>weunite.pl</strong> (dalej: „Serwis") oraz warunki świadczenia usług
          drogą elektroniczną przez WeUnite z siedzibą przy ul. Gdyńskiej G/9, 80-340 Gdańsk
          (dalej: „Usługodawca" lub „WeUnite").
        </p>
        <p>
          Dane kontaktowe Usługodawcy: e-mail{" "}
          <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
            info@weunite.pl
          </a>
          , telefon +48 537 732 320.
        </p>
        <p>
          Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu. Jeśli nie zgadzasz się
          z jego postanowieniami, prosimy o niekorzystanie z Serwisu.
        </p>
      </LegalSection>

      <LegalSection title="§ 2. Definicje">
        <LegalList
          items={[
            "Serwis — strona internetowa dostępna pod adresem weunite.pl wraz ze wszystkimi podstronami.",
            "Użytkownik — każda osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z Serwisu.",
            "Lead / Formularz — formularz kontaktowy umożliwiający zgłoszenie się na bezpłatną konsultację i wizualizację strony internetowej.",
            "System rezerwacji — wbudowany kalendarz umożliwiający Użytkownikowi samodzielny wybór terminu rozmowy strategicznej.",
            "Usługi — usługi świadczone przez WeUnite, w szczególności: tworzenie stron internetowych z systemem rezerwacji i płatności, zarządzanie social media, automatyzacje biznesowe.",
            "RODO — Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych.",
          ]}
        />
      </LegalSection>

      <LegalSection title="§ 3. Rodzaj i zakres usług elektronicznych">
        <p>WeUnite świadczy za pośrednictwem Serwisu następujące usługi elektroniczne:</p>
        <LegalList
          items={[
            "Udostępnienie formularza kontaktowego (Lead) — umożliwiającego Użytkownikowi przesłanie danych w celu uzyskania bezpłatnej konsultacji i wizualizacji strony.",
            "Automatyczna sekwencja e-mailowa — po wypełnieniu formularza Użytkownik otrzymuje serię wiadomości e-mail (Dzień 0 / Dzień 2 / Dzień 4) zawierających informacje o usługach oraz wezwanie do zarezerwowania rozmowy.",
            "System rezerwacji rozmowy strategicznej — umożliwiający samodzielny wybór dostępnego terminu oraz otrzymanie potwierdzenia i przypomnień (48h / 24h / 1h przed rozmową).",
            "Prezentacja oferty — informacje o usługach WeUnite, case studies i referencje.",
          ]}
        />
        <p>
          Usługi wymienione powyżej są bezpłatne. Ewentualne usługi płatne (realizacja projektów)
          regulowane są oddzielną umową zawartą pomiędzy WeUnite a klientem.
        </p>
      </LegalSection>

      <LegalSection title="§ 4. Warunki korzystania z Serwisu">
        <p>Do korzystania z Serwisu niezbędne są:</p>
        <LegalList
          items={[
            "urządzenie z dostępem do Internetu (komputer, tablet, smartfon),",
            "aktualna przeglądarka internetowa obsługująca HTML5, CSS3 i JavaScript,",
            "aktywny adres e-mail (w przypadku korzystania z formularza lub systemu rezerwacji).",
          ]}
        />
        <p>Użytkownik zobowiązuje się do:</p>
        <LegalList
          items={[
            "korzystania z Serwisu zgodnie z obowiązującym prawem i dobrymi obyczajami,",
            "niepodejmowania działań mogących zakłócić prawidłowe działanie Serwisu,",
            "niepodawania danych osobowych osób trzecich bez ich zgody,",
            "podawania prawdziwych i aktualnych danych w formularzach.",
          ]}
        />
      </LegalSection>

      <LegalSection title="§ 5. Formularz kontaktowy i system rezerwacji">
        <p>
          Wypełnienie formularza kontaktowego jest dobrowolne. Stanowi ono zaproszenie do
          nawiązania relacji biznesowej i nie tworzy wiążącej umowy o świadczenie usług.
        </p>
        <p>
          Po przesłaniu formularza Użytkownik wyraża zgodę na kontakt ze strony WeUnite drogą
          e-mailową w zakresie przedstawienia oferty i umówienia rozmowy.
        </p>
        <p>
          Zarezerwowanie terminu rozmowy strategicznej za pomocą systemu rezerwacji jest
          równoznaczne z wyrażeniem chęci przeprowadzenia bezpłatnej konsultacji. Nie stanowi
          zawarcia umowy o świadczenie usług płatnych.
        </p>
        <p>
          WeUnite zastrzega sobie prawo do odwołania lub zmiany terminu zarezerwowanej rozmowy
          w przypadku zaistnienia okoliczności niezależnych od Usługodawcy, z odpowiednim
          uprzedzeniem przekazanym drogą e-mailową.
        </p>
      </LegalSection>

      <LegalSection title="§ 6. Własność intelektualna">
        <p>
          Wszelkie treści zamieszczone w Serwisie (teksty, grafiki, logotypy, kod źródłowy,
          układ strony) stanowią własność WeUnite lub podmiotów, które udzieliły licencji na
          ich wykorzystanie. Są one chronione przepisami prawa autorskiego.
        </p>
        <p>
          Bez pisemnej zgody WeUnite zabronione jest kopiowanie, modyfikowanie, publiczne
          wyświetlanie lub rozpowszechnianie jakichkolwiek materiałów z Serwisu w celach
          komercyjnych.
        </p>
      </LegalSection>

      <LegalSection title="§ 7. Ograniczenie odpowiedzialności">
        <p>
          WeUnite dołoży wszelkich starań, aby Serwis działał w sposób ciągły i niezakłócony.
          Usługodawca nie odpowiada jednak za przerwy w dostępności Serwisu wynikające z
          konserwacji, awarii technicznych lub działania siły wyższej.
        </p>
        <p>
          WeUnite nie ponosi odpowiedzialności za skutki wynikające z podania przez Użytkownika
          nieprawdziwych lub niepełnych danych w formularzu kontaktowym lub systemie rezerwacji.
        </p>
        <p>
          Serwis może zawierać linki do zewnętrznych stron internetowych. WeUnite nie odpowiada
          za treść ani politykę prywatności takich stron.
        </p>
      </LegalSection>

      <LegalSection title="§ 8. Reklamacje">
        <p>
          Reklamacje dotyczące funkcjonowania Serwisu lub świadczonych usług elektronicznych
          można składać:
        </p>
        <LegalList
          items={[
            "e-mailem na adres: info@weunite.pl,",
            "pisemnie na adres: ul. Gdyńska G/9, 80-340 Gdańsk.",
          ]}
        />
        <p>
          Reklamacja powinna zawierać: imię i nazwisko lub nazwę firmy, dane kontaktowe,
          opis problemu oraz oczekiwany sposób rozwiązania.
        </p>
        <p>
          WeUnite rozpatrzy reklamację w terminie 14 dni roboczych od jej otrzymania i
          poinformuje Użytkownika o wyniku drogą e-mailową.
        </p>
      </LegalSection>

      <LegalSection title="§ 9. Ochrona danych osobowych i pliki cookies">
        <p>
          Zasady przetwarzania danych osobowych przez WeUnite opisuje{" "}
          <a href="/polityka-prywatnosci" className="text-foreground underline underline-offset-4">
            Polityka Prywatności
          </a>
          .
        </p>
        <p>
          Zasady dotyczące stosowania plików cookies opisuje{" "}
          <a href="/polityka-cookies" className="text-foreground underline underline-offset-4">
            Polityka Cookies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="§ 10. Postanowienia końcowe">
        <p>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa
          polskiego, w szczególności Kodeksu cywilnego, ustawy o świadczeniu usług drogą
          elektroniczną oraz RODO.
        </p>
        <p>
          WeUnite zastrzega sobie prawo do zmiany Regulaminu. O każdej istotnej zmianie
          Użytkownicy będą informowani poprzez zamieszczenie nowej wersji w Serwisie z podaniem
          daty wejścia w życie. Korzystanie z Serwisu po opublikowaniu zmian oznacza ich
          akceptację.
        </p>
        <p>
          Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd
          właściwy dla siedziby WeUnite.
        </p>
      </LegalSection>

    </LegalPageLayout>
  )
}
