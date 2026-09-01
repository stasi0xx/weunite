"use client"

import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function DziekujemyPage() {
  const t = useTranslations("dziekujemy")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-sans font-extrabold tracking-tight text-3xl md:text-4xl text-foreground mb-4">
          {t("heading")}
        </h1>
        <p className="text-muted-foreground text-base mb-8">
          {t("body")}
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-colors duration-200"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  )
}
