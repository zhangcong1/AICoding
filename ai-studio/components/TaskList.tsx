"use client";

import Image from "next/image";
import clsx from "clsx";
import { AgentId, getEmployee } from "@/lib/data";
import { useStudio } from "@/lib/store";

interface Row {
  title: string;
  assignees: AgentId[];
  priority: "高" | "中" | "低";
  status: string;
  statusCls: string;
}

const SEED: Row[] = [
  { title: "实现用户权限管理模块", assignees: ["akai", "xiaobu"], priority: "高", status: "进行中", statusCls: "bg-emerald-50 text-emerald-600" },
  { title: "优化首页加载性能", assignees: ["xiaobu", "xiaomu"], priority: "中", status: "待开始", statusCls: "bg-slate-100 text-slate-500" },
  { title: "设计系统设置页面", assignees: ["xiaomu"], priority: "中", status: "进行中", statusCls: "bg-emerald-50 text-emerald-600" },
  { title: "编写支付接口文档", assignees: ["akai"], priority: "低", status: "已完成", statusCls: "bg-blue-50 text-blue-600" },
];

const PRI: Record<Row["priority"], string> = {
  高: "bg-rose-50 text-rose-500",
  中: "bg-amber-50 text-amber-500",
  低: "bg-slate-100 text-slate-400",
};

export function TaskList() {
  const { tasks } = useStudio();

  const live: Row[] = tasks.map((t) => ({
    title: t.title,
    assignees: ["acai", "laozhou", "xiaomu", "xiaobu", "akai", "xiaonuo"].slice(
      0,
      Math.min(3, t.stepIndex + 1)
    ) as AgentId[],
    priority: "高" as const,
    status: t.status === "done" ? "已完成" : "进行中",
    statusCls: t.status === "done" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600",
  }));

  const rows = [...live, ...SEED].slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-ink">任务列表</h2>
        <button className="text-xs text-slate-400 hover:text-blue-500">查看全部</button>
      </div>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50">
            <span className={clsx("text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0", PRI[r.priority])}>
              {r.priority}
            </span>
            <span className="text-[13px] text-ink truncate flex-1">{r.title}</span>
            <div className="flex -space-x-1.5 shrink-0">
              {r.assignees.map((a) => {
                const e = getEmployee(a)!;
                return (
                  <Image key={a} src={e.avatar} alt={e.name} width={22} height={22}
                    className="rounded-full ring-2 ring-white" />
                );
              })}
            </div>
            <span className={clsx("text-[10px] px-1.5 py-0.5 rounded shrink-0", r.statusCls)}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
