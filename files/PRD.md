# AI Digital Software Studio — 完整产品需求文档 (PRD)

> 版本：v1.0 | 技术栈：Next.js 16 + React 19 + TypeScript + Drizzle ORM + PostgreSQL + pnpm
> 状态：待开发 | 更新日期：2025

---

## 一、产品定位

### 1.1 产品愿景

**AI Digital Software Studio** 是一个由 AI 数字员工组成的完整软件研发协作平台。用户只需提交需求，由六位具备独立人格、记忆、技能体系的 AI 数字员工自动完成从产品规划到测试交付的全流程软件研发。

### 1.2 核心价值主张

- **完整的 AI 研发团队**：一套系统 = 一支专属研发团队
- **长期记忆成长**：每位员工拥有持久化记忆，越用越懂你
- **全流程可视化**：每一步执行过程实时可见、可干预
- **GitLab 原生集成**：代码、文档、记忆统一版本管理

### 1.3 竞品对比

| 维度 | 本产品 | Devin | Cursor | GitHub Copilot |
|------|--------|-------|--------|----------------|
| 多角色协作 | ✅ 6 位专属员工 | ❌ 单 Agent | ❌ 辅助工具 | ❌ 辅助工具 |
| 长期记忆 | ✅ GitLab + 向量库 | ❌ 无 | ❌ 无 | ❌ 无 |
| 工作流编排 | ✅ 完整研发流程 | 部分 | ❌ | ❌ |
| 可视化工作室 | ✅ 2D/3D Studio | ❌ | ❌ | ❌ |
| 人格与成长 | ✅ Identity/Bible | ❌ | ❌ | ❌ |

---

## 二、用户角色

### 2.1 主要用户

| 角色 | 描述 | 核心诉求 |
|------|------|----------|
| 独立开发者 | 一人公司/副业项目 | 用 AI 团队替代外包，快速交付 |
| 创业团队 | 早期 Startup | 降低研发成本，快速验证 MVP |
| 产品经理 | 懂需求但不懂代码 | 直接提需求，AI 自动实现 |
| 技术负责人 | 需要提效 | AI 承担重复工作，专注核心架构 |
| 企业采购 | 研发工具采购 | 标准化、可管理的 AI 研发团队 |

### 2.2 用户旅程

```
用户提交需求
    ↓
阿策 (PM) 拆解需求，生成 PRD
    ↓
老周 (架构师) 设计技术架构
    ↓
小沐 (UI) 设计界面原型
    ↓
小布 (FE) + 阿凯 (BE) 并行开发
    ↓
小诺 (QA) 测试验收
    ↓
交付产物 + 自动更新所有员工记忆
```

---

## 三、数字员工体系

### 3.1 六位数字员工

#### 阿策 — 产品经理 (PM Agent)
- **Identity**：产品思维，用户视角，逻辑严谨
- **Persona**：温和但有原则，喜欢画流程图，口头禅「用户真正想要的是什么？」
- **Bible**：用户故事优先，数据驱动决策，MVP 思维
- **核心技能**：需求分析、PRD 编写、用户故事拆解、优先级排序、竞品分析
- **工具集**：需求文档生成、用户故事模板、优先级矩阵

#### 老周 — 系统架构师 (Architect Agent)
- **Identity**：系统思维，技术深度，全局视角
- **Persona**：沉稳，话不多但每句都有分量，喜欢白板，口头禅「这里有个坑」
- **Bible**：高可用优先，简单可维护，面向变化设计
- **核心技能**：系统设计、技术选型、数据库设计、API 设计、性能优化
- **工具集**：架构图生成、数据库 Schema 设计、API 规范文档

#### 小沐 — UI 设计师 (UI Agent)
- **Identity**：审美敏锐，用户体验导向，细节控
- **Persona**：充满热情，喜欢分享设计灵感，口头禅「这里间距不对」
- **Bible**：一致性原则，可访问性，少即是多
- **核心技能**：UI 设计、组件设计、Design Token、原型设计、交互设计
- **工具集**：组件库规范、Design Token 生成、页面布局方案

