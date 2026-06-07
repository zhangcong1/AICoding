"use client";

import Link from "next/link";
import Image from "next/image";
import { AgentId, EMPLOYEES } from "@/lib/data";

const META: Record<AgentId, { expertise: string; traits: string; years: string; tags: string[] }> = {
  acai: { expertise: "需求分析、产品规划", traits: "细致、善于沟通", years: "8 年产品经验", tags: ["需求分析", "产品规划", "项目管理"] },
  laozhou: { expertise: "系统设计、技术选型", traits: "严谨、追求完美", years: "12 年架构经验", tags: ["系统设计", "技术选型", "性能优化"] },
  xiaomu: { expertise: "界面设计、用户体验", traits: "创意、追求美感", years: "6 年设计经验", tags: ["UI设计", "用户体验", "设计系统"] },
  xiaobu: { expertise: "Vue、React、工程化", traits: "专注、追求极致", years: "5 年前端经验", tags: ["Vue", "TypeScript", "工程化"] },
  akai: { expertise: "Node.js、架构设计", traits: "稳重、逻辑清晰", years: "6 年后端经验", tags: ["Node.js", "数据库", "架构设计"] },
  xiaonuo: { expertise: "自动化测试、质量保障", traits: "细心、认真负责", years: "4 年测试经验", tags: ["测试设计", "自动化测试", "质量保障"] },
  xiaoxi: { expertise: "数据建模、指标体系", traits: "理性、追求精确", years: "5 年数据经验", tags: ["SQL", "Python", "可视化"] },
  ayan: { expertise: "CI/CD、容器编排", traits: "稳健、责任心强", years: "7 年运维经验", tags: ["Docker", "K8s", "监控"] },
};

export function EmployeePortraits() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-ink">数字员工画像</h2>
        <Link href="/employees" className="text-xs text-slate-400 hover:text-blue-500">查看全部 ›</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 auto-rows-fr">
        {EMPLOYEES.map((e) => {
          const m = META[e.id];
          return (
            <Link key={e.id} href={`/employees/${e.id}`}
              className="group rounded-xl border border-slate-100 p-3.5 hover:shadow-cardHover transition-all">
              <div className="flex items-center gap-3">
                <Image src={e.avatar} alt={e.name} width={44} height={44}
                  className="rounded-full object-cover ring-1 ring-slate-100 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-ink text-sm">{e.name}</div>
                  <div className="text-[11px] text-muted">{e.role}</div>
                </div>
              </div>

              <ul className="mt-3 space-y-1 text-[11px] text-slate-500">
                <li className="flex gap-1"><span className="text-slate-400 shrink-0">擅长</span><span className="truncate">{m.expertise}</span></li>
                <li className="flex gap-1"><span className="text-slate-400 shrink-0">性格</span><span className="truncate">{m.traits}</span></li>
                <li className="flex gap-1"><span className="text-slate-400 shrink-0">经验</span><span className="truncate">{m.years}</span></li>
              </ul>

              <div className="mt-3 flex flex-wrap gap-1">
                {m.tags.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: `${e.accent}14`, color: e.accent }}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
