"use client";

import Image from "next/image";
import { AgentId, getEmployee } from "@/lib/data";
import { useStudio } from "@/lib/store";

interface Item {
  time: string;
  agent: AgentId;
  text: string;
  tag: string;
  tagCls: string;
}

const SEED: Item[] = [
  { time: "14:32", agent: "xiaobu", text: "提交了前端页面结构", tag: "前端开发", tagCls: "bg-violet-50 text-violet-600" },
  { time: "14:28", agent: "akai", text: "完成了用户接口设计", tag: "后端开发", tagCls: "bg-amber-50 text-amber-600" },
  { time: "14:25", agent: "xiaomu", text: "上传了页面设计稿", tag: "UI设计", tagCls: "bg-pink-50 text-pink-600" },
  { time: "14:18", agent: "laozhou", text: "确定了技术选型方案", tag: "技术架构", tagCls: "bg-teal-50 text-teal-600" },
  { time: "14:05", agent: "acai", text: "拆解了需求并输出 PRD", tag: "需求分析", tagCls: "bg-blue-50 text-blue-600" },
];

export function ActivityFeed() {
  const { tasks, activeTaskId } = useStudio();
  const active = tasks.find((t) => t.id === activeTaskId);

  const liveItems: Item[] =
    active?.log
      .slice()
      .reverse()
      .map((l) => ({
        time: new Date(l.time).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        agent: l.agent,
        text: l.text.replace(/^.+?\s/, ""),
        tag: "进行中",
        tagCls: "bg-emerald-50 text-emerald-600",
      })) ?? [];

  const items = [...liveItems, ...SEED].slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-ink">实时动态</h2>
        <div className="flex items-center gap-3 text-[11px] text-muted">
          <Legend color="#22c55e" label="已完成" />
          <Legend color="#3b82f6" label="进行中" />
          <Legend color="#cbd5e1" label="等待中" />
        </div>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => {
          const e = getEmployee(it.agent)!;
          return (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-[11px] text-slate-400 w-9 shrink-0">{it.time}</span>
              <Image src={e.avatar} alt={e.name} width={24} height={24}
                className="rounded-full ring-1 ring-slate-100 shrink-0" />
              <span className="text-[13px] text-slate-600 truncate flex-1">
                <b className="text-ink font-medium">{e.name}</b> {it.text}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${it.tagCls}`}>{it.tag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
