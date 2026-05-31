# Superpowers 技能清单

本目录包含 [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh) v1.5.0 的 **20 个** AI 编程工作方法论技能。每个技能是一个独立目录，内含 `SKILL.md`。

调用方式：自然语言描述场景（AI 自动匹配），或输入 `/<skill-name>` 显式调用。

---

## 工作流技能（14）

| 技能 | 说明 | 适用场景 |
|------|------|----------|
| `using-superpowers` | 元技能：如何查找、优先调用和使用其他 skill | 会话开始时建立 skill 使用规范 |
| `brainstorming` | 需求澄清 → 方案对比 → 设计规格，**先设计后编码** | 新功能、组件、行为变更等任何创造性工作 |
| `writing-plans` | 将已确认的设计拆成可执行的实施计划 | 方案已定、准备动手写代码之前 |
| `executing-plans` | 按计划逐步实施，每步设审查检查点 | 已有书面实现计划，需在会话中执行 |
| `test-driven-development` | 严格 TDD：先写失败测试，再写最少实现代码 | 新功能、Bug 修复、重构、行为变更 |
| `systematic-debugging` | 四阶段调试：定位 → 分析 → 假设 → 修复 | Bug、测试失败、异常行为（修复前必用） |
| `requesting-code-review` | 派遣审查，检查实现是否符合计划与要求 | 功能完成、合并或 PR 之前 |
| `receiving-code-review` | 技术严谨地处理审查反馈，拒绝敷衍或盲目执行 | 收到 review 意见、准备修改之前 |
| `verification-before-completion` | 证据先行：跑完验证命令才能声称完成 | 提交、PR 或宣称「已完成/已修复」之前 |
| `finishing-a-development-branch` | 合并 / PR / 保留 / 丢弃四选一的收尾引导 | 实现完成且测试通过后 |
| `using-git-worktrees` | 用 git worktree 创建隔离工作区 | 并行特性开发或执行计划前 |
| `dispatching-parallel-agents` | 将无依赖的多任务并发分派执行 | 2 个以上可独立进行的任务 |
| `subagent-driven-development` | 每个任务一个子 Agent，两轮审查 | 当前会话执行含多独立任务的计划 |
| `writing-skills` | 创建、编辑、验证新 skill 的方法论 | 编写或维护 Agent Skill 时 |

---

## 中国特色技能（4）

> 以下 skill **不会自动触发**，需显式输入 `/chinese-xxx` 调用，避免干扰主工作流。

| 技能 | 说明 | 调用方式 |
|------|------|----------|
| `chinese-code-review` | 国内团队代码审查话术、分级标注（必须修复/建议修改/仅供参考） | `/chinese-code-review` |
| `chinese-git-workflow` | Gitee、Coding、极狐 GitLab、CNB 等平台接入与 CI 配置 | `/chinese-git-workflow` |
| `chinese-documentation` | 中文排版、中英混排、术语保留、告别机翻味 | `/chinese-documentation` |
| `chinese-commit-conventions` | Conventional Commits 中文适配、commitlint/husky 模板 | `/chinese-commit-conventions` |

---

## 扩展技能（2）

| 技能 | 说明 | 适用场景 |
|------|------|----------|
| `mcp-builder` | 系统化构建生产级 MCP 服务器 | 需要让 AI 连接外部 API 或工具时 |
| `workflow-runner` | 运行 agency-orchestrator YAML 多角色工作流 | 提供 `.yaml` 工作流或要求多专家协作时 |

---

## 网站开发技能（4）

> 供 `@网站开发` Agent 使用，通过 `npx skills add` 安装至 `.codebuddy/skills/`。

| 技能 | 来源 | 说明 |
|------|------|------|
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | UX 体系、设计系统、页面布局 |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | 高品质前端视觉，避免 generic AI 审美 |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Web 界面规范、无障碍、UX 审查 |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React / Next.js 性能与最佳实践 |

---

## 文档技能（1）

| 技能 | 来源 | 说明 |
|------|------|------|
| `pptx` | [anthropics/skills](https://github.com/anthropics/skills) | 读取 / 编辑 / 创建 `.pptx`；文本提取、缩略图预览、模板编辑 |

---

## 通用元技能（2）

| 技能 | 来源 | 说明 |
|------|------|------|
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | 搜索、发现、安装生态中的 Agent Skills |
| `skill-creator` | [anthropics/skills](https://github.com/anthropics/skills) | 设计、编写、打包、验证新 Skill |

---

## 典型工作流

```
brainstorming → writing-plans → executing-plans
                    ↓
         test-driven-development
                    ↓
    requesting-code-review → verification-before-completion
                    ↓
      finishing-a-development-branch
```

| 场景 | 推荐技能 |
|------|----------|
| 新需求 | `brainstorming` → `writing-plans` |
| 按计划开发 | `executing-plans` + `test-driven-development` |
| 排查 Bug | `systematic-debugging` |
| 合并前 | `requesting-code-review` → `verification-before-completion` |
| 并行任务 | `using-git-worktrees` + `dispatching-parallel-agents` |

---

## 来源

- 上游：[obra/superpowers](https://github.com/obra/superpowers)
- 中文版：[jnMetaCode/superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)
- 许可：MIT