#### 小布 — 前端工程师 (FE Agent)
- **Identity**：代码洁癖，性能意识，组件化思维
- **Persona**：活跃，爱折腾新技术，口头禅「这个可以封装一下」
- **Bible**：组件复用、类型安全、性能优先
- **核心技能**：React/Next.js、TypeScript、状态管理、性能优化、UI 实现
- **工具集**：组件生成、页面代码生成、测试用例生成

#### 阿凯 — 后端工程师 (BE Agent)
- **Identity**：严谨、安全意识强、注重数据一致性
- **Persona**：稳重，偏内向，代码注释写得最详细，口头禅「这个需要加事务」
- **Bible**：数据安全、接口幂等、错误处理完整
- **核心技能**：API 开发、数据库操作、认证授权、性能优化、第三方集成
- **工具集**：API 代码生成、数据库 Migration 生成、接口文档生成

#### 小诺 — 测试工程师 (QA Agent)
- **Identity**：破坏性思维，边界意识，质量标准严格
- **Persona**：认真负责，经常说「但是如果用户这样操作呢」
- **Bible**：测试覆盖率、边界条件、用户真实场景
- **核心技能**：测试用例设计、自动化测试、Bug 报告、回归测试、性能测试
- **工具集**：测试用例生成、E2E 测试脚本生成、Bug 报告模板

### 3.2 员工数据结构

每位员工的完整数据存储于 GitLab 仓库，结构如下：

```
employees/
├── 阿策/
│   ├── identity.md       # 基本身份信息
│   ├── persona.md        # 人格特征描述
│   ├── bible.md          # 工作原则与准则
│   ├── memory.md         # 短期工作记忆（最近任务）
│   ├── experience.md     # 长期经验积累（自动更新）
│   └── skills.yaml       # 技能树与熟练度
├── 老周/
│   └── ...（同上结构）
└── ...（其余四位）
```

---

## 四、功能架构

### 4.1 整体功能模块

```
AI Digital Software Studio
├── 工作台 (Studio)
│   ├── 数字工作室视图 (2D/3D)
│   ├── 实时协作可视化
│   └── 全局状态看板
├── 需求中心
│   ├── 需求提交
│   ├── 需求列表
│   └── 需求详情
├── 任务中心
│   ├── 任务流水线
│   ├── 任务详情
│   └── 任务历史
├── 数字员工
│   ├── 员工列表
│   ├── 员工详情/画像
│   ├── 员工状态
│   └── 员工技能树
├── 记忆中心
│   ├── 员工记忆浏览
│   ├── 记忆时间线
│   └── GitLab 同步状态
├── 技能市场
│   ├── 技能浏览
│   ├── 技能装备
│   └── 技能开发
└── 系统设置
    ├── GitLab 配置
    ├── AI 模型配置
    └── 团队设置
```

### 4.2 核心工作流

```
需求输入
  └─→ [阿策] 需求分析 → PRD 文档
         └─→ [老周] 技术架构设计 → 架构文档 + DB Schema
                └─→ [小沐] UI 设计 → 页面原型 + 组件规范
                       ├─→ [小布] 前端开发 → 页面代码 + 组件
                       └─→ [阿凯] 后端开发 → API + DB Migration
                              └─→ [小诺] 测试 → 测试报告 + Bug
                                     └─→ 交付 + 记忆更新 + GitLab Commit
```

---

## 五、页面结构

### 5.1 页面列表

| 路由 | 页面名称 | 核心功能 |
|------|----------|----------|
| `/` | 首页/工作台 | 数字工作室全景，实时状态 |
| `/studio` | Studio 视图 | 2D 工作室，员工工位动画 |
| `/requirements` | 需求中心 | 提交需求，查看需求列表 |
| `/requirements/[id]` | 需求详情 | 需求追踪，流程进度 |
| `/tasks` | 任务中心 | 所有任务流水线 |
| `/tasks/[id]` | 任务详情 | 任务执行日志，中间产物 |
| `/employees` | 数字员工 | 六位员工状态总览 |
| `/employees/[id]` | 员工详情 | 画像、技能、记忆、历史 |
| `/memory` | 记忆中心 | 全员记忆浏览，GitLab 同步 |
| `/skills` | 技能市场 | 技能浏览与管理 |
| `/settings` | 系统设置 | GitLab、AI 模型配置 |

