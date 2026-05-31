import { Pencil, Code2, FileText, Clock, ListChecks } from 'lucide-react'
import type { AgentInfo } from '@ai-studio/shared-types'
import type { EmployeeProfile } from '@/lib/employee-profiles'

export function ProfileHeader({
  agent,
  profile,
  isOnline,
}: {
  agent: AgentInfo
  profile: EmployeeProfile
  isOnline: boolean
}) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex gap-8">
        <div className="shrink-0">
          <div className="rotate-[-3deg] rounded-lg border border-border bg-white p-2 shadow-md">
            <div className="flex size-28 items-center justify-center rounded-md bg-gradient-to-br from-slate-100 to-slate-200 text-5xl">
              {agent.avatar}
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
              {profile.code}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  {agent.role}
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`size-2 rounded-full ${isOnline ? 'bg-[hsl(var(--qw-green))]' : 'bg-gray-300'}`}
                  />
                  {isOnline ? '在线' : '离线'}
                </span>
                <span className="text-xs text-muted-foreground">
                  入职时间：{profile.joinDate}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-3" />
              编辑
            </button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>

        <div className="hidden shrink-0 flex-col gap-4 opacity-20 xl:flex">
          <FileText className="size-5" />
          <Clock className="size-5" />
          <ListChecks className="size-5" />
          <Code2 className="size-5" />
        </div>
      </div>
    </section>
  )
}
