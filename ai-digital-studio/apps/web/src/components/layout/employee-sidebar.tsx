'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowLeft,
  Bot,
  FolderKanban,
  Home,
  MessageSquare,
  MessagesSquare,
  Plug,
  Settings,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { AGENTS } from '@ai-studio/shared-types'
import { cn } from '@/lib/utils'

const navIcons = {
  home: Home,
  projects: FolderKanban,
  'auto-tasks': Zap,
  'chat-tasks': MessageSquare,
  memory: Sparkles,
  skills: Bot,
  connectors: Plug,
  im: MessagesSquare,
  permissions: Shield,
}

const navItems = [
  { key: 'home', label: '首页' },
  { key: 'projects', label: '项目' },
  { key: 'auto-tasks', label: '自动任务' },
  { key: 'chat-tasks', label: '对话任务' },
  { key: 'memory', label: '记忆' },
  { key: 'skills', label: '技能' },
  { key: 'connectors', label: '连接器' },
  { key: 'im', label: 'IM' },
  { key: 'permissions', label: '权限' },
] as const

export function EmployeeSidebar({ agentId }: { agentId: string }) {
  const pathname = usePathname()
  const agent = AGENTS.find((a) => a.id === agentId)

  if (!agent) return null

  return (
    <aside className="flex h-screen w-52 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex items-center gap-2 border-b px-4 py-3.5">
        <div className="flex size-6 items-center justify-center rounded-md bg-[hsl(var(--qw-green))] text-[10px] font-bold text-white">
          Q
        </div>
        <span className="text-sm font-semibold">QoderWake</span>
        <span className="rounded bg-[hsl(var(--qw-green))]/10 px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--qw-green))]">
          Beta
        </span>
      </div>

      <Link
        href="/employees"
        className="mx-3 mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/60"
      >
        <ArrowLeft className="size-4" />
        返回列表
      </Link>

      <div className="mx-3 mt-2 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
        <span className="text-xl">{agent.avatar}</span>
        <span className="text-sm font-medium">{agent.name}</span>
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const Icon = navIcons[item.key]
          const href = `/employees/${agentId}${item.key === 'home' ? '' : `#${item.key}`}`
          const isHome = item.key === 'home'
          const active = isHome && pathname === `/employees/${agentId}`

          return (
            <a
              key={item.key}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-muted/60',
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="flex items-center gap-2 border-t px-3 py-3">
        <div className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
          Z
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">zhangcong</p>
          <p className="text-[10px] text-muted-foreground">Community</p>
        </div>
        <Settings className="size-3.5 shrink-0 text-muted-foreground" />
      </div>
    </aside>
  )
}
