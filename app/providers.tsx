"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { hasMarketingConsent, onConsentChange } from "@/lib/consent";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!posthogClient) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (url !== previousUrl.current) {
      previousUrl.current = url;
      posthogClient.capture("$pageview", { $current_url: window.location.href });
    }
  }, [pathname, searchParams, posthogClient]);

  return null;
}

/**
 * Before consent: capturing runs with `persistence: "memory"` — no cookies and
 * nothing written to the device, so no cookie consent is required, and traffic
 * is actually measurable. Cost: a visitor is re-counted on every page load, so
 * pageviews are exact but unique-visitor counts skew high.
 *
 * After "Akceptuj wszystkie": persistence upgrades to cookies (stable visitor
 * identity across sessions) and session recording starts.
 */
function configureConsentedCapture() {
  posthog.set_config({ persistence: "localStorage+cookie", disable_session_recording: false });
  posthog.startSessionRecording();
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const consented = hasMarketingConsent();

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      persistence: consented ? "localStorage+cookie" : "memory",
      disable_session_recording: !consented,
    });

    return onConsentChange((value) => {
      if (value === "all") configureConsentedCapture();
      else posthog.set_config({ persistence: "memory", disable_session_recording: true });
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
