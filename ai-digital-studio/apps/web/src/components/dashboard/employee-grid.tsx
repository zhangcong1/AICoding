import Link from 'next/link'
import { AGENTS } from '@ai-studio/shared-types'
import type { AgentStatus } from '@ai-studio/shared-types'

const STATUS_MAP: Record<AgentStatus, { dot: string; label: string; text: string }> = {
  idle:      { dot: 'bg-gray-400', label: 'bg-gray-100 text-gray-500', text: '待开始' },
  working:   { dot: 'bg-blue-500 animate-pulse', label: 'bg-blue-50 text-blue-600', text: '进行中' },
  thinking:  { dot: 'bg-amber-500 animate-pulse', label: 'bg-amber-50 text-amber-600', text: '思考中' },
  completed: { dot: 'bg-emerald-500', label: 'bg-emerald-50 text-emerald-600', text: '已完成' },
  error:     { dot: 'bg-red-500', label: 'bg-red-50 text-red-600', text: '异常' },
}

const AVATAR_MAP: Record<string, string> = {
  pm: '/avatars/ace-pm.png',
  architect: '/avatars/zhou-architect.png',
  ui: '/avatars/mu-designer.png',
  fe: '/avatars/bu-frontend.png',
  be: '/avatars/kai-backend.png',
  qa: '/avatars/nuo-qa.png',
}

interface EmployeeGridProps {
  agentStatuses: Record<string, AgentStatus>
}

export function EmployeeGrid({ agentStatuses }: EmployeeGridProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-card-foreground">数字员工</h2>
        <Link
          href="/employees"
          className="text-[13px] font-medium text-[hsl(var(--primary))] hover:underline"
        >
          查看全部
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent) => {
          const status = agentStatuses[agent.id] ?? 'idle'
          const statusInfo = STATUS_MAP[status]
          const avatarSrc = AVATAR_MAP[agent.id]

          return (
            <Link
              key={agent.id}
              href={`/employees/${agent.id}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-foreground/20 hover:shadow-md"
            >
              {/* Avatar */}
              <div className="size-12 shrink-0 overflow-hidden rounded-full bg-muted">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={agent.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-xl">
                    {agent.avatar}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {agent.name}
                  </span>
                  <span className={`size-2 rounded-full ${statusInfo.dot}`} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{agent.role}</p>
              </div>

              {/* Status badge */}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusInfo.label}`}
              >
                {statusInfo.text}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
