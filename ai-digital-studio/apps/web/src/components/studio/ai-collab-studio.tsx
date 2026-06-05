'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Home,
  FolderOpen,
  CheckSquare,
  BarChart3,
  Users,
  Percent,
  List,
  Clock,
} from 'lucide-react'

/* ================================================
   Studio Data
   ================================================ */

const STUDIO_METRICS = [
  { label: '项目数', value: '12', Icon: FolderOpen },
  { label: '任务数', value: '48', Icon: List },
  { label: '完成率', value: '78%', Icon: Percent },
  { label: '平均响应时间', value: '2h 15m', Icon: Clock },
  { label: '团队活跃度', value: '86%', Icon: Users },
]

const STUDIO_TODAY = { projects: 3, tasks: 12 }

const WORKSTATION_MEMBERS = [
  { id: 'pm', name: '阿策', role: '产品经理', avatar: '/avatars/ace-pm.png', color: '#22c55e', status: 'working', x: 120, y: 200 },
  { id: 'architect', name: '老周', role: '架构师', avatar: '/avatars/zhou-architect.png', color: '#ef4444', status: 'thinking', x: 340, y: 120 },
  { id: 'ui', name: '小沐', role: '设计师', avatar: '/avatars/mu-designer.png', color: '#a855f7', status: 'working', x: 560, y: 200 },
  { id: 'fe', name: '小布', role: '前端', avatar: '/avatars/bu-frontend.png', color: '#3b82f6', status: 'working', x: 440, y: 340 },
  { id: 'be', name: '阿凯', role: '后端', avatar: '/avatars/kai-backend.png', color: '#eab308', status: 'idle', x: 220, y: 340 },
  { id: 'qa', name: '小诺', role: '测试', avatar: '/avatars/nuo-qa.png', color: '#06b6d4', status: 'idle', x: 340, y: 420 },
]

const FLOW_LINES = [
  { from: 'pm', to: 'architect', color: '#22c55e', active: true },
  { from: 'architect', to: 'ui', color: '#a855f7', active: true },
  { from: 'ui', to: 'fe', color: '#3b82f6', active: true },
  { from: 'fe', to: 'be', color: '#eab308', active: false },
  { from: 'be', to: 'qa', color: '#06b6d4', active: false },
  { from: 'qa', to: 'pm', color: '#22c55e', active: false },
]

const PROFILE_USER = {
  name: '张三',
  role: '项目经理',
  avatar: '/avatars/ace-pm.png',
  department: '技术部',
  joinDate: '2022-03-15',
  currentProject: 'AI智能客服系统',
  progress: 65,
  remainingDays: 12,
  metrics: [
    { label: '需求变更率', value: '8%' },
    { label: '缺陷密度', value: '0.32' },
    { label: '代码覆盖率', value: '89%' },
  ],
}

/* ================================================
   Workstation SVG
   ================================================ */

function WorkstationSVG({ member }: { member: (typeof WORKSTATION_MEMBERS)[number] }) {
  const active = member.status === 'working' || member.status === 'thinking'
  return (
    <g transform={`translate(${member.x - 40}, ${member.y - 30})`}>
      {/* Desk surface */}
      <rect x="0" y="40" width="80" height="8" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      {/* Monitor */}
      <rect x="16" y="6" width="48" height="32" rx="3" fill={active ? member.color : '#1a1a1a'} opacity={active ? 0.9 : 0.8} />
      {active && (
        <>
          <rect x="20" y="10" width="18" height="24" rx="1" fill="rgba(255,255,255,0.2)" />
          <rect x="42" y="10" width="18" height="10" rx="1" fill="rgba(255,255,255,0.3)">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
          </rect>
          <rect x="42" y="24" width="18" height="10" rx="1" fill="rgba(255,255,255,0.15)">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </>
      )}
      {!active && (
        <>
          {['z', 'z', 'z'].map((z, i) => (
            <text key={i} x={30 + i * 10} y={26} fill="#888" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              <animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="y" values="26;18;26" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              {z}
            </text>
          ))}
        </>
      )}
      {/* Monitor stand */}
      <rect x="34" y="38" width="12" height="4" rx="1" fill="#d1d5db" />
      {/* Person silhouette */}
      <ellipse cx="40" cy="64" rx="12" ry="6" fill="#f9fafb" stroke="#e5e7eb" />
      <ellipse cx="40" cy="56" rx="8" ry="9" fill="#111" />
      <path d="M30 65 Q40 60 50 65 L48 80 Q40 76 32 80 Z" fill="#111" />
      <rect x="30" y="70" width="20" height="4" rx="1" fill={member.color} />
      {/* Name label */}
      <g>
        <rect x="12" y="86" width="56" height="18" rx="9" fill={active ? member.color : '#6b7280'} opacity={0.9} />
        <text x="40" y="98" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          {member.name}
        </text>
        {active && (
          <circle cx="62" cy="95" r="3" fill="#86efac">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
        )}
      </g>
      {/* Activity glow */}
      {active && (
        <ellipse cx="40" cy="50" rx="35" ry="22" fill="none" stroke={member.color} strokeWidth="1.5" opacity="0.2">
          <animate attributeName="rx" values="35;40;35" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite" />
        </ellipse>
      )}
    </g>
  )
}

