import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import {
  requirements,
  tasks,
  agentStates,
} from '@/lib/db/schema'
import { runPMAgent } from '@/lib/agents/pm-agent'
import { emitEvent } from '@/lib/events/emitter'
import type { AgentId } from '@ai-studio/shared-types'

const ALL_AGENTS: AgentId[] = ['pm', 'architect', 'ui', 'fe', 'be', 'qa']

export async function ensureAgentStates() {
  const db = await getDb()
  for (const agentId of ALL_AGENTS) {
    await db
      .insert(agentStates)
      .values({ agentId, status: 'idle' })
      .onConflictDoNothing({ target: agentStates.agentId })
  }
}

export async function startRequirementWorkflow(requirementId: string) {
  const db = await getDb()
  const [requirement] = await db
    .select()
    .from(requirements)
    .where(eq(requirements.id, requirementId))
    .limit(1)

  if (!requirement) {
    throw new Error('Requirement not found')
  }

  await db
    .update(requirements)
    .set({ status: 'analyzing', updatedAt: new Date() })
    .where(eq(requirements.id, requirementId))

  const [task] = await db
    .insert(tasks)
    .values({
      requirementId,
      agentId: 'pm',
      phase: 'analyzing',
      status: 'running',
      input: {
        title: requirement.title,
        description: requirement.description,
      },
      startedAt: new Date(),
    })
    .returning()

  await db
    .update(agentStates)
    .set({
      status: 'working',
      currentTaskId: task.id,
      updatedAt: new Date(),
    })
    .where(eq(agentStates.agentId, 'pm'))

  try {
    const prd = await runPMAgent({
      requirementId,
      taskId: task.id,
      title: requirement.title,
      description: requirement.description,
    })

    const [updatedTask] = await db
      .update(tasks)
      .set({
        status: 'completed',
        output: { prd },
        completedAt: new Date(),
      })
      .where(eq(tasks.id, task.id))
      .returning()

    await db
      .update(requirements)
      .set({ status: 'in_progress', updatedAt: new Date() })
      .where(eq(requirements.id, requirementId))

    await db
      .update(agentStates)
      .set({
        status: 'idle',
        currentTaskId: null,
        updatedAt: new Date(),
      })
      .where(eq(agentStates.agentId, 'pm'))

    await emitEvent({
      type: 'task:progress',
      taskId: task.id,
      agentId: 'pm',
      payload: {
        phase: 'analyzing',
        progress: 100,
        message: 'PRD 生成完成',
      },
    })

    return { requirement, task: updatedTask, prd }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    await db
      .update(tasks)
      .set({
        status: 'failed',
        errorMessage: message,
        completedAt: new Date(),
      })
      .where(eq(tasks.id, task.id))

    await db
      .update(requirements)
      .set({ status: 'failed', updatedAt: new Date() })
      .where(eq(requirements.id, requirementId))

    await db
      .update(agentStates)
      .set({
        status: 'error',
        currentTaskId: null,
        updatedAt: new Date(),
      })
      .where(eq(agentStates.agentId, 'pm'))

    await emitEvent({
      type: 'agent:status_change',
      agentId: 'pm',
      taskId: task.id,
      payload: { status: 'error', message },
    })

    throw error
  }
}
