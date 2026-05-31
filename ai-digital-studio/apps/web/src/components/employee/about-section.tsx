import type { EmployeeProfile } from '@/lib/employee-profiles'

export function AboutSection({ profile }: { profile: EmployeeProfile }) {
  return (
    <section id="about" className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-base font-semibold">关于我</h2>

      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">我最擅长</h3>
          <div className="flex flex-col gap-4">
            {profile.strengths.map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">工作风格</h3>
          <ul className="flex flex-col gap-2">
            {profile.workStyle.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">工作模式</h3>
          <div className="flex flex-col gap-4">
            {profile.workModes.map((mode) => (
              <div key={mode.title}>
                <p className="mb-2 text-sm font-medium">{mode.title}</p>
                <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                  {mode.steps.map((step, i) => (
                    <span key={step} className="flex items-center gap-1">
                      {i > 0 && <span className="text-border">→</span>}
                      <span className="rounded border border-border px-2 py-1">{step}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
