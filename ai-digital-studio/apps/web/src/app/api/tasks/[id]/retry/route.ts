import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { tasks } from '@/lib/db/schema'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params

  const [task] = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1)
  if (!task) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const [updated] = await db
    .update(tasks)
    .set({
      status: 'pending',
      retryCount: (task.retryCount ?? 0) + 1,
      errorMessage: null,
    })
    .where(eq(tasks.id, id))
    .returning()

  return NextResponse.json(updated)
}
