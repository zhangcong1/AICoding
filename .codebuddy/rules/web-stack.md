# 网站开发技术栈规则

> 网站类项目兜底约束。完整流程见 `.codebuddy/agents/engineering/网站开发.md`。

## 技术栈（不得擅自替换）

- Next.js 16 App Router + React 19 + TypeScript strict
- shadcn/ui + Tailwind CSS 4 + lucide-react
- Drizzle ORM + **本地 PostgreSQL**（非 Supabase / MySQL / SQLite）
- 包管理：**pnpm only**（禁止 npm / yarn）

## 代码结构

```
src/app/{feature}/page.tsx          # 页面
src/app/api/{resource}/route.ts     # API
src/storage/database/shared/schema.ts
src/components/ui/                  # shadcn
```

## API 响应格式

```typescript
return NextResponse.json({ success: true, data: ... });
return NextResponse.json({ success: false, error: '...' }, { status: 4xx });
```

## 数据库约定

- 连接：`src/storage/database/db.ts`（drizzle + pg.Pool）
- 同步：`pnpm db:push`
- 每张业务表：`id serial PK`、`created_at`、`updated_at timestamptz`
- 禁止字符串拼接 SQL

## UI 要求

- 列表 / 详情 / 表单 / 空态 / 加载态 / 错误态 六态齐全
- 界面文案中文，API 字段与代码标识符英文
- 默认 Server Component，交互才用 `'use client'`

## 交付验证

```bash
pnpm install && pnpm db:push && pnpm build && pnpm lint
```
