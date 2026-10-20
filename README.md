# PCPort

Bilingual catalog of open-source native console-to-PC ports, recompilations and tools — kept current from GitHub.

**[pcport.org](https://pcport.org)** · Portuguese and English · built for organic search.

---

## The one rule

**PCPort catalogs the port project. It never hosts, mirrors or links game data.**

No ROMs, no `.pkg`, no disc dumps, no "complete edition" archives. Where a port needs the original game, the install steps say the reader supplies their own copy — which is what the upstream projects themselves require, and what keeps them publicly hosted.

This is not a preference. It is enforced in [`lib/guard.ts`](lib/guard.ts), applied at ingestion before anything is written, and covered by tests in [`lib/guard.test.ts`](lib/guard.test.ts). A release carrying game data is rejected whole.

It is also the SEO strategy: Google demotes entire domains by volume of valid DMCA notices. A catalog that cannot be served one is a catalog that still ranks in year two.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, `output: standalone` |
| Styling | Tailwind 4 (CSS-configured, no `tailwind.config.js`) |
| Database | Postgres 17 + Drizzle |
| Hosting | Hetzner VPS · Docker · Traefik · Cloudflare in front |
| Fonts | Archivo + Spline Sans Mono, self-hosted via `next/font` |

Content reads from [`lib/catalog.json`](lib/catalog.json), which `scripts/build-catalog.ts` generates from the GitHub API. The site runs fully without a database.

**Every repository in the catalog was verified against the API.** An earlier draft was written by hand from research notes and 12 of its 20 repository paths turned out not to exist — a catalog whose whole value is pointing at the official release cannot carry a guessed URL. That draft was deleted. Facts come from the API; the bilingual prose is composed from those facts in [`lib/content.ts`](lib/content.ts), which is what the scraper does for a port it meets for the first time.

---

## Local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 107 static pages
npm test             # the hard-constraint tests
```

---

## What makes it rank

Built against a defect-by-defect audit of the incumbent in this category:

| Audited failure there | Here |
|---|---|
| Empty `<body>` behind a 588 KB bundle | Full HTML in the first response (~62 KB with the whole matrix) |
| `sitemap.xml` → 404 | Generated, both languages, with `xhtml:link` alternates |
| Zero structured data | `SoftwareApplication`, `VideoGame`, `BreadcrumbList`, `FAQPage`, `ItemList`, `WebSite` |
| Default `robots.txt`, no `Sitemap:` | Generated with the directive |
| `Cache-Control: no-store` | `s-maxage` + `stale-while-revalidate` at the edge |
| One 588 KB bundle | Server components; only filters and row-expand ship JS |
| Descriptions truncated mid-sentence | Composed to ~155 chars |
| Render-blocking Google Fonts | Self-hosted, preloaded |

Plus:

- **`hreflang` reciprocal with `x-default`**, and a **self-referencing canonical per language**. Pointing one language's canonical at the other deindexes it — the most common way bilingual sites lose half their pages.
- **Localized slugs**: `/pt/jogo/<slug>` and `/en/game/<slug>` are independent columns, not one slug reused.
- **Written twice, never translated.** Each language is generated from the raw source with its own keyword intent: Portuguese targets install intent, English targets specification intent.
- **FAQ on every entry**, derived from the entry's own facts in [`lib/content.ts`](lib/content.ts) — so every page carries `FAQPage`, not just hand-written ones.
- **Console category pages** linked from the index, so they accumulate authority instead of sitting orphaned.
- **Generated OG images** per entry, built from type and status colour. No box art, nothing to be served a notice over.
- **Installable PWA** with an offline catalog.

---

## Deploy

```bash
cp .env.example .env     # fill it in
docker compose up -d --build
```

Point `pcport.org` at the VPS, proxied through Cloudflare. Traefik issues TLS over DNS-01, so the origin never needs port 80 exposed to Let's Encrypt.

**Put Cloudflare in front — it is not optional for this audience.** Hetzner is in Germany and Finland; the primary market is Brazil, roughly 200 ms away before the server does any work. TTFB is a ranking input, and release days are exactly when an unproxied VPS falls over.

Edge cache headers:

| Asset | Header |
|---|---|
| HTML | `public, s-maxage=300, stale-while-revalidate=86400` |
| `/_next/static/*` | `public, max-age=31536000, immutable` |

The `next-cache` volume is required. The ISR cache lives on disk, and without it every container restart regenerates every page cold.

---

## Two keys finish the job

Both are free. The site works without them; it is better with them.

**`GITHUB_TOKEN`** — fills in release versions, dates and file sizes.

```bash
GITHUB_TOKEN=... npx tsx scripts/build-catalog.ts
```

Unauthenticated GitHub allows 60 requests an hour, which runs out partway through the catalog, so most entries currently show `—` for version. With a token the script completes, and re-running it is how the catalog stays current. It skips entries whose release tag has not moved, so a quiet hour costs nothing, and POSTs changed paths to `/api/revalidate` so only those pages regenerate.

**`IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET`** — fills in cover art.

```bash
IGDB_CLIENT_ID=... IGDB_CLIENT_SECRET=... npx tsx scripts/enrich.ts
```

IGDB is Twitch's licensed game database and the standard source for this. Get a key at [api-docs.igdb.com](https://api-docs.igdb.com/#getting-started). Game covers and screenshots are ordinary editorial use with attribution — the same thing every games site does. This is a different question from game *files*, which the catalog never touches.

Until it runs, `coverUrl` stays empty and each entry shows a typographic plate: clearly a placeholder, never fake box art. The generated OG image carries shares either way.

Hand-written dates and summaries in [`lib/games.ts`](lib/games.ts) always win over IGDB, so a fuzzy match can never overwrite a verified fact.

---

## Structure

```
app/[lang]/                     home · radar · consoles
app/[lang]/console/[slug]/      category pages
app/[lang]/[section]/[slug]/    entries (/pt/jogo, /en/game) + OG image
app/sitemap.ts · robots.ts · manifest.ts
app/api/revalidate/             scraper → ISR
lib/guard.ts                    the hard constraint, tested
lib/catalog.json                the catalog, generated from the GitHub API
lib/games.ts                    game release dates, credits, summaries
lib/content.ts                  FAQ, install steps and prose composed from facts
```

Design decisions live in [`.impeccable/surfaces/home.md`](.impeccable/surfaces/home.md); product truth in [`PRODUCT.md`](PRODUCT.md); the architecture spec in [`docs/superpowers/specs/`](docs/superpowers/specs/).
