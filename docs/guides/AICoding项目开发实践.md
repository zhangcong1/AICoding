# AICoding 项目开发实践

---

## 一、介绍目前使用 AICoding 做的三个系统

目前使用 AICoding 已经落地实现了三个线上的系统平台：大模型场景管理系统、代码智能解析平台、智能体人机协作平台。

这三个系统，不是跟 AI 说「帮我做一个 XX 平台」，就完成了。而是包括从需求设计、前后端开发、数据库设计等完整的系统，并且也经过多次产品功能迭代持续演进，最终形成可持续维护的能上线、能闭环使用的完整应用。

AICoding 不止是帮助开发写几段代码，而是把「需求澄清 → 方案设计 → 拆解计划 → 编码实现 → 测试验证 → 文档交付」整条链路加速。产品经理的价值，在于**把问题定义清楚、把边界划明白、把验收标准写具体**——这样 AICoding 才能稳定产出可用系统。

---

## 二、配置智能体与网站开发

AICoding 偏开发场景，不会像 WorkBuddy 那样内置「网站开发」「PPT 制作」「产品管理」等现成智能体。需要自行安装 Skill，或在 `.codebuddy/agents/` 下编写 Agent。

网站类项目推荐使用 **`@网站开发`** 智能体（配置于 `.codebuddy/agents/engineering/网站开发.md`）。对话中 `@网站开发` 即可启动——它会按规范驱动流程，把需求变成**能本地运行、能持续迭代**的完整 Web 应用（前端页面 + 后端 API + 数据库），而不是只生成几页静态界面。

**适用场景**：管理后台、业务平台、数据看板、协作门户等（新建或迭代均可）。

**内置原则**：设计确认前不写代码；MVP 优先；交付前必须能演示、能构建。

### 2.1 按阶段：用什么、怎么用、产出什么

| 阶段 | 用什么 | 怎么用 | 产出 / 效果 |
|------|--------|--------|-------------|
| **需求澄清** | Skill：`brainstorming`<br>可选 Agent：`@product-manager` | 新需求时说「先澄清，不要写代码」，或 `/brainstorming`；用 `@网站开发` 启动项目时也会自动走这一步 | AI **逐条追问**（谁在用、痛点、边界、验收标准），给出 **2～3 种方案对比**；**确认前不写代码** |
| **方案设计** | Skill：`brainstorming`（续） | 回答追问、选定方案后，回复「确认」或修改意见 | 写入 `spec/changes/{变更名}/design.md`：页面结构、数据实体、API 概要、验收场景——**产品的评审重点** |
| **实施计划** | Skill：`writing-plans` | 设计文档确认后自动或手动触发 | `spec/changes/{变更名}/tasks.md`：拆好的开发任务清单 |
| **编码开发** | Agent：`@网站开发`<br>Skill：`executing-plans`、`test-driven-development` 等 | 说「设计已确认，请按计划开发」 | 前后端 + 数据库一体实现；UI / UX 相关 Skill 由 Agent 按阶段自动加载 |
| **审查验收** | Skill：`verification-before-completion` 等<br>可选 Agent：`@testing-reality-checker` | 开发完成后说「对照验收场景检查」 | **必须有测试 / 构建证据**才能声称完成；可对照 PRD 查实现是否跑偏 |

**一条链路**：`brainstorming` → 产品确认 design.md → `writing-plans` → `@网站开发` 开发 → 验收。

**按需选用的专家 Agent**（不必每次都用）：`@product-trend-researcher`（竞品调研）、`@product-feedback-synthesizer`（用户反馈）、`@design-ux-architect`（信息架构）。完整清单见 `.codebuddy/agents/README.md`。

### 2.2 怎么启动

```text
@网站开发

【项目名称】任务管理系统
【目标用户】团队负责人、成员
【核心功能】任务 CRUD、看板视图、首页统计
【MVP】第一版不做登录权限
【验收场景】
1. 首页能看到统计数据
2. 能新增、编辑、删除任务
3. 刷新后数据仍在

请先输出设计文档，我确认后再开发。
```

已有项目加功能时，说明改什么、影响哪些页面，同样加上「先更新设计文档，确认后再改代码」。更完整的输入模板见 `spec/ME2AI/templates/新建网站.md`。

### 2.3 产品经理怎么配合

写清需求与验收场景 → 评审设计文档 → 中期看原型 → 按场景验收。Agent 负责串联各阶段 Skill，产品主要在**确认节点**回复「确认」或修改意见——不需要懂代码，也不需要单独调用各个网站 Skill。

以下 Skill 已安装至 `.codebuddy/skills/`。Agent 会按阶段自动加载；你也可以**手动调用**（输入 `/skill-name`）加强某一环节。

