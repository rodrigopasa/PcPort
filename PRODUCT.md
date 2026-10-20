# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), self-hosted. Confirmed by the user after a three-option comparison (Next.js / Astro / Vite SPA + prerender); Next.js was chosen because the product needs server-rendered HTML for crawlers *and* a dynamic API (click counts, search, scraper ingestion) in one codebase.

Deployment target is fixed by the user: **Hetzner VPS, Docker, Traefik**. This rules out platform-managed rendering (Vercel ISR, edge functions) and makes the container, the reverse proxy, TLS issuance, the database and backups part of the project's own responsibility.

Database and scraper runtime are not yet decided and are recorded as open in Capabilities and Constraints.

## Users

**Primary:** PC gamers looking for console games that run natively on PC, in two distinct language markets.

- **pt-BR (the underserved market, and the strategic priority).** Brazilian players, many on modest or dated hardware. The scene they are looking into publishes almost exclusively in English, so the install step is where they get stuck.
- **en (the volume market).** Global players, generally better informed about the scene, arriving for specifics: version, compatibility, performance.

**The situation they arrive in** is one of two:

1. **A release just dropped.** They heard a port exists for a game they care about and want it now — this traffic spikes hard and decays within days.
2. **They have a game in mind.** They want to know whether it is playable on PC at all, and what it takes.

**The job:** decide whether a given console game is playable on *their* PC, and get it running. The decision is hardware-bound — "will this run on my machine" is the question under most visits, in both languages.

## Product Purpose

A catalog of every open-source native port, recompilation, decompilation and supporting tool that makes console games run on PC — kept current automatically from GitHub, published in Portuguese and English.

Each entry answers, on one page: does a port exist, which version is current, what does it need, how do I install it, and where is the official download.

**Success is organic search traffic.** Concretely: the first result for `<game> pc port` and `<game> pc` in Portuguese, and competitive on the same queries in English. Donations and ads convert that traffic; they are not the goal.

## Positioning

Four things a neighboring catalog could not truthfully copy:

1. **Speed to publish.** A scraper on an hourly cycle puts a release on the site the same day it ships. Release spikes are won by whoever is indexed first, and they are a large share of the available traffic.
2. **Written natively in both languages, not translated.** Descriptions are generated twice from the same raw source (README, release notes, repository metadata), once per language, with different keyword targets. Translated content is what Google's helpful content system demotes; this avoids the category entirely.
3. **Only the legal layer.** The catalog covers the port — the open-source project on GitHub — and never game data. This is a durable SEO asset, not a moral posture: DMCA volume triggers domain-wide demotion in Google, so a catalog that cannot be served notices is a catalog that can still rank in year two.
4. **Portuguese install guides for an English-only scene.** The projects themselves ship English READMEs. A correct, tested, step-by-step guide in Portuguese does not currently exist for most of this catalog.

## Operating Context

**How users arrive:** Google search on a game name; Discord and Reddit when a release drops; the scene's own communities.

**What they are comparing:** their hardware against the port's requirements, and one version against another. Reported frame rates, resolution support and known defects are decision inputs, not trivia.

**How the scene works, and what the product must reflect:**

