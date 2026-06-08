"use client";

// ============================================================
// 活体办公室场景 — 状态机与模拟引擎 (参照 pixel-agents)
// 5 种状态: idle / thinking / working / meeting / completed
// 自带「氛围模拟」(空闲时随机切换 + 定时开会) + 「任务工作流」驱动
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import { AgentId, WORKFLOW, getEmployee } from "./data";

export type SceneState =
  | "idle"
  | "thinking"
  | "working"
  | "meeting"
  | "completed";

export const STATE_META: Record<
  SceneState,
  { label: string; color: string; ring: string; icon: string }
> = {
  idle: { label: "空闲", color: "#94a3b8", ring: "rgba(148,163,184,0.45)", icon: "moon" },
  thinking: { label: "思考中", color: "#f59e0b", ring: "rgba(245,158,11,0.75)", icon: "lightbulb" },
  working: { label: "工作中", color: "#22d3ee", ring: "rgba(34,211,238,0.85)", icon: "code" },
  meeting: { label: "会议中", color: "#a855f7", ring: "rgba(168,85,247,0.85)", icon: "users" },
  completed: { label: "完成", color: "#10b981", ring: "rgba(16,185,129,0.9)", icon: "check" },
};

// 出现在场景里的 6 位员工（与素材列一一对应）
export const SCENE_AGENTS: AgentId[] = [
  "acai",
  "laozhou",
  "xiaomu",
  "xiaobu",
  "akai",
  "xiaonuo",
];

// 工位坐标（百分比，2 排 × 3 列）
const SEATS: Partial<Record<AgentId, { x: number; y: number }>> = {
  acai: { x: 18, y: 30 },
  laozhou: { x: 50, y: 26 },
  xiaomu: { x: 82, y: 30 },
  xiaobu: { x: 18, y: 72 },
  akai: { x: 50, y: 76 },
  xiaonuo: { x: 82, y: 72 },
};

// 会议区围坐位置（中心区域）
const MEETING_SLOTS = [
  { x: 38, y: 45 },
  { x: 62, y: 45 },
  { x: 38, y: 58 },
  { x: 62, y: 58 },
];

// 角色专属台词
const THINK_LINES: Record<AgentId, string[]> = {
  acai: ["用户真正要的是什么？", "这个需求得拆一下…"],
  laozhou: ["这里有个坑…", "架构要留点余地"],
  xiaomu: ["这里间距不对", "再调一下层级"],
  xiaobu: ["这个可以封装一下", "状态管理理一理"],
  akai: ["这个得加事务", "接口幂等别忘了"],
  xiaonuo: ["边界情况测了吗？", "用户乱点会怎样"],
} as Record<AgentId, string[]>;

