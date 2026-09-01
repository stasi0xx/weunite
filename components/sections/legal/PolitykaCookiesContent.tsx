"use client"

import { useTranslations } from "next-intl"
import LegalPageLayout, { LegalSection, LegalList } from "@/components/layout/LegalPageLayout"

interface CookieRow {
  name: string
  purpose: string
  duration: string
}

function CookieTable({
  headers,
  rows,
}: {
  headers: { name: string; purpose: string; duration: string }
  rows: CookieRow[]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium text-foreground">{headers.name}</th>
            <th className="text-left py-2 pr-4 font-medium text-foreground">{headers.purpose}</th>
            <th className="text-left py-2 font-medium text-foreground">{headers.duration}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="py-2 pr-4 font-mono text-xs">{row.name}</td>
              <td className="py-2 pr-4">{row.purpose}</td>
              <td className="py-2">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PolitykaCookiesContent() {
  const t = useTranslations("politykaCookies")
  const b = (chunks: React.ReactNode) => <strong>{chunks}</strong>
  const posthogLink = (chunks: React.ReactNode) => (
    <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
      {chunks}
    </a>
  )

  return (
    <LegalPageLayout title={t("title")} lastUpdated={t("lastUpdated")}>

      <LegalSection title={t("s1.title")}>
        <p>{t("s1.p1")}</p>
        <p>{t("s1.p2")}</p>
      </LegalSection>

      <LegalSection title={t("s2.title")}>
        <div className="space-y-6">
          <div>
            <p className="font-medium text-foreground mb-2">{t("s2.a.title")}</p>
            <p className="mb-2">{t("s2.a.body")}</p>
            <CookieTable
              headers={{ name: t("s2.a.table.name"), purpose: t("s2.a.table.purpose"), duration: t("s2.a.table.duration") }}
              rows={t.raw("s2.a.table.rows")}
            />
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">{t("s2.b.title")}</p>
            <p className="mb-2">{t.rich("s2.b.body", { b })}</p>
            <CookieTable
              headers={{ name: t("s2.b.table.name"), purpose: t("s2.b.table.purpose"), duration: t("s2.b.table.duration") }}
              rows={t.raw("s2.b.table.rows")}
            />
            <p className="mt-2 text-sm">{t.rich("s2.b.moreInfo", { posthogLink })}</p>
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">{t("s2.c.title")}</p>
            <p className="mb-2">{t("s2.c.body")}</p>
            <CookieTable
              headers={{ name: t("s2.c.table.name"), purpose: t("s2.c.table.purpose"), duration: t("s2.c.table.duration") }}
              rows={t.raw("s2.c.table.rows")}
            />
          </div>
        </div>
      </LegalSection>

      <LegalSection title={t("s3.title")}>
        <LegalList items={t.raw("s3.items")} />
      </LegalSection>

      <LegalSection title={t("s4.title")}>
        <p>{t("s4.intro")}</p>
        <LegalList items={t.raw("s4.items")} />
        <p>{t("s4.p1")}</p>
        <p>{t("s4.p2")}</p>
      </LegalSection>

      <LegalSection title={t("s5.title")}>
        <p>{t("s5.p1")}</p>
      </LegalSection>

      <LegalSection title={t("s6.title")}>
        <p>{t("s6.p1")}</p>
      </LegalSection>

    </LegalPageLayout>
  )
}
