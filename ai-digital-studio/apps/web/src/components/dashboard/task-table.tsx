import { AGENTS } from '@ai-studio/shared-types'

const AVATAR_MAP: Record<string, string> = {
  pm: '/avatars/ace-pm.png',
  architect: '/avatars/zhou-architect.png',
  ui: '/avatars/mu-designer.png',
  fe: '/avatars/bu-frontend.png',
  be: '/avatars/kai-backend.png',
  qa: '/avatars/nuo-qa.png',
}

interface Task {
  name: string
  assigneeId: string
  status: 'progress' | 'completed' | 'pending'
  priority: 'high' | 'medium' | 'low'
}

const SAMPLE_TASKS: Task[] = [
  { name: '完成用户注册功能', assigneeId: 'pm', status: 'progress', priority: 'high' },
  { name: '设计登录页面 UI', assigneeId: 'ui', status: 'completed', priority: 'low' },
  { name: '编写 API 文档', assigneeId: 'fe', status: 'pending', priority: 'medium' },
  { name: '数据库表结构优化', assigneeId: 'be', status: 'progress', priority: 'high' },
  { name: '自动化测试脚本', assigneeId: 'qa', status: 'pending', priority: 'medium' },
  { name: '性能压力测试', assigneeId: 'architect', status: 'completed', priority: 'low' },
]

const statusConfig = {
  progress: { label: '进行中', className: 'bg-blue-50 text-blue-600' },
  completed: { label: '已完成', className: 'bg-emerald-50 text-emerald-600' },
  pending: { label: '待开始', className: 'bg-gray-100 text-gray-500' },
}

const priorityConfig = {
  high: { label: '高', color: 'bg-red-500' },
  medium: { label: '中', color: 'bg-orange-500' },
  low: { label: '低', color: 'bg-emerald-500' },
}

export function TaskTable() {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-card-foreground">我的任务</h2>
        <a
          href="#"
          className="text-[13px] font-medium text-[hsl(var(--primary))] hover:underline"
        >
          查看全部
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                任务名称
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                负责人
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                状态
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                优先级
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_TASKS.map((task, i) => {
              const agent = AGENTS.find((a) => a.id === task.assigneeId)
              const status = statusConfig[task.status]
              const priority = priorityConfig[task.priority]
              const avatarSrc = AVATAR_MAP[task.assigneeId]

              return (
                <tr
                  key={i}
                  className={`border-b border-border transition-colors hover:bg-muted/50 ${
                    i % 2 === 1 ? 'bg-muted/30' : ''
                  }`}
                >
                  <td className="py-3 font-medium text-foreground">{task.name}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-6 overflow-hidden rounded-full bg-muted">
                        {avatarSrc ? (
                          <img
                            src={avatarSrc}
                            alt={agent?.name ?? ''}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-xs">
                            {agent?.avatar}
                          </div>
                        )}
                      </div>
                      <span className="text-foreground">{agent?.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${priority.color}`} />
                      <span className="text-foreground">{priority.label}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
