import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { agentSkills } from '@/lib/db/schema'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDb()
  const { id } = await params
  const agent = AGENTS.find((a) => a.id === id)

  if (!agent) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const skills = await db
    .select()
    .from(agentSkills)
    .where(eq(agentSkills.agentId, agent.id))

  return NextResponse.json(skills)
}