### 5.2 首页工作台布局

```
┌─────────────────────────────────────────────────────────┐
│  顶部导航：Logo | 工作台 | 任务 | 员工 | 记忆 | 设置      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           数字工作室 (2D Studio)                  │  │
│  │  [阿策工位] [老周工位] [小沐工位]                  │  │
│  │  [小布工位] [阿凯工位] [小诺工位]                  │  │
│  │  实时动画：任务流动光线 + 状态气泡                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────┐  ┌──────────────────────────────┐ │
│  │  提交需求        │  │  当前进行中任务                │ │
│  │  [文本输入框]    │  │  ▶ 需求 #12 前端开发中...     │ │
│  │  [提交按钮]      │  │  ▶ 需求 #11 测试完成          │ │
│  └─────────────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 六、Agent 架构设计

### 6.1 Agent 分层架构

```
┌─────────────────────────────────────┐
│           Supervisor Agent           │
│  负责任务分发、状态追踪、冲突协调      │
└──────────────┬──────────────────────┘
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│PM Agent│ │Arch    │ │UI Agent│
│(阿策)  │ │Agent   │ │(小沐)  │
└────────┘ │(老周)  │ └────────┘
           └────────┘
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│FE Agent│ │BE Agent│ │QA Agent│
│(小布)  │ │(阿凯)  │ │(小诺)  │
└────────┘ └────────┘ └────────┘
```

### 6.2 LangGraph 工作流节点

```typescript
// 主工作流节点定义
const nodes = {
  supervisor: SupervisorNode,     // 任务分发与协调
  pm: PMAgentNode,                // 需求分析
  architect: ArchitectAgentNode,  // 架构设计
  ui: UIAgentNode,                // UI 设计
  frontend: FrontendAgentNode,    // 前端开发
  backend: BackendAgentNode,      // 后端开发
  qa: QAAgentNode,                // 测试
  memory_writer: MemoryWriterNode, // 记忆写入
  gitlab_sync: GitLabSyncNode,    // GitLab 同步
}

// 工作流状态
interface WorkflowState {
  requirementId: string
  requirement: string
  currentPhase: Phase
  artifacts: Artifact[]
  agentStates: Record<AgentId, AgentState>
  errors: Error[]
  memory: MemoryContext
}
```

### 6.3 Agent 提示词结构

每个 Agent 的提示词由以下部分动态组合：

```
[System Prompt]
= identity.md + persona.md + bible.md

[Memory Context]
= memory.md (最近 N 条) + 向量检索相关记忆

[Task Context]
= 当前任务描述 + 前置产物 + 项目上下文

[Skills Context]
= skills.yaml 对应工具能力描述

[Output Format]
= 结构化输出要求（JSON Schema）
```

---

## 七、Memory 架构设计

### 7.1 记忆分层

```
员工记忆体系
├── 工作记忆 (Working Memory)
│   ├── 存储位置：Redis (TTL 24h)
│   ├── 内容：当前任务上下文、对话历史
│   └── 用途：单次任务执行期间的上下文
│
├── 短期记忆 (Short-term Memory)
│   ├── 存储位置：PostgreSQL (recent_memories 表)
│   ├── 内容：最近 30 天任务摘要
│   └── 用途：快速检索近期相关经验
│
├── 长期记忆 (Long-term Memory)
│   ├── 存储位置：GitLab (employees/[名字]/memory.md)
│   ├── 内容：结构化记忆文档，版本化
│   └── 用途：持久化经验，跨会话使用
│
└── 语义记忆 (Semantic Memory)
    ├── 存储位置：Qdrant 向量数据库
    ├── 内容：所有记忆的向量嵌入
    └── 用途：语义相似性检索
