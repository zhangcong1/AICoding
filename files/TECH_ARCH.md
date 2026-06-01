# AI Digital Software Studio — 技术架构文档

> 技术栈：Next.js 16 + React 19 + TypeScript + Drizzle ORM + PostgreSQL + pnpm

---

## 一、项目初始化

### 1.1 Monorepo 初始化

```bash
# 创建项目
mkdir ai-digital-studio && cd ai-digital-studio
pnpm init

# 安装 Turborepo
pnpm add -D turbo

# 创建 pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

# 创建 turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**"] },
    "dev":   { "cache": false, "persistent": true },
    "lint":  {},
    "typecheck": {}
  }
}
EOF
```

### 1.2 Next.js 应用初始化

```bash
cd apps
pnpm create next-app@latest web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd web
# 安装核心依赖
pnpm add drizzle-orm postgres @neondatabase/serverless
pnpm add -D drizzle-kit
pnpm add zustand @tanstack/react-query
pnpm add socket.io socket.io-client
pnpm add zod
pnpm add @auth/drizzle-adapter next-auth@beta
pnpm add ioredis
pnpm add @langchain/langgraph @langchain/openai @langchain/core
pnpm add @qdrant/js-client-rest
pnpm add @gitbeaker/rest
pnpm add reactflow @xyflow/react
pnpm add framer-motion
pnpm add pixi.js
pnpm add lucide-react
pnpm add class-variance-authority clsx tailwind-merge
```

---

## 二、完整目录结构

