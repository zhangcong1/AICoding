"use client";

import { FileText, Boxes, Palette, Code2, ClipboardCheck } from "lucide-react";
import { getEmployee, WORKFLOW } from "@/lib/data";
import { useStudio } from "@/lib/store";

/**
 * 项目协作流程图 — 严格还原设计图：
 * 需求分析 →绿 技术架构 →紫 UI设计 ⌒紫色分叉⌒ 前端/后端(胶囊) ⌒橙色汇合⌒ 测试验收(橙色虚线环)
 * 圆形节点带虚线描边 + 状态角标(✓)，连线为贝塞尔曲线 + 三角箭头。
 */

const C = {
  green: "#22c55e",
  greenSoft: "#86efac",
  purple: "#8b5cf6",
  purpleSoft: "#c4b5fd",
  orange: "#f59e0b",
  blue: "#3b82f6",
  gray: "#cbd5e1",
};

// 节点 → 对应工作流 stepIndex（用于联动高亮）
const NODE_STEP: Record<string, number> = {
  acai: 0,
  laozhou: 1,
  xiaomu: 2,
  xiaobu: 3,
  akai: 3,
  xiaonuo: 4,
};

export function FlowDiagram() {
  const { tasks, activeTaskId } = useStudio();
  const active = tasks.find((t) => t.id === activeTaskId);
  const lastDone = tasks.find((t) => t.status === "done");
  // 没有进行中的任务时，展示设计图的默认快照（前三步已完成，进行到 UI 设计）
  const step = active ? active.stepIndex : lastDone ? 5 : 2;

  const stateOf = (id: keyof typeof NODE_STEP): "done" | "active" | "pending" => {
    const s = NODE_STEP[id];
    if (step > s) return "done";
    if (step === s) return active ? "active" : "done";
    return "pending";
  };

  return (
    <div id="projects" className="bg-white rounded-2xl shadow-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[15px] font-semibold text-ink">项目协作流程</h2>
        <button className="text-xs text-slate-400 hover:text-blue-500">查看详情</button>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[13px] font-medium text-ink">AI 研发协作平台重构项目</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium">
          {active && active.status !== "done" ? "进行中" : active ? "已交付" : "进行中"}
        </span>
        <span className="text-[11px] text-slate-400">开始时间：2024-05-30 14:00</span>
      </div>

      <div className="w-full flex-1 flex items-center">
        <svg viewBox="0 0 880 200" className="w-full" style={{ height: "auto" }}>
          <defs>
            {arrowMarker("ah-green", C.green)}
            {arrowMarker("ah-purple", C.purple)}
            {arrowMarker("ah-purpleSoft", C.purpleSoft)}
            {arrowMarker("ah-orange", C.orange)}
            {arrowMarker("ah-gray", C.gray)}
          </defs>

          {/* ---- 连线（先画，置于节点下层）---- */}
          {/* 需求 → 技术 */}
          <line x1="86" y1="78" x2="150" y2="78" stroke={lineColor(stateOf("laozhou"), C.green)}
            strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${markerFor(stateOf("laozhou"), "green")})`} />
          {/* 技术 → UI */}
          <line x1="226" y1="78" x2="290" y2="78" stroke={lineColor(stateOf("xiaomu"), C.purpleSoft)}
            strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${markerFor(stateOf("xiaomu"), "purpleSoft")})`} />
          {/* UI → 分叉 → 前端 */}
          <path d="M366,78 C 404,78 408,48 452,48" fill="none"
            stroke={lineColor(stateOf("xiaobu"), C.purple)} strokeWidth="2.5" strokeLinecap="round"
            markerEnd={`url(#${markerFor(stateOf("xiaobu"), "purple")})`} />
          {/* UI → 分叉 → 后端 */}
          <path d="M366,78 C 404,78 408,128 452,128" fill="none"
            stroke={lineColor(stateOf("akai"), C.purple)} strokeWidth="2.5" strokeLinecap="round"
            markerEnd={`url(#${markerFor(stateOf("akai"), "purple")})`} />
          {/* 前端 → 汇合 → 测试（橙色主箭头）*/}
          <path d="M648,48 C 700,48 706,82 742,88" fill="none"
            stroke={lineColor(stateOf("xiaonuo"), C.orange)} strokeWidth="2.5" strokeLinecap="round"
            markerEnd={`url(#${markerFor(stateOf("xiaonuo"), "orange")})`} />
          {/* 后端 → 汇合（紫色细线汇入）*/}
          <path d="M648,128 C 700,128 708,100 740,92" fill="none"
            stroke={lineColor(stateOf("xiaonuo"), C.purpleSoft)} strokeWidth="2" strokeLinecap="round" />

          {/* ---- 节点 ---- */}
          <CircleNode cx={50} cy={78} id="acai" label="需求分析" ring={C.green} state={stateOf("acai")} />
          <CircleNode cx={188} cy={78} id="laozhou" label="技术架构" ring={C.green} state={stateOf("laozhou")} />
          <CircleNode cx={328} cy={78} id="xiaomu" label="UI 设计" ring={C.purple} state={stateOf("xiaomu")} />

          {/* 前端 / 后端 胶囊 */}
          <PillNode x={452} y={28} id="xiaobu" name="小布" label="前端开发" ring={C.blue} state={stateOf("xiaobu")} />
          <PillNode x={452} y={108} id="akai" name="阿凯" label="后端开发" ring={C.purple} state={stateOf("akai")} />

          {/* 测试验收（橙色虚线大环）*/}
          <CircleNode cx={782} cy={88} id="xiaonuo" label="测试验收" ring={C.orange} state={stateOf("xiaonuo")} big />
        </svg>
      </div>

      {/* ---- 阶段产出物 ---- */}
      <Deliverables step={step} active={!!active} />
    </div>
  );
}

