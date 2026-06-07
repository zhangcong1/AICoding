"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { AgentId, EMPLOYEES } from "@/lib/data";
import { useStudio } from "@/lib/store";

// 设计图中的工作状态 + 完成进度 + 今日效率
const META: Record<AgentId, { badge: string; cls: string; done: number; total: number; eff: number }> = {
  acai: { badge: "工作中", cls: "bg-emerald-50 text-emerald-600", done: 3, total: 3, eff: 100 },
  laozhou: { badge: "进行中", cls: "bg-blue-50 text-blue-600", done: 1, total: 3, eff: 80 },
  xiaomu: { badge: "设计中", cls: "bg-violet-50 text-violet-600", done: 2, total: 5, eff: 90 },
  xiaobu: { badge: "开发中", cls: "bg-amber-50 text-amber-600", done: 3, total: 6, eff: 95 },
  akai: { badge: "开发中", cls: "bg-amber-50 text-amber-600", done: 2, total: 4, eff: 85 },
  xiaonuo: { badge: "测试中", cls: "bg-rose-50 text-rose-600", done: 1, total: 3, eff: 90 },
  xiaoxi: { badge: "分析中", cls: "bg-cyan-50 text-cyan-600", done: 2, total: 4, eff: 88 },
  ayan: { badge: "运维中", cls: "bg-indigo-50 text-indigo-600", done: 3, total: 5, eff: 92 },
};

// 主工作台只展示研发流水线的 6 位（与流程图对齐）
const PIPELINE: AgentId[] = ["acai", "laozhou", "xiaomu", "xiaobu", "akai", "xiaonuo"];

export function EmployeeGrid() {
  const { status } = useStudio();

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-ink">数字员工</h2>
        <Link href="/employees" className="text-xs text-slate-400 hover:text-blue-500">
          查看全部 ›
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {EMPLOYEES.filter((e) => PIPELINE.includes(e.id)).map((e) => {
          const m = META[e.id];
          const live = status[e.id] === "working";
          return (
            <Link
              key={e.id}
              href={`/employees/${e.id}`}
              className="group rounded-xl border border-slate-100 overflow-hidden hover:shadow-cardHover transition-all"
            >
              {/* 头像 */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
                <Image
                  src={`/assets/portraits/${e.id}.png`}
                  alt={e.name}
                  fill
                  sizes="180px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* 信息区 */}
              <div className="p-2.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-ink text-sm">{e.name}</span>
                  <span className={clsx(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1 shrink-0",
                    m.cls
                  )}>
                    {live && <span className="w-1 h-1 rounded-full bg-current animate-pulse" />}
                    {live ? "工作中" : m.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5 text-[11px] text-muted">
                  <span className="truncate">{e.role}</span>
                  <span className="shrink-0">{m.done}/{m.total}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted">完成率</span>
                    <span className="text-ink font-semibold">{m.eff}%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${m.eff}%`, background: e.accent }} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
