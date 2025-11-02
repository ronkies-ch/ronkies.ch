// @ts-check
import { defineConfig } from 'astro/config';

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";
import { defaultLocale, locales } from './src/i18n/ui';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), alpinejs()],
  base: "ronkies.ch/",
  trailingSlash: "never",
  i18n: {
    locales,
    defaultLocale,
  }
});