const DELIVERABLES = [
  { name: "PRD 文档", phase: "需求分析", Icon: FileText, color: "#3b82f6" },
  { name: "架构设计", phase: "技术架构", Icon: Boxes, color: "#14b8a6" },
  { name: "UI 规范", phase: "UI 设计", Icon: Palette, color: "#ec4899" },
  { name: "前后端代码", phase: "开发实现", Icon: Code2, color: "#8b5cf6" },
  { name: "测试报告", phase: "测试验收", Icon: ClipboardCheck, color: "#f59e0b" },
];

function Deliverables({ step, active }: { step: number; active: boolean }) {
  const done = WORKFLOW.filter((_, i) => step > i || (!active && step === i)).length;
  const progress = Math.round((done / WORKFLOW.length) * 100);

  const stat = (i: number): "done" | "doing" | "wait" => {
    if (step > i || (!active && step === i)) return "done";
    if (active && step === i) return "doing";
    return "wait";
  };
  const BADGE = {
    done: { t: "已完成", c: "bg-emerald-50 text-emerald-600" },
    doing: { t: "进行中", c: "bg-blue-50 text-blue-600" },
    wait: { t: "等待中", c: "bg-slate-100 text-slate-400" },
  };

  return (
    <div className="mt-5 pt-4 border-t border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-medium text-ink">阶段产出物</span>
        <div className="flex items-center gap-2">
          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[11px] text-muted">整体进度 {progress}%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5">
        {DELIVERABLES.map((d, i) => {
          const s = stat(i);
          const b = BADGE[s];
          return (
            <div key={d.name}
              className={`rounded-xl border p-3 transition-colors ${s === "wait" ? "border-slate-100 opacity-70" : "border-slate-150 bg-slate-50/60"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${d.color}14`, color: d.color }}>
                  <d.Icon size={16} />
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${b.c}`}>{b.t}</span>
              </div>
              <div className="text-[13px] font-medium text-ink truncate">{d.name}</div>
              <div className="text-[11px] text-muted">{d.phase}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------ 子组件 ------------------------ */

function CircleNode({
  cx,
  cy,
  id,
  label,
  ring,
  state,
  big,
}: {
  cx: number;
  cy: number;
  id: string;
  label: string;
  ring: string;
  state: "done" | "active" | "pending";
  big?: boolean;
}) {
  const e = getEmployee(id)!;
  const r = big ? 30 : 26;
  const ringColor = state === "pending" ? C.gray : ring;
  return (
    <g>
      {/* 外层虚线环 */}
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={ringColor} strokeWidth="2"
        strokeDasharray="4 4" opacity={state === "pending" ? 0.5 : 1}>
        {state === "active" && (
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1s" repeatCount="indefinite" />
        )}
      </circle>
      {/* 头像 */}
      <image href={e.avatar} x={cx - (r - 4)} y={cy - (r - 4)} width={(r - 4) * 2} height={(r - 4) * 2}
        preserveAspectRatio="xMidYMid slice" opacity={state === "pending" ? 0.55 : 1}
        style={{ clipPath: "circle(50%)" }} />
      {/* 状态角标 */}
      {state !== "pending" && (
        <g transform={`translate(${cx + r - 6},${cy + r - 6})`}>
          <circle r="8" fill={state === "done" ? C.green : ring} />
          {state === "done" ? (
            <path d="M-3.5,0 L-1,2.5 L3.5,-2.5" fill="none" stroke="#fff" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <circle r="2.5" fill="#fff">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      )}
      {/* 标签 */}
      <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize="12" fill="#334155" fontWeight={500}>
        {label}
      </text>
    </g>
  );
}

function PillNode({
  x,
  y,
  id,
  name,
  label,
  ring,
  state,
}: {
  x: number;
  y: number;
  id: string;
  name: string;
  label: string;
  ring: string;
  state: "done" | "active" | "pending";
}) {
  const e = getEmployee(id)!;
  const w = 196;
  const h = 40;
  const cx = x + 22;
  const cy = y + h / 2;
  const ringColor = state === "pending" ? C.gray : ring;
  return (
    <g opacity={state === "pending" ? 0.6 : 1}>
      <rect x={x} y={y} width={w} height={h} rx={h / 2}
        fill="#eef3fd" stroke={state === "active" ? ringColor : "transparent"} strokeWidth="1.5" />
      {/* 头像（带描边环）*/}
      <circle cx={cx} cy={cy} r="17" fill="#fff" stroke={ringColor} strokeWidth="2" strokeDasharray="3 3" />
      <image href={e.avatar} x={cx - 14} y={cy - 14} width={28} height={28}
        style={{ clipPath: "circle(50%)" }} preserveAspectRatio="xMidYMid slice" />
      <text x={cx + 30} y={cy + 4} fontSize="13" fontWeight={600} fill={ring}>
        {name}
      </text>
      <text x={x + w / 2} y={y + h + 15} textAnchor="middle" fontSize="11" fill="#64748b">
        {label}
      </text>
    </g>
  );
}

/* ------------------------ 工具 ------------------------ */

function arrowMarker(id: string, color: string) {
  return (
    <marker id={id} markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L6,3 L0,6" fill="none" stroke={color} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
}

function lineColor(state: "done" | "active" | "pending", base: string) {
  return state === "pending" ? C.gray : base;
}

function markerFor(state: "done" | "active" | "pending", base: string) {
  if (state === "pending") return "ah-gray";
  return `ah-${base}`;
}
