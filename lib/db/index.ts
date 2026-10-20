import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const url = process.env.DATABASE_URL

/**
 * Null until Postgres is wired up. The data layer falls back to the seed file,
 * so the surface can be built and reviewed before the database exists.
 */
export const db = url
  ? drizzle(postgres(url, { max: 10 }), { schema })
  : null

export { schema }
