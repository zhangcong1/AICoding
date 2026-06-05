import { CheckCircle, Percent, List, Clock, TrendingUp, TrendingDown } from 'lucide-react'

const KPI_DATA = [
  {
    label: '完成任务',
    value: '28',
    trend: '+12%',
    trendDir: 'up' as const,
    iconColor: 'blue',
    Icon: CheckCircle,
  },
  {
    label: '完成率',
    value: '92%',
    trend: '+5.2%',
    trendDir: 'up' as const,
    iconColor: 'green',
    Icon: Percent,
  },
  {
    label: '总任务数',
    value: '138',
    trend: '+8',
    trendDir: 'up' as const,
    iconColor: 'gray',
    Icon: List,
  },
  {
    label: '进行中',
    value: '56',
    trend: '-3',
    trendDir: 'down' as const,
    iconColor: 'purple',
    Icon: Clock,
  },
]

const iconColorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  gray: 'bg-gray-100 text-gray-500',
  purple: 'bg-purple-50 text-purple-600',
}

export function KpiCards() {
  return (
    <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {KPI_DATA.map((kpi) => {
        const { label, value, trend, trendDir, iconColor, Icon } = kpi
        const TrendIcon = trendDir === 'up' ? TrendingUp : TrendingDown

        return (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-medium text-muted-foreground">
                {label}
              </span>
              <div
                className={`flex size-9 items-center justify-center rounded-lg ${iconColorMap[iconColor]}`}
              >
                <Icon className="size-[18px]" />
              </div>
            </div>

            <div className="text-[28px] font-semibold leading-none tracking-tight text-card-foreground">
              {value}
            </div>

            <div
              className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
                trendDir === 'up'
                  ? 'text-emerald-600'
                  : 'text-red-500'
              }`}
            >
              <TrendIcon className="size-3" />
              {trend}
            </div>
          </div>
        )
      })}
    </section>
  )
}
