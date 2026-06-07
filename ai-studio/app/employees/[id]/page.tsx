"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Trash2,
  Pencil,
  X,
  CalendarDays,
  History,
  Clock,
  ChevronRight,
  Sparkles,
  FileText,
  Code2,
  ScanEye,
  Plus,
  Upload,
  Braces,
} from "lucide-react";
import {
  getEmployee,
  getProfile,
  formatJoinDateCn,
  RAW_FILES,
  TODAY,
  type Employee,
} from "@/lib/data";
import { useStudio } from "@/lib/store";
import { Avatar } from "@/components/Avatar";

type WorkTab = "timeline" | "dialog" | "auto";

export default function EmployeeDetail() {
  const params = useParams<{ id: string }>();
  const e = getEmployee(params.id);
  const { status } = useStudio();
  const [tab, setTab] = useState<WorkTab>("timeline");
  const [openFile, setOpenFile] = useState<string | null>(null);

  if (!e) return notFound();
  const st = status[e.id];
  const profile = getProfile(e.id);

  const records = [
    { label: "入职天数", value: e.stats.workDays },
    { label: "自动任务", value: e.stats.autoTasks },
    { label: "对话任务", value: e.stats.dialogTasks },
    { label: "已创建的项目", value: e.stats.projects },
  ];

  return (
    <div className="min-h-screen bg-app">
      {/* 顶栏 */}
      <header className="h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-10">
        <Link href="/employees" className="text-lg font-bold text-ink">
          首页
        </Link>
        <button className="text-muted hover:text-rose-500 transition-colors" title="删除">
          <Trash2 size={18} />
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-5">
        {/* Hero */}
        <section className="bg-white rounded-2xl shadow-card p-6 relative overflow-hidden">
          {/* 右上角装饰图标 */}
          <div className="absolute top-5 right-6 hidden sm:flex items-center gap-3 text-slate-200">
            <span className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center">
              <FileText size={20} />
            </span>
            <span
              className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center"
              style={{ color: `${e.accent}66` }}
            >
              <ScanEye size={20} />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* 头像 + ID */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative">
                <Avatar src={e.avatar} alt={e.name} size={128} status={st} />
                <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs">
                  🙂
                </span>
              </div>
              <div className="mt-2 text-[11px] tracking-wide text-muted font-mono">
                ID: {idFor(e.id)}
              </div>
            </div>

            {/* 信息 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl font-bold text-ink">{e.name}</h2>
                <span className="inline-flex items-center gap-1 text-xs text-muted border border-slate-200 rounded-md px-2 py-1">
                  <Code2 size={12} />
                  {e.roleEn === "Frontend Engineer" ? "前端开发工程师" : e.role}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {e.online ? "在线" : "离线"}
                </span>
                <span className="text-slate-300">|</span>
                <span>入职时间：{formatJoinDateCn(e.joinDate)}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-2xl">
                {describe(e.identity, e.persona, e.role)}
              </p>

              <button className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors">
                <Pencil size={14} />
                编辑
              </button>
            </div>
          </div>
        </section>

        {/* 工作记录 */}
        <CollapsibleCard title="工作记录" extra={<WorkTabs tab={tab} onChange={setTab} />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {records.map((r) => (
              <div key={r.label} className="rounded-xl bg-slate-50 p-4">
                <div className="text-2xl font-bold text-ink">
                  {r.value}
                  {r.label === "入职天数" && <span className="text-sm font-normal text-muted ml-0.5">天</span>}
                </div>
                <div className="text-xs text-muted mt-0.5">{r.label}</div>
              </div>
            ))}
          </div>

          {tab === "timeline" && <Heatmap seed={e.stats.totalRuns} accent={e.accent} />}
          {tab === "dialog" && <TaskTable kind="dialog" accent={e.accent} />}
          {tab === "auto" && <TaskTable kind="auto" accent={e.accent} />}
        </CollapsibleCard>

        {/* 记忆与积累 */}
        <CollapsibleCard
          title="记忆与积累"
          extra={
            <Link href="#" className="inline-flex items-center text-sm text-muted hover:text-ink">
              查看完整记忆 <ChevronRight size={14} />
            </Link>
          }
        >
          <MemoryTimeline learnings={profile.learnings} />
        </CollapsibleCard>

        {/* 关于我 */}
        <CollapsibleCard title="关于我">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 我最擅长 */}
            <div>
              <h4 className="text-sm text-muted mb-4">我最擅长</h4>
              <div className="space-y-4">
                {profile.highlights.map((h) => (
                  <div key={h.title} className="border-b border-dashed border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                      <span>{h.icon}</span>
                      <span>
                        {h.title} · {h.sub}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 工作风格 */}
            <div>
              <h4 className="text-sm text-muted mb-4">工作风格</h4>
              <ul className="space-y-3.5">
                {e.workStyle.map((s) => (
                  <li key={s} className="text-sm text-ink border-b border-dashed border-slate-100 pb-3 last:border-0 last:pb-0">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* 工作模式 */}
            <div>
              <h4 className="text-sm text-muted mb-4">工作模式</h4>
              <div className="space-y-4">
                {profile.workModes.map((m) => (
                  <div key={m.title} className="border-b border-dashed border-slate-100 pb-3.5 last:border-0 last:pb-0">
                    <div className="text-sm font-semibold text-ink">{m.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">
                      {m.steps.join(" → ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleCard>

        {/* 能力与工具 */}
        <CollapsibleCard title="能力与工具">
          {/* 我的能力 */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-ink">
              我的能力{" "}
              <span className="text-muted font-normal">
                ({profile.capabilities.length}/{profile.capabilities.length})
              </span>
            </h4>
            <Link href="#" className="inline-flex items-center text-sm text-muted hover:text-ink">
              管理 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {profile.capabilities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 text-xs text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {c}
              </span>
            ))}
            <button className="inline-flex items-center gap-1 text-xs text-muted border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
              <Plus size={12} /> 从技能市场添加
            </button>
            <button className="inline-flex items-center gap-1 text-xs text-muted border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
              <Upload size={12} /> 上传技能
            </button>
          </div>

          <div className="border-t border-dashed border-slate-200 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-ink">
                连接器 <span className="text-muted font-normal">({profile.connectors})</span>
              </h4>
              <Link href="#" className="inline-flex items-center text-sm text-muted hover:text-ink">
                管理 <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1 text-xs text-muted border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                <Plus size={12} /> 添加
              </button>
              <button className="inline-flex items-center gap-1 text-xs text-muted border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                <Braces size={12} /> 导入 JSON
              </button>
            </div>
          </div>
        </CollapsibleCard>

        {/* 原始档案 */}
        <CollapsibleCard title="原始档案">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RAW_FILES.map((f) => (
              <button
                key={f}
                onClick={() => setOpenFile(f)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors text-left"
              >
                <span className="text-muted">
                  <FileText size={16} />
                </span>
                {f}
              </button>
            ))}
          </div>
        </CollapsibleCard>
      </div>

      {openFile && (
        <FileModal file={openFile} content={mdContent(openFile, e)} onClose={() => setOpenFile(null)} />
      )}
    </div>
  );
}

/* ---------------- 子组件 ---------------- */

function CollapsibleCard({
  title,
  extra,
  children,
}: {
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          {extra}
        </div>
        <button onClick={() => setOpen((v) => !v)} className="text-muted hover:text-ink">
          <X size={18} className={open ? "" : "rotate-45"} />
        </button>
      </div>
      {open && children}
    </section>
  );
}

function WorkTabs({ tab, onChange }: { tab: WorkTab; onChange: (t: WorkTab) => void }) {
  const items: { key: WorkTab; label: string; icon: React.ReactNode }[] = [
    { key: "timeline", label: "时间线视图", icon: <CalendarDays size={14} /> },
    { key: "dialog", label: "对话任务", icon: <History size={14} /> },
    { key: "auto", label: "自动任务", icon: <Clock size={14} /> },
  ];
  return (
    <div className="flex items-center gap-1">
      {items.map((it) => {
        const active = tab === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={
              "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors " +
              (active ? "bg-slate-100 text-ink font-medium" : "text-muted hover:text-ink")
            }
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

interface MockTask {
  title: string;
  status: "done" | "running" | "scheduled";
  when: string;
  trigger: string;
}

const DIALOG_TASKS: MockTask[] = [
  { title: "实现登录页表单校验与错误提示", status: "done", when: "2 天前", trigger: "对话发起" },
  { title: "修复移动端导航栏折叠异常", status: "done", when: "3 天前", trigger: "对话发起" },
  { title: "优化首屏图片懒加载策略", status: "done", when: "5 天前", trigger: "对话发起" },
  { title: "抽离通用表格组件并补充类型", status: "running", when: "进行中", trigger: "对话发起" },
];

const AUTO_TASKS: MockTask[] = [
  { title: "每日依赖安全扫描", status: "scheduled", when: "每天 09:00", trigger: "定时触发" },
  { title: "Lighthouse 性能巡检", status: "done", when: "今天 02:00", trigger: "定时触发" },
  { title: "无障碍对比度自动检测", status: "scheduled", when: "每周一 10:00", trigger: "定时触发" },
];

const STATUS_STYLE: Record<MockTask["status"], { label: string; cls: string }> = {
  done: { label: "已完成", cls: "bg-emerald-50 text-emerald-600" },
  running: { label: "进行中", cls: "bg-amber-50 text-amber-600" },
  scheduled: { label: "待触发", cls: "bg-slate-100 text-slate-500" },
};

function TaskTable({ kind, accent }: { kind: "dialog" | "auto"; accent: string }) {
  const tasks = kind === "dialog" ? DIALOG_TASKS : AUTO_TASKS;
  return (
    <div className="rounded-xl border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 text-[11px] text-muted font-medium">
        <span className="flex-1">任务</span>
        <span className="w-20 text-center">状态</span>
        <span className="w-24 text-right">触发方式</span>
        <span className="w-24 text-right">时间</span>
      </div>
      <ul>
        {tasks.map((t, i) => {
          const s = STATUS_STYLE[t.status];
          return (
            <li
              key={i}
              className="flex items-center gap-3 px-4 py-3 border-t border-slate-100 text-sm hover:bg-slate-50/60"
            >
              <span className="flex-1 flex items-center gap-2 min-w-0 text-ink">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                <span className="truncate">{t.title}</span>
              </span>
              <span className="w-20 text-center">
                <span className={"text-[11px] px-2 py-0.5 rounded-full " + s.cls}>{s.label}</span>
              </span>
              <span className="w-24 text-right text-xs text-muted">{t.trigger}</span>
              <span className="w-24 text-right text-xs text-muted">{t.when}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FileModal({
  file,
  content,
  onClose,
}: {
  file: string;
  content: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-cardHover w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-ink font-semibold text-sm">
            <FileText size={16} className="text-muted" />
            {file}
          </div>
          <button onClick={onClose} className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <Markdown source={content} />
        </div>
      </div>
    </div>
  );
}

// 极简 Markdown 渲染（# 标题 / - 列表 / **粗体** / 普通段落）
function Markdown({ source }: { source: string }) {
  const lines = source.trim().split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={out.length} className="list-disc pl-5 space-y-1 my-2 text-sm text-slate-600">
          {list.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  lines.forEach((ln) => {
    const t = ln.trim();
    if (t.startsWith("- ")) {
      list.push(t.slice(2));
    } else if (t.startsWith("## ")) {
      flush();
      out.push(<h4 key={out.length} className="text-sm font-bold text-ink mt-4 mb-1.5">{t.slice(3)}</h4>);
    } else if (t.startsWith("# ")) {
      flush();
      out.push(<h3 key={out.length} className="text-base font-bold text-ink mb-2">{t.slice(2)}</h3>);
    } else if (t === "") {
      flush();
    } else {
      flush();
      out.push(<p key={out.length} className="text-sm text-slate-600 leading-relaxed my-1.5">{inline(t)}</p>);
    }
  });
  flush();
  return <div>{out}</div>;
}

function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

// 根据员工数据生成每个原始档案的 Markdown 内容
function mdContent(file: string, e: Employee): string {
  const profile = getProfile(e.id);
  switch (file) {
    case "IDENTITY.md":
      return `# ${e.name} · ${e.role}
- **角色**：${e.role}（${e.roleEn}）
- **工作阶段**：${e.phase}
- **入职时间**：${formatJoinDateCn(e.joinDate)}
- **状态**：${e.online ? "在线" : "离线"}

## 简介
${e.identity}${e.persona}`;
    case "BIBLE.md":
      return `# 工作准则
${e.bible.map((b) => `- ${b}`).join("\n")}

## 工作风格
${e.workStyle.map((s) => `- ${s}`).join("\n")}

## 工作模式
${profile.workModes.map((m) => `- **${m.title}**：${m.steps.join(" → ")}`).join("\n")}`;
    case "MEMORY.md":
      return `# 记忆与积累
${e.memories.map((m) => `- ${m.date}${m.tag ? ` **[${m.tag}]**` : ""}：${m.text}`).join("\n")}

## 技能成长
${profile.learnings.map((l) => `- ${l.daysAgo} 天前 **${l.type}**：${l.name}`).join("\n")}`;
    case "PERSONA.md":
      return `# 人格画像
- **口头禅**：「${e.catchphrase}」

## 我最擅长
${profile.highlights.map((h) => `- ${h.icon} **${h.title} · ${h.sub}**：${h.desc}`).join("\n")}`;
    default:
      return "";
  }
}

const WEEKS = 53;
const LEVELS = ["#ebedf0", "#9be9c1", "#56d39a", "#34b87a", "#1a7f4b"];
const MONTH_LABEL = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

// 确定性伪随机，按 seed 生成稀疏的贡献热力图
function Heatmap({ seed, accent }: { seed: number; accent: string }) {
  const { cells, months } = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const totalDays = WEEKS * 7;
    const start = new Date(TODAY);
    start.setDate(start.getDate() - (totalDays - 1));

    const cells: { level: number; date: Date }[] = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      // 越靠近今天活跃概率越高，整体稀疏
      const recency = i / totalDays;
      const p = rand();
      let level = 0;
      if (p < 0.04 + recency * 0.18) {
        level = 1 + Math.floor(rand() * 4);
      }
      cells.push({ level, date: d });
    }

    // 月份标签：每列第一天所在月份，变化时打标
    const months: { col: number; label: string }[] = [];
    let lastMonth = -1;
    for (let w = 0; w < WEEKS; w++) {
      const d = cells[w * 7]?.date;
      if (!d) continue;
      if (d.getMonth() !== lastMonth) {
        months.push({ col: w, label: MONTH_LABEL[d.getMonth()] });
        lastMonth = d.getMonth();
      }
    }
    return { cells, months };
  }, [seed]);

  return (
    <div className="rounded-xl bg-slate-50 p-5 overflow-x-auto">
      <div className="w-fit mx-auto">
        {/* 月份行 */}
        <div className="flex pl-8 mb-1.5">
          <div className="relative h-4" style={{ width: WEEKS * 14 }}>
            {months.map((m) => (
              <span
                key={m.col}
                className="absolute text-[10px] text-muted"
                style={{ left: m.col * 14 }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex">
          {/* 星期标签 */}
          <div className="flex flex-col justify-between text-[10px] text-muted pr-1.5 w-8 py-[2px]">
            <span className="h-[10px]">周一</span>
            <span className="h-[10px]">周三</span>
            <span className="h-[10px]">周五</span>
          </div>
          {/* 网格 */}
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((c, i) => (
              <span
                key={i}
                title={`${c.date.getMonth() + 1}/${c.date.getDate()}`}
                className="w-[11px] h-[11px] rounded-[2px]"
                style={{ background: c.level === 0 ? LEVELS[0] : LEVELS[c.level] }}
              />
            ))}
          </div>
        </div>
        {/* 图例 */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-muted">
          <span>少</span>
          {LEVELS.map((l, i) => (
            <span key={i} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: l }} />
          ))}
          <span>多</span>
        </div>
      </div>
    </div>
  );
}

function MemoryTimeline({
  learnings,
}: {
  learnings: { type: string; name: string; daysAgo: number }[];
}) {
  const ROW = 96; // 上/下卡片区高度
  return (
    <div className="overflow-x-auto">
      <div
        className="relative grid min-w-[700px]"
        style={{
          gridTemplateColumns: `repeat(${learnings.length}, minmax(0, 1fr))`,
          gridTemplateRows: `${ROW}px 0px ${ROW}px`,
        }}
      >
        {/* 渐变中线（穿过中间行） */}
        <div
          className="absolute left-0 right-0 h-[2px] rounded-full"
          style={{ top: ROW, background: "linear-gradient(90deg, #c7f0d8, #cfe3ff, #d8d0ff)" }}
        />

        {learnings.map((l, i) => {
          const up = i % 2 === 0;
          return (
            <div key={i} className="contents">
              {/* 上方卡片 */}
              <div
                className="flex flex-col justify-end items-center px-2 pb-3"
                style={{ gridColumn: i + 1, gridRow: 1, visibility: up ? "visible" : "hidden" }}
              >
                <Milestone {...l} />
                <span className="w-px h-3 bg-slate-200 mt-2" />
              </div>

              {/* 中间节点 */}
              <div
                className="flex items-center justify-center"
                style={{ gridColumn: i + 1, gridRow: 2 }}
              >
                <span className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-white relative z-10" />
              </div>

              {/* 下方卡片 */}
              <div
                className="flex flex-col justify-start items-center px-2 pt-3"
                style={{ gridColumn: i + 1, gridRow: 3, visibility: up ? "hidden" : "visible" }}
              >
                <span className="w-px h-3 bg-slate-200 mb-2" />
                <Milestone {...l} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Milestone({ type, name, daysAgo }: { type: string; name: string; daysAgo: number }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[11px] font-medium text-violet-600">{type}</span>
        <span className="text-[11px] text-muted">{daysAgo} 天前</span>
      </div>
      <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-lg px-3 py-2 text-sm text-ink max-w-[180px]">
        <Sparkles size={14} className="text-violet-500 shrink-0" />
        <span className="truncate">{name}</span>
      </div>
    </div>
  );
}

/* ---------------- 工具函数 ---------------- */

// 为每位员工生成稳定的 QoderWake 风格 ID
function idFor(id: string): string {
  const map: Record<string, string> = {
    xiaobu: "bcpj6393",
  };
  if (map[id]) return map[id];
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 1000000;
  return id.slice(0, 2) + "pj" + String(1000 + (h % 9000));
}

function describe(identity: string, persona: string, role: string): string {
  return `${identity}${persona}`;
}
