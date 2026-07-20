# Wolf Business Solutions -- Website

A static HTML/CSS/JavaScript rebuild of wolfbusinesssolutions.com. Same
layout, copy, navigation, and page structure as the live WordPress/Elementor
site, but hand-written and dependency-free so it loads fast, works well on
mobile, and is easier to maintain.

## What changed vs. the original

- **Same:** headline copy, section order, nav labels, service and core value
  text, office addresses, phone numbers, footer text, quote, logo and photos.
- **Different (code only):** rebuilt from scratch as plain HTML/CSS/JS instead
  of WordPress + Elementor + WPForms. No page builder bloat, no jQuery, no
  plugin CSS/JS bundles.
- Added semantic HTML, ARIA labels, visible focus states, and a "skip to
  content" link for accessibility.
- Added a responsive mobile nav (the original relies on Elementor's menu
  widget; this one is a small vanilla-JS toggle).
- Added `<meta name="description">`, Open Graph tags, canonical URLs, and
  JSON-LD `ProfessionalService` structured data for SEO.
- Added `robots.txt` and `sitemap.xml`. **Note:** the live site currently
  ships `<meta name="robots" content="noindex, nofollow">` on every page,
  which blocks search engines entirely. This rebuild removes that so the
  site can actually be found -- confirm that's intended before launch.
- All images (logo, about-us photo, favicon) are now self-hosted under
  `/assets`, converted to WebP (PNG kept for the favicon for broad
  compatibility), and compressed. Nothing on this site loads from the old
  `wolfbusinesssolutions.com` WordPress install anymore -- no images, CSS,
  JS, fonts, or form assets.

## Forms

The consultation and support forms are static HTML with client-side
validation only -- there is no backend yet. Wire them up to a real endpoint
in `js/main.js` (the `handleForm(...)` calls at the bottom of the file), for
example:

- [Formspree](https://formspree.io) or a similar form backend, or
- a small serverless function that forwards submissions to your CRM/email.

## Local preview

No build step is required. Open `index.html` directly in a browser, or serve
the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included to
publish this repo to **GitHub Pages** automatically on every push to `main`.
To enable it: repo **Settings -> Pages -> Build and deployment -> Source ->
GitHub Actions**. If you're pointing a custom domain (wolfbusinesssolutions.com)
at Pages, add a `CNAME` file with the domain and configure DNS per GitHub's
docs.

## Next steps / recommended follow-ups

1. Hook up the two forms to a real backend.
2. Confirm the `robots.txt` / indexing change above is intentional.
3. Swap in exact brand hex colors/fonts if you have brand guidelines --
   this rebuild approximates the palette (navy + gold) since the original
   site's compiled CSS wasn't accessible for extraction.

## Custom domain

A `CNAME` file pointing at `wolfbusinesssolutions.com` is included so GitHub
Pages knows to serve this repo on that domain once Pages is enabled and DNS
is pointed at it (see the setup instructions provided separately).
