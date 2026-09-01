import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/app/providers";
import CookieBanner from "@/components/ui/CookieBanner";
import MetaPixel from "@/components/analytics/MetaPixel";

/**
 * Shared between app/[locale]/layout.tsx and app/booking/layout.tsx — Next.js's
 * "multiple root layouts" pattern means neither one wraps the other, so the
 * providers that must run on every page (analytics, consent, toasts) live here
 * once instead of being duplicated in both root layouts.
 */
export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <MetaPixel />
      {children}
      <Toaster />
      <CookieBanner />
    </PostHogProvider>
  );
}
