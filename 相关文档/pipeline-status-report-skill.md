(Response formatting failed, plain text:)

以下是 `pipeline-status-report` skill 的全部 10 个文件的完整内容：

---

**1. SKILL.md**

```md
---
name: pipeline-status-report
description: 维护本地 `pipeline-status-{hash8}.json` 并将 AI 会话、流水线步骤与执行进度同步到人机协同智能体协作平台。在需要向平台展示需求进展、流水线状态或配合 Agent 上报工作区 Git 信息时使用。
version: 1.2.0
---

# Pipeline Status Report

本技能用于管理 AI 执行过程的本地状态文件，并将其同步上报到研发协作平台。

## 核心功能

1. **初始化**：新会话创建会话专属 `pipeline-status-{hash8}.json`（**自动写入当前仓库 `git remote origin` 与当前分支**，便于平台「项目管理」按团队/仓库/分支聚合）
2. **状态更新**：维护步骤进度与整体状态
3. **平台同步**：通过 HTTP API 上报到协作平台（请求体中的 `repo` 会随 JSON 一并提交）

## 本地状态文件

**路径**：`spec/AI2AI/数据上报/pipeline-status-{hash8}.json`

每个由 init 创建的状态文件对应一次 `session_id`，`{hash8}` 由其派生（取 UUID 去横线后前 8 位）。**判断"是否要 init"以模型自己在本次会话内的上下文为准**：本次会话里没 init 过 → 直接 init 新建一份（**不要**去复用 `.pipeline-session` 或工作区里已有的 `pipeline-status-*.json`）；本次会话里已经 init 过 → 沿用本次 init 出来的那份继续写。

此文件是 AI 执行过程的**真值源**，记录会话信息、用户需求摘要、以及 **`pipelines[*].steps`：对应当前子任务的完整规划**（大步骤级；创建该条流水线时一次性写全，执行过程中主要改各 step 的 `status`/`notes`/`skills`），以及可选的 **Git 仓库维度**（`repo`：remote URL、当前分支等；详见 `references/pipeline-status.protocol.md`）。

### 模型识别当前会话文件的方式

初始化脚本运行后会：
1. 在 stdout 中打印 `当前会话文件路径: spec/AI2AI/数据上报/pipeline-status-{hash8}.json`
2. 在 `spec/AI2AI/数据上报/.pipeline-sessions.json` 注册 `session-scope-key -> hash8`（单一注册表，不产生大量 `.pipeline-session.*` 散落文件）

**模型必须**：
- 执行 init 脚本后，从输出中读取并记住当前会话的文件路径
- 后续所有状态更新均操作该会话专属文件（不得修改其他 hash 的文件）
- 不要因为「记不清路径」就回头读其他会话的指针文件复用旧 hash8；本次会话没 init 过就直接 init 新建

## 资源文件

| 内容 | 路径（相对本技能根目录） |
|------|-------------------------|
| 字段与枚举协议 | `references/pipeline-status.protocol.md` |
| JSON 结构示例（**仅参考，勿照抄**） | `references/pipeline-status.example.json` |
| init 空白骨架（脚本物化用） | `references/pipeline-status.init-template.json` |
| 初始化脚本 | `scripts/pipeline-status-init.mjs` |
| 同步上报脚本 | `scripts/pipeline-status-sync.mjs` |
| 环境变量加载 | `scripts/pipeline-status-env.mjs` |
| 模板物化工具 | `scripts/pipeline-status-from-template.mjs` |

## 鉴权配置

在仓库根目录 `.env` 中配置（同步脚本会自动加载）：

```env
PLATFORM_BASE_URL=http://<平台地址>:5001
PLATFORM_EMPLOYEE_ID=<你的工号>
```

- **必填**：`PLATFORM_EMPLOYEE_ID`（未设置时脚本尝试使用系统用户名）；上报请求头为 `X-Employee-Id`

**注意**：`.env` 已在 `.gitignore` 中，请勿提交到 Git。

## 使用方式

### 1. 初始化（新会话）

在 **workspace 根目录** 执行：

```bash
node ./.codebuddy/skills/pipeline-status-report/scripts/pipeline-status-init.mjs
```

执行后从 stdout 读取并记录 `当前会话文件路径`，例如：
```
当前会话文件路径: spec/AI2AI/数据上报/pipeline-status-a1b2c3d4.json
```
后续所有步骤均操作此路径的文件。

**init 后的 `pipelines` 必须为 `[]`**（由 `pipeline-status.init-template.json` 物化）。首次规划时参考 `pipeline-status.example.json` 中 **单条** `pipelines[0]` 的写法：在 `pipelines` **末尾追加一条** PipelineEntry，并在该条的 `steps` 里一次性写全该任务的大步骤规划（一个需求一条流水线）。

### （可选）记录主 Agent — 仅 `pipelines[0]`，整条会话只记一次

主 Agent 信息**只在本会话第一条流水线**（`pipelines[0]`）上记录；**模型无需、也不应在** `pipelines[1]`、`pipelines[2]`… 上再写 `main_agent`（追加新任务时不要复制、不要补全 null 占位对象）。

| 场景 | 模型怎么做 |
|------|------------|
| 本次由主 Agent 驱动，且 `pipelines[0]` 尚未写过 `main_agent` | 在 **`pipelines[0]`** 填写 `main_agent`（见 example） |
| 未使用主 Agent，或无法对应到主 Agent 定义 | **省略** `main_agent` 字段，或不要编造 slug/title |
| `pipelines[0]` **已经**有过有效的 `main_agent` | **禁止**再改、再在后续 pipeline 上重复写 |
| 追加第二条及以后 pipeline（新任务） | **不要**带 `main_agent` 字段 |

平台服务端与同步脚本已约定：**仅 `pipelines[0]` 的 `main_agent` 会落库**；后续条目的该字段即使写了也会被忽略。因此**主要靠模型遵守上述规则即可，不必为此再加业务代码**。

若希望通过环境变量自动填入（仅当 `pipelines[0].main_agent` 仍为空时），可在 init/sync 前设置：

```env
PIPELINE_MAIN_AGENT_SLUG=fullstack-main-agent
PIPELINE_MAIN_AGENT_TITLE=全栈需求实现
PIPELINE_MAIN_AGENT_SOURCE_PATH=.codebuddy/agents/main-agents/全栈需求实现.md
PIPELINE_MAIN_AGENT_MODEL=gpt-5.2