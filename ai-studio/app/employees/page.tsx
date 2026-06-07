"use client";

import Link from "next/link";
import { EMPLOYEES } from "@/lib/data";
import { useStudio } from "@/lib/store";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";

export default function EmployeesPage() {
  const { status, runs } = useStudio();
  return (
    <div className="min-h-screen">
      <header className="h-16 px-6 flex items-center bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-ink">数字员工</h1>
          <p className="text-[11px] text-muted">6 位 AI 数字员工 · 点击查看画像</p>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {EMPLOYEES.map((e) => (
          <Link
            key={e.id}
            href={`/employees/${e.id}`}
            className="group bg-white rounded-2xl shadow-card p-5 hover:shadow-cardHover transition-all"
          >
            <div className="flex items-center gap-4">
              <Avatar src={e.avatar} alt={e.name} size={64} status={status[e.id]} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-ink">{e.name}</h3>
                  <span className="text-xs text-white px-1.5 py-0.5 rounded" style={{ background: e.accent }}>
                    {e.role}
                  </span>
                </div>
                <div className="mt-1.5">
                  <StatusBadge status={status[e.id]} />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted line-clamp-2">{e.persona}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {e.techTags.slice(0, 4).map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-muted">
              <span>入职 {e.stats.workDays} 天</span>
              <span>累计执行 <b className="text-ink">{runs[e.id]}</b> 次</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
