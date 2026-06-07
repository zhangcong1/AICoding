"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { EMPLOYEES, getEmployee } from "@/lib/data";
import { useStudio } from "@/lib/store";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";

// 6 个工位在房间图上的大致坐标（百分比）
const SEATS: Record<string, { x: number; y: number }> = {
  acai: { x: 24, y: 40 },
  laozhou: { x: 50, y: 36 },
  xiaomu: { x: 76, y: 40 },
  xiaobu: { x: 26, y: 74 },
  akai: { x: 50, y: 78 },
  xiaonuo: { x: 74, y: 74 },
};

export default function StudioPage() {
  const { status, tasks, activeTaskId } = useStudio();
  const active = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="min-h-screen bg-panelDark text-slate-200">
      <header className="h-16 px-6 flex items-center justify-between border-b border-white/10">
        <div>
          <h1 className="text-lg font-bold text-white text-glow">AI 数字软件工作室</h1>
          <p className="text-[11px] text-slate-400">
            {active ? `进行中：${active.title}` : "全员待命中"}
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
        >
          <LayoutDashboard size={16} /> 返回工作台
        </Link>
      </header>

      <div className="p-6">
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          <Image
            src="/assets/studio/room.png"
            alt="数字工作室"
            width={913}
            height={519}
            className="w-full h-auto"
            priority
          />

          {/* 工位状态气泡（仅房间内有工位的 6 位）*/}
          {EMPLOYEES.filter((e) => SEATS[e.id]).map((e) => {
            const seat = SEATS[e.id];
            const st = status[e.id];
            const working = st === "working";
            return (
              <Link
                key={e.id}
                href={`/employees/${e.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${seat.x}%`, top: `${seat.y}%` }}
              >
                <div
                  className={`flex flex-col items-center gap-1 transition-transform group-hover:scale-110 ${
                    working ? "drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]" : ""
                  }`}
                >
                  <Avatar src={e.avatar} alt={e.name} size={40} status={st} />
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                      working
                        ? "bg-emerald-500 text-white"
                        : "bg-black/50 text-slate-200"
                    }`}
                  >
                    {e.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 底部状态条 */}
        <div className="max-w-5xl mx-auto mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {EMPLOYEES.map((e) => (
            <div key={e.id} className="glass-dark rounded-xl p-3 flex items-center gap-2">
              <Avatar src={e.avatar} alt={e.name} size={36} status={status[e.id]} />
              <div className="min-w-0">
                <div className="text-xs text-white font-medium">{e.name}</div>
                <StatusBadge status={status[e.id]} />
              </div>
            </div>
          ))}
        </div>

        {active && (
          <div className="max-w-5xl mx-auto mt-5 glass-dark rounded-xl p-4">
            <h3 className="text-sm font-medium text-white mb-2">协作日志</h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {active.log
                .slice()
                .reverse()
                .map((l, i) => {
                  const emp = getEmployee(l.agent)!;
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full" style={{ background: emp.accent }} />
                      {l.text}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
