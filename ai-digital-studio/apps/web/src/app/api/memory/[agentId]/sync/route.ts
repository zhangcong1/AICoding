import { NextRequest, NextResponse } from 'next/server'
import { AGENTS } from '@ai-studio/shared-types'
import { gitlabMemorySync } from '@/lib/gitlab/memory-sync'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params
  const agent = AGENTS.find((a) => a.id === agentId)

  if (!agent) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await gitlabMemorySync.scheduleSync(agent.id)
  return NextResponse.json({ success: true })
}
