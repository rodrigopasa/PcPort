'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/db/schema'
import type { ErrorCode, Kind } from '@/lib/contribute'
import { Chip } from './StatusChip'

/**
 * The contribution form.
 *
 * Built to work three ways, in this order of preference:
 * - With JavaScript: posts in the background and answers inline, so a refused
 *   link does not throw away everything typed.
 * - Without JavaScript: a plain POST and a 303 back to the page. Nothing here
 *   is required before hydration, because a field marked required inside a
 *   hidden section would block the submit with no way to see why.
 * - Without :has(): every section stays visible (see globals.css), which is
 *   cluttered but complete.
 */

type Port = { repo: string; title: string } | null

const COPY = {
  pt: {
    whatToDo: 'O que você quer fazer?',
    kinds: {
      novo: ['Indicar um port que falta', 'Um jogo de console que já roda no PC e não está aqui.'],
      correcao: ['Corrigir uma página', 'Algo está errado ou desatualizado numa página nossa.'],
      remocao: ['Pedir remoção', 'Você mantém um projeto e prefere que ele não apareça aqui.'],
      link: ['Avisar de link quebrado', 'Um link não abre, leva ao lugar errado ou parece inseguro.'],
    } as Record<Kind, [string, string]>,
    about: 'Sobre',
    game: 'Jogo',
    gameHint: 'O nome do jogo original, como as pessoas pesquisam.',
    console: 'Console de origem',
    chooseConsole: 'Escolha o console',
    other: 'Outro (diga qual nas observações)',
    project: 'Nome do projeto',
    url: 'Página do projeto',
    urlHint: 'O repositório ou o site do projeto. Nunca um link para o jogo em si.',
    urlOptional: 'Página do projeto ou da nossa página com problema',
    platforms: 'Roda em',
    method: 'Como foi feito',
    methods: {
      decomp: ['Descompilação', 'Código-fonte reconstruído à mão a partir do jogo e compilado de novo.'],
      recomp: ['Recompilação', 'O código de máquina original traduzido automaticamente para C ou C++.'],
      rebuild: ['Motor novo', 'Um motor escrito do zero que recria o jogo sem o código original.'],
      emulator: ['Emulador', 'Roda o jogo emulando o console.'],
      other: ['Não sei', ''],
    } as Record<string, [string, string]>,
    status: 'Situação',
    statuses: {
      playable: 'Jogável',
      beta: 'Beta',
      'in-progress': 'Em desenvolvimento',
      unknown: 'Não sei',
    } as Record<string, string>,
    ai: 'O projeto diz que usa ferramentas de IA no desenvolvimento',
    reason: 'Motivo',
    removalReasons: {
      maintainer: 'Mantenho o projeto e prefiro não ser listado',
      abandoned: 'O projeto foi abandonado ou apagado',
      other: 'Outro motivo',
    } as Record<string, string>,
    linkReasons: {
      broken: 'Não abre',
      wrong: 'Leva ao lugar errado',
      unsafe: 'Parece inseguro',
    } as Record<string, string>,
    notes: 'Observações',
    notesCorrection: 'O que está errado?',
    notesHint: 'Opcional. O conteúdo técnico do envio pode virar uma issue pública no nosso GitHub.',
    name: 'Seu nome ou apelido',
    email: 'E-mail',
    privateHint: 'Opcional. Só para respondermos. Nunca publicamos nome nem e-mail.',
    send: 'Enviar para revisão',
    sending: 'Enviando…',
    sent: {
      novo: 'Cada port indicado é revisado por uma pessoa antes de entrar no catálogo.',
      correcao: 'Vamos conferir e corrigir a página.',
      remocao:
        'Pedido de remoção feito por quem mantém o projeto é atendido — vamos confirmar pelo próprio repositório.',
      link: 'Vamos conferir o link.',
    } as Record<Kind, string>,
    another: 'Enviar outra',
    received: 'Recebido',
    notSent: 'Não enviado',
    errors: {
      bot: 'Não foi possível enviar.',
      fast: 'O envio saiu rápido demais. Confira os campos e envie de novo.',
      kind: 'Escolha o que você quer fazer.',
      missing: 'Faltou um campo obrigatório para esse tipo de envio.',
      url: 'O link não parece um endereço válido.',
      gamefile:
        'Esse link aponta para um arquivo de jogo ou para um serviço de hospedagem de arquivos. O PCPort só lista o projeto — nunca o jogo.',
      email: 'O e-mail não parece válido.',
      rate: 'Muitos envios seguidos. Tente de novo daqui a uma hora.',
      store: 'Não conseguimos guardar o envio agora. Tente de novo mais tarde.',
    } as Record<ErrorCode, string>,
  },
  en: {
    whatToDo: 'What would you like to do?',
    kinds: {
      novo: ['Suggest a missing port', 'A console game that already runs on PC and is not listed.'],
      correcao: ['Correct a page', 'Something on one of our pages is wrong or out of date.'],
      remocao: ['Request removal', 'You maintain a project and would rather it was not listed.'],
      link: ['Report a broken link', 'A link does not open, goes somewhere wrong or looks unsafe.'],
    } as Record<Kind, [string, string]>,
    about: 'About',
    game: 'Game',
    gameHint: 'The original game, named the way people search for it.',
    console: 'Original console',
    chooseConsole: 'Choose a console',
    other: 'Other (say which in the notes)',
    project: 'Project name',
    url: 'Project page',
    urlHint: 'The repository or the project site. Never a link to the game itself.',
    urlOptional: 'Project page, or our page with the problem',
    platforms: 'Runs on',
    method: 'How it was made',
    methods: {
      decomp: ['Decompilation', 'Source rebuilt by hand from the game, then compiled again.'],
      recomp: ['Recompilation', 'The original machine code translated automatically into C or C++.'],
      rebuild: ['New engine', 'An engine written from scratch that recreates the game without its code.'],
      emulator: ['Emulator', 'Runs the game by emulating the console.'],
      other: ['Not sure', ''],
    } as Record<string, [string, string]>,
    status: 'Status',
    statuses: {
      playable: 'Playable',
      beta: 'Beta',
      'in-progress': 'In development',
      unknown: 'Not sure',
    } as Record<string, string>,
    ai: 'The project says it uses AI tools in its development',
    reason: 'Reason',
    removalReasons: {
      maintainer: 'I maintain the project and would rather not be listed',
      abandoned: 'The project was abandoned or deleted',
      other: 'Something else',
    } as Record<string, string>,
    linkReasons: {
      broken: 'It does not open',
      wrong: 'It goes somewhere wrong',
      unsafe: 'It looks unsafe',
    } as Record<string, string>,
    notes: 'Notes',
    notesCorrection: 'What is wrong?',
    notesHint: 'Optional. The technical content may become a public issue on our GitHub.',
    name: 'Your name or handle',
    email: 'Email',
    privateHint: 'Optional. Only so we can reply. We never publish names or emails.',
    send: 'Send for review',
    sending: 'Sending…',
    sent: {
      novo: 'Every suggested port is reviewed by a person before it joins the catalog.',
      correcao: 'We will check and fix the page.',
      remocao:
        'A removal requested by the project’s maintainer is honoured — we will confirm through the repository itself.',
      link: 'We will check the link.',
    } as Record<Kind, string>,
    another: 'Send another',
    received: 'Received',
    notSent: 'Not sent',
    errors: {
      bot: 'Could not send.',
      fast: 'That was sent too fast. Check the fields and send again.',
      kind: 'Choose what you would like to do.',
      missing: 'A required field for this kind of request is missing.',
      url: 'That link does not look like a valid address.',
      gamefile:
        'That link points at a game file or a file-hosting service. PCPort lists the project only — never the game.',
      email: 'That email does not look valid.',
      rate: 'Too many submissions in a row. Try again in an hour.',
      store: 'We could not save that right now. Please try again later.',
    } as Record<ErrorCode, string>,
  },
} as const