### 2.4 ui-ux-pro-max — UI/UX 设计 intelligence

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

#### 技能网站：
https://www.skills.sh/

---

## 四、本地环境与 Git 仓库配置

用 `@网站开发` 交付 Web 应用前，开发侧需先把**本地运行环境**和 **Git 仓库**配好。产品经理不必亲自装依赖，但应知道「什么就绪了才能开始开发、代码和文档放在哪、哪些东西不能提交」——便于对齐进度和验收。

### 4.1 本地开发环境

**默认技术栈**（见 `spec/project.md`）：Next.js 16 + React 19 + TypeScript + shadcn/ui + Drizzle ORM + **本地 PostgreSQL**，包管理 **pnpm only**。

| 依赖 | 用途 | 建议版本 |
|------|------|----------|
| Node.js | 运行 Next.js | 20 LTS 及以上 |
| pnpm | 安装依赖、跑脚本 | 9.x 及以上 |
| PostgreSQL | 业务数据存储 | 14 及以上，默认 `localhost:5432` |
| AICoding | 智能体开发会话 | 打开项目根目录 |

**首次启动（研发执行）**

```bash
# 1. 进入项目根目录
cd {project_root}

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，把 {project_slug} 换成实际项目库名

# 3. 创建本地数据库（库名与 .env 中 DATABASE_URL 一致）
createdb {project_slug}

# 4. 安装依赖并同步 Schema
pnpm install
pnpm db:push

# 5. 启动开发服务（默认 http://localhost:3000）
pnpm dev
```

**常用命令**

| 命令 | 作用 |
|------|------|
| `pnpm dev` | 本地开发热更新 |
| `pnpm build` | 生产构建（交付前必跑） |
| `pnpm lint` | 代码规范检查 |
| `pnpm db:push` | 按 Schema 同步数据库结构 |
| `pnpm db:seed` | 写入种子数据（若有） |

**交付验证**（Agent 声称完成前应能跑通）：

```bash
pnpm install && pnpm db:push && pnpm build && pnpm lint
```

### 4.2 环境变量

项目根目录提供 `.env.example` 作为模板，**实际值写在 `.env`**，且 `.env` **不得提交到 Git**。

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/{project_slug}
NODE_ENV=development
PORT=3000
# SKIP_DB_PUSH=1   # 仅在不希望 dev 启动时自动 push Schema 时使用
```

新项目接入时，在 `spec/project.md` 中同步更新 `{project_slug}`、业务背景和技术约定，便于 Agent 和团队成员对齐上下文。

### 4.3 Git 仓库配置

#### 初始化或克隆

**新建项目**

```bash
git init
git add .
git commit -m "chore: 初始化项目脚手架"
git branch -M main
git remote add origin <仓库地址>
git push -u origin main
```

**已有远程仓库**

```bash
git clone <仓库地址>
cd {project_root}
cp .env.example .env
# 按 4.1 完成本地环境配置
```

#### 远程平台（国内团队常见）

| 平台 | 远程地址示例 |
|------|--------------|
| Gitee | `https://gitee.com/<org>/<repo>.git` |
| Coding.net | `https://e.coding.net/<team>/<project>/<repo>.git` |
| 极狐 GitLab | `https://jihulab.com/<group>/<repo>.git` |
| GitHub | `https://github.com/<org>/<repo>.git` |

SSH 与凭据、CI 接入等平台差异，研发可参考 Skill `chinese-git-workflow`（输入 `/chinese-git-workflow`）。

#### 分支与协作约定

| 约定 | 说明 |
|------|------|
| 主分支 | `main` 保持可构建、可演示 |
| 功能分支 | `feature/{变更名}` 或 `spec/{变更名}`，对应 `spec/changes/{变更名}/` |
| 提交粒度 | 一个逻辑变更一次提交；message 建议 Conventional Commits（如 `feat:`、`fix:`、`docs:`） |
| 合并前 | `pnpm build` 通过；设计文档与代码变更对应 |

**建议入库**

- `spec/specs/`、`spec/changes/`、`spec/ME2AI/` — 规范与需求
- `docs/` — 培训、ADR、用户说明
- `src/` — 应用代码
- `.codebuddy/` — Agent 与 Skill 配置
- `CODEBUDDY.md`、`AGENTS.md`、`spec/project.md` — 项目记忆

**默认不入库**

- `.env` — 含数据库密码等敏感信息
- `spec/AI2AI/` — AI 草稿（确认后再迁入正式路径）
- `node_modules/`、`.next/` — 构建产物与依赖缓存

### 4.4 产品经理需要知道的

