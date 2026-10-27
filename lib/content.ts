import type { CatalogRow, Entry } from './data'
import type { Lang, Mechanism } from './db/schema'
import { GAMES } from './games'
import { GUIDES } from './install-guides'
import { DICT } from './i18n'

export type QA = { q: string; a: string }

/**
 * Prose composed from facts, never invented. A commercial game has a publisher
 * on record; a free one does not — which is exactly the line between a port
 * that needs your own copy and one that ships complete.
 */
/**
 * Whether playing needs the player's own copy of the game. Only a game known
 * to be free — in games.ts with no publisher: Taisei, Celeste 64 — does not.
 *
 * This used to answer the other way round: anything without a games.ts entry
 * counted as free, so FIFA 09 and some 150 others told readers, in their FAQ
 * and search snippet, to download and play with no copy of the game at all.
 * Every one of them needs it, and the catalog's whole footing is saying so.
 */
export function needsOwnCopy(row: CatalogRow): boolean {
  const meta = row.game ? GAMES[row.game] : undefined
  return !(meta && !meta.publisher)
}

const MECHANISM_PT: Record<Mechanism, string> = {
  native:
    'É um port nativo: o jogo foi reconstruído para rodar como um programa de PC de verdade, sem emulador no meio. Isso costuma render desempenho melhor, resolução livre e suporte a mods — e é por isso que roda bem em máquina modesta.',
  recompiled:
    'É uma recompilação estática: uma ferramenta traduz o binário original do console para código de PC, de forma mecânica, em vez de reescrever o jogo à mão. O resultado roda nativo, geralmente com FPS destravado e widescreen.',
  'translation-layer':
    'É uma camada de tradução: o executável original roda direto no seu processador e só as chamadas de sistema e de gráfico são convertidas em tempo real. Fica entre o port nativo e o emulador — mais rápido que emular tudo, menos previsível que um port feito à mão.',
  emulator:
    'É um emulador: ele recria o console inteiro por software e roda o jogo original sem alterá-lo. Exige mais da máquina que um port nativo, mas serve a biblioteca toda do console em vez de um jogo só.',
  'in-progress':
    'O projeto ainda está em andamento. Decompilação é um trabalho longo e manual, que reconstrói o código-fonte do jogo a partir do binário, e pode levar anos até virar um port jogável.',
}

const MECHANISM_EN: Record<Mechanism, string> = {
  native:
    'This is a native port: the game was rebuilt to run as a real PC program with no emulator in the loop. That usually means better performance, arbitrary resolution and mod support — and it is why these run well on modest hardware.',
  recompiled:
    'This is a static recompilation: tooling mechanically translates the original console binary into PC code rather than rewriting the game by hand. The result runs natively, typically with an uncapped framerate and widescreen.',
  'translation-layer':
    'This is a translation layer: the original executable runs directly on your CPU and only system and graphics calls are converted at runtime. It sits between a native port and an emulator — faster than emulating everything, less predictable than a hand-built port.',
  emulator:
    "This is an emulator: it recreates the whole console in software and runs the original game unmodified. It asks more of your machine than a native port, but it serves the console's entire library rather than one game.",
  'in-progress':
    'The project is still under way. Decompilation is long, manual work that rebuilds the game\'s source from its binary, and it can take years before a playable port exists.',
}

export function mechanismExplainer(row: CatalogRow, lang: Lang): string {
  return (lang === 'pt' ? MECHANISM_PT : MECHANISM_EN)[row.mechanism]
}

const KIND: Record<Lang, Record<Mechanism, string>> = {
  pt: {
    native: 'port nativo',
    recompiled: 'recompilação estática',
    'translation-layer': 'camada de tradução',
    emulator: 'emulador',
    'in-progress': 'projeto em andamento',
  },
  en: {
    native: 'native port',
    recompiled: 'static recompilation',
    'translation-layer': 'translation layer',
    emulator: 'emulator',
    'in-progress': 'work-in-progress project',
  },
}

/**
 * The search snippet, ~155 characters, composed to length rather than cut.
 *
 * It used to read "Xbox 360 FIFA 09 running on PC through native": the
 * mechanism's chip label dropped into a sentence that needed a noun. It also
 * carried no author, so the four Bloodborne ports had the same snippet.
 */
