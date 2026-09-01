import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxies PostHog through our own origin — requests to eu.i.posthog.com are
  // blocked by uBlock/Brave and a lot of mobile DNS filters, which silently
  // drops a large share of ad traffic. Requires NEXT_PUBLIC_POSTHOG_HOST=/ingest.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog's ingestion endpoints are trailing-slash sensitive.
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "weunite-jan-hofman",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Sentry's release/sourcemap-upload API was timing out (504 "Downstream
  // timeout") during build, hanging the whole deploy for minutes. On
  // Turbopack this all runs through the runAfterProductionCompile hook, so
  // disabling it skips the Sentry build plugin's network calls entirely.
  // Disabled until that's confirmed resolved on Sentry's side — re-enable by
  // removing this block. Runtime error reporting to Sentry is unaffected.
  useRunAfterProductionCompileHook: false,
  sourcemaps: {
    disable: true,
  },
  release: {
    create: false,
    finalize: false,
  },
  telemetry: false,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  }
});
