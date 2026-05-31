# AI Digital Software Studio

由六位 AI 数字员工组成的软件研发协作平台（Sprint 1 MVP）。

## 功能

- 工作台：员工状态、需求提交、任务概览
- 需求中心：创建需求并启动研发流程
- PM Agent（阿策）：自动生成 PRD（支持 Mock 模式）
- 数字员工：六位员工画像与记忆浏览
- 任务中心：任务状态与产物查看
- 2D Studio：工位状态可视化

## 快速开始

```bash
cd ai-digital-studio

# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env
cp .env apps/web/.env.local

# 3. 启动基础设施（需要 Docker）
pnpm docker:up

# 4. 初始化数据库
pnpm db:push

# 5. 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

## 环境说明

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | PostgreSQL 连接 |
| `OPENAI_API_KEY` | LLM API Key（未配置时使用 Mock PRD） |
| `GITLAB_TOKEN` | GitLab 集成（未配置时使用内置员工模板） |

## 项目结构

```
ai-digital-studio/
├── apps/web/          # Next.js 主应用
├── packages/shared-types/
├── docker-compose.yml
└── files/             # 原始 PRD 与架构文档（在上级目录）
```

## 后续 Sprint

- Sprint 2：GitLab 记忆引擎 + Qdrant 向量检索
- Sprint 3：完整 LangGraph 六位员工工作流
- Sprint 4：PixiJS / ReactFlow 可视化工作室