export function portSummary(row: CatalogRow, lang: Lang): string {
  const kind = KIND[lang][row.mechanism]
  const own = needsOwnCopy(row)
  const systems = row.platforms.length ? row.platforms.join(', ') : null
  const fit = (parts: string[]) => {
    let out = ''
    for (const p of parts) if ((out + p).length <= 158) out += p
    return out.trim()
  }

  if (lang === 'pt') {
    if (row.mechanism === 'emulator')
      return fit([
        `${row.title}: emulador de ${row.console} para PC, de ${row.author}.`,
        systems ? ` Builds para ${systems}.` : '',
        ' Roda os jogos que você já tem, sem distribuir nenhum.',
      ])
    return fit([
      `${row.title} (${row.console}) no PC: ${kind} de ${row.author}`,
      row.version ? `, versão ${row.version}.` : '.',
      systems ? ` Para ${systems}.` : '',
      own ? ' Requer sua própria cópia do jogo.' : ' Gratuito e completo.',
      ' Requisitos e passo a passo.',
    ])
  }
  if (row.mechanism === 'emulator')
    return fit([
      `${row.title}: a ${row.console} emulator for PC by ${row.author}.`,
      systems ? ` Builds for ${systems}.` : '',
      ' Runs the games you already own and ships none.',
    ])
  return fit([
    `${row.title} (${row.console}) on PC: a ${kind} by ${row.author}`,
    row.version ? `, version ${row.version}.` : '.',
    systems ? ` For ${systems}.` : '',
    own ? ' Requires your own copy of the game.' : ' Free and complete.',
    ' Requirements and install steps.',
  ])
}

export function installSteps(row: CatalogRow, lang: Lang): string[] {
  // A hand-written guide wins over the composed one. The generated steps are
  // correct but generic, and what people actually get stuck on is which copy
  // of the game the project wants — that is knowledge, not a template.
  const guide = GUIDES[row.repo]
  if (guide) return guide[lang]

  const own = needsOwnCopy(row)

  // `platforms` is only what a release file actually names (lib/platforms.ts),
  // so it can be empty, and `version` is null for exactly the projects GitHub
  // reported no release for. The old steps collapsed both into "download the
  // Windows build", which is the one sentence an entry with no PC binary — or
  // no binary at all — must never print.
  const noRelease = !row.version
  const buildStep =
    row.platforms.length > 1
      ? lang === 'pt'
        ? `Escolha a build do seu sistema: ${row.platforms.join(', ')}.`
        : `Pick the build for your system: ${row.platforms.join(', ')}.`
      : row.platforms.length === 1
        ? lang === 'pt'
          ? `A release atual publica build para ${row.platforms[0]}.`
          : `The current release ships a ${row.platforms[0]} build.`
        : lang === 'pt'
          ? 'Os nomes dos arquivos da release não dizem para qual sistema cada build serve — confira na página da release antes de baixar.'
          : 'The release file names do not say which system each build is for — check on the release page before downloading.'

  if (row.mechanism === 'in-progress') {
    return lang === 'pt'
      ? [
          'Este projeto ainda não tem build jogável — está em desenvolvimento.',
          'Acompanhe o repositório no GitHub para ver o progresso.',
          own ? 'Quando sair, você precisará da sua própria cópia do jogo.' : '',
        ].filter(Boolean)
      : [
          'This project has no playable build yet — it is still in development.',
          'Watch the repository on GitHub to follow progress.',
          own ? 'When it ships, you will need your own copy of the game.' : '',
        ].filter(Boolean)
  }

  // Playable, going by the classifier, but with nothing published to download.
  // Four entries are here, and the composed steps used to walk them through
  // extracting a release that does not exist.
  if (noRelease) {
    return lang === 'pt'
      ? [
          own
            ? `Use sua própria cópia de ${row.title}. O projeto não distribui nenhum arquivo do jogo.`
            : `${row.title} é gratuito e completo — nenhum arquivo externo é necessário.`,
          'Este projeto não tem release publicada: há código no GitHub e nada pronto para baixar.',
          'Para rodar hoje, compile o projeto você mesmo seguindo o README do repositório.',
        ]
      : [
          own
            ? `Supply your own copy of ${row.title}. The project distributes no game files.`
            : `${row.title} is free and complete — no external files are needed.`,
          'This project has no published release: there is code on GitHub and nothing ready to download.',
          'To run it today, build the project yourself by following the repository README.',
        ]
  }

  if (lang === 'pt') {
    return [
      own
        ? `Use sua própria cópia de ${row.title}. O projeto não distribui nenhum arquivo do jogo.`
        : `${row.title} é gratuito e completo — nenhum arquivo externo é necessário.`,
      'Baixe a release mais recente na página do projeto no GitHub.',
      buildStep,
      'Extraia o arquivo em uma pasta vazia, fora de Arquivos de Programas.',
      own ? 'Aponte o programa para os arquivos da sua cópia quando ele pedir.' : 'Execute o programa.',
      'Ajuste resolução, limite de FPS e controle antes de jogar.',
    ]
  }

  return [
    own
      ? `Supply your own copy of ${row.title}. The project distributes no game files.`
      : `${row.title} is free and complete — no external files are needed.`,
    'Download the latest release from the project\'s GitHub page.',
    buildStep,
    'Extract it into an empty folder outside Program Files.',
    own ? 'Point the program at your own game files when prompted.' : 'Run the program.',
    'Set resolution, frame cap and input before playing.',
  ]
}

