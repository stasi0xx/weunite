import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluded, in addition to Next internals and any path with a file extension:
  // /api/* and /booking/* (stay outside the locale system entirely), /ingest/*
  // (the PostHog proxy rewrite in next.config.ts — load bearing for ad traffic
  // measurement), /opengraph-image (has no file extension so the generic
  // "anything with a dot" exclusion doesn't catch it on its own).
  matcher: [
    "/((?!api|booking|_next|ingest|opengraph-image|favicon\\.ico|icon\\.png|apple-icon\\.png|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
