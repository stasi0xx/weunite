import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  // Polish (default) renders at today's exact addresses, no prefix;
  // English lives at the same paths under /en/. See
  // docs/specs/0001-multi-language-support/index.md, AC-2/AC-3.
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
