import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { AGENTS } from '@ai-studio/shared-types'
import { gitlabClient } from '@/lib/gitlab/client'
import { getDb } from '@/lib/db'
import { agentStates } from '@/lib/db/schema'
import { ensureAgentStates } from '@/lib/agents/workflow'

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

  await ensureAgentStates()
  const dir = gitlabClient.getAgentDir(agent.id)

  const [identity, persona, bible, state] = await Promise.all([
    gitlabClient.getFile(`employees/${dir}/identity.md`),
    gitlabClient.getFile(`employees/${dir}/persona.md`),
    gitlabClient.getFile(`employees/${dir}/bible.md`),
    db.select().from(agentStates).where(eq(agentStates.agentId, agent.id)).limit(1),
  ])

  return NextResponse.json({
    ...agent,
    status: state[0]?.status ?? 'idle',
    currentTaskId: state[0]?.currentTaskId ?? null,
    profile: { identity, persona, bible },
  })
}