```

### 7.2 记忆写入流程

```
任务完成
  └─→ Learning Engine 生成任务摘要
       └─→ 提取关键经验点
            ├─→ 更新 PostgreSQL 短期记忆
            ├─→ 更新 Qdrant 向量索引
            └─→ 更新 GitLab memory.md + experience.md
                 └─→ 自动 Commit，消息格式：
                     "memory: [员工名] task#[id] experience update"
```

### 7.3 记忆检索策略

```typescript
async function retrieveMemory(agentId: string, query: string) {
  // 1. 向量语义检索
  const semanticResults = await qdrant.search({
    collection: `employee_${agentId}`,
    vector: await embed(query),
    limit: 5,
  })

  // 2. 最近记忆检索
  const recentMemories = await db.query.recentMemories.findMany({
    where: eq(recentMemories.agentId, agentId),
    orderBy: desc(recentMemories.createdAt),
    limit: 10,
  })

  // 3. GitLab 结构化记忆
  const structuredMemory = await gitlab.getFile(
    `employees/${agentId}/memory.md`
  )

  return mergeAndRank(semanticResults, recentMemories, structuredMemory)
}
```

---

## 八、GitLab 存储方案

### 8.1 仓库结构

```
ai-studio-memory/                    # 记忆仓库（私有）
├── employees/
│   ├── 阿策/
│   │   ├── identity.md
│   │   ├── persona.md
│   │   ├── bible.md
│   │   ├── memory.md               # 自动更新
│   │   ├── experience.md           # 自动更新
│   │   └── skills.yaml
│   ├── 老周/
│   ├── 小沐/
│   ├── 小布/
│   ├── 阿凯/
│   └── 小诺/
├── projects/
│   └── [project-id]/
│       ├── requirements/
│       ├── architecture/
│       ├── designs/
│       └── deliverables/
└── README.md

ai-studio-output/                    # 产物仓库（可配置）
├── [requirement-id]/
│   ├── prd.md
│   ├── architecture.md
│   ├── ui-spec.md
│   ├── frontend/
│   ├── backend/
│   └── test-reports/
```

### 8.2 GitLab 操作规范

| 操作 | 触发时机 | Commit 消息格式 |
|------|----------|-----------------|
| 记忆更新 | 任务完成后 | `memory(阿策): task#${id} update` |
| 经验写入 | 每次任务后 | `exp(老周): architecture pattern learned` |
| 技能更新 | 技能等级提升 | `skill(小布): React performance +1` |
| 产物提交 | 每阶段完成 | `feat(req#${id}): ${phase} completed` |
| MR 创建 | 重大版本更新 | 自动创建 MR 供用户审阅 |

---

## 九、技术架构

### 9.1 技术栈总览

```
Frontend (Next.js App)
├── Framework:    Next.js 16 (App Router)
├── UI Library:   React 19
├── Language:     TypeScript 5.x
├── UI Components: Shadcn/ui + Tailwind CSS
├── State:        Zustand + React Query (TanStack)
├── Visualization: ReactFlow + Framer Motion
├── 2D Studio:    PixiJS 8
├── WebSocket:    Socket.io-client
└── Package Mgr:  pnpm

Backend (Next.js API Routes / Route Handlers)
├── Framework:    Next.js 16 Route Handlers
├── Language:     TypeScript 5.x
├── ORM:          Drizzle ORM
├── Database:     PostgreSQL 16
├── Cache:        Redis (ioredis)
├── Auth:         NextAuth.js v5 / better-auth
├── WebSocket:    Socket.io
├── Validation:   Zod
└── Package Mgr:  pnpm

AI Runtime (独立 Service 或 Next.js API)
├── Framework:    LangGraph.js
├── LLM:          OpenAI Compatible (可换模型)
├── Embedding:    text-embedding-3-small
├── Vector DB:    Qdrant
└── Memory:       GitLab API + Qdrant

Infrastructure
├── Database:     PostgreSQL 16
├── Cache:        Redis 7
├── Vector DB:    Qdrant
├── Storage:      GitLab
└── Deploy:       Docker Compose / Vercel + Supabase
```

