# Design

The visual world as built. Written from the finished surfaces, not ahead of them.

**Direction:** The Compatibility Matrix — the document this scene already consults to decide, finally set with care. It refuses the arrangement every site in this category ships: a grid of cover-art cards over near-black with neon gradients and glowing edges.

---

## Colour

Ground is matte ink, never glossy, never glowing. Colour is reserved entirely for status; everything else is neutral. A chip is the only saturated thing on a given screen, which is what makes the status column scannable at a glance.

| Token | Value | Role |
|---|---|---|
| `--color-ground` | `#0d0e10` | Page ground |
| `--color-raise` | `#15171b` | Row hover, expanded row |
| `--color-ink` | `#f2f3f5` | Primary text |
| `--color-muted` | `#8b9099` | Body text, secondary data |
| `--color-faint` | `#7a8089` | Labels, metadata — raised from `#5d636c`, which measured 3.19:1 at 10–11px; now 4.85:1 |
| `--color-hairline` | `rgba(255,255,255,.09)` | Every structural line |
| `--color-hairline-strong` | `rgba(255,255,255,.16)` | Dividers, scrollbar |

**Status roles** — these encode data, so they are flat and never bloom:

| Mechanism | Token | Value |
|---|---|---|
| Native | `--color-native` | `#35b37e` |
| Recompiled | `--color-recompiled` | `#d99a2b` |
| Translation layer | `--color-translation` | `#7b6cf6` |
| Emulator | `--color-emulator` | `#5b94d6` |
| In progress | `--color-progress` | `#7a818a` (4.91:1; was `#6b7280`) |

Dark was chosen from the use scene, not the category: someone at their gaming PC, often at night, with this open beside a GitHub page and a video.

## Type

- **Archivo** — prose, UI, display. Extra-bold at display scale with `-0.04em` tracking, reading as technical signage.
- **Spline Sans Mono** — every number, version, date and identifier.

Both self-hosted at build through `next/font`, never fetched from Google at runtime.

The `.tabular` class carries `font-variant-numeric: tabular-nums` and `tnum`/`zero` features. Columns only align down the page if figures are tabular — that alignment *is* the direction, not a detail.

Display scale is fluid: `clamp(1.9rem, 4.4vw, 4.25rem)`. Body sits at 15–16px with a 68ch measure.

## Structure

Hairline rules and column alignment carry all structure. **No cards, no shadows, no borders around containers.** A table is a table; a spec list is label and value separated by a rule.

Corner radius is `2px` at most, and only on chips and controls. Nothing is pill-shaped.

Layout maximum is `1400px` with a `20px` gutter.

## Components

- **Chip / StatusChip** — flat, bordered at 35% of its tone, background at 10%, uppercase with wide tracking. Two sizes. `Chip` takes a tone and any label; `StatusChip` is the mechanism use of it. Anything else that carries a state uses `Chip` too — the contribution form's *Recebido* and *Não enviado* are chips, not a coloured rule down the side of a box.
- **Icons** — drawn, never typed. `ArrowRight` and `ChevronRight` share one 16px grid, a 1.5 stroke and round caps, and inherit the text colour so they follow hover. Text glyphs (→, ›, ★) took their shape and baseline from whichever font rendered them and read as typed; stars are written as a word beside the figure.
- **LeadBand** — the home's single focal move. Title at display scale beside a spec block whose figures sit above their labels, hairline between each. Type and figures only, no image: the LCP element is text the server already sent.
- **Matrix** — the catalog. Real `<table>`, sortable headers, native inputs and selects, rows expand in place rather than navigating away. Columns drop progressively below `lg`, `md`, `sm`.
- **Comparison** (`/ports/<game>`) — every port of one game. A real table from 768px, closing each row with the way into its install guide. Below that, each port is a block: name and author over a two-by-two of label and value. It used to scroll sideways with nothing saying so, showing two of seven columns on a phone.
- **Contribution form** — four intents as selectable options (bordered, because they are controls, not containers), the sections for each shown by CSS `:has()` so it works before the script loads. States are chips; the error keeps everything typed.
- **MaintainerBox** — the foot of every port page: request a correction, a removal or report a broken link, then the optional README badge with copyable Markdown and HTML.
- **Empty search** — names the miss and asks for it: the typed game goes to the contribution form already filled in. A header row over no results is hidden rather than left standing.
- **AdSlot** — fixed height reserved before anything loads, with `contain: layout size`. An ad that arrives and pushes content down is the largest single source of bad CLS.

## Browser surfaces

Themed from the palette rather than left to the browser: text selection, caret, focus ring (2px native, 2px offset), scrollbar thumb and track, underline offset and thickness. This is the cheapest signal that a page was built rather than assembled.

## Motion

One authored moment per page, all on the same curve so the motion reads as one hand: on the home, the lead band's spec block; elsewhere, the page's `h1`. Each settles once from already-visible — opacity 0.5, 3px — on an exponential ease-out (`cubic-bezier(.16,1,.3,1)`, 520ms). Catalog rows deal in, staggered and capped at the fourteenth so a long list is not a wait. Nothing animates from opacity 0, and all of it is disabled under `prefers-reduced-motion`.

A heading caught mid-settle in a background tab can read as grey: browsers throttle animation in hidden tabs. It finishes at full opacity when the page is visible — measured, before anyone "fixes" it.

---

## Finish

The direction contract in [`.impeccable/surfaces/home.md`](.impeccable/surfaces/home.md) ends with the finish review. **That review did not run:** this installation of the skill ships documentation only, with no `scripts/` directory, so `concept-seed`, `serve-question`, `comp-spec`, `build-phase`, `comp-diff` and `detect` were all unavailable, and the shipped reviewer and documenter agents could not be spawned. The build ran code-led with the approved comp as a critique reference rather than a measured spec, and was verified by eye across desktop and mobile in the browser.

What that means in practice: there is no numeric fidelity score against the comp, and no detector pass.

The October 2026 polish pass ran under the same limits — documentation only, no detector — and was verified by eye in one batched round at 1280px and 375px. It removed what the craft floor bans and the newer surfaces had picked up: a label set above the contribution heading, 2px coloured side rules on the form's messages, text glyphs standing in for icons. It also caught content no rule would: two port pages led their screenshots with the libultraship logo, and four more README images were share cards or a logo, so screenshots are now reviewed on contact sheets like covers. Outstanding for a session that has the tooling — run the detector over the components, and run a finish review against [`.impeccable/mocks/home-02-faixa-destaque.jpg`](.impeccable/mocks/home-02-faixa-destaque.jpg).
