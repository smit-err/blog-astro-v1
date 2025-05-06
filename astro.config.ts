import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: { enabled: false },
  prefetch: true,
  markdown: { shikiConfig: { theme: "houston" } },
  build: { inlineStylesheets: "never" },
});
