import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { url } from '../lib/url';

// While demoMode is on, ask all crawlers to stay away.
export const GET: APIRoute = ({ site: siteUrl }) => {
  const body = site.demoMode
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('/sitemap-index.xml'), siteUrl ?? site.url).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
