'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bot,
  LayoutDashboard,
  CheckSquare,
  Users,
  FileText,
  Calendar,
  Bell,
  Settings,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    section: '主菜单',
    items: [
      { href: '/', label: '工作台', icon: Home },
      { href: '/employees', label: '数字员工', icon: Bot },
      { href: '/studio', label: '工作室', icon: LayoutDashboard },
      { href: '/tasks', label: '任务管理', icon: CheckSquare },
      { href: '/requirements', label: '需求管理', icon: FileText },
    ],
  },
  {
    section: '其他',
    items: [
      { href: '#team', label: '团队协作', icon: Users },
      { href: '#calendar', label: '日程安排', icon: Calendar },
      { href: '#notifications', label: '通知中心', icon: Bell },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-[#0f172a] text-slate-200">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-white/8 px-5 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-[13px] font-bold text-white">
          AI
        </div>
        <span className="font-semibold text-[15px]">AI Studio</span>
        <span className="rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-medium text-blue-300">
          Beta
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {navGroups.map((group) => (
          <div key={group.section}>
            <div className="px-3 pt-4 pb-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {group.section}
            </div>
            {group.items.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-blue-500/15 font-medium text-blue-300'
                      : 'text-slate-400 hover:bg-white/6 hover:text-slate-200',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-[18px] shrink-0',
                      active ? 'text-blue-400' : 'text-slate-500',
                    )}
                  />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-white/8 px-5 py-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[13px] font-medium text-slate-200">
          Z
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-slate-200 truncate">zhangcong</p>
          <p className="text-[11px] text-slate-500">管理员</p>
        </div>
        <Link href="/settings">
          <Settings className="size-4 text-slate-500 hover:text-slate-300 transition-colors" />
        </Link>
      </div>
    </aside>
  )
}