const SYSTEMS = [
  'NES', 'SNES', 'Nintendo 64', 'GameCube', 'Wii', 'Wii U', 'Nintendo Switch',
  'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'Nintendo DS', 'Nintendo 3DS',
  'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PSP', 'PS Vita',
  'Xbox', 'Xbox 360', 'Xbox One',
  'Mega Drive', 'Sega 32X', 'Saturn', 'Dreamcast', 'Arcade',
]

const label = 'block text-[11px] tracking-[0.14em] uppercase text-faint'
const field =
  'mt-2 block w-full rounded-[2px] border border-hairline-strong bg-raise px-3 py-2.5 text-[15px] text-ink placeholder:text-faint focus:border-native/60'
const hint = 'mt-1.5 text-[12px] leading-relaxed text-faint'

export function ContributeForm({
  lang,
  consoles,
  port,
  initialKind,
  initialError,
  sentKind,
  rendered,
  initialGame = '',
}: {
  lang: Lang
  consoles: string[]
  port: Port
  initialKind: Kind
  initialError: ErrorCode | null
  sentKind: Kind | null
  rendered: number
  /** Carried over from a search that found nothing, so the visitor does not retype it. */
  initialGame?: string
}) {
  const t = COPY[lang]
  const [kind, setKind] = useState<Kind>(initialKind)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    sentKind ? 'sent' : initialError ? 'error' : 'idle',
  )
  const [error, setError] = useState<ErrorCode | null>(initialError)
  const [sent, setSent] = useState<Kind | null>(sentKind)
  // See the note at the top: `required` only once the page is interactive.
  const [live, setLive] = useState(false)
  useEffect(() => setLive(true), [])
  const errorRef = useRef<HTMLDivElement>(null)

  const systems = [...new Set([...consoles, ...SYSTEMS])]

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contribute', {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: new FormData(e.currentTarget),
      })
      const out = (await res.json()) as { ok: true; kind: Kind } | { ok: false; error: ErrorCode }
      if (out.ok) {
        setSent(out.kind)
        setState('sent')
      } else {
        setError(out.error)
        setState('error')
        requestAnimationFrame(() => errorRef.current?.focus())
      }
    } catch {
      setError('store')
      setState('error')
    }
  }

  if (state === 'sent' && sent) {
    return (
      <div role="status" className="settle">
        <Chip tone="native" size="lg">
          {t.received}
        </Chip>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-ink">{t.sent[sent]}</p>
        <a
          href={lang === 'pt' ? '/pt/contribuir' : '/en/contribute'}
          className="mt-5 inline-block text-[13px] text-muted underline decoration-hairline-strong underline-offset-4 hover:text-ink"
        >
          {t.another}
        </a>
      </div>
    )
  }

  const needsUrl = !port && (kind === 'remocao' || kind === 'link')

  return (
    <form method="post" action="/api/contribute" onSubmit={onSubmit} className="cf" noValidate={!live}>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="t" value={rendered} />
      {port ? <input type="hidden" name="port" value={port.repo} /> : null}

      {/* Off-screen and out of the tab order: only something that does not
          read the page fills it. aria-hidden keeps it from screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {state === 'error' && error ? (
        <div ref={errorRef} tabIndex={-1} role="alert" className="mb-10 outline-none">
          <Chip tone="recompiled">{t.notSent}</Chip>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink">{t.errors[error]}</p>
        </div>
      ) : null}

      <fieldset>
        <legend className={label}>{t.whatToDo}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(Object.keys(t.kinds) as Kind[]).map((k) => (
            <label
              key={k}
              className="flex cursor-pointer gap-3 rounded-[2px] border border-hairline p-4 transition-colors hover:border-hairline-strong has-[:checked]:border-native/60 has-[:checked]:bg-native/5"
            >
              <input
                type="radio"
                name="kind"
                value={k}
                checked={kind === k}
                onChange={() => setKind(k)}
                className="mt-1 accent-[var(--color-native)]"
              />
              <span>
                <span className="block text-[15px] font-medium text-ink">{t.kinds[k][0]}</span>
                <span className="mt-1 block text-[13px] leading-snug text-muted">{t.kinds[k][1]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {port ? (
        <p className="mt-8 border-t border-hairline pt-4 text-[14px] text-muted">
          <span className="text-[11px] tracking-[0.14em] uppercase text-faint">{t.about}</span>{' '}
          <span className="text-ink">{port.title}</span>{' '}
          <span className="tabular text-faint">({port.repo})</span>
        </p>
      ) : null}

      <div data-for="novo" className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-game" className={label}>{t.game}</label>
          <input
            id="cf-game"
            name="game"
            maxLength={120}
            defaultValue={initialGame}
            required={live && kind === 'novo'}
            className={field}
          />
          <p className={hint}>{t.gameHint}</p>
        </div>
        <div>
          <label htmlFor="cf-console" className={label}>{t.console}</label>
          <select id="cf-console" name="console" defaultValue="" className={field}>
            <option value="">{t.chooseConsole}</option>
            {systems.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="other">{t.other}</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-project" className={label}>{t.project}</label>
          <input id="cf-project" name="project" maxLength={120} required={live && kind === 'novo'} className={field} />
        </div>
      </div>

      <div data-for="novo correcao remocao link" className="mt-6">
        <label htmlFor="cf-url" className={label}>{kind === 'novo' ? t.url : t.urlOptional}</label>
        <input
          id="cf-url"
          name="url"
          type="url"
          inputMode="url"
          maxLength={300}
          placeholder="https://github.com/…"
          required={live && (kind === 'novo' || needsUrl)}
          className={field}
        />
        <p className={hint}>{t.urlHint}</p>
      </div>

      <div data-for="novo" className="mt-8 grid gap-8">
        <fieldset>
          <legend className={label}>{t.platforms}</legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {['Windows', 'macOS', 'Linux', 'Steam Deck'].map((p) => (
              <label key={p} className="flex items-center gap-2 text-[14px] text-muted">
                <input type="checkbox" name="platforms" value={p} className="accent-[var(--color-native)]" />
                {p}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>{t.method}</legend>
          <div className="mt-3 grid gap-2">
            {Object.entries(t.methods).map(([v, [name, desc]]) => (
              <label key={v} className="flex gap-3 text-[14px]">
                <input type="radio" name="method" value={v} className="mt-1 accent-[var(--color-native)]" />
                <span>
                  <span className="text-ink">{name}</span>
                  {desc ? <span className="text-muted"> — {desc}</span> : null}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={label}>{t.status}</legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {Object.entries(t.statuses).map(([v, name]) => (
              <label key={v} className="flex items-center gap-2 text-[14px] text-muted">
                <input type="radio" name="status" value={v} className="accent-[var(--color-native)]" />
                {name}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-[14px] text-muted">
          <input type="checkbox" name="ai" className="mt-1 accent-[var(--color-native)]" />
          {t.ai}
        </label>
      </div>

      <fieldset data-for="remocao" className="mt-8">
        <legend className={label}>{t.reason}</legend>
        <div className="mt-3 grid gap-2">
          {Object.entries(t.removalReasons).map(([v, name]) => (
            <label key={v} className="flex items-center gap-2 text-[14px] text-muted">
              <input type="radio" name="removal_reason" value={v} defaultChecked={v === 'maintainer'} className="accent-[var(--color-native)]" />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset data-for="link" className="mt-8">
        <legend className={label}>{t.reason}</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {Object.entries(t.linkReasons).map(([v, name]) => (
            <label key={v} className="flex items-center gap-2 text-[14px] text-muted">
              <input type="radio" name="link_reason" value={v} defaultChecked={v === 'broken'} className="accent-[var(--color-native)]" />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="cf-notes" className={label}>
          {kind === 'correcao' ? t.notesCorrection : t.notes}
        </label>
        <textarea
          id="cf-notes"
          name="notes"
          rows={5}
          maxLength={2000}
          required={live && kind === 'correcao'}
          className={`${field} resize-y`}
        />
        <p className={hint}>{t.notesHint}</p>
      </div>

      <div className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{t.name}</label>
          <input id="cf-name" name="name" maxLength={80} autoComplete="nickname" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{t.email}</label>
          <input id="cf-email" name="email" type="email" maxLength={200} autoComplete="email" className={field} />
        </div>
        <p className={`${hint} sm:col-span-2 -mt-3`}>{t.privateHint}</p>
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-10 inline-flex h-11 items-center justify-center rounded-[2px] border border-native/40 bg-native/10 px-6 text-[14px] font-medium text-native transition-colors hover:bg-native/20 disabled:opacity-60"
      >
        {state === 'sending' ? t.sending : t.send}
      </button>
    </form>
  )
}
