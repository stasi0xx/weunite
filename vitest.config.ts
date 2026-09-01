import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["node_modules", ".next", "e2e"],
    server: {
      // next-intl imports extensionless subpaths like "next/server" that
      // Vite's default Node-strict SSR externalization can't resolve;
      // bundling these two packages instead of externalizing them fixes it.
      deps: { inline: ["next", "next-intl"] },
    },
  },
})
