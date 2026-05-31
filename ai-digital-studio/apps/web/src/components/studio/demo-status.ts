import type { AgentId } from '@ai-studio/shared-types'

export const DEMO_SEQUENCE: AgentId[] = ['pm', 'architect', 'ui', 'fe', 'be', 'qa']

export function mergeWithDemo(
  real: Record<string, string>,
  demoAgent: AgentId | null,
): Record<string, string> {
  if (!demoAgent) return real
  const hasActive = Object.values(real).some((s) =>
    ['working', 'thinking'].includes(s),
  )
  if (hasActive) return real

  const next =
    DEMO_SEQUENCE[(DEMO_SEQUENCE.indexOf(demoAgent) + 1) % DEMO_SEQUENCE.length]
  return {
    ...real,
    [demoAgent]: 'working',
    [next]: 'thinking',
  }
}
