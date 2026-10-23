/**
 * Guides: pages built from the catalog, each answering one search.
 *
 * "recompiled games pc", "console games on linux", "native ports with a
 * download" — every one is a query people type, and every answer is a filter
 * over data this site already holds. Nothing here is written per entry, so a
 * new port lands in every guide it belongs to on the next refresh.
 *
 * The bar for a guide is that its list is worth reading. Below MIN_ENTRIES a
 * page is thin, and thin pages do not merely fail to rank — enough of them
 * drag the domain. "Translation layer" has one entry today and is left out.
 */
import type { Entry } from './data'
import type { Lang } from './db/schema'

export const MIN_ENTRIES = 3

export type Guide = {
  key: string
  slug: Record<Lang, string>
  kind: 'list' | 'article'
  h1: Record<Lang, string>
  description: Record<Lang, string>
  match?: (e: Entry) => boolean
}

export const GUIDES: Guide[] = [
  {
    key: 'decomp-vs-recomp',
    kind: 'article',
    slug: { pt: 'descompilacao-vs-recompilacao', en: 'decomp-vs-recomp' },
    h1: {
      pt: 'Descompilação, recompilação e emulador: como os ports de PC funcionam',
      en: 'Decompilation, recompilation and emulation: how PC ports work',
    },
    description: {
      pt: 'A diferença entre descompilação, recompilação estática, port nativo, camada de tradução e emulador — o que cada um exige da sua máquina e por que todos pedem a sua cópia do jogo.',
      en: 'The difference between decompilation, static recompilation, native ports, translation layers and emulators — what each asks of your machine, and why all of them need your copy of the game.',
    },
  },
  {
    key: 'recompiled',
    kind: 'list',
    slug: { pt: 'recompilados', en: 'recompiled' },
    h1: {
      pt: 'Jogos de console recompilados para PC',
      en: 'Console games recompiled for PC',
    },
    description: {
      pt: 'Todos os jogos de console que ganharam uma recompilação estática para PC: o código original traduzido para rodar nativo, com widescreen e FPS destravado.',
      en: 'Every console game with a static recompilation for PC: the original code translated to run natively, usually with widescreen and an uncapped framerate.',
    },
    match: (e) => e.mechanism === 'recompiled',
  },
  {
    key: 'native',
    kind: 'list',
    slug: { pt: 'nativos', en: 'native' },
    h1: {
      pt: 'Ports nativos de console para PC',
      en: 'Native console ports for PC',
    },
    description: {
      pt: 'Jogos de console reconstruídos para rodar como programas de PC de verdade, sem emulador: descompilações e ports feitos à mão.',
      en: 'Console games rebuilt to run as real PC programs with no emulator: decompilations and hand-made ports.',
    },
    match: (e) => e.mechanism === 'native',
  },
  {
    key: 'with-download',
    kind: 'list',
    slug: { pt: 'com-download', en: 'with-download' },
    h1: {
      pt: 'Ports de console para PC com download disponível',
      en: 'Console-to-PC ports with a download available',
    },
    description: {
      pt: 'Só os projetos que já publicaram uma versão para baixar no GitHub. Os outros existem como código e ainda pedem que você compile.',
      en: 'Only the projects that have published a version to download on GitHub. The others exist as source and still ask you to build them.',
    },
    // A published release is a fact; "playable" would be a judgement this
    // catalog has no data for.
    match: (e) => Boolean(e.version),
  },
  {
    key: 'linux',
    kind: 'list',
    slug: { pt: 'linux', en: 'linux' },
    h1: {
      pt: 'Jogos de console com versão nativa para Linux',
      en: 'Console games with a native Linux build',
    },
    description: {
      pt: 'Ports de console cuja release traz um build para Linux — o que também cobre o Steam Deck no modo desktop.',
      en: 'Console ports whose release ships a Linux build — which also covers the Steam Deck in desktop mode.',
    },
    // From the release's own file names, not the description: platforms is
    // only what a published file names.
    match: (e) => e.platforms.includes('Linux'),
  },
  {
    key: 'mac',
    kind: 'list',
    slug: { pt: 'mac', en: 'mac' },
    h1: {
      pt: 'Jogos de console com versão nativa para Mac',
      en: 'Console games with a native Mac build',
    },
    description: {
      pt: 'Ports de console cuja release traz um build para macOS, sem precisar de Windows nem de camada de compatibilidade.',
      en: 'Console ports whose release ships a macOS build, with no Windows or compatibility layer needed.',
    },
    match: (e) => e.platforms.includes('macOS'),
  },
  {
    key: 'in-development',
    kind: 'list',
    slug: { pt: 'em-desenvolvimento', en: 'in-development' },
    h1: {
      pt: 'Ports de console para PC em desenvolvimento',
      en: 'Console-to-PC ports in development',
    },
    description: {
      pt: 'Descompilações e ports que ainda não chegaram a uma versão jogável. Acompanhe aqui antes de todo mundo.',
      en: 'Decompilations and ports that have not reached a playable release yet. Follow them here before everyone else.',
    },
    match: (e) => e.mechanism === 'in-progress',
  },
  {
    key: 'emulators',
    kind: 'list',
    slug: { pt: 'emuladores', en: 'emulators' },
    h1: {
      pt: 'Emuladores de console para PC',
      en: 'Console emulators for PC',
    },
    description: {
      pt: 'Os emuladores de código aberto que rodam a biblioteca inteira de um console no PC — o complemento dos ports, quando o jogo que você quer ainda não tem um.',
      en: 'The open-source emulators that run a whole console library on PC — the complement to ports, for when the game you want does not have one yet.',
    },
    match: (e) => e.mechanism === 'emulator',
  },
]

export function guideBySlug(lang: Lang, slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug[lang] === slug)
}

export function guideEntries(guide: Guide, all: Entry[]): Entry[] {
  return guide.match ? all.filter(guide.match) : []
}

/** The guides worth publishing right now, given the catalog. */
export function liveGuides(all: Entry[]): { guide: Guide; count: number }[] {
  return GUIDES.map((guide) => ({ guide, count: guideEntries(guide, all).length })).filter(
    ({ guide, count }) => guide.kind === 'article' || count >= MIN_ENTRIES,
  )
}
