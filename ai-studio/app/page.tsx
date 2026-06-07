import Link from "next/link";
import { Building2 } from "lucide-react";
import { StatCards } from "@/components/StatCards";
import { EmployeeGrid } from "@/components/EmployeeGrid";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ActivityFeed } from "@/components/ActivityFeed";
import { TaskList } from "@/components/TaskList";
import { EmployeePortraits } from "@/components/EmployeePortraits";
import { QuickSubmit } from "@/components/QuickSubmit";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-app">
      <header className="h-16 px-6 flex items-center justify-between bg-app/80 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-ink">工作台</h1>
          <p className="text-[11px] text-muted">AI 数字员工 · 全流程研发协作</p>
        </div>
        <div className="flex items-center gap-3">
          <QuickSubmit />
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-medium shadow-glow hover:opacity-90 transition"
          >
            <Building2 size={16} /> 切换工作室
          </Link>
        </div>
      </header>

      <div className="p-5">
        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_460px] gap-4">
          {/* 左侧主区 */}
          <div className="space-y-4 min-w-0">
            <StatCards />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5">
                <EmployeeGrid />
              </div>
              <div className="lg:col-span-7">
                <FlowDiagram />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ActivityFeed />
              <TaskList />
            </div>
          </div>

          {/* 右侧栏 */}
          <div className="space-y-4">
            <EmployeePortraits />
          </div>
        </div>
      </div>
    </div>
  );
}
