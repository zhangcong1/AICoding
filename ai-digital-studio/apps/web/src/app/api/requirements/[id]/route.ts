import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/lib/db'
import { requirements } from '@/lib/db/schema'

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(10).optional(),
  status: z
    .enum(['pending', 'analyzing', 'in_progress', 'completed', 'failed'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params
  const [requirement] = await db
    .select()
    .from(requirements)
    .where(eq(requirements.id, id))
    .limit(1)

  if (!requirement) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(requirement)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const [updated] = await db
    .update(requirements)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(requirements.id, id))
    .returning()

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params
  const [deleted] = await db
    .delete(requirements)
    .where(eq(requirements.id, id))
    .returning()

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