/* ================================================
   Flow Lines SVG
   ================================================ */

function FlowLinesSVG({ members, lines }: {
  members: typeof WORKSTATION_MEMBERS
  lines: typeof FLOW_LINES
}) {
  const memberMap = Object.fromEntries(members.map((m) => [m.id, m]))
  return (
    <g>
      {lines.map((line, i) => {
        const from = memberMap[line.from]
        const to = memberMap[line.to]
        if (!from || !to) return null
        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2 - 30
        const d = `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`
        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={line.color}
              strokeWidth={line.active ? 2 : 1.5}
              strokeDasharray="6 4"
              opacity={line.active ? 0.7 : 0.25}
            >
              <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
            </path>
            {line.active && (
              <circle r="4" fill={line.color} opacity="0.9">
                <animateMotion dur="3s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        )
      })}
    </g>
  )
}

/* ================================================
   Office Decorations SVG
   ================================================ */

function OfficeDecorSVG() {
  return (
    <g>
      {/* Plants */}
      <g transform="translate(40, 80)">
        <rect x="8" y="20" width="14" height="16" rx="3" fill="#d1d5db" />
        <ellipse cx="15" cy="16" rx="10" ry="12" fill="#22c55e" opacity="0.7" />
        <ellipse cx="12" cy="12" rx="6" ry="8" fill="#16a34a" opacity="0.5" />
      </g>
      <g transform="translate(600, 380)">
        <rect x="8" y="20" width="14" height="16" rx="3" fill="#d1d5db" />
        <ellipse cx="15" cy="16" rx="10" ry="12" fill="#22c55e" opacity="0.7" />
      </g>
      {/* Shelf */}
      <g transform="translate(580, 60)">
        <rect x="0" y="0" width="80" height="6" rx="2" fill="#e5e7eb" />
        <rect x="8" y="-14" width="10" height="14" rx="1" fill="#3b82f6" opacity="0.3" />
        <rect x="24" y="-10" width="8" height="10" rx="1" fill="#a855f7" opacity="0.3" />
        <rect x="40" y="-18" width="12" height="18" rx="1" fill="#ef4444" opacity="0.2" />
        <rect x="58" y="-8" width="14" height="8" rx="1" fill="#eab308" opacity="0.3" />
      </g>
      {/* Coffee area */}
      <g transform="translate(50, 400)">
        <rect x="0" y="0" width="60" height="30" rx="4" fill="#fff" stroke="#e5e7eb" />
        <rect x="8" y="-12" width="14" height="14" rx="3" fill="#92400e" opacity="0.6" />
        <rect x="28" y="-10" width="12" height="12" rx="3" fill="#d97706" opacity="0.5" />
        <ellipse cx="15" cy="-18" rx="3" ry="4" fill="#d1d5db" opacity="0">
          <animate attributeName="opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="-18;-28;-18" dur="2.5s" repeatCount="indefinite" />
        </ellipse>
      </g>
      {/* Floor grid dots */}
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={30 + col * 42} cy={30 + row * 35} r="1" fill="#e5e7eb" opacity="0.4" />
        ))
      )}
    </g>
  )
}

/* ================================================
   Left Panel (Metrics Sidebar)
   ================================================ */

const LEFT_NAV = [
  { Icon: Home, label: '工作台' },
  { Icon: FolderOpen, label: '项目管理', active: true },
  { Icon: CheckSquare, label: '任务管理' },
  { Icon: BarChart3, label: '数据报表' },
  { Icon: Users, label: '团队成员' },
]

function StudioLeftPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="studio-left-panel">
      <div className="studio-left-header">
        <button className="studio-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <div className="studio-project-id">3029项目</div>
          <div className="studio-studio-id">工作室ID</div>
        </div>
      </div>

      <nav className="studio-left-nav">
        {LEFT_NAV.map((item) => (
          <button key={item.label} className={`studio-nav-btn${item.active ? ' active' : ''}`}>
            <item.Icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="studio-metrics-section">
        <div className="studio-metrics-title">项目指标</div>
        {STUDIO_METRICS.map((m) => (
          <div key={m.label} className="studio-metric-row">
            <span className="studio-metric-label">{m.label}</span>
            <span className="studio-metric-value">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="studio-today-section">
        <div className="studio-metrics-title">今日新增</div>
        <div className="studio-today-row">
          <div className="studio-today-item">
            <span className="studio-today-num">{STUDIO_TODAY.projects}</span>
            <span className="studio-today-label">项目</span>
          </div>
          <div className="studio-today-item">
            <span className="studio-today-num">{STUDIO_TODAY.tasks}</span>
            <span className="studio-today-label">任务</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================
   Center (Office Map)
   ================================================ */

function StudioCenter() {
  return (
    <div className="studio-center">
      <div className="studio-center-header">
        <h1 className="studio-title">AI 智能协作工作室</h1>
        <p className="studio-subtitle">实时团队协作状态可视化</p>
      </div>
      <div className="studio-map-container">
        <svg viewBox="0 0 680 500" className="studio-map-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="studio-bg-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f8f9fb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="680" height="500" fill="url(#studio-bg-glow)" />
          <OfficeDecorSVG />
          <FlowLinesSVG members={WORKSTATION_MEMBERS} lines={FLOW_LINES} />
          {WORKSTATION_MEMBERS.map((member) => (
            <WorkstationSVG key={member.id} member={member} />
          ))}
        </svg>
      </div>
    </div>
  )
}

/* ================================================
   Right Panel (User Profile + 3D Shape)
   ================================================ */

function StudioRightPanel() {
  return (
    <div className="studio-right-panel">
      {/* User Avatar & Name */}
      <div className="studio-profile-header">
        <div className="studio-profile-avatar">
          <img src={PROFILE_USER.avatar} alt={PROFILE_USER.name} />
        </div>
        <div>
          <div className="studio-profile-name">{PROFILE_USER.name}</div>
          <div className="studio-profile-role">{PROFILE_USER.role}</div>
        </div>
      </div>

      {/* Info Card */}
      <div className="studio-info-card">
        <div className="studio-info-row">
          <span className="studio-info-label">所属部门</span>
          <span className="studio-info-value">{PROFILE_USER.department}</span>
        </div>
        <div className="studio-info-row">
          <span className="studio-info-label">入职时间</span>
          <span className="studio-info-value">{PROFILE_USER.joinDate}</span>
        </div>
        <div className="studio-info-row">
          <span className="studio-info-label">当前项目</span>
          <span className="studio-info-value studio-info-value--highlight">{PROFILE_USER.currentProject}</span>
        </div>
        <div className="studio-info-row studio-info-row--stacked">
          <span className="studio-info-label">项目进度</span>
          <div className="studio-progress-bar">
            <div className="studio-progress-fill" style={{ width: `${PROFILE_USER.progress}%` }} />
            <span className="studio-progress-text">{PROFILE_USER.progress}%</span>
          </div>
        </div>
        <div className="studio-info-row">
          <span className="studio-info-label">剩余工期</span>
          <span className="studio-info-value">{PROFILE_USER.remainingDays}天</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="studio-key-metrics">
        <div className="studio-metrics-title">关键指标</div>
        {PROFILE_USER.metrics.map((m) => (
          <div key={m.label} className="studio-metric-row">
            <span className="studio-metric-label">{m.label}</span>
            <span className="studio-metric-value">{m.value}</span>
          </div>
        ))}
      </div>

      {/* 3D Geometric Shape */}
      <div className="studio-3d-section">
        <div className="studio-3d-label">模型结构</div>
        <div className="studio-3d-container">
          <div className="cube-wrapper">
            <div className="cube">
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================
   AI Collaboration Studio (main export)
   ================================================ */

export default function AiCollabStudio({ onBack }: { onBack?: () => void }) {
  return (
    <div className="studio-layout">
      <StudioLeftPanel onBack={onBack ?? (() => window.history.back())} />
      <StudioCenter />
      <StudioRightPanel />
    </div>
  )
}
