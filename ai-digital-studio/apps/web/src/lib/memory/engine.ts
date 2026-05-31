import { getDb } from '@/lib/db'
import { agentMemories } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import type { AgentId } from '@ai-studio/shared-types'
import { gitlabMemorySync } from '@/lib/gitlab/memory-sync'

export const memoryEngine = {
  async retrieve(agentId: AgentId, _query: string) {
    const db = await getDb()
    const recent = await db
      .select()
      .from(agentMemories)
      .where(eq(agentMemories.agentId, agentId))
      .orderBy(desc(agentMemories.createdAt))
      .limit(10)

    return recent.map((item) => ({
      summary: item.summary ?? item.content,
      source: 'recent' as const,
    }))
  },

  async write(
    agentId: AgentId,
    data: {
      taskId: string
      content: string
      summary: string
      tags?: string[]
    },
  ) {
    const db = await getDb()
    const [memory] = await db
      .insert(agentMemories)
      .values({
        agentId,
        taskId: data.taskId,
        content: data.content,
        summary: data.summary,
        tags: data.tags,
      })
      .returning()

    gitlabMemorySync.scheduleSync(agentId).catch(console.error)
    return memory
  },
}
