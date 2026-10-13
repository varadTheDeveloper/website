import type { APIRoute } from 'astro';
import { site } from '../config/site';

// While demoMode is on, ask all crawlers to stay away.
export const GET: APIRoute = () => {
  const body = site.demoMode
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site.url).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
