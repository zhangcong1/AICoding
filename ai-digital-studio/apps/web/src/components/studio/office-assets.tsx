'use client'

import type { AgentStatus } from '@ai-studio/shared-types'

export const AGENT_STRIPE: Record<string, string> = {
  pm: '#22c55e',
  architect: '#ef4444',
  ui: '#a855f7',
  fe: '#3b82f6',
  be: '#eab308',
  qa: '#06b6d4',
}

function agentAnimClass(status: AgentStatus | string) {
  if (status === 'working') return 'studio-agent-working'
  if (status === 'thinking') return 'studio-agent-thinking'
  return 'studio-agent-idle'
}

export function MonitorScreen({ status }: { status: AgentStatus | string }) {
  if (status === 'idle') {
    return (
      <g>
        <rect width="56" height="36" rx="2" fill="#1a1a1a" />
        {['z', 'z', 'z'].map((z, i) => (
          <text
            key={i}
            x={18 + i * 12}
            y={20}
            fill="#888"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur={`${1.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="20;12;20"
              dur={`${1.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
            {z}
          </text>
        ))}
      </g>
    )
  }

  if (status === 'working') {
    return (
      <g>
        <rect width="56" height="36" rx="2" fill="#2563eb" />
        <rect x="4" y="4" width="20" height="28" rx="1" fill="#1d4ed8" />
        <rect x="28" y="4" width="24" height="12" rx="1" fill="#93c5fd">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="28" y="20" width="24" height="12" rx="1" fill="#60a5fa">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="6" y="6" width="16" height="3" rx="0.5" fill="#93c5fd" opacity="0.8">
          <animate attributeName="y" values="6;26;6" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="48" y="8" width="2" height="10" fill="#fff">
          <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
      </g>
    )
  }

  if (status === 'thinking') {
    return (
      <g>
        <rect width="56" height="36" rx="2" fill="#7c3aed" />
        {[10, 18, 26].map((y, i) => (
          <rect key={y} x="8" y={y} height="4" rx="1" fill="#c4b5fd">
            <animate
              attributeName="width"
              values={`${20 + i * 8};${36 - i * 4};${20 + i * 8}`}
              dur={`${1 + i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${1 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    )
  }

  if (status === 'error') {
    return (
      <g>
        <rect width="56" height="36" rx="2" fill="#dc2626">
          <animate attributeName="opacity" values="1;0.7;1" dur="0.5s" repeatCount="indefinite" />
        </rect>
        <text x="28" y="24" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="sans-serif">
          !
        </text>
      </g>
    )
  }

  return (
    <g>
      <rect width="56" height="36" rx="2" fill="#f8fafc" />
      <rect x="6" y="6" width="44" height="4" rx="1" fill="#e2e8f0" />
      <rect x="6" y="14" width="36" height="4" rx="1" fill="#e2e8f0" />
      <rect x="6" y="22" width="40" height="4" rx="1" fill="#e2e8f0" />
    </g>
  )
}

export function AgentSilhouette({
  stripe,
  x = 0,
  y = 0,
  scale = 1,
  status = 'idle',
  animClass,
}: {
  stripe: string
  x?: number
  y?: number
  scale?: number
  status?: AgentStatus | string
  animClass?: string
}) {
  const cls = animClass ?? agentAnimClass(status)

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} className={cls}>
      <ellipse cx="24" cy="14" rx="11" ry="12" fill="#111" />
      <path d="M24 2 L27 8 L21 8 Z" fill="#111" />
      <path d="M12 26 Q24 22 36 26 L34 52 Q24 48 14 52 Z" fill="#111" />
      <rect x="14" y="30" width="20" height="5" rx="1" fill={stripe} />
      <ellipse cx="24" cy="54" rx="14" ry="4" fill="#e5e7eb" />
      {status === 'working' && (
        <rect x="32" y="34" width="8" height="4" rx="1" fill="#111" opacity="0.6">
          <animate attributeName="y" values="34;30;34" dur="0.35s" repeatCount="indefinite" />
        </rect>
      )}
      {status === 'thinking' && (
        <>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={36 + i * 5} cy={4 - i * 3} r="2" fill="none" stroke="#999" strokeWidth="1">
              <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="1;3;1" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </>
      )}
    </g>
  )
}

export function FlatWorkstation({
  stripe,
  status,
  name,
}: {
  stripe: string
  status: AgentStatus | string
  name: string
}) {
  const active = status === 'working' || status === 'thinking'

  return (
    <svg viewBox="0 0 180 160" className="w-full drop-shadow-md">
      <ellipse cx="90" cy="148" rx="72" ry="10" fill="#000" opacity="0.06" />

      <rect x="58" y="88" width="64" height="8" rx="4" fill="#f3f4f6" stroke="#e5e7eb" />
      <rect x="66" y="96" width="48" height="36" rx="8" fill="#fafafa" stroke="#e5e7eb" />
      <rect x="72" y="72" width="36" height="20" rx="6" fill="#f3f4f6" stroke="#e5e7eb" />

      <rect x="20" y="58" width="140" height="10" rx="3" fill="#fff" stroke="#e5e7eb" />
      <rect x="28" y="68" width="8" height="52" rx="2" fill="#f9fafb" stroke="#e5e7eb" />
      <rect x="144" y="68" width="8" height="52" rx="2" fill="#f9fafb" stroke="#e5e7eb" />

      <g transform="translate(62, 18)">
        <rect x="-4" y="38" width="64" height="6" rx="2" fill="#d1d5db" />
        <rect x="8" y="42" width="40" height="4" rx="1" fill="#9ca3af" />
        <MonitorScreen status={status} />
      </g>

      <AgentSilhouette stripe={stripe} x={66} y={78} scale={0.95} status={status} />

      {active && (
        <g className="studio-tag-float">
          <rect x="52" y="4" width="76" height="18" rx="9" fill="#3b82f6" />
          <text x="90" y="16" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" fontFamily="sans-serif">
            {name}
          </text>
          <circle cx="130" cy="13" r="3" fill="#86efac">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {active && (
        <ellipse cx="90" cy="80" rx="50" ry="30" fill="none" stroke={stripe} strokeWidth="1" opacity="0.3">
          <animate attributeName="rx" values="50;55;50" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
        </ellipse>
      )}
    </svg>
  )
}

export function IsoDeskUnit({
  stripe,
  status,
  name,
  col,
  row,
}: {
  stripe: string
  status: AgentStatus | string
  name: string
  col: number
  row: number
}) {
  const ox = 155 + col * 108
  const oy = 35 + row * 92
  const active = status === 'working' || status === 'thinking'

  return (
    <g transform={`translate(${ox}, ${oy})`}>
      <path d="M0 30 L50 5 L100 30 L50 55 Z" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      <path d="M0 30 L0 50 L50 75 L50 55 Z" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />
      <path d="M50 55 L50 75 L100 50 L100 30 Z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />

      <g transform="translate(22, -8)">
        <MonitorScreen status={status} />
      </g>

      <ellipse cx="50" cy="68" rx="18" ry="8" fill="#fafafa" stroke="#e5e7eb" />
      <AgentSilhouette stripe={stripe} x={26} y={38} scale={0.75} status={status} />

      {active && (
        <g>
          <path
            d="M-4 26 L54 1 L104 26 L50 51 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
          </path>
          <g className="studio-tag-float">
            <rect x="20" y="-18" width="60" height="16" rx="8" fill="#3b82f6" />
            <text x="50" y="-7" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="600" fontFamily="sans-serif">
              {name}
            </text>
          </g>
          <ellipse cx="50" cy="40" rx="40" ry="20" fill={stripe} opacity="0.15">
            <animate attributeName="opacity" values="0.1;0.25;0.1" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}
    </g>
  )
}

export function CoffeeBar() {
  return (
    <g transform="translate(20, 20)">
      <rect x="0" y="40" width="80" height="50" rx="4" fill="#fff" stroke="#e5e7eb" />
      <rect x="10" y="20" width="60" height="24" rx="3" fill="#f3f4f6" stroke="#e5e7eb" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${14 + i * 16}, 8)`}>
          <rect x="0" y="8" width="10" height="12" rx="2" fill="#92400e" />
          <ellipse cx="5" cy="8" rx="6" ry="3" fill="#d97706" />
          {[0, 1].map((s) => (
            <ellipse key={s} cx={5 + s * 2} cy={4} rx="2" ry="3" fill="#d1d5db" opacity="0">
              <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin={`${i * 0.4 + s * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="4;-4;4" dur="2s" begin={`${i * 0.4 + s * 0.5}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </g>
      ))}
    </g>
  )
}

export function TreadmillScene({ label }: { label: string }) {
  return (
    <g transform="translate(20, 120)">
      <rect x="0" y="30" width="80" height="40" rx="4" fill="#fff" stroke="#e5e7eb" />
      <rect x="10" y="10" width="60" height="24" rx="2" fill="#f3f4f6" stroke="#e5e7eb" />
      {/* treadmill belt */}
      <line x1="14" y1="28" x2="66" y2="28" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.5s" repeatCount="indefinite" />
      </line>
      <g className="studio-run-bounce">
        <AgentSilhouette stripe="#06b6d4" x={18} y={0} scale={0.55} status="working" />
      </g>
      <text x="40" y="78" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="sans-serif">
        {label}
      </text>
    </g>
  )
}

export function SofaScene({ label }: { label: string }) {
  return (
    <g transform="translate(20, 210)">
      <rect x="0" y="30" width="80" height="40" rx="4" fill="#fff" stroke="#e5e7eb" />
      <rect x="8" y="18" width="64" height="20" rx="6" fill="#fafafa" stroke="#e5e7eb" />
      <AgentSilhouette stripe="#3b82f6" x={20} y={4} scale={0.55} status="thinking" />
      <text x="40" y="78" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="sans-serif">
        {label}
      </text>
    </g>
  )
}

/** 工位之间的任务流动线 */
export function TaskFlowLines({ activeIndices }: { activeIndices: number[] }) {
  const paths = [
    'M260,90 L320,90',
    'M370,90 L430,90',
    'M320,90 L320,170',
    'M260,170 L320,170',
    'M370,170 L430,170',
  ]

  return (
    <g opacity="0.5">
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
          </path>
          {activeIndices.includes(i) && (
            <circle r="3" fill="#3b82f6">
              <animateMotion dur="2s" repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}
    </g>
  )
}
