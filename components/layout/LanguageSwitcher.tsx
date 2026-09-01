"use client";

import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// useSearchParams() below opts the whole route out of static rendering unless
// wrapped in Suspense (same reason app/providers.tsx wraps PostHogPageView) —
// per docs/specs/0001-multi-language-support's invariant that in-scope pages
// must keep rendering statically.
export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <Suspense fallback={<LanguageSwitcherFallback className={className} />}>
      <LanguageSwitcherInner className={className} />
    </Suspense>
  );
}

function LanguageSwitcherFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("inline-flex items-center rounded-full border border-border p-0.5", className)}
    >
      {routing.locales.map((loc) => (
        <span key={loc} className="px-2.5 py-1 rounded-full text-xs font-medium uppercase text-muted-foreground">
          {loc}
        </span>
      ))}
    </div>
  );
}

// Swaps locale while staying on the same page (AC-3) and preserves the
// current query string, e.g. ad tracking params like fbclid/utm_* (AC-12).
function LanguageSwitcherInner({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeLocale = useLocale();
  const t = useTranslations("common.languageSwitcher");

  const switchTo = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === activeLocale) return;
    const query = searchParams.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { locale: nextLocale });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex items-center rounded-full border border-border p-0.5", className)}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={loc === activeLocale}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium uppercase transition-colors duration-150 cursor-pointer",
            loc === activeLocale
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
