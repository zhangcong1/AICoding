import clsx from "clsx";
import { AgentStatus } from "@/lib/data";

const MAP: Record<AgentStatus, { label: string; cls: string; dot: string }> = {
  idle: { label: "空闲", cls: "bg-slate-100 text-slate-500", dot: "bg-slate-400" },
  thinking: { label: "思考中", cls: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  working: { label: "工作中", cls: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  done: { label: "已完成", cls: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const s = MAP[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium",
        s.cls
      )}
    >
      <span className={clsx("w-1.5 h-1.5 rounded-full", s.dot, status === "working" && "animate-pulse")} />
      {s.label}
    </span>
  );
}