### 9.2 Monorepo 目录结构

```
ai-digital-studio/
├── apps/
│   └── web/                          # Next.js 主应用
│       ├── app/
│       │   ├── (dashboard)/
│       │   │   ├── page.tsx          # 工作台首页
│       │   │   ├── studio/
│       │   │   ├── requirements/
│       │   │   ├── tasks/
│       │   │   ├── employees/
│       │   │   ├── memory/
│       │   │   └── settings/
│       │   ├── api/
│       │   │   ├── requirements/
│       │   │   ├── tasks/
│       │   │   ├── employees/
│       │   │   ├── agents/
│       │   │   ├── memory/
│       │   │   └── webhooks/
│       │   └── layout.tsx
│       ├── components/
│       │   ├── studio/               # 工作室可视化组件
│       │   ├── agents/               # 员工相关组件
│       │   ├── workflow/             # 工作流组件
│       │   └── ui/                   # 基础 UI 组件
│       └── lib/
│           ├── db/                   # Drizzle 配置
│           ├── agents/               # Agent 逻辑
│           └── memory/               # 记忆引擎
├── packages/
│   ├── agent-runtime/                # LangGraph Agent 核心
│   ├── memory-engine/                # 记忆管理引擎
│   ├── gitlab-engine/                # GitLab 集成
│   ├── workflow-engine/              # 工作流编排
│   └── shared-types/                 # 共享类型定义
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 十、数据库设计

### 10.1 核心数据表

```sql
-- 需求表
CREATE TABLE requirements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  priority    TEXT NOT NULL DEFAULT 'medium',
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 任务表
CREATE TABLE tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_id  UUID REFERENCES requirements(id),
  agent_id        TEXT NOT NULL,           -- 'pm'|'architect'|'ui'|'fe'|'be'|'qa'
  phase           TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  input           JSONB,
  output          JSONB,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 员工状态表
