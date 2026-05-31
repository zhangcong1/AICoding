import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { agentStates } from '@/lib/db/schema'
import { getEmployeeProfile } from '@/lib/employee-profiles'
import { ensureAgentStates } from '@/lib/agents/workflow'

export default async function EmployeesPage() {
  const db = await getDb()
  await ensureAgentStates()
  const states = await db.select().from(agentStates)
  const stateMap = new Map(states.map((s) => [s.agentId, s.status]))

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">数字员工</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          选择一位 AI 数字员工，查看详细档案与工作记录
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {AGENTS.map((agent) => {
          const profile = getEmployeeProfile(agent.id)
          const status = stateMap.get(agent.id) ?? 'idle'
          const isOnline = ['working', 'thinking'].includes(status)

          return (
            <Link
              key={agent.id}
              href={`/employees/${agent.id}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-3xl">
                {agent.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{agent.name}</h2>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span
                      className={`size-1.5 rounded-full ${isOnline ? 'bg-[hsl(var(--qw-green))]' : 'bg-gray-300'}`}
                    />
                    {isOnline ? '在线' : '离线'}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{agent.role}</p>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {profile.bio}
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
