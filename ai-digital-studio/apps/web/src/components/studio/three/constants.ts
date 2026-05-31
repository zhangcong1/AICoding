export const AGENT_STRIPE: Record<string, string> = {
  pm: '#22c55e',
  architect: '#ef4444',
  ui: '#a855f7',
  fe: '#3b82f6',
  be: '#eab308',
  qa: '#06b6d4',
}

export const DESK_LAYOUT: { id: string; x: number; z: number }[] = [
  { id: 'pm', x: 0, z: -2.8 },
  { id: 'architect', x: 2.8, z: -2.8 },
  { id: 'ui', x: 5.6, z: -2.8 },
  { id: 'fe', x: 0, z: 0.4 },
  { id: 'be', x: 2.8, z: 0.4 },
  { id: 'qa', x: 5.6, z: 0.4 },
]

export function monitorColor(status: string) {
  switch (status) {
    case 'working':
      return '#2563eb'
    case 'thinking':
      return '#7c3aed'
    case 'error':
      return '#dc2626'
    case 'completed':
      return '#16a34a'
    default:
      return '#1a1a1a'
  }
}
