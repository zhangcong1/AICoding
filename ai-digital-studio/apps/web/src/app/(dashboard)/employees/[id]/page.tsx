import { notFound } from 'next/navigation'
import { eq, desc } from 'drizzle-orm'
import { AGENTS, type AgentId } from '@ai-studio/shared-types'
import { gitlabClient } from '@/lib/gitlab/client'
import { getDb } from '@/lib/db'
import { agentStates, agentMemories, tasks } from '@/lib/db/schema'
import { getEmployeeProfile } from '@/lib/employee-profiles'
import { ProfileHeader } from '@/components/employee/profile-header'
import { WorkRecordSection } from '@/components/employee/work-record-section'
import { MemorySection } from '@/components/employee/memory-section'
import { AboutSection } from '@/components/employee/about-section'
import { CapabilitiesSection } from '@/components/employee/capabilities-section'
import { ArchivesSection } from '@/components/employee/archives-section'

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const db = await getDb()
  const { id } = await params
  const agent = AGENTS.find((a) => a.id === id)
  if (!agent) notFound()

  const agentId = agent.id as AgentId
  const profile = getEmployeeProfile(agentId)
  const dir = gitlabClient.getAgentDir(agentId)

  const [identity, persona, bible, state, memories, agentTasks] =
    await Promise.all([
      gitlabClient.getFile(`employees/${dir}/identity.md`),
      gitlabClient.getFile(`employees/${dir}/persona.md`),
      gitlabClient.getFile(`employees/${dir}/bible.md`),
      db
        .select()
        .from(agentStates)
        .where(eq(agentStates.agentId, agentId))
        .limit(1),
      db
        .select()
        .from(agentMemories)
        .where(eq(agentMemories.agentId, agentId))
        .orderBy(desc(agentMemories.createdAt))
        .limit(5),
      db.select().from(tasks).where(eq(tasks.agentId, agentId)),
    ])

  const chatTaskCount = agentTasks.length
  const isOnline = ['working', 'thinking'].includes(state[0]?.status ?? 'idle')

  return (
    <div className="px-8 py-6">
      <h1 className="mb-6 text-lg font-semibold">首页</h1>

      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <ProfileHeader agent={agent} profile={profile} isOnline={isOnline} />

        <WorkRecordSection
          daysJoined={0}
          autoTasks={0}
          chatTasks={chatTaskCount}
          projects={0}
        />

        <MemorySection
          profile={profile}
          memories={memories}
          agentId={agentId}
        />

        <AboutSection profile={profile} />

        <CapabilitiesSection profile={profile} />

        <ArchivesSection
          files={{
            identity,
            persona,
            bible,
            memory: memories[0]?.content ?? '暂无记忆内容',
          }}
        />
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-white shadow-md hover:bg-muted/50"
          aria-label="快捷操作"
        >
          <span className="text-sm">💬</span>
        </button>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-white shadow-md hover:bg-muted/50"
          aria-label="网格"
        >
          <span className="text-sm">⊞</span>
        </button>
      </div>
    </div>
  )
}
