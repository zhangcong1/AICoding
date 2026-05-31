'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export function ActivityHeatmap({ activeDays = 1 }: { activeDays?: number }) {
  const months = ['5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月']
  const cells = useMemo(() => {
    const total = 53 * 7
    return Array.from({ length: total }, (_, i) => {
      const isActive = i >= total - activeDays * 7 && i < total
      return isActive ? 2 : 0
    })
  }, [activeDays])

  const levels = ['bg-gray-100', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700']

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex gap-4 text-[10px] text-muted-foreground">
        {months.map((m) => (
          <span key={m} className="min-w-[28px]">
            {m}
          </span>
        ))}
      </div>
      <div className="flex gap-[3px]">
        {Array.from({ length: 53 }).map((_, week) => (
          <div key={week} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, day) => {
              const level = cells[week * 7 + day] ?? 0
              return (
                <div
                  key={day}
                  className={cn('size-[11px] rounded-sm', levels[level])}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
        <span>少</span>
        {levels.slice(1).map((l, i) => (
          <div key={i} className={cn('size-[11px] rounded-sm', l)} />
        ))}
        <span>多</span>
      </div>
    </div>
  )
}
