// Builds a link that works both at a domain root (thegrowthstep.com/) and in a sub-folder
// (GitHub Pages project site: user.github.io/website/). The base comes from astro.config.mjs.
export function url(path = '/'): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
