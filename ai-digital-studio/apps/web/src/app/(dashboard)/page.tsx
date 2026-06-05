import { KpiCards } from '@/components/dashboard/kpi-cards'
import { EmployeeGrid } from '@/components/dashboard/employee-grid'
import { WorkflowDiagram } from '@/components/dashboard/workflow-diagram'
import { TaskTable } from '@/components/dashboard/task-table'
import { getDb } from '@/lib/db'
import { agentStates } from '@/lib/db/schema'
import { ensureAgentStates } from '@/lib/agents/workflow'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const db = await getDb()
  await ensureAgentStates()
  const states = await db.select().from(agentStates)
  const agentStatuses = Object.fromEntries(
    states.map((s) => [s.agentId, s.status]),
  )

  return (
    <div className="px-8 py-6 max-w-[calc(100vw-240px)]">
      {/* Page Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            工作台
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            欢迎回来，今天有 3 项新任务等待处理
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90">
          <Plus className="size-4" />
          新建项目
        </button>
      </header>

      {/* KPI Cards */}
      <KpiCards />

      {/* Two-column: Employees + Workflow */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        <EmployeeGrid agentStatuses={agentStatuses} />
        <WorkflowDiagram />
      </div>

      {/* Task Table */}
      <TaskTable />
    </div>
  )
}
