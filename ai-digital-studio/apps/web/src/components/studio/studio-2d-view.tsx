'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AGENTS } from '@ai-studio/shared-types'
import { AGENT_STRIPE, FlatWorkstation } from './office-assets'
import { DEMO_SEQUENCE, mergeWithDemo } from './demo-status'

export function Studio2DView({
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

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-gradient-to-b from-white to-slate-50 px-6 py-10">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold tracking-tight">好了，要正式上班了！</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          有问题 24 小时随时吩咐我们
        </p>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-3 gap-x-6 gap-y-4">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <FlatWorkstation
              stripe={AGENT_STRIPE[agent.id]}
              status={statuses[agent.id] ?? 'idle'}
              name={agent.name}
            />
            <p className="mt-1 text-xs text-muted-foreground">{agent.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        type="button"
        className="mt-10 rounded-full bg-foreground px-10 py-3 text-sm font-medium text-background"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        animate={{ boxShadow: ['0 0 0 0 rgba(0,0,0,0)', '0 0 0 8px rgba(0,0,0,0.05)', '0 0 0 0 rgba(0,0,0,0)'] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        开启 AI Studio
      </motion.button>
    </div>
  )
}
