import { StudioCanvas } from '@/components/studio/studio-canvas'
import { getDb } from '@/lib/db'
import { agentStates } from '@/lib/db/schema'
import { ensureAgentStates } from '@/lib/agents/workflow'

export default async function StudioPage() {
  const db = await getDb()
  await ensureAgentStates()
  const states = await db.select().from(agentStates)
  const agentStatuses = Object.fromEntries(
    states.map((s) => [s.agentId, s.status]),
  )

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">工作室</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          2D / 3D 可视化展示六位数字员工的实时工位状态
        </p>
      </div>
      <StudioCanvas agentStatuses={agentStatuses} />
    </div>
  )
}
