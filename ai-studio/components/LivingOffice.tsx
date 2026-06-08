"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Lightbulb, Code2, Users, Check, Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  useSceneSimulation,
  STATE_META,
  agentSprite,
  SceneAgent,
  SceneState,
} from "@/lib/scene";

const STATE_ICON: Record<SceneState, React.ComponentType<{ size?: number; className?: string }>> = {
  idle: Moon,
  thinking: Lightbulb,
  working: Code2,
  meeting: Users,
  completed: Check,
};

function StateIcon({ state }: { state: SceneState }) {
  const Icon = STATE_ICON[state];
  const meta = STATE_META[state];
  return (
    <span
      className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center ring-2 ring-[#0d111a] shadow-lg"
      style={{ background: meta.color }}
    >
      <Icon size={13} className="text-[#0d111a]" />
    </span>
  );
}

function Character({ agent }: { agent: SceneAgent }) {
  const meta = STATE_META[agent.state];
  const working = agent.state === "working";
  return (
    <motion.div
      className="absolute z-10"
      initial={false}
      animate={{ left: `${agent.x}%`, top: `${agent.y}%` }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <Link href={`/employees/${agent.id}`} className="block group">
        {/* 气泡 */}
        <AnimatePresence>
          {agent.bubble && (
            <motion.div
              key={agent.bubble}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap max-w-[160px] truncate
                         px-2.5 py-1 rounded-xl text-[11px] font-medium text-white
                         bg-[#1b2230]/95 ring-1 ring-white/10 shadow-xl"
            >
              {agent.bubble}
              <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1b2230]/95 ring-1 ring-white/10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 头像瓷砖 */}
        <div className="relative">
          <div
            className="relative w-[88px] h-[74px] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-105"
            style={{
              boxShadow: `0 0 0 2px ${meta.ring}, 0 0 22px ${meta.ring}`,
            }}
          >
            <Image
              src={agentSprite(agent.id, agent.state)}
              alt={`${agent.name} ${meta.label}`}
              fill
              sizes="88px"
              className="object-cover"
            />
            {working && (
              <span className="absolute inset-0 ring-2 ring-cyan-300/0 animate-pulse" />
            )}
          </div>
          <StateIcon state={agent.state} />
        </div>

        {/* 名牌 */}
        <div className="mt-1 flex flex-col items-center">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-white bg-black/45 backdrop-blur">
            {agent.name}
          </span>
          <span className="mt-0.5 text-[9px]" style={{ color: meta.color }}>
            {meta.label}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function LivingOffice() {
  const { agents, running, taskTitle, activeIds, runTask, reset } = useSceneSimulation();
  const [input, setInput] = useState("");

  // 连线：活跃员工之间的霓虹流
  const activeAgents = agents.filter((a) => activeIds.includes(a.id));

  const counts = agents.reduce(
    (acc, a) => ((acc[a.state] = (acc[a.state] ?? 0) + 1), acc),
    {} as Record<SceneState, number>
  );

  return (
    <div className="space-y-4">
      {/* 工具条 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px] flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !running && (runTask(input), setInput(""))}
            placeholder="输入一个需求，看全员协作流转…"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm text-white
                       placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400/50"
          />
          <button
            disabled={running}
            onClick={() => {
              runTask(input || "实现用户登录页面");
              setInput("");
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500
                       text-white text-sm font-medium disabled:opacity-40 hover:opacity-90 transition shadow-glow"
          >
            <Play size={15} /> {running ? "协作中…" : "派发任务"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/8 ring-1 ring-white/10 text-slate-300 text-sm hover:bg-white/15 transition"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* 状态统计 */}
        <div className="flex items-center gap-2">
          {(Object.keys(STATE_META) as SceneState[]).map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
              style={{ background: `${STATE_META[s].color}22`, color: STATE_META[s].color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATE_META[s].color }} />
              {STATE_META[s].label} {counts[s] ?? 0}
            </span>
          ))}
        </div>
      </div>

      {/* 场景舞台 */}
      <div
        className="relative w-full rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
        style={{ aspectRatio: "16 / 9", minHeight: 420 }}
      >
        {/* 背景：夜间办公室氛围 */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#1e2745_0%,#121826_55%,#0b0f18_100%)]" />
        {/* 透视地板网格 */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,92,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            transform: "perspective(520px) rotateX(58deg)",
            transformOrigin: "bottom",
          }}
        />

        {/* 会议桌（中心） */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] h-[18%] rounded-[50%]
                     bg-white/[0.04] ring-1 ring-white/10"
          style={{ transform: "translate(-50%,-50%) perspective(400px) rotateX(55deg)" }}
        />

        {/* 霓虹协作连线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {activeAgents.length >= 2 &&
            activeAgents.slice(1).map((a, i) => {
              const from = activeAgents[i];
              return (
                <line
                  key={a.id}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${a.x}%`}
                  y2={`${a.y}%`}
                  stroke="url(#flow)"
                  strokeWidth={2}
                  strokeDasharray="6 8"
                  className="flow-line"
                />
              );
            })}
          <defs>
            <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* 工位桌（每位员工 home 位置下方）*/}
        {agents.map((a) => (
          <div
            key={`desk-${a.id}`}
            className="absolute z-0 w-[120px] -translate-x-1/2"
            style={{ left: `${a.homeX}%`, top: `calc(${a.homeY}% + 46px)` }}
          >
            <Image
              src={`/assets/desks/${a.id}.png`}
              alt=""
              width={120}
              height={80}
              className="w-full h-auto opacity-90 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            />
          </div>
        ))}

        {/* 角色 */}
        {agents.map((a) => (
          <Character key={a.id} agent={a} />
        ))}

        {/* 任务横幅 */}
        <AnimatePresence>
          {taskTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full
                         bg-black/50 backdrop-blur ring-1 ring-cyan-400/30 text-sm text-white"
            >
              🚀 协作进行中：<span className="font-semibold text-cyan-300">{taskTitle}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
