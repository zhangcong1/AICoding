import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js'
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite'
import { migrate } from 'drizzle-orm/pglite/migrator'
import { PGlite } from '@electric-sql/pglite'
import postgres from 'postgres'
import path from 'node:path'
import { mkdirSync } from 'node:fs'
import * as schema from './schema'

export type StudioDb =
  | ReturnType<typeof drizzlePostgres<typeof schema>>
  | ReturnType<typeof drizzlePglite<typeof schema>>

declare global {
  // eslint-disable-next-line no-var
  var __studioDb: StudioDb | undefined
}

async function createDb(): Promise<StudioDb> {
  const url = process.env.DATABASE_URL ?? 'pglite://.data/ai_studio'

  if (url.startsWith('pglite://') || process.env.USE_PGLITE === 'true') {
    const raw = url.replace('pglite://', '') || '.data/ai_studio'
    const dataDir = path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw)
    mkdirSync(dataDir, { recursive: true })
    const client = new PGlite(dataDir)
    const instance = drizzlePglite(client, { schema })

    await migrate(instance, {
      migrationsFolder: path.join(process.cwd(), 'src/lib/db/migrations'),
    })

    return instance
  }

  const client = postgres(url, { max: 10 })
  return drizzlePostgres(client, { schema })
}

export async function ensureDb(): Promise<StudioDb> {
  if (!global.__studioDb) {
    global.__studioDb = await createDb()
  }
  return global.__studioDb
}

export async function getDb(): Promise<StudioDb> {
  return ensureDb()
}
