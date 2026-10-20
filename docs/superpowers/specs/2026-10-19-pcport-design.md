# PCPort — architecture and SEO design

**Date:** 2026-10-19
**Domain:** pcport.org
**Product truth:** [PRODUCT.md](../../../PRODUCT.md) · **Visual direction:** [.impeccable/surfaces/home.md](../../../.impeccable/surfaces/home.md)

---

## 1. What this has to achieve

A bilingual catalog of open-source native console-to-PC ports, kept current from GitHub, whose pages rank. Organic search is the product's distribution; everything below is subordinate to that.

The design is shaped by a direct audit of `linkvaultai1.com`, the incumbent in this category. Its failures are the requirements here:

| Audited failure | Requirement |
|---|---|
| Empty `<body>` behind a 588 KB bundle | Complete HTML in the first response |
| `sitemap.xml` → 404 | Generated sitemap, both languages, with alternates |
| Zero structured data | JSON-LD on every entry |
| Default `robots.txt`, no `Sitemap:` | Generated robots with the directive |
| `Cache-Control: no-store` on HTML | Cacheable HTML with revalidation |
| Single 588 KB bundle, no splitting | Route-level splitting, server components by default |
| Descriptions truncated mid-sentence | Descriptions composed to length, never cut |
| Render-blocking Google Fonts | Self-hosted fonts, subset, preloaded |

---

## 2. Rendering

**Next.js 16, App Router, `output: 'standalone'`.**

Current versions as of this spec: `next@16.4.2`, `react@19.3.1`, `drizzle-orm@0.45.4`, `tailwindcss@4.3.3`. Pin these at scaffold time. Tailwind 4 configures through CSS rather than `tailwind.config.js` — worth knowing before copying any older setup guide.

Pages are statically generated and revalidated on demand. The scraper is the only thing that changes content, so it is the only thing that triggers revalidation — there is no blind time-based churn.

```js
// next.config.ts
export default {
  output: 'standalone',
  poweredByHeader: false,
  compress: false,          // Traefik compresses; doing it twice wastes CPU
  images: { formats: ['image/avif', 'image/webp'] },
}
```

Verify the caching and `revalidatePath` semantics against the Next 16 docs at scaffold time. The App Router primitives this spec relies on — `generateMetadata`, `generateStaticParams`, `sitemap.ts`, `robots.ts`, `output: 'standalone'` — are long-stable, but 16 moved defaults around caching, and that is the one area where an outdated assumption would cost real TTFB.

After an ingestion run writes new rows, the scraper calls a secured endpoint that revalidates only the affected paths:

```ts
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  if (req.headers.get('x-revalidate-token') !== process.env.REVALIDATE_TOKEN) {
    return new Response('unauthorized', { status: 401 })
  }
  const { slugs } = await req.json()
  for (const { pt, en } of slugs) {
    revalidatePath(`/pt/jogo/${pt}`)
    revalidatePath(`/en/game/${en}`)
  }
  revalidatePath('/pt'); revalidatePath('/en')
  return Response.json({ ok: true })
}
```

**Self-hosting note that bites people:** the ISR cache lives on disk under `.next/cache`. Without a persistent volume it is wiped on every container restart and every page regenerates cold. The volume is not optional.

Everything is a server component unless it needs state. Only the filter row, the search box and the row-expand are client components — that is what keeps the bundle off the critical path. This is the single biggest difference from the incumbent.

---

## 3. URLs and bilingual structure

```
/pt                              /en
/pt/jogo/<slug>                  /en/game/<slug>
/pt/console/<console>            /en/console/<console>
/pt/radar                        /en/radar
```

No root-level content: `/` 308-redirects by `Accept-Language`, with both language homes canonical to themselves. Language is in the path — never a query parameter, never a cookie — because a crawler indexes one URL and a cookie-switched site only ever has one.

