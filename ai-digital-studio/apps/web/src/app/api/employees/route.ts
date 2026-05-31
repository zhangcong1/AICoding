import { NextResponse } from 'next/server'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { agentStates } from '@/lib/db/schema'
import { ensureAgentStates } from '@/lib/agents/workflow'

export async function GET() {
  const db = await getDb()
  await ensureAgentStates()
  const states = await db.select().from(agentStates)

  const employees = AGENTS.map((agent) => {
    const state = states.find((s) => s.agentId === agent.id)
    return {
      ...agent,
      status: state?.status ?? 'idle',
      currentTaskId: state?.currentTaskId ?? null,
    }
  })

  return NextResponse.json(employees)
}
