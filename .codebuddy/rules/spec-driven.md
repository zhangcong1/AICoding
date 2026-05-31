# 规范驱动开发规则

> 本文件为 CodeBuddy 强制规则，与 `spec/AGENTS.md` 配套。冲突时以本文件硬性约束为准。

## 目录规则

| 内容 | 放置位置 |
|------|----------|
| 人类原始需求 | `spec/ME2AI/requirements/` |
| AI 草稿 | `spec/AI2AI/drafts/`、`plans/`、`scratch/` |
| 进行中迭代 | `spec/changes/{change-name}/` |
| 已确认系统行为 | `spec/specs/{domain}/` |
| 培训 / ADR | `docs/` |

## 工作流（必须遵守）

1. **先 spec 后代码** — 新功能先在 `spec/changes/` 写 `proposal.md`、`design.md`，用户确认后再写代码
2. **不直接改真理源** — 功能开发禁止直接编辑 `spec/specs/`，走 `changes/` + Delta，归档时合并
3. **草稿可丢弃** — `spec/AI2AI/` 内容未确认前不得当作正式规格
4. **Skill 优先** — 收到任务先检查 `.codebuddy/skills/` 是否有匹配 Skill；需求澄清用 `brainstorming`，计划用 `writing-plans`

## 硬性门禁

- 设计未确认 → 禁止写 `src/app` 业务页面、`schema.ts` 业务表
- 未跑 `pnpm build` 通过 → 禁止声称交付完成
- 网站类项目 → 调用 `@网站开发` Agent，技术栈见 `spec/project.md`

## 变更目录结构

复制 `spec/changes/_template/` 创建新变更，至少包含：

- `proposal.md` — Goal、Scope、Out of scope、Impact
- `design.md` — 信息架构、数据模型、API、页面、MVP、验收场景
- `tasks.md` — 可勾选任务清单
- `specs/{domain}/spec.md` — ADDED / MODIFIED / REMOVED Requirements

## 参考文档

- 工作流详情：`spec/AGENTS.md`
- 项目上下文：`spec/project.md`
- Skill 清单：`CODEBUDDY.md`
