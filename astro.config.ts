import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: { enabled: false },
  prefetch: true,
  markdown: { shikiConfig: { theme: "houston" } },
  trailingSlash: "always",
  build: { inlineStylesheets: "never" },
});
