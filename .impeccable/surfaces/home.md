# Surface brief — home / catalog (`/pt`, `/en`)

Development-only. Never copied into source, markup, metadata, or anything the browser receives.

## Scope and mode

The catalog home at `/pt/` and `/en/`. **Mode: Operate.** The visitor arrives from a search for one game's name and leaves having decided whether it runs on their machine. Scanning, status, and density outrank expression; the world enters through material, type, colour, and one signature move, and every control stays a real web component.

The per-entry page (`/pt/jogo/<slug>`, `/en/game/<slug>`) is Read and gets its own brief; it inherits this world.

## Audience, job, action

Brazilian and global PC players, many on dated hardware, answering one question: *will this run on my machine, and what does it take?* The action is reaching the official GitHub release with the install steps understood. Proof is the real data — measured frame rates, version, date, mechanism.

## Constraints

Catalogs the port project only, never game data (PRODUCT.md, hard constraint). Bilingual with reciprocal hreflang. Ad space reserved at fixed height from first render. Complete HTML in the first response.

## Direction contract

**THESIS** — The catalog is the compatibility matrix this scene already consults to decide, finally set with care. It refuses the arrangement every site in this category ships: a grid of cover-art cards over a near-black ground with neon gradients and glowing edges, the incumbent included.

**OWN-WORLD** — Matte ink ground, never glossy, never glowing. Structure is carried by hairline rules and column alignment, not by cards, shadows, or borders. Colour is reserved entirely for four status roles — Native, Recompiled, Translation layer, In progress — rendered flat and saturated, never as bloom. Everything else is neutral. Type: Archivo for prose, UI, and display (expanded cuts at display scale, reading as technical signage); Spline Sans Mono for every number, version, and identifier. Tabular figures throughout, so columns align down the page.

**STORY** — The visitor understands within one viewport that this is a complete, current register rather than a blog. They believe it because the rows carry versions and dates they can check, and because the count is visibly moving. They filter to their game and open its row.

**FIRST VIEWPORT** — A 48px identification bar. Then the lead band, roughly 280px, the page's single focal move: the newest release's title set very large in expanded grotesque beside four measured figures in mono, each under a small uppercase label — average FPS, version, release date, size — and one flat status chip. Type and figures only; no cover art in the band. A hairline closes it. Under that the filter row as real inputs, then the matrix: ten rows visible at 1440×900, each carrying game, console, mechanism, version, date, status chip. The chips are the only colour on the screen. The scale jump between the band's display type and the table's 14px mono is the composition. The primary action is the row itself — it expands in place rather than navigating away.

Approved comp: `.impeccable/mocks/home-02-faixa-destaque.jpg` (sidecar records the approval). It is a **critique reference, not a measured spec** — see FORM.

**FORM** — The Compatibility Matrix, ranked #1 of three derived candidates and chosen by the user from a presented hand. **No seed key: `concept-seed` is unavailable in this installation, so the roll never ran and my ranking did the selecting.** The two unchosen candidates — a dot-matrix printed listing, and a 1990s four-colour magazine spec page — stay available and are recorded here because their absence is my bias, not a verdict.

**FINISH** — unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Exact brand spelling (`PCPort` / `PC Port` / `pcport`).
- Whether cover art appears in the matrix at all, or only on the entry page. The comp round should answer this.
- Where donation and ad slots sit without breaking the matrix's rhythm.
