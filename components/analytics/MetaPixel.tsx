"use client"

import { Suspense, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { hasMarketingConsent, onConsentChange } from "@/lib/consent"
import { initMetaPixel, trackMetaEvent } from "@/lib/meta/pixel"

function MetaPixelPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousUrl = useRef<string | null>(null)

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    // The first PageView ships with initMetaPixel(); this effect only covers
    // client-side navigations, which never reload fbevents.js.
    if (previousUrl.current === null) {
      previousUrl.current = url
      return
    }
    if (url === previousUrl.current) return
    previousUrl.current = url
    trackMetaEvent("PageView")
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel() {
  useEffect(() => {
    if (hasMarketingConsent()) initMetaPixel()
    return onConsentChange((value) => {
      if (value === "all") initMetaPixel()
    })
  }, [])

  return (
    <Suspense fallback={null}>
      <MetaPixelPageView />
    </Suspense>
  )
}
