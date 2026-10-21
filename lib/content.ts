import type { CatalogRow, Entry } from './data'
import type { Lang, Mechanism } from './db/schema'
import { GAMES } from './games'
import { DICT } from './i18n'

export type QA = { q: string; a: string }

/**
 * Prose composed from facts, never invented. A commercial game has a publisher
 * on record; a free one does not — which is exactly the line between a port
 * that needs your own copy and one that ships complete.
 */
export function needsOwnCopy(row: CatalogRow): boolean {
  if (!row.game) return false
  return Boolean(GAMES[row.game]?.publisher)
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

/** ~155 characters, composed to length rather than generated long and cut. */
export function portSummary(row: CatalogRow, lang: Lang): string {
  const mech = DICT[lang].mechanisms[row.mechanism].toLowerCase()
  const own = needsOwnCopy(row)

  if (lang === 'pt') {
    const base = `${row.title} de ${row.console} rodando no PC por ${mech}.`
    const tail = own ? ' Use sua própria cópia do jogo.' : ' Gratuito e completo.'
    return (base + tail).slice(0, 158)
  }
  const base = `${row.console} ${row.title} running on PC through ${mech}.`
  const tail = own ? ' Supply your own copy of the game.' : ' Free and complete.'
  return (base + tail).slice(0, 158)
}

export function installSteps(row: CatalogRow, lang: Lang): string[] {
  const own = needsOwnCopy(row)
  const multi = row.platforms.length > 1

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

  if (lang === 'pt') {
    return [
      own
        ? `Use sua própria cópia de ${row.title}. O projeto não distribui nenhum arquivo do jogo.`
        : `${row.title} é gratuito e completo — nenhum arquivo externo é necessário.`,
      'Baixe a release mais recente na página do projeto no GitHub.',
      multi ? `Escolha a build do seu sistema: ${row.platforms.join(', ')}.` : 'Baixe a build para Windows.',
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
    multi ? `Pick the build for your system: ${row.platforms.join(', ')}.` : 'Download the Windows build.',
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
      a: `A release atual${entry.version ? ` (${entry.version})` : ''} tem build para ${entry.platforms.join(', ')}. O jogo é originalmente de ${entry.console}.`,
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
    a: `The current release${entry.version ? ` (${entry.version})` : ''} ships builds for ${entry.platforms.join(', ')}. The game originally shipped on ${entry.console}.`,
  })

  out.push({
    q: `Is it legal to use?`,
    a: `The project is public and open source, maintained by ${entry.author}, and contains nothing from the commercial game. Responsibility for the game copy you use is yours — which is why the developers require you to supply your own.`,
  })

  return out
}