/**
 * Derived from the entry's own facts. Every page carries a real FAQPage this
 * way, not just the handful anyone got round to writing.
 */
export function buildFaq(entry: Entry, lang: Lang): QA[] {
  const t = DICT[lang]
  const name = entry.title
  const mech = t.mechanisms[entry.mechanism].toLowerCase()
  const own = needsOwnCopy(entry)
  const game = entry.gameMeta
  const out: QA[] = []

  if (lang === 'pt') {
    out.push({
      q: `Preciso ter o jogo original para jogar ${name} no PC?`,
      a: own
        ? `Precisa. O projeto não distribui nenhum dado do jogo — você fornece sua própria cópia ou dump. Todos os projetos dessa cena funcionam assim, e é justamente o que permite que fiquem hospedados publicamente no GitHub.`
        : `Não. ${name} é gratuito e completo: baixe a release e execute, sem ROM, dump ou cópia de jogo comercial.`,
    })

    out.push({ q: `O que significa "${mech}"?`, a: mechanismExplainer(entry, lang) })

    out.push({
      q: `${name} roda em PC fraco?`,
      a:
        entry.mechanism === 'in-progress'
          ? 'Ainda não há build jogável, então não existe medição de desempenho. Acompanhe o repositório.'
          : 'Ports nativos e recompilações dispensam a emulação de CPU, então costumam ser bem mais leves que um emulador do mesmo console. Sem número medido publicado para este projeto, porém, qualquer estimativa seria chute — teste na sua máquina.',
    })

    if (game) {
      out.push({
        q: `De quando é ${name}?`,
        a: `O jogo original saiu em ${game.releasedAt.slice(0, 4)}, desenvolvido pela ${game.developer}${game.publisher ? ` e publicado pela ${game.publisher}` : ''}. Este port para PC é de ${entry.releasedAt?.slice(0, 4) ?? 'desenvolvimento recente'}.`,
      })
    }

    out.push({
      q: `Em quais sistemas funciona?`,
      a: entry.platforms.length
        ? `A release atual${entry.version ? ` (${entry.version})` : ''} tem build para ${entry.platforms.join(', ')}. O jogo é originalmente de ${entry.console}.`
        : entry.version
          ? `Os nomes dos arquivos da release atual${entry.version ? ` (${entry.version})` : ''} não dizem a quais sistemas as builds servem, então esta página não afirma nada: confira na página da release. O jogo é originalmente de ${entry.console}.`
          : `Não há release publicada para dizer em quais sistemas funciona. O jogo é originalmente de ${entry.console}.`,
    })

    out.push({
      q: `É legal usar?`,
      a: `O projeto é público e de código aberto, mantido por ${entry.author}, e não contém nada do jogo comercial. A responsabilidade sobre a cópia do jogo que você usa é sua — por isso os próprios desenvolvedores exigem que você forneça a sua.`,
    })

    return out
  }

  out.push({
    q: `Do I need the original game to play ${name} on PC?`,
    a: own
      ? `Yes. The project distributes no game data — you supply your own copy or dump. Every project in this scene works this way, and it is what lets them stay publicly hosted on GitHub.`
      : `No. ${name} is free and complete: download the release and run it, with no ROM, dump or commercial game copy.`,
  })

  out.push({ q: `What does "${mech}" mean?`, a: mechanismExplainer(entry, lang) })

  out.push({
    q: `Will ${name} run on a low-end PC?`,
    a:
      entry.mechanism === 'in-progress'
        ? 'There is no playable build yet, so no performance measurement exists. Watch the repository.'
        : 'Native ports and recompilations skip CPU emulation entirely, so they are usually far lighter than an emulator for the same console. With no published measurement for this project, though, any estimate would be guesswork — test it on your own machine.',
  })

  if (game) {
    out.push({
      q: `When was ${name} released?`,
      a: `The original game shipped in ${game.releasedAt.slice(0, 4)}, developed by ${game.developer}${game.publisher ? ` and published by ${game.publisher}` : ''}. This PC port is from ${entry.releasedAt?.slice(0, 4) ?? 'recent development'}.`,
    })
  }

  out.push({
    q: `Which systems does it support?`,
    a: entry.platforms.length
      ? `The current release${entry.version ? ` (${entry.version})` : ''} ships builds for ${entry.platforms.join(', ')}. The game originally shipped on ${entry.console}.`
      : entry.version
        ? `The file names in the current release${entry.version ? ` (${entry.version})` : ''} do not say which systems the builds are for, so this page claims none: check the release page. The game originally shipped on ${entry.console}.`
        : `No release has been published, so there is nothing to say which systems it runs on. The game originally shipped on ${entry.console}.`,
  })

  out.push({
    q: `Is it legal to use?`,
    a: `The project is public and open source, maintained by ${entry.author}, and contains nothing from the commercial game. Responsibility for the game copy you use is yours — which is why the developers require you to supply your own.`,
  })

  return out
}
