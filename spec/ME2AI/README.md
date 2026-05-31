# ME2AI — 人类输入

产品经理、业务方、开发者向 AI 提供的原始输入与上下文。相比 AI2AI 的「AI 产出」，这里是「人 → AI」的方向。

## 子目录

| 目录 | 放什么 | 示例 |
|------|--------|------|
| `requirements/` | 需求描述、功能清单、验收场景 | `2026-05-31-任务管理-需求.md` |
| `context/` | 业务背景、术语表、约束条件、参考资料 | 竞品截图说明、业务流程描述 |
| `feedback/` | 评审意见、修改指示、确认/驳回记录 | `design-v1-评审意见.md` |
| `templates/` | 可复用的需求输入模板 | 新建网站模板、迭代功能模板 |

## 与 spec/changes/ 的关系

```
ME2AI/requirements/xxx.md     ──澄清确认──▶  spec/changes/{name}/proposal.md
ME2AI/feedback/xxx.md         ──采纳后──▶    spec/changes/{name}/design.md（修订）
ME2AI/templates/              ──复制填写──▶  ME2AI/requirements/
```

## 命名建议

- 需求：`YYYY-MM-DD-{功能名}-需求.md`
- 反馈：`YYYY-MM-DD-{功能名}-反馈-v{n}.md`
- 上下文：按主题命名，如 `术语表.md`、`用户角色说明.md`

## 注意

- 这里是**原始输入**，不是系统真理源
- 经 AI 结构化、双方确认后，正式规格写入 `spec/changes/` 或 `spec/specs/`
- 模板类文件可入库；单次会话的草稿需求默认可 gitignore（见根目录 `.gitignore`）
