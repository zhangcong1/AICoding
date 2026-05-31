# 应用源代码

按 `@网站开发` / `spec/project.md` 约定组织。新项目 `@网站开发` 初始化后会填充具体文件。

## 目录结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式 + 设计 Token
│   ├── {feature}/          # 功能页面
│   └── api/{resource}/     # Route Handler API
├── components/
│   ├── ui/                 # shadcn/ui 组件
│   └── {feature}/          # 业务组件
├── lib/
│   └── utils.ts            # 工具函数
└── storage/database/
    ├── db.ts               # Drizzle 连接
    ├── ensure-schema.ts    # Schema 确保脚本
    └── shared/
        ├── schema.ts       # 表定义
        └── relations.ts    # 关系定义
```

## 开发命令

```bash
pnpm install
pnpm db:push
pnpm db:seed    # 若有种子数据
pnpm dev
pnpm build
```
