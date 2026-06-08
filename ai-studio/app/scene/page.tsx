"use client";

import Link from "next/link";
import { LayoutDashboard, Building2 } from "lucide-react";
import { LivingOffice } from "@/components/LivingOffice";

export default function ScenePage() {
  return (
    <div className="min-h-screen bg-[#0b0f18] text-slate-200">
      <header className="h-16 px-6 flex items-center justify-between border-b border-white/10">
        <div>
          <h1 className="text-lg font-bold text-white text-glow">AI 数字软件工作室 · 活体场景</h1>
          <p className="text-[11px] text-slate-400">
            实时状态可视化 — 空闲 / 思考 / 工作 / 会议 / 完成，可派发任务看全员协作流转
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
          >
            <Building2 size={16} /> 静态工作室
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
          >
            <LayoutDashboard size={16} /> 返回工作台
          </Link>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <LivingOffice />
      </div>
    </div>
  );
}
