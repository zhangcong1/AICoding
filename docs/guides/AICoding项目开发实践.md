# AICoding 项目开发实践

---

## 一、介绍目前使用 AICoding 做的三个系统

目前使用 AICoding 已经落地实现了三个线上的系统平台：大模型场景管理系统、代码智能解析平台、智能体人机协作平台。

这三个系统，不是跟 AI 说「帮我做一个 XX 平台」，就完成了。而是包括从需求设计、前后端开发、数据库设计等完整的系统，并且也经过多次产品功能迭代持续演进，最终形成能上线、能闭环使用的完整应用。

AICoding 不止是帮助开发写几段代码，而是把「需求澄清 → 方案设计 → 拆解计划 → 编码实现 → 测试验证 → 文档交付」整条链路加速。产品经理的价值，在于**把问题定义清楚、把边界划明白、把验收标准写具体**——这样 AICoding 才能稳定产出可用系统。

---

## 二、前置工作：Agent 与 Skill 配置

AICoding 偏开发场景，不会像 WorkBuddy 那样内置「网站开发」「PPT 制作」「产品管理」等现成智能体。需要自行安装 Skill，或在 `.codebuddy/agents/` 下编写 Agent。

本项目已配置：

| 类型 | 位置 | 作用 |
|------|------|------|
| 工作方法论 | `.codebuddy/skills/` | Superpowers（brainstorming、TDD、代码审查等，共 20 个） |
| 网站开发 Skill | `.codebuddy/skills/` | ui-ux-pro-max、frontend-design 等（共 4 个） |
| 专家 Agent | `.codebuddy/agents/` | 产品、设计、工程、测试等 64 个角色 |
| **网站开发 Agent** | `.codebuddy/agents/engineering/网站开发.md` | 全栈网站开发（设计 + 前后端 + 本地 PostgreSQL） |

### Agent 与 Skill 的区别

| | Agent（智能体） | Skill（技能） |
|---|----------------|---------------|
| 是什么 | 带人格与完整流程的「专家角色」 | 某一领域的「工作方法 / 规范库」 |
| 怎么调用 | `@网站开发`、`@product-manager` | `/ui-ux-pro-max`，或由 Agent 自动加载 |
| 典型用途 | 委派一整条任务链路 | 设计规范、性能最佳实践、TDD 流程等 |
| 文件位置 | `.codebuddy/agents/{分类}/*.md` | `.codebuddy/skills/{name}/SKILL.md` |

---

## 三、网站开发智能体使用指南

### 3.1 它解决什么问题

**`@网站开发`** 负责从需求到**可本地运行**的 Web 应用完整交付，包括：

- 信息架构与页面结构
- UI/UX 视觉方向
- 前端页面（Next.js + shadcn/ui）
- 后端 API（Route Handler）
- 数据库 Schema（本地 PostgreSQL + Drizzle ORM）

**默认技术栈**：Next.js 16 + React 19 + TypeScript + shadcn/ui + Tailwind CSS 4 + 本地 PostgreSQL + Drizzle ORM + pnpm

### 3.2 谁可以怎么用

| 角色 | 做什么 | 不需要做什么 |
|------|--------|--------------|
| 产品经理 | 写清需求、功能清单、验收场景；评审设计摘要 | 写代码、配数据库 |
| 开发 | 调用 `@网站开发`、评审技术方案、联调环境 | 从零手写全部 boilerplate |
| 业务方 | 中期看原型、按验收场景签字 | 参与技术选型 |

### 3.3 标准使用流程

```
① 启动 Agent          ② 需求澄清           ③ 确认设计
   @网站开发      →    brainstorming    →   评审设计文档
        ↓                    ↓                    ↓
⑥ 验收交付          ⑤ 全栈实现           ④ 实施计划
   按场景走查     ←    前后端+数据库   ←   writing-plans
```

| 步骤 | 发生什么 | 你需要做什么 |
|------|----------|--------------|
| Step 1 启动 | 对话中输入 `@网站开发` + 需求模板 | 按模板填写需求 |
| Step 2 澄清 | Agent 追问，触发 `brainstorming` | 逐条回答，**此阶段不写代码** |
| Step 3 设计 | 产出变更目录 `spec/changes/{change-name}/`（含 design.md） | 阅读摘要，回复「确认」或修改意见 |
| Step 4 计划 | Agent 拆任务，触发 `writing-plans` | 确认 MVP 范围与优先级 |
| Step 5 实现 | 数据库 → API → 前端，加载各阶段 Skill | 中期看原型，及时纠偏 |
| Step 6 交付 | `pnpm build` 验证 + 验收场景走查 | 按清单签字或列修改项 |

