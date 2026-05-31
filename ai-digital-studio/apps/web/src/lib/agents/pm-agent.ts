import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import type { PRDOutput } from '@ai-studio/shared-types'
import { gitlabClient } from '@/lib/gitlab/client'
import { memoryEngine } from '@/lib/memory/engine'
import { emitEvent } from '@/lib/events/emitter'

function hasLLMConfig() {
  const key = process.env.OPENAI_API_KEY
  return Boolean(key && !key.includes('xxxx'))
}

function buildMockPRD(requirement: string, title: string): PRDOutput {
  return {
    title: title || '未命名需求',
    userStories: [
      `作为用户，我希望${requirement.slice(0, 40)}，以便提升效率`,
      '作为管理员，我希望查看任务进度，以便掌握项目状态',
    ],
    functionalRequirements: [
      '支持需求提交与状态追踪',
      '支持 AI 员工协作生成 PRD',
      '支持任务历史与产物查看',
    ],
    nonFunctionalRequirements: [
      '页面首屏加载 < 2s',
      'API P95 响应 < 500ms',
    ],
    mvpScope: ['需求管理', 'PM Agent PRD 生成', '员工状态展示'],
    outOfScope: ['3D 工作室', '技能市场', '多租户权限'],
    successMetrics: ['能完成一次端到端 PRD 生成', '任务状态可追踪'],
    estimatedComplexity: 'medium',
  }
}

export async function runPMAgent(input: {
  requirementId: string
  taskId: string
  title: string
  description: string
}) {
  await emitEvent({
    type: 'agent:status_change',
    agentId: 'pm',
    taskId: input.taskId,
    payload: { status: 'thinking' },
  })

  const [identity, persona, bible] = await Promise.all([
    gitlabClient.getFile('employees/阿策/identity.md'),
    gitlabClient.getFile('employees/阿策/persona.md'),
    gitlabClient.getFile('employees/阿策/bible.md'),
  ])

  const memories = await memoryEngine.retrieve('pm', input.description)

  const systemPrompt = `
${identity}

## 我的人格
${persona}

## 我的工作准则
${bible}

## 相关历史经验
${memories.map((m) => `- ${m.summary}`).join('\n')}

## 当前任务
分析用户需求，输出结构化 PRD JSON。
字段：title, userStories, functionalRequirements, nonFunctionalRequirements,
mvpScope, outOfScope, successMetrics, estimatedComplexity(low|medium|high)
只输出 JSON，不要 markdown。
`

  let prd: PRDOutput

  await emitEvent({
    type: 'agent:status_change',
    agentId: 'pm',
    taskId: input.taskId,
    payload: { status: 'working' },
  })

  if (hasLLMConfig()) {
    const llm = new ChatOpenAI({
      model: process.env.LLM_MODEL ?? 'gpt-4o',
      temperature: 0.3,
      apiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
    })

    const response = await llm.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(`需求标题：${input.title}\n\n需求描述：${input.description}`),
    ])

    const content =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content)

    const jsonText = content.replace(/```json\n?|\n?```/g, '').trim()
    prd = JSON.parse(jsonText) as PRDOutput
  } else {
    prd = buildMockPRD(input.description, input.title)
  }

  await emitEvent({
    type: 'task:artifact',
    agentId: 'pm',
    taskId: input.taskId,
    payload: { type: 'prd', content: prd },
  })

  await memoryEngine.write('pm', {
    taskId: input.taskId,
    content: `完成需求分析：${prd.title}，复杂度：${prd.estimatedComplexity}`,
    summary: `需求「${prd.title}」分析完成`,
    tags: ['prd', 'requirement-analysis'],
  })

  await emitEvent({
    type: 'agent:status_change',
    agentId: 'pm',
    taskId: input.taskId,
    payload: { status: 'completed' },
  })

  await emitEvent({
    type: 'workflow:phase_change',
    taskId: input.taskId,
    payload: {
      requirementId: input.requirementId,
      fromPhase: 'pending',
      toPhase: 'analyzing',
    },
  })

  return prd
}
