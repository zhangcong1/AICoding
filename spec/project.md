# 项目上下文

> 每个新项目接入时，更新本文件中的 `{project_slug}` 和业务背景。

## 项目概述

- **名称**：{project_name}
- **一句话**：{one_liner}
- **目标用户**：{user_roles}

## 默认技术栈（网站开发）

| 层级 | 选型 |
|------|------|
| 框架 | Next.js 16 App Router |
| 运行时 | React 19 |
| 语言 | TypeScript 5（strict） |
| UI | shadcn/ui + Tailwind CSS 4 |
| 图标 | lucide-react |
| 表单 | react-hook-form + Zod |
| ORM | Drizzle ORM + drizzle-kit |
| 数据库 | 本地 PostgreSQL（`localhost:5432`） |
| 包管理 | pnpm only |

## 环境变量

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/{project_slug}
NODE_ENV=development
PORT=3000
```

## 代码约定

- 路由：`src/app/{feature}/page.tsx`
- API：`src/app/api/{resource}/route.ts`
- Schema：`src/storage/database/shared/schema.ts`
- 响应格式：`{ success: true, data }` / `{ success: false, error }`
- 每张业务表：`id serial PK`、`created_at`、`updated_at timestamptz`
- 界面文案中文，API 字段与代码标识符英文

## Agent 与 Skill

| 场景 | 调用 |
|------|------|
| 全栈网站交付 | `@网站开发` |
| 需求澄清 | `brainstorming` |
| 实施计划 | `writing-plans` |
| UI/UX 设计 | `ui-ux-pro-max` |
| 前端实现 | `frontend-design`、`vercel-react-best-practices` |
| 交付验证 | `verification-before-completion` |

Agent 定义：`.codebuddy/agents/engineering/网站开发.md`  
Skill 清单：`.codebuddy/skills/README.md`

## 业务术语表

| 术语 | 含义 |
|------|------|
| （待填） | （待填） |
