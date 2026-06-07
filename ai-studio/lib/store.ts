"use client";

import { create } from "zustand";
import { AgentId, AgentStatus, EMPLOYEES, WORKFLOW } from "./data";

export interface TaskRun {
  id: string;
  title: string;
  createdAt: number;
  stepIndex: number; // 当前进行到第几步 (-1 未开始, WORKFLOW.length 完成)
  status: "running" | "done";
  log: { time: number; agent: AgentId; text: string }[];
}

interface StudioState {
  status: Record<AgentId, AgentStatus>;
  runs: Record<AgentId, number>; // 累计干活次数（会随任务增长）
  tasks: TaskRun[];
  activeTaskId: string | null;
  timer: ReturnType<typeof setInterval> | null;

  submitTask: (title: string) => void;
  reset: () => void;
}

const baseStatus = () =>
  EMPLOYEES.reduce(
    (acc, e) => ((acc[e.id] = "idle"), acc),
    {} as Record<AgentId, AgentStatus>
  );

const baseRuns = () =>
  EMPLOYEES.reduce(
    (acc, e) => ((acc[e.id] = e.stats.totalRuns), acc),
    {} as Record<AgentId, number>
  );

const STEP_MS = 2600;

export const useStudio = create<StudioState>((set, get) => ({
  status: baseStatus(),
  runs: baseRuns(),
  tasks: [],
  activeTaskId: null,
  timer: null,

  submitTask: (title: string) => {
    const prev = get().timer;
    if (prev) clearInterval(prev);

    const id = `T-${Date.now().toString().slice(-6)}`;
    const task: TaskRun = {
      id,
      title: title.trim() || "未命名需求",
      createdAt: Date.now(),
      stepIndex: -1,
      status: "running",
      log: [],
    };

    set((s) => ({
      tasks: [task, ...s.tasks],
      activeTaskId: id,
      status: baseStatus(),
    }));

    const advance = () => {
      const state = get();
      const t = state.tasks.find((x) => x.id === id);
      if (!t) return;
      const next = t.stepIndex + 1;

      // 把上一步的人标记完成 → 回到 idle
      const newStatus = { ...state.status };
      if (t.stepIndex >= 0) {
        WORKFLOW[t.stepIndex].agents.forEach((a) => (newStatus[a] = "idle"));
      }

      if (next >= WORKFLOW.length) {
        if (state.timer) clearInterval(state.timer);
        set((s) => ({
          status: newStatus,
          timer: null,
          activeTaskId: null,
          tasks: s.tasks.map((x) =>
            x.id === id ? { ...x, stepIndex: WORKFLOW.length, status: "done" } : x
          ),
        }));
        return;
      }

      const step = WORKFLOW[next];
      const newRuns = { ...state.runs };
      const logEntries = step.agents.map((a) => {
        newStatus[a] = "working";
        newRuns[a] = (newRuns[a] ?? 0) + 1;
        const emp = EMPLOYEES.find((e) => e.id === a)!;
        return { time: Date.now(), agent: a, text: `${emp.name} 开始「${step.label}」，产出 ${step.artifact}` };
      });

      set((s) => ({
        status: newStatus,
        runs: newRuns,
        tasks: s.tasks.map((x) =>
          x.id === id
            ? { ...x, stepIndex: next, log: [...x.log, ...logEntries] }
            : x
        ),
      }));
    };

    // 立即走第一步，然后定时推进
    advance();
    const timer = setInterval(advance, STEP_MS);
    set({ timer });
  },

  reset: () => {
    const t = get().timer;
    if (t) clearInterval(t);
    set({ status: baseStatus(), runs: baseRuns(), tasks: [], activeTaskId: null, timer: null });
  },
}));
