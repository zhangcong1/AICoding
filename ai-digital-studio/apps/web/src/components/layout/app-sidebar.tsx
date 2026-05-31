'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, LayoutDashboard, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/employees', label: '数字员工', icon: Bot },
  { href: '/studio', label: '工作室', icon: LayoutDashboard },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-[hsl(var(--qw-green))] text-sm font-bold text-white">
          AI
        </div>
        <span className="font-semibold">AI Studio</span>
        <span className="rounded bg-[hsl(var(--qw-green))]/10 px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--qw-green))]">
          Beta
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-muted/60',
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2 border-t px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          Z
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium">zhangcong</p>
          <p className="text-xs text-muted-foreground">Community</p>
        </div>
        <Settings className="size-4 text-muted-foreground" />
      </div>
    </aside>
  )
}