const IDLE_LINES = ["☕ 接杯咖啡", "伸个懒腰~", "看会儿文档", "歇一下"];
const WORK_LINES = ["敲代码中…", "处理中…", "专注ing"];
const MEET_LINES = ["同步下进度", "对齐一下方案", "我说两句"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface SceneAgent {
  id: AgentId;
  name: string;
  role: string;
  accent: string;
  state: SceneState;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  bubble: string | null;
}

// 图片路径：/assets/states/{id}/{state}.png
export function agentSprite(id: AgentId, state: SceneState) {
  return `/assets/states/${id}/${state}.png`;
}

const TICK_MS = 2800; // 氛围切换节奏
const MEETING_EVERY = 22000; // 多久自动开一次站会
const MEETING_DUR = 8000; // 站会持续时间
const STEP_MS = 2600; // 任务每步推进

function initAgents(): SceneAgent[] {
  return SCENE_AGENTS.map((id) => {
    const e = getEmployee(id)!;
    const seat = SEATS[id]!;
    return {
      id,
      name: e.name,
      role: e.role,
      accent: e.accent,
      state: "idle" as SceneState,
      x: seat.x,
      y: seat.y,
      homeX: seat.x,
      homeY: seat.y,
      bubble: null,
    };
  });
}

export interface SceneController {
  agents: SceneAgent[];
  running: boolean;
  taskTitle: string | null;
  /** 当前工作流步骤里正在干活的人（用于画连线） */
  activeIds: AgentId[];
  runTask: (title: string) => void;
  reset: () => void;
}

export function useSceneSimulation(): SceneController {
  const [agents, setAgents] = useState<SceneAgent[]>(initAgents);
  const [running, setRunning] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string | null>(null);
  const [activeIds, setActiveIds] = useState<AgentId[]>([]);

  const busyRef = useRef(false); // 任务运行中 → 暂停氛围模拟
  const meetingRef = useRef(false); // 站会进行中
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  // ---------- 氛围模拟：随机状态切换 ----------
  useEffect(() => {
    const tick = setInterval(() => {
      if (busyRef.current) return;
      setAgents((prev) =>
        prev.map((a) => {
          if (meetingRef.current && a.state === "meeting") return a; // 开会中不打扰
          const r = Math.random();
          let next: SceneState = a.state;
          if (a.state === "working") next = r < 0.3 ? "thinking" : r < 0.45 ? "idle" : "working";
          else if (a.state === "thinking") next = r < 0.55 ? "working" : r < 0.7 ? "idle" : "thinking";
          else if (a.state === "completed") next = "idle";
          else next = r < 0.5 ? "working" : r < 0.75 ? "thinking" : "idle"; // idle
          let bubble: string | null = null;
          if (next === "thinking") bubble = pick(THINK_LINES[a.id]);
          else if (next === "working" && Math.random() < 0.4) bubble = pick(WORK_LINES);
          else if (next === "idle" && Math.random() < 0.35) bubble = pick(IDLE_LINES);
          return { ...a, state: next, bubble };
        })
      );
    }, TICK_MS);
    return () => clearInterval(tick);
  }, []);

  // ---------- 定时站会 ----------
  useEffect(() => {
    let round = 0;
    const meet = setInterval(() => {
      if (busyRef.current || meetingRef.current) return;
      meetingRef.current = true;
      const attendees = SCENE_AGENTS.slice(round % 2 === 0 ? 0 : 2, (round % 2 === 0 ? 0 : 2) + 3);
      round++;
      setAgents((prev) =>
        prev.map((a) => {
          const idx = attendees.indexOf(a.id);
          if (idx === -1) return a;
          const slot = MEETING_SLOTS[idx] ?? MEETING_SLOTS[0];
          return { ...a, state: "meeting", x: slot.x, y: slot.y, bubble: pick(MEET_LINES) };
        })
      );
      later(() => {
        setAgents((prev) =>
          prev.map((a) =>
            attendees.includes(a.id)
              ? { ...a, state: "working", x: a.homeX, y: a.homeY, bubble: null }
              : a
          )
        );
        meetingRef.current = false;
      }, MEETING_DUR);
    }, MEETING_EVERY);
    return () => clearInterval(meet);
  }, []);

  useEffect(() => () => clearTimers(), []);

  // ---------- 任务工作流驱动 ----------
  const runTask = useCallback((title: string) => {
    clearTimers();
    busyRef.current = true;
    meetingRef.current = false;
    setRunning(true);
    setTaskTitle(title.trim() || "未命名需求");

    // 全员回工位、复位
    setAgents((prev) =>
      prev.map((a) => ({ ...a, state: "idle", x: a.homeX, y: a.homeY, bubble: null }))
    );

    WORKFLOW.forEach((step, i) => {
      later(() => {
        setActiveIds(step.agents);
        setAgents((prev) =>
          prev.map((a) => {
            // 上一步的人 → 完成
            const prevStep = WORKFLOW[i - 1];
            if (prevStep && prevStep.agents.includes(a.id)) {
              return { ...a, state: "completed", bubble: "✅ 交付" };
            }
            // 本步的人 → 工作中
            if (step.agents.includes(a.id)) {
              return { ...a, state: "working", bubble: step.artifact };
            }
            return a;
          })
        );
      }, i * STEP_MS + 300);
    });

    // 收尾：全员完成 → 回到空闲
    const endAt = WORKFLOW.length * STEP_MS + 600;
    later(() => {
      setActiveIds([]);
      setAgents((prev) => prev.map((a) => ({ ...a, state: "completed", bubble: "🎉 完成" })));
    }, endAt);
    later(() => {
      setAgents((prev) => prev.map((a) => ({ ...a, state: "idle", bubble: null })));
      setRunning(false);
      setTaskTitle(null);
      busyRef.current = false;
    }, endAt + 2400);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    busyRef.current = false;
    meetingRef.current = false;
    setRunning(false);
    setTaskTitle(null);
    setActiveIds([]);
    setAgents(initAgents());
  }, []);

  return { agents, running, taskTitle, activeIds, runTask, reset };
}
