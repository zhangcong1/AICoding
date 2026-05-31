'use client'

import { useState } from 'react'
import { ActivityHeatmap } from './activity-heatmap'

interface WorkRecordProps {
  daysJoined: number
  autoTasks: number
  chatTasks: number
  projects: number
}

export function WorkRecordSection({
  daysJoined,
  autoTasks,
  chatTasks,
  projects,
}: WorkRecordProps) {
  const [tab, setTab] = useState<'timeline' | 'chat' | 'auto'>('timeline')

  const tabs = [
    { key: 'timeline' as const, label: '时间线视图' },
    { key: 'chat' as const, label: '对话任务' },
    { key: 'auto' as const, label: '自动任务' },
  ]

  const stats = [
    { value: `${daysJoined}天`, label: '入职天数' },
    { value: String(autoTasks), label: '自动任务' },
    { value: String(chatTasks), label: '对话任务' },
    { value: String(projects), label: '已创建的项目' },
  ]

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold">工作记录</h2>

      <div className="mb-6 flex gap-6 border-b">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`border-b-2 pb-2 text-sm transition-colors ${
              tab === t.key
                ? 'border-foreground font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {tab === 'timeline' && <ActivityHeatmap activeDays={chatTasks > 0 ? 1 : 0} />}

      {tab === 'chat' && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {chatTasks > 0 ? `共 ${chatTasks} 个对话任务` : '暂无对话任务'}
        </p>
      )}

      {tab === 'auto' && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {autoTasks > 0 ? `共 ${autoTasks} 个自动任务` : '暂无自动任务'}
        </p>
      )}
    </section>
  )
}
