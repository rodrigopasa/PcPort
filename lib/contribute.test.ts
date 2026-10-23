import assert from 'node:assert/strict'
import test from 'node:test'
import { fence, issueFor, normaliseUrl, parseSubmission, MIN_FILL_MS } from './contribute'

const NOW = 1_800_000_000_000
const base = {
  t: String(NOW - 60_000),
  kind: 'novo',
  game: 'Bloodborne',
  console: 'PlayStation 4',
  project: 'bloodborne_pc',
  url: 'https://github.com/example/bloodborne_pc',
}
const parse = (over: Record<string, string | string[] | undefined>) =>
  parseSubmission({ ...base, ...over }, { now: NOW, id: 'abc', lang: 'pt' })

test('accepts a complete new-port submission', () => {
  const r = parse({})
  assert.equal(r.ok, true)
  if (r.ok) assert.equal(r.sub.url, 'https://github.com/example/bloodborne_pc')
})

test('a filled honeypot is a bot', () => {
  assert.deepEqual(parse({ website: 'http://spam.example' }), { ok: false, error: 'bot' })
})

test('a form sent faster than a person can type is a bot', () => {
  assert.deepEqual(parse({ t: String(NOW - (MIN_FILL_MS - 1)) }), { ok: false, error: 'fast' })
  assert.deepEqual(parse({ t: 'not-a-number' }), { ok: false, error: 'fast' })
})

test('refuses a link to game data, which is the product\'s hard line', () => {
  for (const url of [
    'https://example.com/roms/zelda.z64',
    'https://example.com/dump/game.iso',
    'https://example.com/Bloodborne.pkg',
    'https://mega.nz/file/abc',
    'https://drive.google.com/file/d/xyz',
  ]) {
    assert.deepEqual(parse({ url }), { ok: false, error: 'gamefile' }, url)
  }
})

test('refuses anything that is not an http link', () => {
  assert.equal(normaliseUrl('javascript:alert(1)'), null)
  assert.equal(normaliseUrl('data:text/html,hi'), null)
  assert.equal(normaliseUrl('localhost'), null)
  assert.deepEqual(parse({ url: 'javascript:alert(1)' }), { ok: false, error: 'url' })
  // A bare domain is completed rather than refused.
  assert.equal(normaliseUrl('github.com/x/y'), 'https://github.com/x/y')
})

test('each kind requires what it cannot be reviewed without', () => {
  assert.deepEqual(parse({ project: '' }), { ok: false, error: 'missing' })
  assert.deepEqual(parse({ kind: 'correcao', notes: '' }), { ok: false, error: 'missing' })
  assert.equal(parse({ kind: 'correcao', notes: 'A versão está errada' }).ok, true)
  // A removal names the entry or the project page; either is enough.
  assert.deepEqual(parse({ kind: 'remocao', url: '' }), { ok: false, error: 'missing' })
  assert.equal(parse({ kind: 'remocao', url: '', port: 'a/b' }).ok, true)
  assert.deepEqual(parse({ kind: 'nonsense' }), { ok: false, error: 'kind' })
})

test('a malformed email is refused rather than silently kept', () => {
  assert.deepEqual(parse({ email: 'not-an-email' }), { ok: false, error: 'email' })
  assert.equal(parse({ email: 'pessoa@example.com' }).ok, true)
})

test('unknown option values are dropped, not stored', () => {
  const r = parse({ method: 'hack', status: 'done', platforms: ['Windows', 'Amiga'] })
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.sub.method, null)
  assert.equal(r.sub.status, null)
  assert.deepEqual(r.sub.platforms, ['Windows'])
})

test('the public issue never carries the sender\'s name or email', () => {
  const r = parse({ name: 'Fulano de Tal', email: 'fulano@example.com', notes: 'oi' })
  assert.equal(r.ok, true)
  if (!r.ok) return
  const { title, body } = issueFor(r.sub)
  for (const s of [title, body]) {
    assert.doesNotMatch(s, /fulano@example\.com/)
    assert.doesNotMatch(s, /Fulano de Tal/)
  }
})

test('visitor text cannot mention anyone or escape its fence', () => {
  const r = parse({
    kind: 'correcao',
    notes: 'ping @torvalds\n```\n# injected heading\n```',
    game: '@someone',
  })
  assert.equal(r.ok, true)
  if (!r.ok) return
  const { title, body } = issueFor(r.sub)
  // The fence is longer than the longest backtick run inside, so it holds.
  assert.match(body, /````text\nping @torvalds/)
  assert.doesNotMatch(title, /@someone/)
  assert.match(title, /@​someone|Correção/)
})

test('fence grows past any backtick run in the text', () => {
  assert.match(fence('plain'), /^```text\nplain\n```$/)
  assert.match(fence('a ````` b'), /^``````text/)
})

test('a removal request carries the steps to actually remove it', () => {
  const r = parse({ kind: 'remocao', port: 'someone/project', url: '' })
  assert.equal(r.ok, true)
  if (!r.ok) return
  const { title, body, labels } = issueFor(r.sub)
  assert.match(title, /^\[Remoção\] someone\/project$/)
  assert.match(body, /DENIED/)
  assert.deepEqual(labels, ['contribuicao', 'remocao'])
})

test('each kind reads its own reason group, never the other one', () => {
  // Both groups are in the page at once; sharing a name, their defaults
  // fought and a removal arrived tagged with a link reason.
  const both = { removal_reason: 'abandoned', link_reason: 'unsafe', port: 'a/b', url: '' }
  const removal = parse({ kind: 'remocao', ...both })
  const link = parse({ kind: 'link', ...both })
  assert.equal(removal.ok && removal.sub.reason, 'abandoned')
  assert.equal(link.ok && link.sub.reason, 'unsafe')
  // A value from the other group is not a removal reason, so it is dropped.
  const crossed = parse({ kind: 'remocao', removal_reason: 'unsafe', port: 'a/b', url: '' })
  assert.equal(crossed.ok, true)
  assert.equal(crossed.ok && crossed.sub.reason, null)
})
