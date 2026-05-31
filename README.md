# Personal Workbench

个人工作台：基于 [AICoding](https://github.com/zhangcong1/AICoding) 的独立开发分支，用于个人效率工具、实验与日常沉淀。

## 分支说明

| 分支 | 用途 |
|------|------|
| `main` | 上游主仓库基线 |
| `personal-workbench` | 个人工作台专属迭代 |

## 快速开始

本仓库包含 **AI Digital Software Studio** 项目，详见 [`ai-digital-studio/README.md`](./ai-digital-studio/README.md)。

```bash
git clone -b personal-workbench https://github.com/zhangcong1/AICoding.git
cd AICoding/ai-digital-studio
pnpm install
pnpm docker:up && pnpm db:push
pnpm dev
```

## 相关链接

- 仓库：[zhangcong1/AICoding](https://github.com/zhangcong1/AICoding)