### 3.4 需求输入模板（复制即用）

**新建网站**

```text
@网站开发

【项目名称】任务管理系统
【一句话】团队负责人管理成员任务与进度
【目标用户】团队负责人、成员
【核心功能】
1. 任务 CRUD（标题、负责人、状态、截止日期）
2. 看板视图（待办 / 进行中 / 已完成）
3. 首页统计（任务总数、完成率）
【MVP】第一版只做 CRUD + 看板 + 统计，不做登录权限
【验收场景】
1. 打开首页能看到统计数据
2. 能新增、编辑、删除一条任务
3. 看板切换状态后数据正确
4. 刷新页面数据仍在

请使用本地 PostgreSQL，先输出设计文档，我确认后再开发。
```

**在已有项目上迭代**

```text
@网站开发

在现有任务管理系统上增加「导出 CSV」功能。
影响页面：任务列表页
影响数据：无新表，读取现有 tasks 表
请先更新设计文档，确认后再改代码。
```

### 3.5 本地环境准备（开发侧）

网站开发 Agent 默认使用**本地 PostgreSQL**，开发前需确保：

```bash
createdb task_manager
# .env 中配置
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager

pnpm install && pnpm db:push && pnpm dev
```

产品经理无需操作以上步骤，但验收前需确认开发环境可访问演示地址。

### 3.6 Agent 会自动调用的 Skill 地图

| 阶段 | Skill | 作用 |
|------|-------|------|
| 需求澄清 | `brainstorming` | 追问、方案对比、设计规格 |
| 实施计划 | `writing-plans` | 任务拆分、文件清单 |
| 分步开发 | `executing-plans` | 按计划逐步实施 |
| **UI/UX 设计** | **`ui-ux-pro-max`** | 设计系统、配色、字体、布局规范 |
| **视觉实现** | **`frontend-design`** | 高品质界面，避免 AI 千篇一律审美 |
| **规范审查** | **`web-design-guidelines`** | 无障碍、间距、交互一致性 |
| **前端编码** | **`vercel-react-best-practices`** | Next.js / React 性能最佳实践 |
| 写功能 / 修 Bug | `test-driven-development` | 先测后写 |
| 交付前 | `verification-before-completion` | 跑命令、附证据 |

---

## 四、网站开发相关 Skill 详解

以下 Skill 已安装至 `.codebuddy/skills/`。Agent 会按阶段自动加载；你也可以**手动调用**（输入 `/skill-name`）加强某一环节。

### 4.1 ui-ux-pro-max — UI/UX 设计 intelligence

**是什么**

内置 50+ 设计风格、161 套配色、57 组字体搭配、99 条 UX 规范的可检索设计知识库，覆盖 Dashboard、SaaS、Admin、Landing Page、移动端等场景。

**什么时候用**

- 新网站定视觉方向（深色科技 / 极简商务 / 玻璃拟态 / Bento Grid 等）
- 选配色、字体、间距、布局系统
- 设计导航、表单、表格、图表等组件结构
- 界面「不够专业」但说不清原因时

**怎么调用**

```text
/ui-ux-pro-max

为任务管理系统选择设计方向：B2B 管理后台，深色科技风，
目标用户是研发团队，需要清晰的信息层级和高效操作路径。
```

或在 `@网站开发` 会话中说明：

```text
设计阶段请先加载 ui-ux-pro-max，输出配色、字体和布局规范后再画页面。
```

**产出示例**：设计系统说明、CSS 变量 Token、组件状态规范、页面结构建议。

**产品经理关注点**：风格是否符合品牌与用户习惯；菜单层级是否过深；主流程是否 3～5 步内完成。

---

### 4.2 frontend-design — 高品质前端视觉

**是什么**

Anthropic 官方 Skill，强调**有明确美学主张**的前端实现，主动规避 generic AI 审美（烂大街紫渐变、无脑 Inter 字体、无层次白底等）。

**什么时候用**

- 具体页面 / 组件的视觉实现
- Landing Page、Dashboard、表单、卡片等需要「有设计感」的界面
- 改版、美化现有 UI

