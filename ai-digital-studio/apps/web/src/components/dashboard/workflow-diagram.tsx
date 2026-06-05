import { AGENTS } from '@ai-studio/shared-types'

const AVATAR_MAP: Record<string, string> = {
  pm: '/avatars/ace-pm.png',
  architect: '/avatars/zhou-architect.png',
  ui: '/avatars/mu-designer.png',
  fe: '/avatars/bu-frontend.png',
  be: '/avatars/kai-backend.png',
  qa: '/avatars/nuo-qa.png',
}

const STAGES = [
  { name: '需求分析', assigneeId: 'pm' as const, state: 'completed' },
  { name: '设计阶段', assigneeId: 'ui' as const, state: 'completed' },
  { name: '开发阶段', assigneeId: 'fe' as const, state: 'active' },
  { name: '测试阶段', assigneeId: 'qa' as const, state: 'pending' },
  { name: '上线部署', assigneeId: 'be' as const, state: 'pending' },
]

const stateStyles = {
  completed: {
    circle: 'border-emerald-500 bg-emerald-50',
    label: 'text-emerald-600',
    arrow: 'bg-emerald-500',
    arrowHead: 'text-emerald-500',
  },
  active: {
    circle: 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10',
    label: 'text-blue-600 font-semibold',
    arrow: 'bg-blue-500',
    arrowHead: 'text-blue-500',
  },
  pending: {
    circle: 'border-border bg-muted opacity-60',
    label: 'text-muted-foreground',
    arrow: 'bg-border',
    arrowHead: 'text-muted-foreground/40',
  },
}

export function WorkflowDiagram() {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-card-foreground">项目流程图</h2>
        <span className="text-[13px] font-medium text-muted-foreground">当前项目</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-0 min-w-max">
          {STAGES.map((stage, i) => {
            const agent = AGENTS.find((a) => a.id === stage.assigneeId)!
            const style = stateStyles[stage.state as keyof typeof stateStyles]
            const avatarSrc = AVATAR_MAP[stage.assigneeId]

            return (
              <div key={stage.name} className="flex items-center">
                {/* Node */}
                <div className="flex flex-col items-center gap-2 min-w-[110px]">
                  <div
                    className={`flex size-[52px] items-center justify-center rounded-full border-2 overflow-hidden ${style.circle}`}
                  >
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt={agent.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">{agent.avatar}</span>
                    )}
                  </div>
                  <span className={`text-xs text-center whitespace-nowrap ${style.label}`}>
                    {stage.name}
                  </span>
                </div>

                {/* Arrow */}
                {i < STAGES.length - 1 && (
                  <div className="relative mx-2 mb-5 h-0.5 w-12">
                    <div className={`absolute inset-y-0 left-0 right-2 h-full rounded ${style.arrow}`} />
                    <svg
                      className={`absolute right-0 top-1/2 -translate-y-1/2 ${stateStyles[stage.state as keyof typeof stateStyles].arrowHead}`}
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="currentColor"
                    >
                      <path d="M0 0L8 6L0 12z" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
