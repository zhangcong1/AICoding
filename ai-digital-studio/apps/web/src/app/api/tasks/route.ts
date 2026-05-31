import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { tasks } from '@/lib/db/schema'

export async function GET() {
  const db = await getDb()
  const data = await db.select().from(tasks).orderBy(desc(tasks.createdAt))
  return NextResponse.json(data)
}
