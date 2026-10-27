// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow
// (e.g. https://varadthedeveloper.github.io + /website). Locally and on a custom domain they are not needed.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.zentrova.in',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
});
