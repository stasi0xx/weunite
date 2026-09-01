"use client"

import { useTranslations } from "next-intl"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

export default function PolitykaPrywatnosciContent() {
  const t = useTranslations("politykaPrywatnosci")
  const b = (chunks: React.ReactNode) => <strong>{chunks}</strong>
  const email = (chunks: React.ReactNode) => (
    <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
      {chunks}
    </a>
  )
  const uodoLink = (chunks: React.ReactNode) => (
    <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
      {chunks}
    </a>
  )

  return (
    <LegalPageLayout title={t("title")} lastUpdated={t("lastUpdated")}>

      <LegalSection title={t("s1.title")}>
        <p>{t.rich("s1.p1", { b })}</p>
        <p>{t.rich("s1.p2", { email })}</p>
      </LegalSection>

      <LegalSection title={t("s2.title")}>
        <p>{t("s2.intro")}</p>
        <LegalList items={t.raw("s2.items")} />
        <p>{t("s2.p1")}</p>
      </LegalSection>

      <LegalSection title={t("s3.title")}>
        <p>{t("s3.intro")}</p>
        <div className="space-y-4">
          {(["a", "b", "c", "d", "e"] as const).map((key) => (
            <div key={key}>
              <p className="font-medium text-foreground mb-1">{t(`s3.${key}.title`)}</p>
              <p>{t(`s3.${key}.body`)}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection title={t("s4.title")}>
        <LegalList items={t.raw("s4.items")} />
      </LegalSection>

      <LegalSection title={t("s5.title")}>
        <p>{t("s5.intro")}</p>
        <LegalList items={t.raw("s5.items")} />
        <p>{t("s5.p1")}</p>
      </LegalSection>

      <LegalSection title={t("s6.title")}>
        <p>{t("s6.intro")}</p>
        <LegalList items={t.raw("s6.items")} />
        <p>{t.rich("s6.p1", { email })}</p>
        <p>{t.rich("s6.p2", { uodoLink })}</p>
      </LegalSection>

      <LegalSection title={t("s7.title")}>
        <p>{t("s7.intro")}</p>
        <LegalList items={t.raw("s7.items")} />
      </LegalSection>

      <LegalSection title={t("s8.title")}>
        <p>{t("s8.p1")}</p>
      </LegalSection>

      <LegalSection title={t("s9.title")}>
        <p>{t("s9.p1")}</p>
      </LegalSection>

    </LegalPageLayout>
  )
}
