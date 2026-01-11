// @ts-check
import { defineConfig } from 'astro/config';

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";
import { defaultLocale, locales } from './src/i18n/ui';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), alpinejs(), sitemap()],
  trailingSlash: "never",
  i18n: {
    locales,
    defaultLocale,
  }
});