**怎么调用**

```text
/frontend-design

实现任务看板页面：三列 Kanban，深色背景，强调色用青绿色，
卡片带 subtle 阴影和 hover 动效，中文界面。
```

**与 ui-ux-pro-max 的分工**

| Skill | 侧重 |
|-------|------|
| `ui-ux-pro-max` | 设计**决策**：风格、配色、字体、UX 规范、信息架构 |
| `frontend-design` | 设计**落地**：把方向变成高质量 React / Tailwind 代码 |

推荐顺序：**ui-ux-pro-max 定方向 → frontend-design 写页面**。

---

### 4.3 web-design-guidelines — 界面规范审查

**是什么**

Vercel 维护的 Web 界面规范审查 Skill，检查无障碍、间距、交互、最佳实践合规性。

**什么时候用**

- 页面开发完成后做 UX / 无障碍审查
- 上线前质量把关
- 觉得「哪里不对但说不清」时

**怎么调用**

```text
/web-design-guidelines

请审查任务列表和看板页面，检查无障碍和 UX 规范。
```

**产出**：按 `file:line` 格式列出问题（对比度不足、缺少 focus 态、间距不一致等）。

**产品经理关注点**：是否影响主流程可用性；错误提示是否清晰；移动端是否正常。

---

### 4.4 vercel-react-best-practices — React / Next.js 性能

**是什么**

Vercel 工程团队维护的 70 条 React / Next.js 性能规则，涵盖 Server Component、数据获取、bundle 优化等 8 大类。

**什么时候用**

- 写新页面、新组件时（Agent 开发阶段自动加载）
- 页面加载慢、包体积大时排查
- 技术 Code Review 阶段

**怎么调用**

```text
/vercel-react-best-practices

审查任务管理模块的前端代码是否符合 Next.js App Router 最佳实践。
```

**产品经理需要知道吗？** 一般不需要。了解即可：这个 Skill 保证技术实现「又快又稳」，不影响你验收业务功能。

---

### 4.5 Superpowers 工作流 Skill（已有，无需额外安装）

| Skill | 一句话 | 手动调用 |
|-------|--------|----------|
| `brainstorming` | 先设计后编码，禁止直接开写 | `/brainstorming` |
| `writing-plans` | 设计 → 可执行计划 | `/writing-plans` |
| `executing-plans` | 按计划分步实施 | `/executing-plans` |
| `test-driven-development` | 先写测试再写实现 | `/test-driven-development` |
| `verification-before-completion` | 有证据才能说「完成」 | `/verification-before-completion` |

完整清单见 `.codebuddy/skills/README.md`。

---

### 4.6 Skill 安装方式（研发参考）

网站开发相关 Skill 通过 `npx skills add` 安装至 `.codebuddy/skills/`（本项目已安装）：

```bash
npx skills add https://github.com/vercel-labs/agent-skills \
  --skill vercel-react-best-practices --skill web-design-guidelines \
  --agent codebuddy -y --copy

npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill \
  --skill ui-ux-pro-max --agent codebuddy -y --copy

npx skills add https://github.com/anthropics/skills \
  --skill frontend-design --agent codebuddy -y --copy
```

版本锁定记录在项目根目录 `skills-lock.json`。

---

## 五、三个系统的共性模式

尽管业务不同，三个系统都遵循同一套 **AICoding 项目开发模式**：

```
┌─────────────────────────────────────────────────────────────┐
│  产品经理：问题定义 + 边界 + 验收标准 + 业务语义对齐          │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  AICoding + Superpowers：brainstorming → writing-plans     │
│  → executing-plans → TDD → review → verification           │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  交付物：可运行系统 + API 文档 + 设计文档 + 测试证据          │
└─────────────────────────────────────────────────────────────┘
```

| 共性 | 说明 |
|------|------|
| 先设计后编码 | 再「简单」的需求也走 brainstorming，避免 AI 直接开写返工 |
| 项目级记忆 | `CODEBUDDY.md` 记录技术栈、命名规范、架构约定，全项目共享 |
| 专家 Agent 分工 | 产品、架构、前端、后端、测试等 Agent 按场景调用 |
| 工作流 Skill | Superpowers 保证 TDD、调试、审查、验证有章可循 |
| 人机协作节点 | 方案确认、发布审批、验收测试——产品必须在环 |

---

## 六、产品经理在 AICoding 项目中的四个角色

