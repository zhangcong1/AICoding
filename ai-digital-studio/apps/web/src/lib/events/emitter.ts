import { getDb } from '@/lib/db'
import { events } from '@/lib/db/schema'
import { publishEvent } from '@/lib/redis/client'
import type { AgentId } from '@ai-studio/shared-types'

interface EmitEventInput {
  type: string
  agentId?: AgentId
  taskId?: string
  payload?: Record<string, unknown>
}

export async function emitEvent(input: EmitEventInput) {
  const db = await getDb()
  const event = {
    type: input.type,
    agentId: input.agentId,
    taskId: input.taskId,
    payload: input.payload,
    timestamp: new Date().toISOString(),
  }

  await db.insert(events).values({
    type: input.type,
    agentId: input.agentId,
    taskId: input.taskId,
    payload: input.payload,
  })

  await publishEvent('studio:global', event)

  if (input.taskId) {
    await publishEvent(`task:${input.taskId}`, event)
  }

  return event
}