- Projects **do not ship game assets.** Every one of them requires the user to supply their own copy or dump. This is deliberate on the projects' part and is what keeps them hosted on GitHub.
- **Release cadence is high and uneven.** Many projects publish near-weekly; a few spike enormously. Recent examples confirmed in research: the God of War III Remastered native port (Felipe Prado, 12 Oct 2026), Bloodborne via bbport and its Windows adaptations, shadPS4 v0.16.0 (June 2026), PS2Recomp (Jan 2026), Banjo-Kazooie (Jan 2026), Jet Set Radio Future decompilation (in progress).
- **Terminology is contested and matters.** Recompilation, decompilation, source port, native port and translation layer are different things. Some projects described as "not an emulator" borrow emulator code (bbport's Vulkan renderer derives from shadPS4). Entries should describe the mechanism accurately rather than repeat marketing framing.
- **AI-assisted ports are a live controversy** in the scene, with named developers objecting publicly. Entries should not take a side, and should not hide the fact either.

## Capabilities and Constraints

**In scope**

- Catalog entries for ports and tools: cover art, console of origin, target platform, current version, file size, description, requirements, install steps, link to the official GitHub release.
- Search, filtering (console, platform, category) and sorting.
- Radar: a feed of the newest releases across tracked projects.
- Bilingual delivery at `/pt/` and `/en/` with reciprocal `hreflang`, `x-default`, and a self-referencing `canonical` per language.
- Ingestion from the GitHub API: a seed list of known scene repositories plus topic-based discovery (`decompilation`, `recompilation`, `source-port`).
- AI-generated descriptions and install steps, produced per language from raw repository data, cached by release tag so unchanged entries cost nothing.
- Donations (Pix and/or Ko-fi) and advertising, with ad space reserved at fixed height in the layout from the first render.

**Out of scope**

- User accounts, login, comments, ratings, community requests. Confirmed: catalog and radar only.

**Hard constraint — the product rule everything else defers to**

The site never hosts, mirrors, or links to copyrighted game data: no ROMs, no `.pkg` files, no disc dumps, no "complete edition" archives. It catalogs the port project and links to its official release. Where a port requires game data, the install steps say the user must supply their own copy, which is what the upstream projects themselves require. This constraint is not negotiable by later design or feature work.

**Technical constraints**

- Self-hosted on Hetzner behind Traefik, in Docker. Rendering, caching, TLS, database and backups are all the project's own responsibility.
- Budget is approximately R$100+/month, which is comfortable for this workload and does not force free-tier compromises.
- GitHub API allows 5,000 authenticated requests per hour — well above what ingestion needs.

**Explicitly undecided**

- Exact brand spelling: `PCPort`, `PC Port`, or `pcport`. Domain is settled.
- Database engine and where the scraper runs (in-container cron, separate service, or external scheduler).
- Which AI model generates descriptions, and whether install steps are generated or hand-written for the highest-traffic entries.
- Cover art sourcing. No asset library exists yet; art must be sourced or produced, never fabricated as if official.

## Brand Commitments

- **Domain:** `pcport.org` (confirmed by the user).
- **Name:** PCPort — inferred from the domain and the repository name, pending the user's confirmation of exact styling.
- No logo, wordmark, color, typography or voice has been established. Nothing is inherited; there is no incumbent visual world to preserve.

## Evidence on Hand

**Research gathered in this session, usable as factual content:** current state of shadPS4 (v0.16.0, June 2026, runs Bloodborne); bbport and its Windows adaptations; the God of War III Remastered native port and its reported performance (≈144 FPS at native 1080p on Ryzen 5 5600X + RX 6700 XT; 4K figures in headlines overstate the measured numbers); PS2Recomp; Banjo-Kazooie and Banjo-Tooie; Jet Set Radio Future decompilation at ~30.6%.

**Anti-reference, analyzed in detail:** `linkvaultai1.com` — the same product category, and the direct reason several requirements above exist. Its server injects meta tags correctly but serves an empty `<body>` (2,839 bytes, no `<h1>`, no text) behind a 588 KB single bundle; it has no `sitemap.xml`, no structured data, a default `robots.txt` with no `Sitemap:` directive, and `Cache-Control: no-store` on HTML. Its catalog also mixes legal ports with copyrighted game data. Treat it as evidence of what not to ship.

**Absent, and not to be invented:** no logo or brand assets; no cover art library; no user numbers, download counts, testimonials or traffic data; no keyword volume figures — the user was advised to pull real numbers from Google Keyword Planner before fixing content priorities.

## Product Principles

1. **Catalog the port, never the game data.** The hard constraint above, stated as strategy: the site's ability to rank is the asset, and DMCA exposure is the only thing that can destroy it outright.
2. **The crawler sees exactly what the person sees.** Every page is complete HTML in the first response. This is the single largest failure of the incumbent and the main reason the stack was chosen.
3. **First to publish wins the spike.** Ingestion latency is a product feature, not an implementation detail.
4. **Two languages written, never one translated.** Each language is generated from source with its own keyword intent and stands on its own.
5. **Answer the hardware question.** Users are deciding whether something runs on *their* machine. Requirements, measured performance and known defects belong in the primary content, not in a footnote.
