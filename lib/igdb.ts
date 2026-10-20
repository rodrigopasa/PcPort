/**
 * IGDB — Twitch's licensed game database. Free with a dev key, and the standard
 * source for cover art and release dates in this category.
 *
 * Set IGDB_CLIENT_ID and IGDB_CLIENT_SECRET; without them every call returns
 * null and the site falls back to its generated share image.
 * Docs: https://api-docs.igdb.com/#getting-started
 */

const TOKEN_URL = 'https://id.twitch.tv/oauth2/token'
const API = 'https://api.igdb.com/v4'

/** t_cover_big_2x is 528×704 — enough for a detail page without upscaling. */
export const coverUrl = (imageId: string, size = 't_cover_big_2x') =>
  `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`

export type IgdbGame = {
  id: number
  name: string
  first_release_date?: number
  summary?: string
  cover?: { image_id: string }
  genres?: { name: string }[]
  involved_companies?: { developer: boolean; publisher: boolean; company: { name: string } }[]
}

let cached: { token: string; expires: number } | null = null

async function token(): Promise<string | null> {
  const id = process.env.IGDB_CLIENT_ID
  const secret = process.env.IGDB_CLIENT_SECRET
  if (!id || !secret) return null

  if (cached && cached.expires > Date.now() + 60_000) return cached.token

  const res = await fetch(
    `${TOKEN_URL}?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
    { method: 'POST' },
  )
  if (!res.ok) throw new Error(`IGDB auth failed: ${res.status}`)

  const json = (await res.json()) as { access_token: string; expires_in: number }
  cached = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 }
  return cached.token
}

export async function searchGame(name: string): Promise<IgdbGame | null> {
  const access = await token()
  if (!access) return null

  const body = `search "${name.replace(/"/g, '')}";
fields name,first_release_date,summary,cover.image_id,genres.name,involved_companies.developer,involved_companies.publisher,involved_companies.company.name;
limit 1;`

  const res = await fetch(`${API}/games`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${access}`,
      'Content-Type': 'text/plain',
    },
    body,
  })
  if (!res.ok) throw new Error(`IGDB search failed: ${res.status}`)

  const rows = (await res.json()) as IgdbGame[]
  return rows[0] ?? null
}

export type Enriched = {
  igdbId: number
  coverUrl: string | null
  releasedAt: string | null
  summary: string | null
  genres: string[]
  developer: string | null
  publisher: string | null
}

export function normalize(game: IgdbGame): Enriched {
  const companies = game.involved_companies ?? []
  return {
    igdbId: game.id,
    coverUrl: game.cover ? coverUrl(game.cover.image_id) : null,
    releasedAt: game.first_release_date
      ? new Date(game.first_release_date * 1000).toISOString().slice(0, 10)
      : null,
    summary: game.summary ?? null,
    genres: (game.genres ?? []).map((g) => g.name),
    developer: companies.find((c) => c.developer)?.company.name ?? null,
    publisher: companies.find((c) => c.publisher)?.company.name ?? null,
  }
}
