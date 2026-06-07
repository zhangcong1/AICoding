"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowLeft,
  Quote,
  Brain,
  GraduationCap,
  Wrench,
  FileText,
  CalendarDays,
  Bot,
  MessageSquare,
  FolderGit2,
} from "lucide-react";
import { getEmployee, RAW_FILES } from "@/lib/data";
import { useStudio } from "@/lib/store";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { RadarChart } from "@/components/RadarChart";

export default function EmployeeDetail() {
  const params = useParams<{ id: string }>();
  const e = getEmployee(params.id);
  const { status, runs } = useStudio();

  if (!e) return notFound();
  const st = status[e.id];

  const records = [
    { label: "入职天数", value: e.stats.workDays, icon: CalendarDays },
    { label: "自主任务", value: e.stats.autoTasks, icon: Bot },
    { label: "对话任务", value: e.stats.dialogTasks, icon: MessageSquare },
    { label: "协作项目", value: e.stats.projects, icon: FolderGit2 },
  ];

  return (
    <div className="min-h-screen">
      <header className="h-16 px-6 flex items-center gap-3 bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
        <Link href="/employees" className="text-muted hover:text-ink">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-bold text-ink">员工画像</h1>
      </header>

      <div className="p-6 space-y-5">
        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex flex-col md:flex-row gap-5">
            <Avatar src={e.avatar} alt={e.name} size={96} status={st} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-ink">{e.name}</h2>
                <span className="text-xs text-white px-2 py-0.5 rounded" style={{ background: e.accent }}>
                  {e.role}
                </span>
                <StatusBadge status={st} />
              </div>
              <div className="mt-1 text-xs text-muted flex items-center gap-3">
                <span>ID: {e.id}</span>
                <span>· {e.roleEn}</span>
                <span>· 入职 {e.stats.workDays} 天</span>
                <span>· 累计执行 {runs[e.id]} 次</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{e.identity}</p>
              <div className="mt-3 flex items-start gap-2 text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                <Quote size={16} className="shrink-0 mt-0.5" style={{ color: e.accent }} />
                <span>口头禅：「{e.catchphrase}」<br />{e.persona}</span>
              </div>
            </div>
          </div>

          {/* 工作记录 */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {records.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="rounded-xl border border-slate-100 p-4">
                  <Icon size={16} className="text-muted" />
                  <div className="mt-2 text-2xl font-bold text-ink">{r.value}</div>
                  <div className="text-xs text-muted">{r.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 左列：能力雷达 + 实现能力 */}
          <div className="space-y-5">
            <Card title="能力雷达" icon={<Brain size={16} />}>
              <div className="flex justify-center">
                <RadarChart data={e.radar} color={e.accent} />
              </div>
            </Card>

            <Card title="实现能力" icon={<GraduationCap size={16} />}>
              <div className="space-y-3">
                {e.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{s.name}</span>
                      <span className="text-muted">Lv.{s.level}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.level * 10}%`, background: e.accent }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 中列：关于我 + 记忆 */}
          <div className="space-y-5">
            <Card title="关于我">
              <Section label="工作准则 (Bible)" items={e.bible} accent={e.accent} />
              <Section label="工作风格" items={e.workStyle} accent={e.accent} />
              <Section label="工作模式" items={e.workMode} accent={e.accent} />
            </Card>

            <Card title="记忆与积累" icon={<Brain size={16} />}>
              <div className="space-y-3">
                {e.memories.map((m, i) => (
                  <div key={i} className="border-l-2 pl-3" style={{ borderColor: e.accent }}>
                    <div className="flex items-center gap-2 text-[11px] text-muted">
                      <span>{m.date}</span>
                      {m.tag && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                          {m.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">{m.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 右列：能力与工具 + 原始档案 */}
          <div className="space-y-5">
            <Card title="能力与工具" icon={<Wrench size={16} />}>
              <div className="text-xs text-muted mb-1.5">核心能力</div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.abilities.map((a) => (
                  <Tag key={a} accent={e.accent}>{a}</Tag>
                ))}
              </div>
              <div className="text-xs text-muted mb-1.5">专属工具</div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.tools.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted mb-1.5">技术栈</div>
              <div className="flex flex-wrap gap-1.5">
                {e.techTags.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 text-white">
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="原始档案" icon={<FileText size={16} />}>
              <div className="grid grid-cols-2 gap-2">
                {RAW_FILES.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600 hover:bg-slate-50 cursor-default"
                  >
                    <FileText size={14} className="text-muted" />
                    {f}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted">
                员工的身份、准则、记忆与人格均以 Markdown 持久化，可在 GitLab 版本化管理。
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-5">
      <div className="flex items-center gap-2 mb-4 text-ink">
        {icon}
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Section({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="text-xs text-muted mb-1.5">{label}</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full"
      style={{ background: `${accent}1a`, color: accent }}
    >
      {children}
    </span>
  );
}
