# AI2AI — AI 中间产物

AI 生成、尚未确认的内容暂存于此。默认可丢弃，不入版本控制（见根目录 `.gitignore`）。

## 子目录

| 目录 | 放什么 | 生命周期 |
|------|--------|----------|
| `drafts/` | brainstorming 草稿、方案对比、探索性设计 | 确认后 → `spec/changes/{name}/` |
| `plans/` | 未确认的实施计划 | 确认后 → `spec/changes/{name}/tasks.md` |
| `scratch/` | 会话临时分析、一次性调研、原型 HTML | 用完即删 |
| `sessions/` | 按日期归档的会话级输出（可选保留） | 定期清理 |

## 迁移规则

```
spec/AI2AI/drafts/xxx-design.md   ──确认──▶  spec/changes/{name}/design.md
spec/AI2AI/plans/xxx-plan.md      ──确认──▶  spec/changes/{name}/tasks.md
spec/AI2AI/scratch/*              ──丢弃──▶  （不迁移）
```

## 注意

- **不要**把本目录当作系统规格真理源
- 需要纳入长期记忆的结论，必须迁入 `spec/changes/`、`spec/specs/` 或 `docs/`
- 若某草稿需要团队评审，可临时 `git add -f` 强制提交，但应尽快迁入正式目录
