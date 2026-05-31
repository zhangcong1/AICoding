import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AgentId, AgentInfo } from '@ai-studio/shared-types'
import type { AgentState } from '@/lib/db/schema'

const statusRing: Record<string, string> = {
  idle: 'ring-slate-200',
  thinking: 'ring-violet-300',
  working: 'ring-cyan-300',
  completed: 'ring-emerald-300',
  error: 'ring-red-300',
}

export function AgentCard({
  agent,
  state,
}: {
  agent: AgentInfo
  state?: AgentState
}) {
  const status = state?.status ?? agent.status

  return (
    <Card className={`ring-2 ${statusRing[status] ?? 'ring-slate-200'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{agent.avatar}</span>
          <Badge status={status} />
        </div>
        <CardTitle className="text-lg">{agent.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{agent.role}</p>
      </CardContent>
    </Card>
  )
}

export function AgentGrid({
  agents,
  states,
  linkToDetail = false,
}: {
  agents: AgentInfo[]
  states: AgentState[]
  linkToDetail?: boolean
}) {
  const stateMap = new Map(states.map((s) => [s.agentId as AgentId, s]))

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent) => {
        const card = (
          <AgentCard
            agent={agent}
            state={stateMap.get(agent.id)}
          />
        )

        if (!linkToDetail) return <div key={agent.id}>{card}</div>

        return (
          <Link
            key={agent.id}
            href={`/employees/${agent.id}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            {card}
          </Link>
        )
      })}
    </div>
  )
}
