# Spec AI 助手指令

## 目录职责

| 路径 | 用途 | 是否真理源 |
|------|------|-----------|
| `spec/specs/` | 当前已上线系统能力 | ✅ 是 |
| `spec/changes/` | 进行中的需求迭代 | 提案工作区 |
| `spec/changes/archive/` | 已完成变更历史 | 只读归档 |
| `spec/ME2AI/` | 人类 → AI 的原始输入 | ❌ 否 |
| `spec/AI2AI/` | AI → AI 的中间产物、草稿 | ❌ 否 |
| `docs/` | 需长期沉淀的人类文档 | 是 |
| `src/` | 应用源代码 | 代码真理源 |

## 工作流

### 1. 人类输入（ME2AI）

产品经理 / 开发者在 `spec/ME2AI/` 提供原始输入：

- `requirements/` — 需求描述、验收场景
- `context/` — 业务背景、术语、约束
- `feedback/` — 评审意见、修改指示
- `templates/` — 可复用输入模板

### 2. 新建能力 / 新项目

在 `spec/changes/{change-name}/` 创建变更目录（可复制 `_template/`）：

- `proposal.md` — 为什么做、做什么、影响范围
- `design.md` — 架构、数据模型、API、页面、验收场景
- `tasks.md` — 可勾选实施清单
- `specs/{domain}/spec.md` — Delta 规格（ADDED/MODIFIED/REMOVED）

探索性草稿可先写 `spec/AI2AI/drafts/`，确认后迁入 `spec/changes/`。

**方案确认前禁止写业务代码**（`src/app` 业务页、`schema.ts` 业务表）。

### 3. 实施

按 `tasks.md` 逐项实现。网站类项目加载 `@网站开发` Agent。

### 4. 归档

变更完成后：

1. 将 `changes/{name}/specs/` 合并入 `spec/specs/`
2. 整个变更目录移入 `spec/changes/archive/YYYY-MM-DD-{name}/`
3. 更新根目录 `AGENTS.md`（API 表、表结构摘要）

## 文档放置规则

| 内容类型 | 放置位置 |
|----------|----------|
| 人类原始需求 | `spec/ME2AI/requirements/` |
| 业务背景、术语、约束 | `spec/ME2AI/context/` |
| 评审意见、修改指示 | `spec/ME2AI/feedback/` |
| 需求输入模板 | `spec/ME2AI/templates/` |
| 需求提案、迭代描述 | `spec/changes/{change-name}/proposal.md` |
| 设计规格（待确认） | `spec/changes/{change-name}/design.md` |
| 已确认系统行为 | `spec/specs/{domain}/spec.md` |
| 实施任务清单 | `spec/changes/{change-name}/tasks.md` |
| AI brainstorming 草稿 | `spec/AI2AI/drafts/` |
| 探索性分析、会话临时文件 | `spec/AI2AI/scratch/` |
| 未确认的实施计划 | `spec/AI2AI/plans/` |
| 培训材料、团队指南 | `docs/guides/` |
| 架构决策记录（ADR） | `docs/architecture/` |
| 用户向说明、上线公告 | `docs/` 相应子目录 |

## Delta Spec 格式

```markdown
## ADDED Requirements

### Requirement: 用户可导出任务 CSV
系统 SHALL 在任务列表页提供导出按钮，下载 UTF-8 CSV 文件。

#### Scenario: 导出全部任务
- **WHEN** 用户点击「导出 CSV」
- **THEN** 浏览器下载包含当前列表全部字段的文件

## MODIFIED Requirements
（略）

## REMOVED Requirements
（略）
```

## 硬性规则

1. 不直接编辑 `spec/specs/` 做功能开发 — 走 `changes/` + Delta
2. `spec/AI2AI/` 内容默认可丢弃，确认后再迁入 `spec/changes/`
3. `spec/ME2AI/` 是原始输入，结构化确认后写入 `spec/changes/`
4. 未 `pnpm build` 通过不得声称交付完成
5. 设计未确认不得写 `src/app` 业务代码
