import type { AgentId } from '@ai-studio/shared-types'

const syncQueue = new Set<AgentId>()

export const gitlabMemorySync = {
  scheduleSync(agentId: AgentId) {
    syncQueue.add(agentId)
    return Promise.resolve()
  },

  getPending() {
    return Array.from(syncQueue)
  },
}