**Per-page metadata:**

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang, slug } = await params
  const e = await getEntry(slug, lang)
  const pt = `https://pcport.org/pt/jogo/${e.slugPt}`
  const en = `https://pcport.org/en/game/${e.slugEn}`
  return {
    title: `${e.title} ${e.version} | PCPort`,
    description: e.description,       // composed to ~155 chars, never truncated
    alternates: {
      canonical: lang === 'pt' ? pt : en,   // self-referencing, ALWAYS
      languages: { 'pt-BR': pt, 'en': en, 'x-default': en },
    },
    openGraph: { type: 'article', locale: lang === 'pt' ? 'pt_BR' : 'en_US', images: [e.cover] },
  }
}
```

Three rules that decide whether bilingual helps or hurts:

1. **Canonical always points at itself.** Pointing the English page's canonical at the Portuguese one deindexes the English entirely. This is the most common way bilingual sites lose half their pages.
2. **`hreflang` is reciprocal** and includes `x-default`. One-directional hreflang is ignored.
3. **Slugs are localized independently.** `slugPt` and `slugEn` are separate columns, not one slug reused.

---

## 4. Structured data

Every entry page carries JSON-LD. This is what produces rich results — version, platform and size rendered directly in the search listing.

```ts
const ld = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${e.title} — ${e.portName}`,
  applicationCategory: 'GameApplication',
  operatingSystem: e.platforms.join(', '),
  softwareVersion: e.version,
  datePublished: e.releasedAt,
  downloadUrl: e.releaseUrl,
  isAccessibleForFree: true,
  license: e.licenseUrl,
  author: { '@type': 'Person', name: e.author },
  about: { '@type': 'VideoGame', name: e.title, gamePlatform: e.console },
}
```

Plus `BreadcrumbList` on entry pages and `ItemList` on the index. Validate against Rich Results Test before launch; invalid JSON-LD is silently ignored rather than reported.

---

## 5. Hosting

```
Cloudflare (proxy, free)
   │  TLS, CDN, HTML caching at the edge
   ▼
Hetzner VPS ── Traefik ──┬── web      (Next.js standalone)
                         ├── db       (Postgres 17)
                         └── scraper  (Node, cron)
```

**Put Cloudflare in front — this is not optional for your audience.** Hetzner's datacenters are in Germany and Finland; your primary market is Brazil. That is roughly 200 ms round-trip before the server does any work. TTFB is a ranking input, so an uncached origin in Europe serving Brazilian readers costs real positions. Cloudflare's free tier terminates TLS in São Paulo and serves cached HTML from there. It also absorbs the traffic spikes that release days produce, which is exactly when the VPS would otherwise fall over.

**Cache headers** — the incumbent's `no-store` is why its TTFB is bad. Correct values:

| Asset | Header |
|---|---|
| HTML | `public, s-maxage=300, stale-while-revalidate=86400` |
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| Covers | `public, max-age=604800` |

`stale-while-revalidate` is what lets a release spike be served instantly from cache while the fresh copy is fetched behind it.

**Traefik** terminates nothing user-visible beyond routing: Let's Encrypt via DNS-01 (so the origin can stay behind Cloudflare), HTTP→HTTPS redirect, brotli compression, and the security header middleware. The incumbent's CSP and HSTS were genuinely well configured — worth copying that part.

**Backups:** `pg_dump` nightly to Hetzner Storage Box. The database is the only irreplaceable state; everything else rebuilds from GitHub.

---

## 6. Data model

Content is language-neutral where it is factual and split where it is prose.

```
port
  id, repo, console, mechanism, platforms[], author,
  version, released_at, size_bytes, release_url, license_url,
  cover_path, status, first_seen_at, last_checked_at

port_text          -- one row per language
  port_id, lang, slug, title, description, body, install_steps[]

port_release       -- history, so "what changed" is answerable
  port_id, version, released_at, notes_hash
```

`mechanism` is the status vocabulary the visual direction colors: `native` · `recompiled` · `translation-layer` · `in-progress`. It is an enum, not free text, because it drives both the filter and the only color on the page.

**Drizzle** over Prisma: no query engine binary, which keeps the standalone image small and the container cold-start fast.

---

## 7. Ingestion

Hourly, in the scraper container.

