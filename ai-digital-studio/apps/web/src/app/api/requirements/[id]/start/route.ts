import { NextRequest, NextResponse } from 'next/server'
import { startRequirementWorkflow } from '@/lib/agents/workflow'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    const result = await startRequirementWorkflow(id)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Workflow failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
