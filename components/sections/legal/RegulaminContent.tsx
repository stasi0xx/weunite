"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

export default function RegulaminContent() {
  const t = useTranslations("regulamin")
  const b = (chunks: React.ReactNode) => <strong>{chunks}</strong>
  const email = (chunks: React.ReactNode) => (
    <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
      {chunks}
    </a>
  )

  return (
    <LegalPageLayout title={t("title")} lastUpdated={t("lastUpdated")}>

      <LegalSection title={t("s1.title")}>
        <p>{t.rich("s1.p1", { b })}</p>
        <p>{t.rich("s1.p2", { email })}</p>
        <p>{t("s1.p3")}</p>
      </LegalSection>

      <LegalSection title={t("s2.title")}>
        <LegalList items={t.raw("s2.items")} />
      </LegalSection>

      <LegalSection title={t("s3.title")}>
        <p>{t("s3.intro")}</p>
        <LegalList items={t.raw("s3.items")} />
        <p>{t("s3.p1")}</p>
      </LegalSection>

      <LegalSection title={t("s4.title")}>
        <p>{t("s4.intro1")}</p>
        <LegalList items={t.raw("s4.items1")} />
        <p>{t("s4.intro2")}</p>
        <LegalList items={t.raw("s4.items2")} />
      </LegalSection>

      <LegalSection title={t("s5.title")}>
        <p>{t("s5.p1")}</p>
        <p>{t("s5.p2")}</p>
        <p>{t("s5.p3")}</p>
        <p>{t("s5.p4")}</p>
      </LegalSection>

      <LegalSection title={t("s6.title")}>
        <p>{t("s6.p1")}</p>
        <p>{t("s6.p2")}</p>
      </LegalSection>

      <LegalSection title={t("s7.title")}>
        <p>{t("s7.p1")}</p>
        <p>{t("s7.p2")}</p>
        <p>{t("s7.p3")}</p>
      </LegalSection>

      <LegalSection title={t("s8.title")}>
        <p>{t("s8.intro")}</p>
        <LegalList items={t.raw("s8.items")} />
        <p>{t("s8.p1")}</p>
        <p>{t("s8.p2")}</p>
      </LegalSection>

      <LegalSection title={t("s9.title")}>
        <p>
          {t.rich("s9.p1", {
            privacyLink: (chunks) => <Link href="/polityka-prywatnosci" className="text-foreground underline underline-offset-4">{chunks}</Link>,
          })}
        </p>
        <p>
          {t.rich("s9.p2", {
            cookiesLink: (chunks) => <Link href="/polityka-cookies" className="text-foreground underline underline-offset-4">{chunks}</Link>,
          })}
        </p>
      </LegalSection>

      <LegalSection title={t("s10.title")}>
        <p>{t("s10.p1")}</p>
        <p>{t("s10.p2")}</p>
        <p>{t("s10.p3")}</p>
      </LegalSection>

    </LegalPageLayout>
  )
}