1. **Discover.** A seed list of known scene repositories (N64Recomp, HarbourMasters, OpenGOAL, XenonRecomp, Zelda64Recomp, shadPS4, bbport and the PS4 native-port projects), plus GitHub topic search on `decompilation`, `recompilation`, `source-port`.
2. **Fetch.** Releases, README, metadata. 5,000 authenticated requests/hour is far above what this needs.
3. **Diff.** Compare the latest release tag against `port_release`. Unchanged entries stop here and cost nothing.
4. **Classify and write.** New or changed entries go to generation.
5. **Revalidate.** POST the affected slugs to the revalidate endpoint.

**The hard constraint is enforced in code, not in review.** The ingestion layer rejects any candidate whose release assets look like game data — `.pkg`, `.iso`, `.bin`, disc images, archives above a size threshold that pattern-match as game content, and any host in a Drive/Mega blocklist. A port whose release only ships game data is not catalogued. This is the rule from PRODUCT.md that everything else defers to, and putting it in the pipeline means it cannot be forgotten later.

---

## 8. Bilingual generation

For each new or changed entry, **two generation calls from the same raw source** — never one call plus a translation.

- **pt-BR** targets install intent: `como instalar`, `como rodar`, `PC fraco`, step-by-step, plain language for someone who is not an engineer.
- **en** targets specification intent: mechanism, compatibility, measured performance, version differences.

Different prompts, different keyword targets, both written from the README and release notes. Translated content is the exact pattern Google's helpful content system demotes, and it is avoidable here for the cost of one extra request.

Cached by release tag: an entry whose version has not moved is never regenerated. Haiku-class pricing puts a full 500-entry catalog in both languages at a few dollars, and steady-state at cents per week.

Descriptions are **composed to roughly 155 characters**, not generated long and cut. The incumbent's `…`-truncated descriptions read as broken in the SERP and cost click-through.

---

## 9. Performance budget

| Metric | Target | How |
|---|---|---|
| LCP | < 1.5 s | Server-rendered text band, no hero image, self-hosted preloaded fonts |
| CLS | < 0.05 | Fixed heights on ad slots and covers, `font-display: optional` |
| INP | < 150 ms | Filtering on the client over an already-loaded list |
| JS on index | < 90 KB gzipped | Server components; only filters and row-expand ship JS |

The lead band is type and numbers, with no image — so the LCP element is text the server already sent. That is a composition choice doing performance work.

**Fonts:** Archivo and Spline Sans Mono, self-hosted as subset woff2, preloaded. Not Google Fonts — the incumbent's render-blocking external stylesheet is an avoidable 100–200 ms.

---

## 10. Ads and donations without paying for them in ranking

Ad slots are declared in the layout at **fixed height, reserved before the ad loads**. Inserting an ad that pushes content down is the single largest source of bad CLS, and CLS is a ranking input. The slot holds its box empty and the ad fills it.

Ad script loads `afterInteractive`, never blocking. No ads above the fold on entry pages — that region is the content Google is measuring.

Donations are a static Pix/Ko-fi link, no third-party widget, no script.

---

## 11. Out of scope

User accounts, login, comments, ratings, community requests. Confirmed in the product interview.

---

## 12. Open decisions

- Brand spelling: `PCPort` / `PC Port` / `pcport`.
- Cover art sourcing. No library exists. Options: project-supplied screenshots, generated placeholders clearly marked, or no art in the matrix at all (the approved comp has none in the lead band, so this may not block launch).
- Which model generates descriptions.
- Whether the highest-traffic entries get hand-written install steps instead of generated ones.
- Analytics: self-hosted Plausible/Umami in the same compose, or Cloudflare's own.

---

## 13. Build order

1. Scaffold, Docker, Traefik, Postgres, deploy a placeholder to pcport.org — prove the pipeline before building anything.
2. Schema and seed with ~20 real entries from the research already gathered.
3. The home surface, from the approved comp.
4. Entry pages with full metadata and JSON-LD.
5. Sitemap, robots, hreflang. Validate in Search Console.
6. Scraper and generation.
7. Ads, donations, analytics.

Steps 1–5 are what makes it rank. Step 6 is what keeps it current. Step 7 is what pays for it.
