'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { AGENTS } from '@ai-studio/shared-types'
import { DEMO_SEQUENCE, mergeWithDemo } from './demo-status'

const OfficeThreeCanvas = dynamic(
  () =>
    import('./three/office-scene').then((m) => m.OfficeThreeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
        加载 Three.js 场景...
      </div>
    ),
  },
)

export function Studio3DView({
  agentStatuses,
}: {
  agentStatuses: Record<string, string>
}) {
  const [demoIdx, setDemoIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoIdx((i) => (i + 1) % DEMO_SEQUENCE.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const statuses = useMemo(
    () => mergeWithDemo(agentStatuses, DEMO_SEQUENCE[demoIdx]),
    [agentStatuses, demoIdx],
  )

  const workingCount = AGENTS.filter((a) =>
    ['working', 'thinking'].includes(statuses[a.id] ?? 'idle'),
  ).length

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-[#f5f5f7] p-4">
      <div className="relative min-h-[520px] flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-50">
        <motion.h2
          className="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-base font-semibold"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          AI Studio 办公室
        </motion.h2>

        <div className="absolute inset-0 top-10">
          <OfficeThreeCanvas statuses={statuses} />
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-white/80 px-3 py-2 text-[10px] text-muted-foreground backdrop-blur">
          拖拽旋转 · 滚轮缩放
        </div>
      </div>

      <div className="flex w-72 shrink-0 flex-col gap-4">
        <motion.div
          className="rounded-xl border border-border bg-white p-4 shadow-sm"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <p className="text-xs text-muted-foreground">今日消耗 Token</p>
          <div className="mt-1 flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              🫘
            </motion.span>
            <span className="text-xl font-semibold">{workingCount * 120}</span>
            <span className="text-sm text-muted-foreground">/ 1000万</span>
          </div>
        </motion.div>

        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">今日节省 Token</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl">🫘</span>
            <span className="text-xl font-semibold">{workingCount * 40}</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">使用本地模型节省</p>
        </div>

        <div className="flex-1 rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">对话明细</p>
            <span className="text-xs text-muted-foreground">全部 ▾</span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            <motion.div
              key={workingCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              <p className="text-lg font-semibold text-blue-600">{workingCount}</p>
              <p className="text-[10px] text-muted-foreground">进行中</p>
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-emerald-600">0</p>
              <p className="text-[10px] text-muted-foreground">已完成</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{workingCount}</p>
              <p className="text-[10px] text-muted-foreground">总计</p>
            </div>
          </div>
          {workingCount > 0 ? (
            <div className="flex flex-col gap-2">
              {AGENTS.filter((a) =>
                ['working', 'thinking'].includes(statuses[a.id] ?? 'idle'),
              ).map((a) => (
                <motion.div
                  key={a.id}
                  className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span>{a.avatar}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {statuses[a.id] === 'working' ? '执行中...' : '思考中...'}
                    </p>
                  </div>
                  <motion.span
                    className="size-2 rounded-full bg-blue-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="mb-2 text-3xl opacity-40">📭</span>
              <p className="text-xs text-muted-foreground">暂时没有对话内容</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
