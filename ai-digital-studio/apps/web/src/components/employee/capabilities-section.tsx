import { Plus, Upload, Braces } from 'lucide-react'
import type { EmployeeProfile } from '@/lib/employee-profiles'

export function CapabilitiesSection({ profile }: { profile: EmployeeProfile }) {
  const total = profile.capabilityTags.length

  return (
    <section id="skills" className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-base font-semibold">能力与工具</h2>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">我的能力</h3>
            <span className="text-xs text-muted-foreground">
              {total}/{total}
            </span>
          </div>
          <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
            管理
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {profile.capabilityTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[hsl(var(--qw-green))]/30 bg-[hsl(var(--qw-green))]/5 px-3 py-1 text-xs text-[hsl(var(--qw-green))]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted/50"
          >
            <Plus className="size-3.5" />
            从市场添加
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted/50"
          >
            <Upload className="size-3.5" />
            上传 Skills
          </button>
        </div>
      </div>

      <div id="connectors">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">
            连接器 <span className="text-muted-foreground">(0)</span>
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs hover:bg-muted/50"
            >
              <Plus className="size-3" />
              Add
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs hover:bg-muted/50"
            >
              <Braces className="size-3" />
              Import JSON
            </button>
          </div>
        </div>
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          暂无连接器
        </div>
      </div>
    </section>
  )
}
