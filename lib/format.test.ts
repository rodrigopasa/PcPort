import assert from 'node:assert/strict'
import test from 'node:test'
import { consoleSlug, slugify } from './format'

test('slugify drops apostrophes instead of splitting on them', () => {
  // The whole point: the slug has to contain the token people type. An
  // apostrophe left to the general rule became a separator, so the catalog
  // shipped `tony-hawk-s-project-8` and `conker-s-bad-fur-day`.
  assert.equal(slugify("Tony Hawk's Project 8"), 'tony-hawks-project-8')
  assert.equal(slugify("Conker's Bad Fur Day"), 'conkers-bad-fur-day')
  assert.equal(slugify("Eternal Darkness: Sanity's Requiem"), 'eternal-darkness-sanitys-requiem')
  assert.equal(slugify("Asura's Wrath"), 'asuras-wrath')
})

test('slugify handles the typographic apostrophe too', () => {
  // Titles copied out of a store page or a wiki carry U+2019, not U+0027.
  assert.equal(slugify('Conker’s Bad Fur Day'), 'conkers-bad-fur-day')
  assert.equal(slugify('Pokémon: Let’s Go, Eevee!'), 'pokemon-lets-go-eevee')
})

test('slugify strips accents rather than dropping the letter', () => {
  assert.equal(slugify('Pokémon Emerald'), 'pokemon-emerald')
  assert.equal(slugify('Tōhō'), 'toho')
})

test('slugify leaves no leading or trailing separator', () => {
  assert.equal(slugify('  Halo 2  '), 'halo-2')
  assert.equal(slugify('¡Driver 2!'), 'driver-2')
})

test('slugify keeps digits and version numbers readable', () => {
  assert.equal(slugify('Virtua Fighter 2'), 'virtua-fighter-2')
  assert.equal(slugify('Command & Conquer: Red Alert 2'), 'command-conquer-red-alert-2')
})

test('consoleSlug is stable for the names the catalog uses', () => {
  assert.equal(consoleSlug('Xbox 360'), 'xbox-360')
  assert.equal(consoleSlug('Nintendo 64'), 'nintendo-64')
  assert.equal(consoleSlug('PlayStation 2'), 'playstation-2')
  assert.equal(consoleSlug('Game Boy Advance'), 'game-boy-advance')
})
