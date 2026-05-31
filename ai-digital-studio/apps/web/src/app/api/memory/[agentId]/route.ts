import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { agentMemories } from '@/lib/db/schema'
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const db = await getDb()
  const { agentId } = await params
  const agent = AGENTS.find((a) => a.id === agentId)

  if (!agent) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const memories = await db
    .select()
    .from(agentMemories)
    .where(eq(agentMemories.agentId, agent.id))
    .orderBy(desc(agentMemories.createdAt))

  return NextResponse.json(memories)
}
