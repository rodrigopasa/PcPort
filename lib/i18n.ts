import type { Lang, Mechanism } from './db/schema'

export const LANGS = ['pt', 'en'] as const

export const SITE = 'https://pcport.org'
export const SITE_NAME = 'PCPort'

/** Entry URLs differ per language on purpose — one shared slug collapses hreflang. */
export function entryPath(lang: Lang, slug: string) {
  return lang === 'pt' ? `/pt/jogo/${slug}` : `/en/game/${slug}`
}

/** Contribution form. A page for people, not a query, so the word is translated. */
export function contributePath(lang: Lang) {
  return lang === 'pt' ? '/pt/contribuir' : '/en/contribute'
}

/**
 * Every port of one game, side by side. `ports` is the same word in both
 * languages and is the word people search with, so the segment is shared.
 */
export function hubPath(lang: Lang, game: string) {
  return `/${lang}/ports/${game}`
}

export function guidesPath(lang: Lang) {
  return lang === 'pt' ? '/pt/guias' : '/en/guides'
}

export function guidePath(lang: Lang, slug: string) {
  return `${guidesPath(lang)}/${slug}`
}

/** "outubro de 2026" / "October 2026" — the freshness people look for in a result. */
export function monthYear(lang: Lang, d = new Date()) {
  return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function isLang(v: string): v is Lang {
  return v === 'pt' || v === 'en'
}

type Dict = {
  tagline: string
  ports: string
  thisWeek: string
  search: string
  filterConsole: string
  filterMechanism: string
  filterAll: string
  sortRecent: string
  sortAlpha: string
  sortStars: string
  colYear: string
  fullPage: string
  colGame: string
  colConsole: string
  colMechanism: string
  colVersion: string
  colDate: string
  colStatus: string
  newest: string
  fpsLabel: string
  versionLabel: string
  releasedLabel: string
  sizeLabel: string
  openRelease: string
  noResults: string
  ownCopy: string
  requirements: string
  storage: string
  aboutGame: string
  gameReleased: string
  portReleased: string
  developer: string
  publisher: string
  genre: string
  coverOf: (t: string) => string
  noCover: string
  license: string
  howThisWorks: string
  shotOf: (t: string) => string
  shotCredit: (r: string) => string
  screenshots: string
  /** The <h1> and the <title> are built from how people actually search. */
  onPc: (t: string) => string
  seoTitle: (t: string, mech: string) => string
  seoDescription: (t: string, console: string, mech: string) => string
  howToInstall: string
  knownIssues: string
  faq: string
  radar: string
  radarLead: string
  consoles: string
  consolesLead: string
  portsOn: (c: string) => string
  consoleLead: (c: string, n: number) => string
  backHome: string
  notFound: string
  notFoundLead: string
  installApp: string
  installAppLead: string
  donate: string
  donateLead: string
  contribute: string
  guides: string
  footerNote: string
  mechanisms: Record<Mechanism, string>
}

export const DICT: Record<Lang, Dict> = {
  pt: {
    tagline: 'Ports nativos de console para PC, conferidos e sempre atualizados.',
    ports: 'ports',
    thisWeek: 'novos esta semana',
    search: 'Buscar jogo…',
    filterConsole: 'Console',
    filterMechanism: 'Mecanismo',
    filterAll: 'Todos',
    sortRecent: 'Mais recentes',
    sortAlpha: 'A–Z',
    sortStars: 'Mais populares',
    colYear: 'Ano',
    fullPage: 'Ver página completa',
    colGame: 'Jogo',
    colConsole: 'Console',
    colMechanism: 'Mecanismo',
    colVersion: 'Versão',
    colDate: 'Data',
    colStatus: 'Status',
    newest: 'Lançamento mais recente',
    fpsLabel: 'FPS médio',
    versionLabel: 'Versão',
    releasedLabel: 'Lançamento',
    sizeLabel: 'Tamanho',
    openRelease: 'Abrir release no GitHub',
    noResults: 'Nenhum port corresponde a esse filtro.',
    ownCopy: 'Estes projetos não distribuem o jogo. Use sua própria cópia.',
    requirements: 'Requisitos',
    storage: 'Espaço',
    aboutGame: 'Sobre o jogo',
    gameReleased: 'Jogo original',
    portReleased: 'Port lançado',
    developer: 'Desenvolvedora',
    publisher: 'Publicadora',
    genre: 'Gênero',
    coverOf: (t) => `Capa de ${t}`,
    noCover: 'Capa não disponível',
    license: 'Licença',
    howThisWorks: 'Como esse port funciona',
    shotOf: (t) => `Captura de ${t} rodando no PC`,
    shotCredit: (r) => `Capturas publicadas pelo próprio projeto em ${r}`,
    screenshots: 'Capturas',
    // "jogo + no PC" is the query; the version number never is.
    onPc: (t) => `${t} no PC`,
    seoTitle: (t, mech) => `${t} no PC — ${mech}`,
    seoDescription: (t, console, mech) =>
      `Como rodar ${t} de ${console} no PC: ${mech.toLowerCase()}, download oficial, requisitos e passo a passo em português.`,
    howToInstall: 'Como instalar',
    knownIssues: 'Problemas conhecidos',
    faq: 'Perguntas frequentes',
    radar: 'Radar',
    radarLead: 'Tudo que a cena lançou, do mais recente para o mais antigo.',
    consoles: 'Consoles',
    consolesLead: 'Escolha o console e veja tudo que já roda nativo no PC.',
    portsOn: (c) => `Ports de ${c} no PC`,
    consoleLead: (c, n) =>
      `${n} ${n === 1 ? 'port disponível' : 'ports disponíveis'} de ${c} rodando nativo no PC, com versão, requisitos e passo a passo em português.`,
    backHome: 'Voltar ao catálogo',
    notFound: 'Página não encontrada',
    notFoundLead: 'Esse endereço não existe mais, ou nunca existiu.',
    installApp: 'Instalar no celular',
    installAppLead: 'Adicione o PCPort à tela inicial e consulte o catálogo offline.',
    donate: 'Doar',
    donateLead: 'O site é grátis e continua grátis. Doação só se quiser.',
    contribute: 'Contribuir',
    guides: 'Guias',
    footerNote:
      'O PCPort cataloga apenas os projetos de port, que são de código aberto e públicos. Nenhum arquivo de jogo é hospedado ou distribuído aqui.',
    mechanisms: {
      native: 'Nativo',
      recompiled: 'Recompilado',
      'translation-layer': 'Tradução',
      emulator: 'Emulador',
      'in-progress': 'Em progresso',
    },
  },
  en: {
    tagline: 'Native console-to-PC ports, verified and continuously updated.',
    ports: 'ports',
    thisWeek: 'new this week',
    search: 'Search a game…',
    filterConsole: 'Console',
    filterMechanism: 'Mechanism',
    filterAll: 'All',
    sortRecent: 'Newest',
    sortAlpha: 'A–Z',
    sortStars: 'Most popular',
    colYear: 'Year',
    fullPage: 'Open full page',
    colGame: 'Game',
    colConsole: 'Console',
    colMechanism: 'Mechanism',
    colVersion: 'Version',
    colDate: 'Date',
    colStatus: 'Status',
    newest: 'Latest release',
    fpsLabel: 'Avg FPS',
    versionLabel: 'Version',
    releasedLabel: 'Released',
    sizeLabel: 'Size',
    openRelease: 'Open release on GitHub',
    noResults: 'No port matches that filter.',
    ownCopy: 'These projects ship no game data. Supply your own copy.',
    requirements: 'Requirements',
    storage: 'Storage',
    aboutGame: 'About the game',
    gameReleased: 'Original game',
    portReleased: 'Port released',
    developer: 'Developer',
    publisher: 'Publisher',
    genre: 'Genre',
    coverOf: (t) => `Cover of ${t}`,
    noCover: 'No cover available',
    license: 'License',
    howThisWorks: 'How this port works',
    shotOf: (t) => `Screenshot of ${t} running on PC`,
    shotCredit: (r) => `Screenshots published by the project itself at ${r}`,
    screenshots: 'Screenshots',
    onPc: (t) => `${t} on PC`,
    seoTitle: (t, mech) => `${t} PC Port — ${mech}`,
    seoDescription: (t, console, mech) =>
      `How to run ${console} ${t} on PC: ${mech.toLowerCase()}, official download, requirements and a step-by-step setup.`,
    howToInstall: 'How to install',
    knownIssues: 'Known issues',
    faq: 'Frequently asked',
    radar: 'Radar',
    radarLead: 'Everything the scene has shipped, newest first.',
    consoles: 'Consoles',
    consolesLead: 'Pick a console and see everything that now runs natively on PC.',
    portsOn: (c) => `${c} ports on PC`,
    consoleLead: (c, n) =>
      `${n} ${c} ${n === 1 ? 'port' : 'ports'} running natively on PC, with version, requirements and step-by-step setup.`,
    backHome: 'Back to the catalog',
    notFound: 'Page not found',
    notFoundLead: 'That address no longer exists, or never did.',
    installApp: 'Install on mobile',
    installAppLead: 'Add PCPort to your home screen and browse the catalog offline.',
    donate: 'Donate',
    donateLead: 'The site is free and stays free. Donate only if you want to.',
    contribute: 'Contribute',
    guides: 'Guides',
    footerNote:
      'PCPort catalogs only the port projects themselves, which are open source and public. No game files are hosted or distributed here.',
    mechanisms: {
      native: 'Native',
      recompiled: 'Recompiled',
      'translation-layer': 'Translation layer',
      emulator: 'Emulator',
      'in-progress': 'In progress',
    },
  },
}
