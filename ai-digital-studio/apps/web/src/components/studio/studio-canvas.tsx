'use client'

import { Component, type ReactNode, useState } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Studio2DView } from './studio-2d-view'

const Studio3DView = dynamic(
  () => import('./studio-3d-view').then((m) => m.Studio3DView),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-border bg-[#f5f5f7] text-sm text-muted-foreground">
        加载 3D 工作室...
      </div>
    ),
  },
)

class Studio3DErrorBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[520px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-[#f5f5f7] p-6 text-center">
          <p className="text-sm text-muted-foreground">3D 场景加载失败</p>
          <button
            type="button"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm hover:bg-muted"
            onClick={() => {
              this.setState({ hasError: false })
              this.props.onRetry()
            }}
          >
            重试
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

type ViewMode = '2d' | '3d'

export function StudioCanvas({
  agentStatuses,
}: {
  agentStatuses: Record<string, string>
}) {
  const [mode, setMode] = useState<ViewMode>('2d')
  const [threeKey, setThreeKey] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('2d')}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-colors',
            mode === '2d'
              ? 'bg-foreground text-background'
              : 'bg-white text-muted-foreground hover:bg-muted border border-border',
          )}
        >
          2D 工位
        </button>
        <button
          type="button"
          onClick={() => setMode('3d')}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-colors',
            mode === '3d'
              ? 'bg-foreground text-background'
              : 'bg-white text-muted-foreground hover:bg-muted border border-border',
          )}
        >
          3D 办公室
        </button>
      </div>

      {mode === '2d' ? (
        <Studio2DView agentStatuses={agentStatuses} />
      ) : (
        <Studio3DErrorBoundary onRetry={() => setThreeKey((k) => k + 1)}>
          <Studio3DView key={threeKey} agentStatuses={agentStatuses} />
        </Studio3DErrorBoundary>
      )}
    </div>
  )
}
