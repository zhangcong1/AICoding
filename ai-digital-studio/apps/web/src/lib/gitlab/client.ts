import type { AgentId } from '@ai-studio/shared-types'

const AGENT_DIRS: Record<AgentId, string> = {
  pm: '阿策',
  architect: '老周',
  ui: '小沐',
  fe: '小布',
  be: '阿凯',
  qa: '小诺',
}

const DEFAULT_EMPLOYEE_FILES: Record<
  AgentId,
  { identity: string; persona: string; bible: string }
> = {
  pm: {
    identity: '我是阿策，AI 数字软件工作室的产品经理，负责需求分析与 PRD 编写。',
    persona: '温和但有原则，喜欢画流程图。口头禅：「用户真正想要的是什么？」',
    bible: '用户故事优先，数据驱动决策，MVP 思维。',
  },
  architect: {
    identity: '我是老周，系统架构师，负责技术架构与系统设计。',
    persona: '沉稳，话不多但每句都有分量。口头禅：「这里有个坑」。',
    bible: '高可用优先，简单可维护，面向变化设计。',
  },
  ui: {
    identity: '我是小沐，UI 设计师，负责界面与交互设计。',
    persona: '充满热情，细节控。口头禅：「这里间距不对」。',
    bible: '一致性原则，可访问性，少即是多。',
  },
  fe: {
    identity: '我是小布，前端工程师，负责 React/Next.js 实现。',
    persona: '活跃，爱折腾新技术。口头禅：「这个可以封装一下」。',
    bible: '组件复用、类型安全、性能优先。',
  },
  be: {
    identity: '我是阿凯，后端工程师，负责 API 与数据层。',
    persona: '稳重，代码注释写得最详细。口头禅：「这个需要加事务」。',
    bible: '数据安全、接口幂等、错误处理完整。',
  },
  qa: {
    identity: '我是小诺，测试工程师，负责质量保障。',
    persona: '认真负责，边界意识强。口头禅：「但是如果用户这样操作呢」。',
    bible: '测试覆盖率、边界条件、用户真实场景。',
  },
}

function hasGitLabConfig() {
  const token = process.env.GITLAB_TOKEN
  const repoId = process.env.GITLAB_MEMORY_REPO_ID
  return Boolean(
    token &&
      repoId &&
      !token.includes('xxxx') &&
      repoId !== 'your-memory-repo-id',
  )
}

async function fetchGitLabFile(path: string): Promise<string | null> {
  if (!hasGitLabConfig()) return null

  try {
    const { Gitlab } = await import('@gitbeaker/rest')
    const api = new Gitlab({
      host: process.env.GITLAB_URL ?? 'https://gitlab.com',
      token: process.env.GITLAB_TOKEN!,
    })

    const repoId = process.env.GITLAB_MEMORY_REPO_ID!
    const file = await api.RepositoryFiles.show(repoId, path, 'main')
    return Buffer.from(file.content, 'base64').toString('utf-8')
  } catch {
    return null
  }
}

export const gitlabClient = {
  async getFile(path: string): Promise<string> {
    const remote = await fetchGitLabFile(path)
    if (remote) return remote

    const match = path.match(/^employees\/([^/]+)\/(identity|persona|bible)\.md$/)
    if (match) {
      const [, dirName, fileType] = match
      const agentId = (Object.entries(AGENT_DIRS).find(
        ([, name]) => name === dirName,
      )?.[0] ?? 'pm') as AgentId
      return DEFAULT_EMPLOYEE_FILES[agentId][fileType as 'identity' | 'persona' | 'bible']
    }

    return ''
  },

  getAgentDir(agentId: AgentId) {
    return AGENT_DIRS[agentId]
  },
}