### 6.1 问题定义者（最重要）

不要上来就说「做一个 XXX 功能」，而要说：

- **谁**在用？什么场景？
- **现在**怎么做的？痛点是什么？
- **成功**长什么样？怎么度量？
- **不能**做什么？合规 / 性能 / 安全边界？

**推荐话术（直接对 AICoding 说）**

```text
我要做一个 [系统名称]。
目标用户是 [角色]，他们在 [场景] 下需要 [能力]。
当前痛点是 [具体问题]。
成功标准是 [可量化指标]。
约束条件：[技术栈 / 合规 / 时间 / 不能做的范围]。
请先不要写代码，帮我做需求澄清和方案对比。
```

这会触发 `brainstorming` 技能，AI 会逐一追问，正好补齐 PRD 所需信息。

做网站类项目时，可直接改用 **第三节的需求模板**，并加上 `@网站开发`。

---

### 6.2 方案评审者

AICoding 产出设计文档后，产品经理重点评审：

| 评审项 | 关注点 |
|--------|--------|
| 信息架构 | 菜单、实体、关系是否符合业务语言 |
| 用户路径 | 主流程是否 3～5 步内完成 |
| 权限模型 | 谁能看、谁能改、谁能发布 |
| 边界情况 | 空数据、失败、并发、回滚 |
| MVP 范围 | 第一版做什么、不做什么 |
| 视觉方向 | ui-ux-pro-max 输出的风格是否符合预期（如有） |

**你不需要懂代码**，但需要问：「业务方能不能看懂、用起来顺不顺、出了错怎么办」。

---

### 6.3 验收负责人

AICoding 完成开发后会走 `verification-before-completion`——没有跑过测试证据，不能声称「做完了」。

产品经理的验收清单：

- [ ] 主流程走通（附操作步骤）
- [ ] 3～5 个真实业务场景可复现
- [ ] 权限与角色行为符合预期
- [ ] 异常提示是「人话」，不是堆栈信息
- [ ] 核心 API / 页面有文档或说明
- [ ] 列表 / 表单 / 空态 / 加载态 / 错误态体验正常

---

### 6.4 Agent 配置参与者（进阶）

在智能体协作类项目中，产品经理可以直接参与 `.codebuddy/agents/product/` 下的角色定义，例如：

- `product-manager`：PRD、路线图、优先级
- `product-trend-researcher`：竞品与市场调研
- `product-feedback-synthesizer`：用户反馈分析

**含义**：把「产品经理怎么思考」写成 Agent 配置，让平台里的 AI 角色与真实产品流程一致。

---

## 七、AICoding 项目标准配置（建议）

每个新项目建议在根目录建立规范驱动 + `.codebuddy/` 结构：

```
项目根目录/
├── AGENTS.md                 # 项目概述、API 表、表结构摘要
├── spec/                     # 规范驱动核心
│   ├── specs/                # 真理源：当前系统能力
│   ├── changes/              # 需求迭代（proposal / design / tasks）
│   ├── ME2AI/                # 人类 → AI 输入
│   ├── AI2AI/                # AI 中间产物（草稿，默认不入库）
│   └── project.md            # 技术栈与业务上下文
├── docs/                     # 沉淀文档
│   ├── guides/               # 培训与实践（含本文档）
│   └── architecture/         # ADR
├── CODEBUDDY.md              # Skill 清单与协作规则
├── skills-lock.json          # 外部 Skill 版本锁（可选）
└── .codebuddy/
    ├── skills/               # Superpowers + 网站开发 Skill
    ├── agents/               # 专家角色（含 engineering/网站开发.md）
    │   ├── product/
    │   ├── design/
    │   ├── engineering/
    │   └── testing/
    └── rules/                # 团队编码与文档规范（可选）
```

| 目录 | 产品经理需要知道什么 |
|------|----------------------|
| `spec/changes/` | 每次需求迭代的 proposal、design、tasks |
| `spec/specs/` | 已确认的系统行为真理源 |
| `spec/ME2AI/` | 人类原始需求、评审反馈、输入模板 |
| `spec/AI2AI/` | AI 草稿，确认前可忽略 |
| `docs/` | 培训材料、ADR、用户说明 |
| `CODEBUDDY.md` | 项目的「长期记忆」，应包含业务背景、用户角色、术语表 |
| `.codebuddy/skills/` | AI 的工作方法；网站开发含 ui-ux-pro-max 等 4 个 Skill |
| `.codebuddy/agents/` | 可调用的专家角色；网站类项目用 `@网站开发` |