CREATE TABLE agent_states (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id    TEXT NOT NULL UNIQUE,
  status      TEXT NOT NULL DEFAULT 'idle',  -- idle|working|thinking|completed
  current_task_id UUID REFERENCES tasks(id),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 短期记忆表
CREATE TABLE agent_memories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id    TEXT NOT NULL,
  task_id     UUID REFERENCES tasks(id),
  content     TEXT NOT NULL,
  summary     TEXT,
  embedding   vector(1536),               -- pgvector
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 技能表
CREATE TABLE agent_skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id    TEXT NOT NULL,
  skill_name  TEXT NOT NULL,
  category    TEXT NOT NULL,
  level       INTEGER DEFAULT 1,          -- 1-10
  experience  INTEGER DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 事件日志表（WebSocket 推送用）
CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT NOT NULL,
  agent_id    TEXT,
  task_id     UUID,
  payload     JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 十一、API 设计

### 11.1 REST API 端点

```
需求管理
POST   /api/requirements              创建需求
GET    /api/requirements              需求列表
GET    /api/requirements/[id]         需求详情
PATCH  /api/requirements/[id]         更新需求
DELETE /api/requirements/[id]         删除需求
POST   /api/requirements/[id]/start   启动研发流程

任务管理
GET    /api/tasks                     任务列表
GET    /api/tasks/[id]                任务详情
POST   /api/tasks/[id]/pause          暂停任务
POST   /api/tasks/[id]/resume         恢复任务
POST   /api/tasks/[id]/retry          重试任务

员工管理
GET    /api/employees                 员工列表（含状态）
GET    /api/employees/[id]            员工详情
GET    /api/employees/[id]/memory     员工记忆
GET    /api/employees/[id]/skills     员工技能

记忆管理
GET    /api/memory/[agentId]          获取员工记忆
POST   /api/memory/[agentId]/sync     触发 GitLab 同步

系统
GET    /api/health                    健康检查
GET    /api/events/stream             SSE 事件流
```

### 11.2 WebSocket 事件

```typescript
// 客户端订阅
socket.on('agent:status_change', (data: {
  agentId: string
  status: 'idle' | 'thinking' | 'working' | 'completed' | 'error'
  taskId?: string
}) => {})

socket.on('task:progress', (data: {
  taskId: string
  phase: string
  progress: number  // 0-100
  message: string
}) => {})

socket.on('task:artifact', (data: {
  taskId: string
  type: 'prd' | 'architecture' | 'code' | 'test'
  content: string
}) => {})

socket.on('workflow:phase_change', (data: {
  requirementId: string
  fromPhase: string
  toPhase: string
  timestamp: string
}) => {})

socket.on('memory:updated', (data: {
  agentId: string
  type: 'short_term' | 'long_term'
  summary: string
}) => {})
```

---

## 十二、MVP 规划

### Phase 1 — 核心骨架（2 周）

**目标**：能跑通完整流程，不求完美

- [ ] Next.js 项目初始化，Drizzle + PostgreSQL 配置
- [ ] 基础页面：工作台、需求提交、任务列表
- [ ] 六位员工基础信息展示
- [ ] PM Agent (阿策) 实现：接收需求 → 生成 PRD
- [ ] 基础任务状态追踪
- [ ] GitLab 基础集成：读取员工文件

**交付物**：能提交需求，阿策自动生成 PRD

### Phase 2 — 完整工作流（3 周）

**目标**：六位员工完整工作流打通

- [ ] Architect Agent (老周)：架构设计
- [ ] UI Agent (小沐)：UI 规范生成
- [ ] FE Agent (小布)：前端代码生成
- [ ] BE Agent (阿凯)：后端代码生成
- [ ] QA Agent (小诺)：测试用例生成
- [ ] LangGraph 工作流编排
- [ ] WebSocket 实时状态推送

**交付物**：完整研发流程自动化

### Phase 3 — 记忆与可视化（2 周）

**目标**：记忆成长 + Studio 可视化

- [ ] 记忆引擎：任务后自动更新记忆
- [ ] GitLab 自动 Commit
- [ ] Qdrant 向量库集成
- [ ] VueFlow/ReactFlow 协作可视化
- [ ] 2D 工作室 (PixiJS) 基础版

**交付物**：有记忆的 AI 员工 + 可视化工作室

### Phase 4 — 完善与打磨（持续）

- [ ] 3D 工作室升级
- [ ] 技能市场
- [ ] 员工成长系统
- [ ] 多项目管理
- [ ] 团队协作功能

---

## 十三、Roadmap

### Q1（当前）
- MVP 核心流程
- 六位员工基础版
- GitLab 记忆集成
- 2D 工作室

### Q2
- 记忆成长系统完整版
- 技能市场上线
- 3D 工作室预览
- 多模型支持（Claude/Gemini/本地模型）

### Q3
- 企业版功能（多团队、权限管理）
- 自定义 Agent（用户可创建新员工）
- MCP 工具扩展
- 移动端查看

### Q4
- AI 员工市场（用户可分享员工配置）
- 工作流模板市场
- 企业私有化部署
- API 开放平台

---

## 十四、非功能性需求

### 性能指标
- 页面首屏加载：< 2s
- API 响应时间：< 500ms（P95）
- WebSocket 事件延迟：< 100ms
- Agent 响应时间：< 30s（依赖 LLM 速度）

### 安全要求
- 所有 API 需认证（NextAuth.js）
- GitLab Token 加密存储
- LLM API Key 服务端持有，不暴露客户端
- 用户数据隔离（Row Level Security）

### 可用性
- 目标可用性：99.5%
- 任务失败自动重试（最多 3 次）
- 支持任务暂停/恢复
- 完整的错误日志与监控

---

*文档生成完毕。下一步：技术架构详细文档 → 项目目录结构 → Sprint 开发计划*