| 事项 | 产品经理 | 研发 + AICoding |
|------|----------|-----------------|
| 本地能否跑起来 | 验收时确认能演示 | 负责安装、配置、排查 |
| 需求与评审材料放哪 | 写入 `spec/ME2AI/`、`spec/changes/` | 协助整理进规范目录 |
| Git 分支对应哪次需求 | 知道当前迭代对应的 change 名 | 建分支、提交、合并 |
| 环境变量与密钥 | 不接触 `.env` | 本地配置，生产由运维/研发管理 |
| 交付是否可信 | 要求有 build / 演示证据 | 跑验证命令后再声称完成 |

环境就绪、仓库结构清晰后，即可按第二节启动 `@网站开发`，进入需求澄清与开发流程。

---

## 五、当前项目 spec 目录规范

本项目采用**规范驱动开发**：`spec/` 目录是需求、设计与系统能力的「单一事实来源」。代码在 `src/`，但**做什么、做到什么程度、怎么验收**——以 `spec/` 为准。

详细规则见 `spec/AGENTS.md`；本节面向产品经理，说明各目录放什么、一次迭代怎么走、你在哪些节点需要确认。

### 5.1 目录总览

```
spec/
├── AGENTS.md              # spec 工作流说明（AI 与人类共用）
├── project.md             # 项目上下文：技术栈、环境变量、术语表
├── config.yaml            # 规范驱动配置与文档生成规则
├── specs/                 # ✅ 真理源：当前已确认的系统能力
├── changes/               # 🔄 进行中的需求迭代
│   ├── _template/         # 新建变更时复制此目录
│   └── archive/           # 已完成变更（只读归档）
├── ME2AI/                 # 👤 人类 → AI 原始输入
│   ├── requirements/      # 需求描述、验收场景
│   ├── context/           # 业务背景、术语、约束
│   ├── feedback/          # 评审意见、修改指示
│   └── templates/         # 可复用输入模板
└── AI2AI/                 # 🤖 AI 中间产物（草稿，默认不入库）
    ├── drafts/            # brainstorming 草稿、方案对比
    ├── plans/             # 未确认的实施计划
    └── scratch/           # 会话临时文件，用完即删
```

| 路径 | 是否真理源 | 产品经理关注点 |
|------|-----------|----------------|
| `spec/specs/` | ✅ 是 | 查「系统现在能做什么」 |
| `spec/changes/` | 提案工作区 | 评审 proposal / design / tasks |
| `spec/ME2AI/` | ❌ 否 | 写原始需求、反馈、背景材料 |
| `spec/AI2AI/` | ❌ 否 | 确认前可忽略；确认后应迁入 `changes/` |
| `spec/project.md` | 项目上下文 | 业务背景、用户角色、术语表 |

### 5.2 各目录职责

#### `spec/specs/` — 已确认的系统能力

描述**当前已上线 / 已验收**的能力，按业务域分子目录，每域含 `spec.md`（需求与 WHEN/THEN 场景），可选 `design.md`（该域技术模式）。

**功能开发时不直接改这里**，应通过 `spec/changes/` 提交 Delta，归档时再合并进来。

#### `spec/changes/` — 进行中的需求迭代

每次需求（新建系统或功能迭代）在此建独立目录，可复制 `spec/changes/_template/`：

| 文件 | 内容 | 产品动作 |
|------|------|----------|
| `proposal.md` | 为什么做、做什么、不做什么、影响面 | 确认 Goal / Scope / Out of scope |
| `design.md` | 信息架构、数据模型、API、页面、MVP、验收场景 | **重点评审**，确认后再开发 |
| `tasks.md` | 可勾选实施清单 | 确认优先级与 MVP 范围 |
| `specs/{domain}/spec.md` | Delta 规格（ADDED / MODIFIED / REMOVED） | 核对需求变更是否完整 |

探索性草稿可先放 `spec/AI2AI/drafts/`，双方确认后迁入 `spec/changes/{change-name}/`。

#### `spec/ME2AI/` — 人类原始输入

| 子目录 | 放什么 | 命名建议 |
|--------|--------|----------|
| `requirements/` | 需求描述、功能清单、验收场景 | `YYYY-MM-DD-{功能名}-需求.md` |
| `context/` | 业务背景、术语表、约束、参考资料 | 按主题，如 `术语表.md` |
| `feedback/` | 评审意见、修改指示、确认/驳回 | `YYYY-MM-DD-{功能名}-反馈-v{n}.md` |
| `templates/` | 可复用模板 | 如 `新建网站.md`、`功能迭代.md` |

模板用法：复制 `spec/ME2AI/templates/新建网站.md` 到 `requirements/`，填好后发给 `@网站开发`。

#### `spec/AI2AI/` — AI 草稿（默认不入库）

brainstorming、未确认方案、临时分析暂存于此。**不是规格真理源**；确认后必须迁入 `spec/changes/` 或 `docs/`，否则团队无法对齐。

