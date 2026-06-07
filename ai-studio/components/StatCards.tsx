"use client";

import { Users, ListChecks, TrendingUp, FolderGit2, Brain } from "lucide-react";
import { EMPLOYEES } from "@/lib/data";
import { useStudio } from "@/lib/store";

export function StatCards() {
  const { status, tasks } = useStudio();
  const working = Object.values(status).filter((s) => s === "working").length;
  const online = EMPLOYEES.filter((e) => e.online).length;

  const cards = [
    { value: `${working || 3}`, label: "在岗员工", delta: "较昨日 +2", up: true, icon: Users, color: "#3b82f6", bg: "#eff6ff" },
    { value: `${28 + tasks.length}`, label: "今日任务", delta: "较昨日 +8", up: true, icon: ListChecks, color: "#22c55e", bg: "#f0fdf4" },
    { value: "92%", label: "完成率", delta: "较昨日 +5%", up: true, icon: TrendingUp, color: "#f59e0b", bg: "#fffbeb" },
    { value: "128", label: "个项目", delta: "累计交付", up: true, icon: FolderGit2, color: "#6366f1", bg: "#eef2ff" },
    { value: "56", label: "条新知识", delta: "记忆沉淀", up: true, icon: Brain, color: "#a855f7", bg: "#faf5ff" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-white rounded-xl shadow-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-ink leading-none">{c.value}</div>
                <div className="text-xs text-muted mt-2">{c.label}</div>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: c.bg, color: c.color }}>
                <Icon size={18} />
              </div>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium"
              style={{ color: c.up ? "#16a34a" : "#64748b" }}>
              {c.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
