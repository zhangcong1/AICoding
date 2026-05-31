import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/lib/db'
import { requirements } from '@/lib/db/schema'

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

export async function GET() {
  const db = await getDb()
  const data = await db
    .select()
    .from(requirements)
    .orderBy(desc(requirements.createdAt))

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const db = await getDb()
  const body = await req.json()
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const [requirement] = await db
    .insert(requirements)
    .values(parsed.data)
    .returning()

  return NextResponse.json(requirement, { status: 201 })
}