### 5.3 一次需求迭代怎么走

```
ME2AI/requirements/          人类写原始需求
        │
        ▼
changes/{name}/proposal.md   AI 结构化提案 → 产品确认
        │
        ▼
changes/{name}/design.md     设计文档 → 产品评审（确认前不写代码）
        │
        ▼
changes/{name}/tasks.md      实施计划 → 产品确认 MVP 范围
        │
        ▼
@网站开发 按 tasks 开发       中期原型评审
        │
        ▼
验收通过 → 归档
  · specs/ 合并 Delta
  · changes/{name}/ → changes/archive/YYYY-MM-DD-{name}/
  · 更新根目录 AGENTS.md（API 表、表结构摘要）
```

**归档后**：`spec/specs/` 反映系统真实能力；`spec/changes/` 只保留进行中的迭代。

### 5.4 Delta 规格格式（了解即可）

变更对系统行为的影响，写在 `changes/{name}/specs/{domain}/spec.md`，用以下节标题区分：

```markdown
## ADDED Requirements
### Requirement: 用户可导出任务 CSV
系统 SHALL 在任务列表页提供导出按钮……

#### Scenario: 导出全部任务
- **WHEN** 用户点击「导出 CSV」
- **THEN** 浏览器下载包含当前列表全部字段的文件

## MODIFIED Requirements
## REMOVED Requirements
```

产品不必写 Delta，但评审时应确认 ADDED / MODIFIED / REMOVED 与 `design.md`、验收场景一致。

### 5.5 硬性规则（产品也需知晓）

1. **设计未确认，不写业务代码** — 未确认 `design.md` 前，禁止写 `src/app` 业务页和 `schema.ts` 业务表
2. **不直接改 `spec/specs/` 做新功能** — 必须走 `spec/changes/` + Delta
3. **`ME2AI` 是输入，`changes` 是提案，`specs` 是结论** — 确认前的 AI 草稿在 `AI2AI/`，确认后的正式规格在 `changes/` 或 `specs/`
4. **未 build 通过不得声称交付完成** — 验收时要求研发提供构建与演示证据

---

## 六、需求描述与启动验证

核心两件事：**需求写清楚**，**按场景验收**。模板见 `spec/ME2AI/templates/`（新建网站 / 功能迭代）。

### 6.1 需求怎么写

写清五件事：**用户、核心功能、MVP 边界、验收场景、约束**。验收场景须能逐步操作、可判断 pass/fail，避免「好用一点」这类模糊表述。

```text
@网站开发
【项目名称】任务管理系统
【目标用户】团队负责人、成员
【核心功能】任务 CRUD、看板、首页统计
【MVP】第一版不做登录
【验收场景】
1. 首页有三项统计
2. 能增删改任务
3. 刷新后数据仍在
请先输出 design.md，我确认后再开发。
```

需求建议落盘：`spec/ME2AI/requirements/YYYY-MM-DD-{功能名}-需求.md`。

### 6.2 怎么启动

1. 会话开头让 AI 读 `CODEBUDDY.md`、`spec/project.md`，并说「先澄清，不要写代码」
2. `@网站开发` + 粘贴需求 → 回答追问 → 确认写入 `spec/changes/{变更名}/`
3. 评审 `design.md`（MVP、验收场景、页面与数据是否对）→ 回复「确认，请按计划开发」

### 6.3 怎么验证

- **演示**：`pnpm dev`，按 `design.md` 验收场景逐条勾选
- **证据**：交付前须 `pnpm build && pnpm lint` 通过，不能只听「做完了」
- **收尾**：验收通过后归档到 `spec/specs/`，更新 `AGENTS.md`

范围变更、口头改需求 → 先更新 `spec/changes/` 或 `spec/ME2AI/feedback/`，再改代码。

---

## 七、开发遇到的坑与规避


| 常见坑 | 规避 |
|--------|------|
| 一句话需求，AI 猜功能 | 用模板写清 MVP + 验收场景；先澄清再编码 |
| 跳过 design 直接写代码 | `design.md` 确认后再开发 |
| 需求只留在聊天里 | 落 `spec/ME2AI/`，确认进 `spec/changes/` |
| 口头改需求 | 变更写进 spec，再让 AI 改 |
| 相信「完成了」 | 要 build 输出 + 场景逐条验收 |
| 演示即验收 | 按书面场景勾选，含刷新持久化、空态/错误态 |
| 会话换人就失忆 | 先读 `CODEBUDDY.md`；一次迭代一个 change |

**红线**：无 design 确认就写业务代码 · 验收场景无法手动执行 · 无 build 证据 · 需求变更未更新 spec。

规范驱动 = 需求进 ME2AI → 设计进 changes → 证据验收 → 归档进 specs。

---