---

## 八、用 AICoding 做新系统的标准流程

### Step 1：启动会话，对齐上下文

```text
请先阅读 CODEBUDDY.md 和项目现有结构。
我要启动一个新系统：[系统名称]。
请先理解项目背景，再开始需求澄清。
```

网站类项目可直接：`@网站开发` + 第三节需求模板。

### Step 2：需求澄清（brainstorming）

- AI 会逐条提问，产品经理逐条回答
- 产出：设计规格写入 `spec/changes/{change-name}/`（探索草稿可先放 `spec/AI2AI/drafts/`）
- **产品动作**：确认方案，明确「做 / 不做」

### Step 3：实施计划（writing-plans）

- AI 把设计拆成可执行任务：文件、接口、页面、测试
- **产品动作**：确认优先级，砍 MVP 范围

### Step 4：开发执行（executing-plans + TDD + 网站 Skill）

- Agent 按阶段加载 ui-ux-pro-max、frontend-design、vercel-react-best-practices 等
- **产品动作**：中期看原型，及时纠偏，避免做完才发现理解错了

### Step 5：审查与验证

- web-design-guidelines 审查 UI + 代码审查 + 测试证据 + 产品验收
- **产品动作**：按验收清单签字，或列出修改项

### Step 6：收尾

- 合并、部署、文档归档
- **产品动作**：更新用户说明、培训材料、上线公告

---

## 九、三类系统的启动模板（可直接复用）

### 模板 A：配置管理平台（参考：大模型场景管理）

```text
@网站开发
我要做一个 [XX] 配置管理平台。
核心实体是 [实体名]，需要支持 CRUD、版本管理、发布/回滚、权限隔离。
用户角色：[管理员 / 业务配置员 / 只读查看者]。
第一版只做 [MVP 范围]，不做 [明确排除项]。
请先输出设计文档，确认后再开发。使用本地 PostgreSQL。
```

### 模板 B：分析洞察平台（参考：代码智能解析）

```text
@网站开发
我要做一个 [XX] 智能分析平台。
输入是 [数据源]，输出是 [结构化结果 + 自然语言问答]。
目标用户是 [角色]，他们需要通过它 [完成什么决策]。
MVP 先支持 [一种数据源 / 一种输出格式]。
请先输出设计文档，确认后再开发。使用本地 PostgreSQL。
```

### 模板 C：协作编排平台（参考：智能体人机协作平台）

```text
@网站开发
我要做一个 [XX] 人机协作平台。
支持 [N] 种 Agent 角色，任务可 [串行/并行] 执行。
必须在 [节点] 插入人工审批。
第一版先跑通一条完整业务流：[具体流程描述]。
请先输出设计文档，确认后再开发。使用本地 PostgreSQL。
```

---

## 十、产品经理 vs 开发：分工边界

| 事项 | 产品经理 | 全栈开发 + AICoding |
|------|----------|---------------------|
| 为什么要做 | ✅ 主导 | 参与澄清 |
| 做什么 / 不做什么 | ✅ 主导 | 评估可行性 |
| 用户流程与信息架构 | ✅ 主导 | 实现与优化 |
| 视觉风格方向 | ✅ 评审确认 | 调用 ui-ux-pro-max 等实现 |
| 技术选型 | 参与决策 | ✅ 主导 |
| 数据模型与 API | 评审业务语义 | ✅ 主导 |
| 编码实现 | — | ✅ 主导 |
| Agent / Skill 配置 | 参与产品类 Agent | ✅ 主导 |
| 测试与上线 | ✅ 验收 | ✅ 执行 |
| 文档与培训 | ✅ 用户向文档 | ✅ 技术文档 |

**避免的两个极端**

1. **产品不管，只说「帮我做一个系统」** → AI 会猜需求，返工成本高  
2. **产品过度介入实现细节** → 限制 AI 和开发发挥，效率反而下降  

---

## 十一、常见问题

**Q1：AICoding 会不会取代开发？**  
不会。AICoding 放大的是开发效率；**问题定义、取舍、验收、跨部门对齐**仍然需要人和产品经理。

