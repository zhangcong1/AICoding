# 规格真理源

本目录描述**当前已上线 / 已确认**的系统能力。功能开发时不直接编辑，通过 `spec/changes/` 提交 Delta，归档时合并至此。

## 组织方式

按业务能力域分子目录，每个域包含：

- `spec.md` — 需求与场景（WHEN/THEN）
- `design.md` —（可选）该域的技术模式

## 示例

```
specs/
├── auth/
│   ├── spec.md
│   └── design.md
└── tasks/
    └── spec.md
```

## 首次新建项目

完成 MVP 并归档首个 change 后，将 Delta 合并为本目录下的域规格。
