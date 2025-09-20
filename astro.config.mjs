import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://daltera.github.io',
  integrations: [tailwind({ applyBaseStyles: true }), sitemap()],
  output: 'static'
});
