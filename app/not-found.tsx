// Root-level fallback for next-intl's notFound() call inside
// app/[locale]/layout.tsx, which fires *before* that layout emits <html>/<body>
// (e.g. an unsupported locale segment like /fr/anything, AC-9). Needs its own
// minimal shell since it renders outside any locale-aware layout.
export default function GlobalNotFound() {
  return (
    <html lang="pl">
      <body style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1>404</h1>
          <p>Strona nie została znaleziona.</p>
          {/* Plain anchor, not next/link: this fallback renders before any
              locale is resolved, so there's no [locale] segment to link into. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Wróć do strony głównej</a>
        </div>
      </body>
    </html>
  );
}
