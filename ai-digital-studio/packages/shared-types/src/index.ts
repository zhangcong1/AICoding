export type AgentId = 'pm' | 'architect' | 'ui' | 'fe' | 'be' | 'qa'
export type AgentStatus = 'idle' | 'thinking' | 'working' | 'completed' | 'error'
export type Phase = 'pending' | 'analyzing' | 'designing' | 'developing' | 'testing' | 'completed'
export type TaskStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'skipped'

export interface AgentInfo {
  id: AgentId
  name: string
  role: string
  avatar: string
  status: AgentStatus
}

export const AGENTS: AgentInfo[] = [
  { id: 'pm', name: '阿策', role: '产品经理', avatar: '🎯', status: 'idle' },
  { id: 'architect', name: '老周', role: '系统架构师', avatar: '🏗️', status: 'idle' },
  { id: 'ui', name: '小沐', role: 'UI设计师', avatar: '🎨', status: 'idle' },
  { id: 'fe', name: '小布', role: '前端工程师', avatar: '💻', status: 'idle' },
  { id: 'be', name: '阿凯', role: '后端工程师', avatar: '⚙️', status: 'idle' },
  { id: 'qa', name: '小诺', role: '测试工程师', avatar: '🔍', status: 'idle' },
]

export interface StudioEvent {
  type: string
  agentId?: AgentId
  taskId?: string
  payload?: Record<string, unknown>
  timestamp: string
}

export interface PRDOutput {
  title: string
  userStories: string[]
  functionalRequirements: string[]
  nonFunctionalRequirements: string[]
  mvpScope: string[]
  outOfScope: string[]
  successMetrics: string[]
  estimatedComplexity: 'low' | 'medium' | 'high'
}
