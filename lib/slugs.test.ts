import assert from 'node:assert/strict'
import test from 'node:test'
import { recordGone, recordMoves, type SlugHistory } from './slugs'

const row = (title: string) => ({ id: 'pascalpixel-alchemy', title, author: 'PascalPixel', game: null, stars: 1 })

test('a curated title keeps its old address as a redirect', () => {
  const h: SlugHistory = { pt: {}, en: {} }
  const n = recordMoves(h, [row('both Golden Sun games for Gameboy Advance')], [row('Golden Sun')])
  assert.equal(n, 2)
  assert.equal(h.pt['both-golden-sun-games-for-gameboy-advance-pc'], 'pascalpixel-alchemy')
  assert.equal(h.en['both-golden-sun-games-for-gameboy-advance-pc-port'], 'pascalpixel-alchemy')
})

test('an address that is live again leaves the history', () => {
  const h: SlugHistory = { pt: { 'golden-sun-pc': 'other' }, en: {} }
  recordMoves(h, [row('Golden Sun')], [row('Golden Sun')])
  assert.equal(h.pt['golden-sun-pc'], undefined)
})

test('a removed entry keeps its game and console for the redirect', () => {
  const book = { pt: {}, en: {} } as import('./slugs').GoneBook
  const sw = { id: 'bgyss-switchrecomp', title: 'SwitchRecomp', author: 'bgyss', game: null, console: 'Nintendo Switch', stars: 1 }
  const n = recordGone(book, [sw, row('Golden Sun')], [row('Golden Sun')])
  assert.equal(n, 2)
  assert.deepEqual(book.pt['switchrecomp-pc'], { game: null, console: 'Nintendo Switch' })
  // It came back: the live page wins and the record goes.
  recordGone(book, [row('Golden Sun')], [sw, row('Golden Sun')])
  assert.equal(book.pt['switchrecomp-pc'], undefined)
})

test('a removed entry takes its older, renamed addresses with it', () => {
  const book = { pt: {}, en: {} } as import('./slugs').GoneBook
  const history: SlugHistory = { pt: { 'fifa09-pc': 'chunchunq-fifa09' }, en: {} }
  const fifa = { id: 'chunchunq-fifa09', title: 'FIFA 09', author: 'ChunchunQ', game: null, console: 'Xbox 360', stars: 1 }
  recordGone(book, [fifa], [], history)
  assert.equal(history.pt['fifa09-pc'], undefined)
  assert.deepEqual(book.pt['fifa09-pc'], { game: null, console: 'Xbox 360' })
  assert.ok(book.pt['fifa-09-pc'])
})
