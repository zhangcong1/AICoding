import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { tasks } from '@/lib/db/schema'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1)

  if (!task) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(task)
}

async function updateTaskStatus(
  id: string,
  status: 'paused' | 'running' | 'pending',
) {
  const db = await getDb()
  const [updated] = await db
    .update(tasks)
    .set({ status })
    .where(eq(tasks.id, id))
    .returning()

  return updated
}

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
  action?: 'pause' | 'resume' | 'retry',
) {
  const { id } = await ctx.params

  if (action === 'pause') {
    const updated = await updateTaskStatus(id, 'paused')
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  }

  if (action === 'resume') {
    const updated = await updateTaskStatus(id, 'running')
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