**Q2：产品需要会写 prompt 吗？**  
需要会「说清楚问题」，不需要会调模型参数。按本文模板表达即可；复杂 Prompt 由 Agent 配置承担。

**Q3：@网站开发 和 /ui-ux-pro-max 有什么区别？**  
`@网站开发` 是委派一个**全栈专家**跑完整流程（需求→设计→前后端→数据库）。`/ui-ux-pro-max` 是加载一个**设计规范 Skill**，只做 UI/UX 相关决策。通常先用 `@网站开发` 启动项目，它在设计阶段会自动加载 ui-ux-pro-max；你也可以单独 `/ui-ux-pro-max` 做风格评审或改版。

**Q4：Skill 会自动触发吗？**  
Superpowers 工作流 Skill（如 brainstorming）会在匹配场景时自动加载。网站开发 Skill（ui-ux-pro-max 等）由 `@网站开发` Agent 按阶段调用；也可手动 `/skill-name` 强制加载。

**Q5：需求变更怎么办？**  
在 AICoding 里明确说「范围变更：原 X 不做，改为 Y」，让它更新设计文档和计划，不要口头改一半、代码改一半。

**Q6：怎么判断 AICoding 产出是否可信？**  
看证据：测试是否跑过、演示是否可复现、文档是否与代码一致。没有证据的「已完成」不可验收。

**Q7：三个系统之间有什么可复用能力？**

| 复用层 | 内容 |
|--------|------|
| 基础平台 | 用户 / 角色 / 权限 / 审计日志 |
| 配置引擎 | 版本管理、发布、回滚（场景管理 → 其他配置类系统） |
| 解析引擎 | 索引、检索、问答（代码解析 → 文档/知识库类系统） |
| 编排引擎 | Agent 调度、人工卡点（协作平台 → 其他流程类系统） |
| 网站开发 Agent | `@网站开发` + 4 个 Skill，快速交付 Web 管理台 / 业务平台 |

---

## 十二、给产品经理的行动建议

### 本周就能做的

1. 读一遍 `CODEBUDDY.md`，了解当前项目约定  
2. 用 **第三节需求模板**，在 AICoding 里试一次 `@网站开发`（先只要设计文档，不写代码）  
3. 手动试一次 `/ui-ux-pro-max`，感受设计 Skill 的输出  
4. 参加一次开发会话的中期原型评审，而不是等全部做完  

### 下一个项目应前置的

1. 与开发共建 `CODEBUDDY.md` 中的**业务术语表**和**用户角色说明**  
2. 在 PRD 中增加「验收场景」章节（3～5 条，可执行）  
3. 明确 MVP 边界，写清「第一版不做什么」  

### 长期可参与的

1. 共同维护 `.codebuddy/agents/product/` 下的产品 Agent  
2. 把反复出现的评审标准沉淀为 `.codebuddy/rules/`  
3. 推动团队统一 Superpowers 工作流，减少「AI 想到哪写到哪」  

---

## 十三、总结

| 结论 | 说明 |
|------|------|
| AICoding 是工具，不是魔法 | 输入质量决定输出质量 |
| 产品经理的核心价值不变 | 定义问题、对齐预期、验收结果 |
| 三个已落地系统证明路径可行 | 配置管理、智能解析、协作编排均可复制 |
| 网站开发有现成 Agent + Skill | `@网站开发` + ui-ux-pro-max 等，可快速交付 Web 应用 |
| 复制路径 = 标准流程 + 项目配置 + 明确分工 | 本文即团队可复用的起点 |

**最后一句话**：  
用 AICoding 做系统，不是「把需求扔给 AI 等结果」，而是**产品定义方向、AI 加速实现、人做关键判断**——三个已落地系统，都是这样做出来的。

---

## 附录：相关资源

| 资源 | 位置 |
|------|------|
| 网站开发 Agent | `.codebuddy/agents/engineering/网站开发.md` |
| Superpowers + 网站 Skill 清单 | `.codebuddy/skills/README.md` |
| 专家 Agent 分类 | `.codebuddy/agents/README.md` |
| 项目记忆 | `CODEBUDDY.md`、`spec/project.md` |
| Skill 版本锁 | `skills-lock.json` |
| Superpowers 上游 | [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh) |
| ui-ux-pro-max 上游 | [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Vercel Agent Skills | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |
| frontend-design 上游 | [anthropics/skills](https://github.com/anthropics/skills) |
| 专家角色库 | [agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) |
