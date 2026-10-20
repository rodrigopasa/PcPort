import {
  pgTable, pgEnum, text, integer, bigint, timestamp, index, uniqueIndex, primaryKey,
} from 'drizzle-orm/pg-core'

/**
 * The status vocabulary is an enum rather than free text because it drives both
 * the catalog filter and the only colour on the page. A new value is a design
 * decision, not a data entry.
 */
export const mechanism = pgEnum('mechanism', [
  'native',
  'recompiled',
  'translation-layer',
  'in-progress',
])

export const lang = pgEnum('lang', ['pt', 'en'])

export const port = pgTable(
  'port',
  {
    id: text('id').primaryKey(),
    repo: text('repo').notNull(),
    console: text('console').notNull(),
    mechanism: mechanism('mechanism').notNull(),
    platforms: text('platforms').array().notNull().default([]),
    author: text('author'),
    version: text('version'),
    releasedAt: timestamp('released_at', { withTimezone: true }),
    sizeBytes: bigint('size_bytes', { mode: 'number' }),
    releaseUrl: text('release_url').notNull(),
    licenseUrl: text('license_url'),
    coverPath: text('cover_path'),
    // Measured performance, when the project or coverage reports it.
    fpsAvg: integer('fps_avg'),
    fpsNote: text('fps_note'),
    firstSeenAt: timestamp('first_seen_at', { withTimezone: true }).notNull().defaultNow(),
    lastCheckedAt: timestamp('last_checked_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('port_repo_idx').on(t.repo),
    index('port_released_idx').on(t.releasedAt),
    index('port_mechanism_idx').on(t.mechanism),
  ],
)

/**
 * Prose splits by language; facts do not. Slugs are per-language columns on
 * purpose — reusing one slug across both is what collapses hreflang.
 */
export const portText = pgTable(
  'port_text',
  {
    portId: text('port_id').notNull().references(() => port.id, { onDelete: 'cascade' }),
    lang: lang('lang').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    // Composed to ~155 chars at generation time, never generated long and cut.
    description: text('description').notNull(),
    body: text('body'),
    installSteps: text('install_steps').array().notNull().default([]),
  },
  (t) => [
    primaryKey({ columns: [t.portId, t.lang] }),
    uniqueIndex('port_text_slug_idx').on(t.lang, t.slug),
  ],
)

/** Release history, so "what changed" is answerable and regeneration can be skipped. */
export const portRelease = pgTable(
  'port_release',
  {
    portId: text('port_id').notNull().references(() => port.id, { onDelete: 'cascade' }),
    version: text('version').notNull(),
    releasedAt: timestamp('released_at', { withTimezone: true }),
    notesHash: text('notes_hash'),
  },
  (t) => [primaryKey({ columns: [t.portId, t.version] })],
)

export type Port = typeof port.$inferSelect
export type PortText = typeof portText.$inferSelect
export type Mechanism = Port['mechanism']
export type Lang = PortText['lang']