```
ai-digital-studio/
├── apps/
│   └── web/                              # Next.js 16 主应用
│       ├── src/
│       │   ├── app/                      # App Router
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx              # 重定向到 /studio
│       │   │   ├── (dashboard)/          # 登录后布局
│       │   │   │   ├── layout.tsx        # 侧边栏 + 顶栏
│       │   │   │   ├── page.tsx          # 工作台 /
│       │   │   │   ├── studio/
│       │   │   │   │   └── page.tsx      # 2D 工作室
│       │   │   │   ├── requirements/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [id]/
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── tasks/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [id]/
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── employees/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [id]/
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── memory/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── settings/
│       │   │   │       └── page.tsx
│       │   │   ├── api/                  # Route Handlers
│       │   │   │   ├── requirements/
│       │   │   │   │   ├── route.ts
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── route.ts
│       │   │   │   │       └── start/route.ts
│       │   │   │   ├── tasks/
│       │   │   │   │   ├── route.ts
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── route.ts
│       │   │   │   │       ├── pause/route.ts
│       │   │   │   │       ├── resume/route.ts
│       │   │   │   │       └── retry/route.ts
│       │   │   │   ├── employees/
│       │   │   │   │   ├── route.ts
│       │   │   │   │   └── [id]/
│       │   │   │   │       ├── route.ts
│       │   │   │   │       ├── memory/route.ts
│       │   │   │   │       └── skills/route.ts
│       │   │   │   ├── agents/
│       │   │   │   │   └── run/route.ts  # Agent 执行入口
│       │   │   │   ├── memory/
│       │   │   │   │   └── [agentId]/
│       │   │   │   │       ├── route.ts
│       │   │   │   │       └── sync/route.ts
│       │   │   │   └── events/
│       │   │   │       └── stream/route.ts  # SSE
│       │   │   └── auth/
│       │   │       └── [...nextauth]/route.ts
│       │   ├── components/
│       │   │   ├── studio/
│       │   │   │   ├── PixiStudio.tsx        # PixiJS 2D 工作室
│       │   │   │   ├── WorkflowCanvas.tsx    # ReactFlow 协作图
│       │   │   │   ├── AgentNode.tsx         # 员工节点组件
│       │   │   │   └── TaskFlowLine.tsx      # 任务流动线
│       │   │   ├── agents/
│       │   │   │   ├── AgentCard.tsx
│       │   │   │   ├── AgentStatus.tsx
│       │   │   │   ├── AgentDetail.tsx
│       │   │   │   └── SkillTree.tsx
│       │   │   ├── requirements/
│       │   │   │   ├── RequirementForm.tsx
│       │   │   │   ├── RequirementList.tsx
│       │   │   │   └── RequirementDetail.tsx
│       │   │   ├── tasks/
│       │   │   │   ├── TaskTimeline.tsx
│       │   │   │   ├── TaskLog.tsx
│       │   │   │   └── ArtifactViewer.tsx
│       │   │   └── ui/                      # Shadcn 组件
│       │   ├── lib/
│       │   │   ├── db/
│       │   │   │   ├── index.ts             # Drizzle 实例
│       │   │   │   ├── schema.ts            # 所有表定义
│       │   │   │   └── migrations/
│       │   │   ├── agents/
│       │   │   │   ├── runtime.ts           # LangGraph 运行时
│       │   │   │   ├── supervisor.ts
│       │   │   │   ├── pm-agent.ts
│       │   │   │   ├── architect-agent.ts
│       │   │   │   ├── ui-agent.ts
│       │   │   │   ├── fe-agent.ts
│       │   │   │   ├── be-agent.ts
│       │   │   │   └── qa-agent.ts
│       │   │   ├── memory/
│       │   │   │   ├── engine.ts            # 记忆引擎主入口
│       │   │   │   ├── retriever.ts         # 记忆检索
│       │   │   │   └── writer.ts            # 记忆写入
│       │   │   ├── gitlab/
│       │   │   │   ├── client.ts
│       │   │   │   └── memory-sync.ts
│       │   │   ├── qdrant/
│       │   │   │   └── client.ts
│       │   │   ├── redis/
│       │   │   │   └── client.ts
│       │   │   ├── events/
│       │   │   │   └── emitter.ts           # 事件推送
│       │   │   └── auth/
│       │   │       └── config.ts
│       │   ├── stores/                      # Zustand Stores
│       │   │   ├── agent-store.ts
│       │   │   ├── task-store.ts
│       │   │   └── studio-store.ts
│       │   ├── types/
│       │   │   ├── agent.ts
│       │   │   ├── task.ts
│       │   │   ├── memory.ts
│       │   │   └── workflow.ts
│       │   └── hooks/
│       │       ├── useAgentStatus.ts
│       │       ├── useTaskStream.ts
│       │       └── useStudioSocket.ts
│       ├── drizzle.config.ts
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
├── packages/
│   └── shared-types/                    # 共享类型
│       ├── src/index.ts
│       └── package.json
├── docker-compose.yml
├── .env.example
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

## 三、核心文件代码

### 3.1 数据库 Schema (Drizzle ORM)

```typescript
// src/lib/db/schema.ts
import {
  pgTable, uuid, text, timestamp, integer,
  jsonb, boolean, index, pgEnum
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ---- Enums ----
export const requirementStatusEnum = pgEnum('requirement_status', [
  'pending', 'analyzing', 'in_progress', 'completed', 'failed'
])
export const taskStatusEnum = pgEnum('task_status', [
  'pending', 'running', 'paused', 'completed', 'failed', 'skipped'
])
export const agentIdEnum = pgEnum('agent_id', [
  'pm', 'architect', 'ui', 'fe', 'be', 'qa'
])
export const agentStatusEnum = pgEnum('agent_status', [
  'idle', 'thinking', 'working', 'completed', 'error'
])

// ---- Users ----
export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  email:     text('email').notNull().unique(),
  name:      text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ---- Requirements ----
export const requirements = pgTable('requirements', {
  id:          uuid('id').primaryKey().defaultRandom(),
  title:       text('title').notNull(),
  description: text('description').notNull(),
  status:      requirementStatusEnum('status').default('pending').notNull(),
  priority:    text('priority').default('medium').notNull(),
  createdBy:   uuid('created_by').references(() => users.id),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
  updatedAt:   timestamp('updated_at').defaultNow().notNull(),
}, (t) => [index('req_status_idx').on(t.status)])

// ---- Tasks ----
export const tasks = pgTable('tasks', {
  id:             uuid('id').primaryKey().defaultRandom(),
  requirementId:  uuid('requirement_id').references(() => requirements.id).notNull(),
  agentId:        agentIdEnum('agent_id').notNull(),
  phase:          text('phase').notNull(),
  status:         taskStatusEnum('status').default('pending').notNull(),
  input:          jsonb('input'),
  output:         jsonb('output'),
  errorMessage:   text('error_message'),
  retryCount:     integer('retry_count').default(0).notNull(),
  startedAt:      timestamp('started_at'),
  completedAt:    timestamp('completed_at'),
  createdAt:      timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('task_req_idx').on(t.requirementId),
  index('task_agent_idx').on(t.agentId),
])

// ---- Agent States ----
export const agentStates = pgTable('agent_states', {
  id:            uuid('id').primaryKey().defaultRandom(),
  agentId:       agentIdEnum('agent_id').notNull().unique(),
  status:        agentStatusEnum('status').default('idle').notNull(),
  currentTaskId: uuid('current_task_id').references(() => tasks.id),
  updatedAt:     timestamp('updated_at').defaultNow().notNull(),
})

// ---- Agent Memories ----
export const agentMemories = pgTable('agent_memories', {
  id:        uuid('id').primaryKey().defaultRandom(),
  agentId:   agentIdEnum('agent_id').notNull(),
  taskId:    uuid('task_id').references(() => tasks.id),
  content:   text('content').notNull(),
  summary:   text('summary'),
  tags:      text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [index('mem_agent_idx').on(t.agentId)])

// ---- Agent Skills ----
export const agentSkills = pgTable('agent_skills', {
  id:         uuid('id').primaryKey().defaultRandom(),
  agentId:    agentIdEnum('agent_id').notNull(),
  skillName:  text('skill_name').notNull(),
  category:   text('category').notNull(),
  level:      integer('level').default(1).notNull(),
  experience: integer('experience').default(0).notNull(),
  updatedAt:  timestamp('updated_at').defaultNow().notNull(),
})

// ---- Events (for SSE/WebSocket) ----
export const events = pgTable('events', {
  id:        uuid('id').primaryKey().defaultRandom(),
  type:      text('type').notNull(),
  agentId:   agentIdEnum('agent_id'),
  taskId:    uuid('task_id'),
  payload:   jsonb('payload'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [index('event_created_idx').on(t.createdAt)])

// ---- Relations ----
export const requirementsRelations = relations(requirements, ({ many }) => ({
  tasks: many(tasks),
}))
export const tasksRelations = relations(tasks, ({ one }) => ({
  requirement: one(requirements, {
    fields: [tasks.requirementId],
    references: [requirements.id],
  }),
}))
```

### 3.2 Drizzle 配置

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### 3.3 LangGraph 工作流核心

```typescript
// src/lib/agents/runtime.ts
import { StateGraph, Annotation, END, START } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'
import type { AgentId, Phase, WorkflowState } from '@/types/workflow'

// 工作流状态定义
const WorkflowStateAnnotation = Annotation.Root({
  requirementId: Annotation<string>(),
  requirement:   Annotation<string>(),
  currentPhase:  Annotation<Phase>(),
  artifacts:     Annotation<Record<string, string>>({
    reducer: (a, b) => ({ ...a, ...b }),
    default: () => ({}),
  }),
  errors:        Annotation<string[]>({
    reducer: (a, b) => [...a, ...b],
    default: () => [],
  }),
  shouldEnd:     Annotation<boolean>({ default: () => false }),
})

type State = typeof WorkflowStateAnnotation.State

// 路由函数：决定下一步执行哪个 Agent
function routeToNextAgent(state: State): string {
  if (state.errors.length > 0) return 'error_handler'
  if (state.shouldEnd) return END

  const phaseMap: Record<Phase, string> = {
    pending:    'pm',
    analyzing:  'architect',
    designing:  'ui',
    developing: 'fe_be_parallel',
    testing:    'qa',
    completed:  END as string,
  }
  return phaseMap[state.currentPhase] ?? END
}

export function createStudioWorkflow() {
  const graph = new StateGraph(WorkflowStateAnnotation)

  graph
    .addNode('pm',              pmAgentNode)
    .addNode('architect',       architectAgentNode)
    .addNode('ui',              uiAgentNode)
    .addNode('fe_be_parallel',  feBEParallelNode)
    .addNode('qa',              qaAgentNode)
    .addNode('memory_writer',   memoryWriterNode)
    .addNode('error_handler',   errorHandlerNode)

  graph
    .addEdge(START, 'pm')
    .addEdge('pm', 'architect')
    .addEdge('architect', 'ui')
    .addEdge('ui', 'fe_be_parallel')
    .addEdge('fe_be_parallel', 'qa')
    .addEdge('qa', 'memory_writer')
    .addEdge('memory_writer', END)

  return graph.compile()
}
```

### 3.4 PM Agent 实现

```typescript
// src/lib/agents/pm-agent.ts
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { memoryEngine } from '@/lib/memory/engine'
import { gitlabClient } from '@/lib/gitlab/client'
import { emitEvent } from '@/lib/events/emitter'

export async function pmAgentNode(state: WorkflowState) {
  await emitEvent({ type: 'agent:status_change', agentId: 'pm', status: 'thinking' })

  // 1. 从 GitLab 加载员工配置
  const [identity, persona, bible] = await Promise.all([
    gitlabClient.getFile('employees/阿策/identity.md'),
    gitlabClient.getFile('employees/阿策/persona.md'),
    gitlabClient.getFile('employees/阿策/bible.md'),
  ])

  // 2. 检索相关记忆
  const memories = await memoryEngine.retrieve('pm', state.requirement)

  // 3. 构建 System Prompt
  const systemPrompt = `
${identity}

## 我的人格
${persona}

## 我的工作准则
${bible}

## 相关历史经验
${memories.map(m => `- ${m.summary}`).join('\n')}

## 当前任务
你需要分析用户需求，输出结构化的产品需求文档(PRD)。
输出格式为 JSON：
{
  "title": "需求标题",
  "userStories": ["用户故事1", "用户故事2"],
  "functionalRequirements": ["功能需求1"],
  "nonFunctionalRequirements": ["非功能需求1"],
  "mvpScope": ["MVP范围1"],
  "outOfScope": ["范围外项目1"],
  "successMetrics": ["成功指标1"],
  "estimatedComplexity": "low|medium|high"
}
`

  const llm = new ChatOpenAI({
    model: process.env.LLM_MODEL ?? 'gpt-4o',
    temperature: 0.3,
  })

  await emitEvent({ type: 'agent:status_change', agentId: 'pm', status: 'working' })

  const response = await llm.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(state.requirement),
  ])

  const prd = JSON.parse(response.content as string)

  await emitEvent({
    type: 'task:artifact',
    agentId: 'pm',
    taskId: state.taskId,
    payload: { type: 'prd', content: prd }
  })

  // 4. 任务完成后更新记忆
  await memoryEngine.write('pm', {
    taskId: state.taskId,
    content: `完成需求分析：${prd.title}，复杂度：${prd.estimatedComplexity}`,
    summary: `需求「${prd.title}」分析完成`,
    tags: ['prd', 'requirement-analysis'],
  })

  await emitEvent({ type: 'agent:status_change', agentId: 'pm', status: 'completed' })

  return {
    currentPhase: 'analyzing' as Phase,
    artifacts: { prd: JSON.stringify(prd) },
  }
}
```

### 3.5 记忆引擎

```typescript
// src/lib/memory/engine.ts
import { QdrantClient } from '@qdrant/js-client-rest'
import { OpenAIEmbeddings } from '@langchain/openai'
import { db } from '@/lib/db'
import { agentMemories } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { gitlabMemorySync } from '@/lib/gitlab/memory-sync'

const qdrant = new QdrantClient({ url: process.env.QDRANT_URL })
const embeddings = new OpenAIEmbeddings()

export const memoryEngine = {
  async retrieve(agentId: string, query: string) {
    // 1. 向量检索
    const vector = await embeddings.embedQuery(query)
    const semantic = await qdrant.search(`employee_${agentId}`, {
      vector, limit: 5, with_payload: true,
    })

    // 2. 最近记忆（Drizzle 查询）
    const recent = await db
      .select()
      .from(agentMemories)
      .where(eq(agentMemories.agentId, agentId as any))
      .orderBy(desc(agentMemories.createdAt))
      .limit(10)

    return [
      ...semantic.map(r => ({ summary: r.payload?.summary as string, source: 'semantic' })),
      ...recent.map(r => ({ summary: r.summary ?? r.content, source: 'recent' })),
    ]
  },

  async write(agentId: string, data: {
    taskId: string
    content: string
    summary: string
    tags?: string[]
  }) {
    // 写入 PostgreSQL
    const [memory] = await db.insert(agentMemories).values({
      agentId: agentId as any,
      taskId: data.taskId,
      content: data.content,
      summary: data.summary,
      tags: data.tags,
    }).returning()

    // 写入 Qdrant 向量库
    const vector = await embeddings.embedQuery(data.content)
    await qdrant.upsert(`employee_${agentId}`, {
      points: [{
        id: memory.id,
        vector,
        payload: { summary: data.summary, taskId: data.taskId, tags: data.tags },
      }]
    })

    // 同步到 GitLab（异步，不阻塞）
    gitlabMemorySync.scheduleSync(agentId).catch(console.error)

    return memory
  },
}
```

### 3.6 SSE 事件流

```typescript
// src/app/api/events/stream/route.ts
import { NextRequest } from 'next/server'
import { redis } from '@/lib/redis/client'

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  const taskId = req.nextUrl.searchParams.get('taskId')

  const stream = new ReadableStream({
    async start(controller) {
      const channel = taskId ? `task:${taskId}` : 'studio:global'
      const subscriber = redis.duplicate()

      await subscriber.subscribe(channel, (message) => {
        const data = `data: ${message}\n\n`
        controller.enqueue(encoder.encode(data))
      })

      req.signal.addEventListener('abort', () => {
        subscriber.unsubscribe(channel)
        subscriber.disconnect()
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

### 3.7 需求 API Route Handler

```typescript
// src/app/api/requirements/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirements } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { z } from 'zod'

const createSchema = z.object({
  title:       z.string().min(1).max(200),
  description: z.string().min(10),
  priority:    z.enum(['low', 'medium', 'high']).default('medium'),
})

export async function GET() {
  const data = await db
    .select()
    .from(requirements)
    .orderBy(desc(requirements.createdAt))

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const [requirement] = await db
    .insert(requirements)
    .values(parsed.data)
    .returning()

  return NextResponse.json(requirement, { status: 201 })
}
```

---

## 四、配置文件

### 4.1 环境变量

```bash
# .env.example

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_studio

# Redis
REDIS_URL=redis://localhost:6379

# Qdrant
QDRANT_URL=http://localhost:6333

# GitLab
GITLAB_URL=https://gitlab.com
GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxxxxxx
GITLAB_MEMORY_REPO_ID=your-repo-id

# AI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
OPENAI_BASE_URL=https://api.openai.com/v1   # 可替换为其他兼容接口
LLM_MODEL=gpt-4o

# Auth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4.2 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_DB: ai_studio
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  redis_data:
  qdrant_data:
```

### 4.3 package.json (根目录)

```json
{
  "name": "ai-digital-studio",
  "private": true,
  "scripts": {
    "dev":       "turbo run dev",
    "build":     "turbo run build",
    "lint":      "turbo run lint",
    "typecheck": "turbo run typecheck",
    "db:push":   "cd apps/web && pnpm drizzle-kit push",
    "db:migrate":"cd apps/web && pnpm drizzle-kit migrate",
    "db:studio": "cd apps/web && pnpm drizzle-kit studio",
    "docker:up": "docker-compose up -d",
    "setup":     "pnpm docker:up && sleep 3 && pnpm db:push"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

### 4.4 next.config.ts

```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    ppr: true,         // Partial Prerendering
    reactCompiler: true,
  },
  serverExternalPackages: [
    '@langchain/langgraph',
    '@langchain/openai',
    'pixi.js',
  ],
}

export default config
```

---

## 五、Sprint 开发计划

### Sprint 1 — 基础骨架（第 1-2 周）

```
Cursor 提示词：

实现 AI Digital Software Studio 基础骨架
技术栈：Next.js 16 + React 19 + TypeScript + Drizzle ORM + PostgreSQL + pnpm

要求：
1. 完整 App Router 目录结构
2. Drizzle Schema（按文档定义）
3. 基础页面：工作台、需求列表、员工列表
4. Shadcn/ui 组件库集成
5. Tailwind CSS 配置
6. 六位员工的静态展示卡片
7. 需求提交表单（前端 + API Route）
8. Docker Compose 一键启动基础设施

不要解释，直接输出完整代码。
```

### Sprint 2 — GitLab 记忆系统（第 3-4 周）

```
Cursor 提示词：

实现 GitLab Memory Engine

使用 @gitbeaker/rest 实现 GitLabClient
功能：
- 读写 employees/[名字]/*.md 文件
- 自动 Commit（标准消息格式）
- 创建 MR（重大更新时）
- 文件不存在时自动创建默认模板

实现 MemoryEngine：
- retrieve(agentId, query): 检索相关记忆
- write(agentId, data): 写入并同步
- Qdrant 向量索引（写入时同步）
- PostgreSQL 短期记忆（Drizzle ORM）

输出完整 TypeScript 代码。
```

### Sprint 3 — Agent Runtime（第 5-7 周）

```
Claude Code 提示词（推荐用 Claude Code 做这部分）：

使用 LangGraph.js 实现六位 AI 员工的完整 Agent Runtime

每个 Agent 实现：
- 从 GitLab 动态加载 identity/persona/bible
- 检索 Qdrant 相关记忆
- 调用 OpenAI Compatible LLM
- 结构化 JSON 输出（Zod 验证）
- 任务完成后写入记忆
- 通过 Redis Pub/Sub 推送实时事件

完整工作流：
用户需求 → PM → Architect → UI → FE+BE(并行) → QA → 记忆更新

输出：src/lib/agents/ 下所有文件完整代码
```

### Sprint 4 — 可视化工作室（第 8-9 周）

```
Cursor 提示词：

使用 ReactFlow + PixiJS 实现 AI 工作室可视化

ReactFlow 协作图（WorkflowCanvas.tsx）：
- 六个 AgentNode，显示实时状态
- 任务流向动画（光线沿边流动）
- 节点状态：idle/thinking/working/completed/error
- 节点点击打开员工详情抽屉

PixiJS 2D 工作室（PixiStudio.tsx）：
- 六个工位的 2D 等距视图
- 每个工位有角色 Sprite
- 状态动画：工作时角色有打字动画
- 任务传递动画：文件图标从一个工位飞向另一个
- 点击工位查看员工详情

通过 SSE 接收实时事件更新状态。

输出完整组件代码。
```

---

*文档生成完毕。按 Sprint 顺序丢给 Cursor/Claude Code 逐步实现即可。*
