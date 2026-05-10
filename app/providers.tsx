"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      opt_out_capturing_by_default: true,
    });

    if (localStorage.getItem("cookie_consent") === "all") {
      posthog.opt_in_capturing();
    }
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
