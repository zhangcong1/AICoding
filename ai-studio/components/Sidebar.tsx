"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  Boxes,
  Brain,
  Sparkles,
  Settings,
  Building2,
} from "lucide-react";

const NAV = [
  { href: "/", label: "工作台", icon: LayoutDashboard },
  { href: "/studio", label: "工作室", icon: Building2 },
  { href: "/employees", label: "数字员工", icon: Users },
  { href: "/#projects", label: "项目协作", icon: Boxes },
  { href: "/#memory", label: "记忆中心", icon: Brain },
  { href: "/#skills", label: "技能市场", icon: Sparkles },
  { href: "/#settings", label: "系统设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[220px] shrink-0 bg-sidebar text-slate-300 flex flex-col">
      <div className="px-5 h-16 flex items-center gap-2 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold">
          AI
        </div>
        <div className="leading-tight">
          <div className="text-white text-sm font-semibold">数字软件工作室</div>
          <div className="text-[10px] text-slate-400">AI Digital Studio</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("#")[0]) &&
                item.href !== "/";
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebarHover text-white shadow-inner"
                  : "hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
          <div className="leading-tight">
            <div className="text-white text-xs font-medium">zhangcong</div>
            <div className="text-[10px] text-slate-400">Community</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
