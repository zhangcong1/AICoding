# 项目 AI 助手指引

> 规范驱动开发 + 全栈网站交付（@网站开发）

## 快速入口

| 文件 | 作用 |
|------|------|
| [spec/AGENTS.md](spec/AGENTS.md) | 规范工作流与目录规则 |
| [spec/project.md](spec/project.md) | 技术栈、约定、术语表 |
| [CODEBUDDY.md](CODEBUDDY.md) | Skill 清单与协作规则 |
| [docs/guides/AICoding项目开发实践.md](docs/guides/AICoding项目开发实践.md) | 团队实践指南 |

## 目录地图

```
{project}/
├── spec/                     # 规范驱动核心
│   ├── specs/                # ✅ 真理源：当前系统能力
│   ├── changes/              # 🔄 进行中需求迭代
│   ├── ME2AI/                # 👤 人类 → AI 输入
│   ├── AI2AI/                # 🤖 AI 中间产物（草稿，默认不入库）
│   ├── project.md            # 项目上下文
│   └── config.yaml           # 规范配置
├── docs/                     # 📚 沉淀文档（培训、ADR、用户说明）
├── src/                      # 💻 应用代码
├── scripts/                  # 构建 / 种子脚本
├── .codebuddy/               # Agent + Skill 配置
├── CODEBUDDY.md              # 项目记忆
└── AGENTS.md                 # 本文件
```

## API 与数据模型（随变更更新）

> 有代码后在此维护摘要，详细规格见 `spec/specs/`。

### API

| 方法 | 路径 | 说明 |
|------|------|------|
| （待填） | | |

### 数据表

| 表 | 说明 |
|----|------|
| health_check | 健康检查（保留） |

## 当前进行中的变更

| 变更 | 状态 | 路径 |
|------|------|------|
| （无） | | |
