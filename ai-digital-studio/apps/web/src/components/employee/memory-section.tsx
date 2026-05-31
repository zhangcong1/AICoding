import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'
import type { EmployeeProfile } from '@/lib/employee-profiles'

interface MemoryEntry {
  id: string
  summary: string | null
  content: string
  createdAt: Date
}

export function MemorySection({
  profile,
  memories,
  agentId,
}: {
  profile: EmployeeProfile
  memories: MemoryEntry[]
  agentId: string
}) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">记忆与积累</h2>
            <Link
              href={`/employees/${agentId}#memory`}
              className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"
            >
              查看完整记忆
              <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {memories.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                暂无记忆记录
              </div>
            ) : (
              memories.slice(0, 3).map((m) => (
                <div key={m.id} className="flex gap-3">
                  <div className="mt-1.5 size-2 shrink-0 rounded-full bg-[hsl(var(--qw-green))]" />
                  <div>
                    <p className="text-sm font-medium">记忆新增</p>
                    <p className="text-xs text-muted-foreground">刚刚</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {m.summary ?? m.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold">最近学会</h2>
          <div className="flex flex-col gap-3">
            {profile.learnedSkills.map((skill) => (
              <div
                key={skill.slug}
                className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
              >
                <Star className="mt-0.5 size-4 shrink-0 text-[hsl(var(--qw-green))]" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">学到新技能</p>
                  <p className="text-xs text-muted-foreground">{skill.slug}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {skill.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
