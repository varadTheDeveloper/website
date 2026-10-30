# The GrowthStep: agency website

Landing page for a website design and digital marketing agency. Built with [Astro](https://astro.build) and plain CSS. No photos: all pictures are drawn in HTML/CSS.

## Run it

```
npm install
copy .env.example .env      # Windows (PowerShell: Copy-Item .env.example .env)
npm run dev                 # http://localhost:4321
npm run build               # output in dist/
npm run check               # type check
```

## Where to change things

| What | File |
|---|---|
| Name, phone, WhatsApp, email, city, social links, `demoMode` | `src/config/site.ts` |
| Services, numbers, demo projects, FAQ | `src/data/content.ts` |
| Chatbot topics, keywords and replies | `src/data/chatbot.ts` (answers reuse the FAQ) |
| Colours and fonts | top of `src/styles/global.css` |
| Logo | `src/components/Logo.astro` and `public/favicon.svg` |

## Demo mode

`demoMode: true` in `src/config/site.ts` blocks search engines (`noindex` + `robots.txt`);
with `showDemoBar: true` it also shows a "Demo site" bar (currently off). The demo projects in `content.ts` are samples.
Replace them with real work, then set `demoMode: false`.

## Enquiry form (email)

1. Go to https://web3forms.com, enter the email that should receive enquiries, and copy the access key from the email you get.
2. Put it in `.env`: `PUBLIC_WEB3FORMS_KEY=your-key` (never commit `.env`).
3. Rebuild. Without a key, the form opens the visitor's email app instead.

## Chatbot (simple, no AI)

Opens only when the visitor clicks "Chat with us". Visitors tap topics (cost, timeline, services, SEO, social,
work, talk to a person) or type a question; typed text is matched against keywords in `src/data/chatbot.ts`.
"Get a free quote" asks name, phone and service, then sends it by email the same way as the form
(subject says "Chatbot"). Nothing else from the chat is stored or sent. An AI version is planned for later
(needs a small server so the AI key stays secret).

## Hosting on GitHub Pages

`.github/workflows/pages.yml` builds and publishes the site on every push to `main`.

One-time set-up (repo owner):
1. The repo must be **public** (free GitHub accounts only get Pages for public repos).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Optional: **Settings → Secrets and variables → Actions → New repository secret**, name `PUBLIC_WEB3FORMS_KEY`.
   Then re-run the workflow (Actions tab → Deploy to GitHub Pages → Run workflow).

The site is then at `https://varadthedeveloper.github.io/website/`. Links use `src/lib/url.ts`, so the same
code works in that sub-folder and later on a custom domain (Settings → Pages → Custom domain).
