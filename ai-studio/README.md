# AI 数字软件工作室 — 可视化原型

由 6 位 AI 数字员工组成的软件研发协作工作台（纯前端原型，数据为本地 mock，无后端）。

## 技术栈
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Zustand · Framer Motion · lucide-react

## 运行
```bash
cd ai-studio
npm install
npm run dev   # http://localhost:3000
```

## 页面
- `/` 工作台：统计卡 + 数字员工网格 + 项目协作流程图 + 提交需求 + 实时任务
- `/studio` 工作室：3D 发光办公室（静态背景）+ 6 个工位实时状态
- `/employees` 数字员工列表
- `/employees/[id]` 员工画像：工作记录 / 能力雷达 / 实现能力 / 记忆与积累 / 关于我 / 能力与工具 / 原始档案

## 核心交互
在工作台「提交需求」输入一句话需求 → 触发模拟工作流：
阿策(PM) → 老周(架构) → 小沐(UI) →（小布 前端 ∥ 阿凯 后端）→ 小诺(测试)
员工头像状态、流程图高亮、实时日志、任务列表会同步更新（跨页面共享状态）。

## 素材来源
- 角色头像 `public/assets/avatars/` — 从 `images/设计图素材.png` 裁切
- 工位 `public/assets/desks/` — 同上
- 工作室房间 `public/assets/studio/room.png` — 从 `images/设计图.png` 裁切
- 图标 / 流程连线 / 雷达图 — 代码 (lucide-react / SVG) 重建

## 后续可接入（PRD 规划）
LangGraph 多 Agent 真实编排 · GitLab 记忆持久化 · Qdrant 向量检索 · PostgreSQL/Drizzle · WebSocket 实时推送
当前所有动态数据集中在 `lib/store.ts`，替换为真实 API 即可。
