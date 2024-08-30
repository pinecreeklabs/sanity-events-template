import * as schema from '@/lib/db/schema'
import {Pool, neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import {drizzle as pooledDrizzle} from 'drizzle-orm/neon-serverless'

const pooledDatabaseUrl = process.env.POOLED_DATABASE_URL ?? ''
const databaseUrl = process.env.DATABASE_URL ?? ''

const sql = new Pool({connectionString: pooledDatabaseUrl})
const pooledDb = pooledDrizzle(sql, {schema})

const db = drizzle(neon(databaseUrl), {schema})

export {db, pooledDb}
