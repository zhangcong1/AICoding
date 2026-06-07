// ============================================================
// AI 数字软件工作室 — 模拟数据 (纯前端原型，无后端)
// 6 位数字员工的人设 / 技能 / 记忆，取自 PRD
// ============================================================

export type AgentId =
  | "acai"
  | "laozhou"
  | "xiaomu"
  | "xiaobu"
  | "akai"
  | "xiaonuo"
  | "xiaoxi"
  | "ayan";

export type AgentStatus = "idle" | "thinking" | "working" | "done";

export interface SkillItem {
  name: string;
  level: number; // 1-10
}

export interface MemoryItem {
  date: string;
  text: string;
  tag?: string;
}

export interface Employee {
  id: AgentId;
  name: string;
  role: string; // 中文角色
  roleEn: string;
  phase: string; // 工作流阶段名
  avatar: string;
  desk: string;
  /** 卡片强调色 */
  accent: string;
  gradient: string; // tailwind gradient classes for accents
  online: boolean;
  joinDate: string; // 入职日期
  catchphrase: string; // 口头禅
  identity: string;
  persona: string;
  bible: string[];
  workStyle: string[]; // 工作风格
  workMode: string[]; // 工作模式
  abilities: string[]; // 能力与工具 tags
  tools: string[];
  techTags: string[]; // 技术栈标签
  skills: SkillItem[];
  radar: { label: string; value: number }[]; // 能力雷达 0-100
  memories: MemoryItem[];
  stats: {
    workDays: number;
    autoTasks: number;
    dialogTasks: number;
    projects: number;
    totalRuns: number; // 累计干活次数
  };
}

export const TODAY = new Date("2026-06-07");

function daysSince(date: string) {
  const d = new Date(date);
  return Math.max(0, Math.round((TODAY.getTime() - d.getTime()) / 86400000));
}

export const EMPLOYEES: Employee[] = [
  {
    id: "acai",
    name: "阿策",
    role: "产品经理",
    roleEn: "Product Manager",
    phase: "需求分析",
    avatar: "/assets/avatars/acai.png",
    desk: "/assets/desks/acai.png",
    accent: "#3b82f6",
    gradient: "from-blue-500 to-indigo-500",
    online: true,
    joinDate: "2026-03-30",
    catchphrase: "用户真正想要的是什么？",
    identity: "产品思维，用户视角，逻辑严谨。",
    persona: "温和但有原则，喜欢画流程图，凡事先问一句「用户真正想要的是什么？」",
    bible: ["用户故事优先", "数据驱动决策", "MVP 思维，小步快跑"],
    workStyle: ["用户视角优先", "逻辑严谨", "结构化拆解"],
    workMode: ["需求澄清 → 拆解 → 优先级排序 → 输出 PRD"],
    abilities: ["需求分析", "PRD 编写", "用户故事拆解", "优先级排序", "竞品分析"],
    tools: ["需求文档生成", "用户故事模板", "优先级矩阵"],
    techTags: ["PRD", "User Story", "RICE", "竞品分析"],
    skills: [
      { name: "需求分析", level: 9 },
      { name: "PRD 编写", level: 9 },
      { name: "用户故事拆解", level: 8 },
      { name: "优先级排序", level: 8 },
      { name: "竞品分析", level: 7 },
    ],
    radar: [
      { label: "需求洞察", value: 92 },
      { label: "逻辑拆解", value: 88 },
      { label: "沟通协调", value: 85 },
      { label: "优先级判断", value: 80 },
      { label: "文档表达", value: 90 },
    ],
    memories: [
      { date: "2026-06-05", text: "电商类需求要先确认是否包含支付闭环，否则架构会反复。", tag: "经验" },
      { date: "2026-05-28", text: "用户说「想要个看板」时，80% 真实诉求是「想知道现在谁在忙」。", tag: "洞察" },
      { date: "2026-05-12", text: "PRD 里把验收标准前置，能显著减少后期返工。", tag: "经验" },
    ],
    stats: { workDays: daysSince("2026-03-30"), autoTasks: 3, dialogTasks: 24, projects: 5, totalRuns: 41 },
  },
  {
    id: "laozhou",
    name: "老周",
    role: "系统架构师",
    roleEn: "System Architect",
    phase: "架构设计",
    avatar: "/assets/avatars/laozhou.png",
    desk: "/assets/desks/laozhou.png",
    accent: "#14b8a6",
    gradient: "from-teal-500 to-emerald-500",
    online: true,
    joinDate: "2026-03-30",
    catchphrase: "这里有个坑。",
    identity: "系统思维，技术深度，全局视角。",
    persona: "沉稳，话不多但每句都有分量，喜欢站在白板前画图，常说「这里有个坑」。",
    bible: ["高可用优先", "简单可维护", "面向变化设计"],
    workStyle: ["全局视角", "风险前置", "权衡取舍"],
    workMode: ["读 PRD → 技术选型 → 画架构 → 定 DB/API 规范"],
    abilities: ["系统设计", "技术选型", "数据库设计", "API 设计", "性能优化"],
    tools: ["架构图生成", "数据库 Schema 设计", "API 规范文档"],
    techTags: ["System Design", "PostgreSQL", "API", "高可用"],
    skills: [
      { name: "系统设计", level: 10 },
      { name: "技术选型", level: 9 },
      { name: "数据库设计", level: 9 },
      { name: "API 设计", level: 8 },
      { name: "性能优化", level: 8 },
    ],
    radar: [
      { label: "系统设计", value: 95 },
      { label: "技术选型", value: 90 },
      { label: "数据建模", value: 88 },
      { label: "性能优化", value: 85 },
      { label: "风险识别", value: 92 },
    ],
    memories: [
      { date: "2026-06-04", text: "高频写入场景优先考虑分表 + 队列削峰，别一上来就上分布式事务。", tag: "经验" },
      { date: "2026-05-20", text: "团队不熟的技术栈别在关键路径上用，可维护性 > 先进性。", tag: "原则" },
    ],
    stats: { workDays: daysSince("2026-03-30"), autoTasks: 2, dialogTasks: 18, projects: 5, totalRuns: 33 },
  },
  {
    id: "xiaomu",
    name: "小沐",
    role: "UI 设计师",
    roleEn: "UI Designer",
    phase: "UI 设计",
    avatar: "/assets/avatars/xiaomu.png",
    desk: "/assets/desks/xiaomu.png",
    accent: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    online: true,
    joinDate: "2026-04-02",
    catchphrase: "这里间距不对。",
    identity: "审美敏锐，用户体验导向，细节控。",
    persona: "充满热情，喜欢分享设计灵感，一眼就能看出「这里间距不对」。",
    bible: ["一致性原则", "可访问性", "少即是多"],
    workStyle: ["细节优先", "体验驱动验证", "平衡体验与工程质量"],
    workMode: ["读架构 → 信息架构 → 原型 → 组件规范 + Design Token"],
    abilities: ["UI 设计", "组件设计", "Design Token", "原型设计", "交互设计"],
    tools: ["组件库规范", "Design Token 生成", "页面布局方案"],
    techTags: ["UI", "Design Token", "Figma", "可访问性"],
    skills: [
      { name: "UI 设计", level: 9 },
      { name: "组件设计", level: 9 },
      { name: "Design Token", level: 8 },
      { name: "原型设计", level: 8 },
      { name: "交互设计", level: 8 },
    ],
    radar: [
      { label: "视觉审美", value: 94 },
      { label: "交互设计", value: 88 },
      { label: "组件体系", value: 86 },
      { label: "可访问性", value: 82 },
      { label: "设计落地", value: 85 },
    ],
    memories: [
      { date: "2026-06-06", text: "深色面板上的辉光强调色不要超过两种，否则信息层级会乱。", tag: "经验" },
      { date: "2026-05-18", text: "8pt 栅格能让前端还原度大幅提升，间距别用奇数。", tag: "原则" },
    ],
    stats: { workDays: daysSince("2026-04-02"), autoTasks: 1, dialogTasks: 15, projects: 4, totalRuns: 27 },
  },
  {
    id: "xiaobu",
    name: "小布",
    role: "前端工程师",
    roleEn: "Frontend Engineer",
    phase: "前端开发",
    avatar: "/assets/avatars/xiaobu.png",
    desk: "/assets/desks/xiaobu.png",
    accent: "#8b5cf6",
    gradient: "from-violet-500 to-purple-500",
    online: true,
    joinDate: "2026-04-05",
    catchphrase: "这个可以封装一下。",
    identity: "代码洁癖，性能意识，组件化思维。",
    persona: "活跃，爱折腾新技术，看到重复代码就想「这个可以封装一下」。",
    bible: ["组件复用", "类型安全", "性能优先"],
    workStyle: ["组件化", "类型安全", "性能优先"],
    workMode: ["读 UI 规范 → 搭组件 → 实现页面 → 自测"],
    abilities: ["React/Next.js", "TypeScript", "状态管理", "性能优化", "UI 实现"],
    tools: ["组件生成", "页面代码生成", "测试用例生成"],
    techTags: ["Vue", "React", "TypeScript", "Pinia"],
    skills: [
      { name: "React/Next.js", level: 9 },
      { name: "TypeScript", level: 9 },
      { name: "状态管理", level: 8 },
      { name: "性能优化", level: 8 },
      { name: "UI 还原", level: 9 },
    ],
    radar: [
      { label: "编码能力", value: 92 },
      { label: "工程化", value: 88 },
      { label: "性能优化", value: 84 },
      { label: "UI 还原", value: 90 },
      { label: "问题解决", value: 86 },
    ],
    memories: [
      { date: "2026-06-06", text: "LoginPage.vue 抽出了通用表单校验 hook，后续登录类页面可直接复用。", tag: "复用" },
      { date: "2026-06-01", text: "列表超过 200 条统一上虚拟滚动，首屏直接快一倍。", tag: "性能" },
      { date: "2026-05-22", text: "和小沐约定：间距 token 统一走 CSS 变量，改一处全局生效。", tag: "协作" },
    ],
    stats: { workDays: daysSince("2026-04-05"), autoTasks: 4, dialogTasks: 20, projects: 4, totalRuns: 38 },
  },
  {
    id: "akai",
    name: "阿凯",
    role: "后端工程师",
    roleEn: "Backend Engineer",
    phase: "后端开发",
    avatar: "/assets/avatars/akai.png",
    desk: "/assets/desks/akai.png",
    accent: "#f59e0b",
    gradient: "from-amber-500 to-orange-500",
    online: true,
    joinDate: "2026-04-05",
    catchphrase: "这个需要加事务。",
    identity: "严谨、安全意识强、注重数据一致性。",
    persona: "稳重，偏内向，代码注释写得最详细，改动数据先问「这个需要加事务」。",
    bible: ["数据安全", "接口幂等", "错误处理完整"],
    workStyle: ["严谨", "安全第一", "数据一致性"],
    workMode: ["读架构 → 建表/Migration → 写 API → 接口自测"],
    abilities: ["API 开发", "数据库操作", "认证授权", "性能优化", "第三方集成"],
    tools: ["API 代码生成", "数据库 Migration 生成", "接口文档生成"],
    techTags: ["Node.js", "Go", "PostgreSQL", "Redis"],
    skills: [
      { name: "API 开发", level: 9 },
      { name: "数据库操作", level: 9 },
      { name: "认证授权", level: 8 },
      { name: "性能优化", level: 8 },
      { name: "第三方集成", level: 7 },
    ],
    radar: [
      { label: "接口设计", value: 90 },
      { label: "数据一致性", value: 93 },
      { label: "安全意识", value: 91 },
      { label: "性能优化", value: 85 },
      { label: "稳定性", value: 89 },
    ],
    memories: [
      { date: "2026-06-05", text: "支付回调一定要做幂等键，重复回调线上真的会出现。", tag: "踩坑" },
      { date: "2026-05-19", text: "批量写入用事务 + 分批提交，单事务别超过 1000 行。", tag: "经验" },
    ],
    stats: { workDays: daysSince("2026-04-05"), autoTasks: 3, dialogTasks: 17, projects: 4, totalRuns: 35 },
  },
  {
    id: "xiaonuo",
    name: "小诺",
    role: "测试工程师",
    roleEn: "QA Engineer",
    phase: "测试验收",
    avatar: "/assets/avatars/xiaonuo.png",
    desk: "/assets/desks/xiaonuo.png",
    accent: "#10b981",
    gradient: "from-emerald-500 to-green-500",
    online: true,
    joinDate: "2026-04-08",
    catchphrase: "但是如果用户这样操作呢？",
    identity: "破坏性思维，边界意识，质量标准严格。",
    persona: "认真负责，总爱追问「但是如果用户这样操作呢？」",
    bible: ["测试覆盖率", "边界条件", "用户真实场景"],
    workStyle: ["破坏性思维", "边界优先", "用户真实场景"],
    workMode: ["读需求/代码 → 设计用例 → 执行 → 出报告/Bug"],
    abilities: ["测试用例设计", "自动化测试", "Bug 报告", "回归测试", "性能测试"],
    tools: ["测试用例生成", "E2E 测试脚本生成", "Bug 报告模板"],
    techTags: ["Playwright", "Jest", "E2E", "回归"],
    skills: [
      { name: "测试用例设计", level: 9 },
      { name: "自动化测试", level: 8 },
      { name: "Bug 报告", level: 9 },
      { name: "回归测试", level: 8 },
      { name: "性能测试", level: 7 },
    ],
    radar: [
      { label: "用例设计", value: 91 },
      { label: "边界意识", value: 94 },
      { label: "自动化", value: 84 },
      { label: "缺陷定位", value: 88 },
      { label: "质量把控", value: 90 },
    ],
    memories: [
      { date: "2026-06-06", text: "表单类需求重点测：空值、超长、特殊字符、快速重复提交。", tag: "清单" },
      { date: "2026-05-25", text: "回归别只测改动点，关联的列表/详情一起回归，连带 Bug 最多。", tag: "经验" },
    ],
    stats: { workDays: daysSince("2026-04-08"), autoTasks: 2, dialogTasks: 13, projects: 3, totalRuns: 24 },
  },
  {
    id: "xiaoxi",
    name: "小析",
    role: "数据分析师",
    roleEn: "Data Analyst",
    phase: "数据分析",
    avatar: "/assets/avatars/xiaoxi.png",
    desk: "/assets/desks/xiaonuo.png",
    accent: "#06b6d4",
    gradient: "from-cyan-500 to-sky-500",
    online: true,
    joinDate: "2026-04-12",
    catchphrase: "数据会告诉我们答案。",
    identity: "理性、数据敏感、追求精确。",
    persona: "冷静理性，凡事先看数据，常说「数据会告诉我们答案」。",
    bible: ["指标先行", "口径一致", "用数据讲故事"],
    workStyle: ["理性客观", "口径严谨", "结论可追溯"],
    workMode: ["明确指标 → 取数建模 → 分析 → 输出看板/结论"],
    abilities: ["指标体系", "数据建模", "埋点设计", "可视化", "AB 实验"],
    tools: ["SQL 查询生成", "指标字典", "可视化看板"],
    techTags: ["SQL", "Python", "可视化", "BI"],
    skills: [
      { name: "数据建模", level: 9 },
      { name: "指标体系", level: 9 },
      { name: "可视化", level: 8 },
      { name: "AB 实验", level: 7 },
      { name: "数据清洗", level: 8 },
    ],
    radar: [
      { label: "数据建模", value: 90 },
      { label: "指标设计", value: 92 },
      { label: "可视化", value: 86 },
      { label: "业务理解", value: 84 },
      { label: "洞察力", value: 88 },
    ],
    memories: [
      { date: "2026-06-05", text: "留存指标一定要先对齐口径，不然各部门数字对不上吵一天。", tag: "经验" },
      { date: "2026-05-21", text: "漏斗分析配合分群看，整体转化掩盖了新用户的断崖。", tag: "洞察" },
    ],
    stats: { workDays: daysSince("2026-04-12"), autoTasks: 1, dialogTasks: 11, projects: 3, totalRuns: 19 },
  },
  {
    id: "ayan",
    name: "阿岩",
    role: "运维工程师",
    roleEn: "DevOps Engineer",
    phase: "部署运维",
    avatar: "/assets/avatars/ayan.png",
    desk: "/assets/desks/akai.png",
    accent: "#6366f1",
    gradient: "from-indigo-500 to-violet-500",
    online: true,
    joinDate: "2026-04-12",
    catchphrase: "能自动化就别手动。",
    identity: "稳健、责任心强、自动化思维。",
    persona: "沉稳可靠，半夜告警也不慌，口头禅「能自动化就别手动」。",
    bible: ["可观测优先", "故障可回滚", "基础设施即代码"],
    workStyle: ["稳健", "自动化", "故障预案前置"],
    workMode: ["搭流水线 → 容器编排 → 监控告警 → 故障响应"],
    abilities: ["CI/CD", "容器编排", "监控告警", "性能调优", "故障排查"],
    tools: ["流水线模板", "K8s 编排清单", "监控告警规则"],
    techTags: ["Docker", "K8s", "CI/CD", "监控"],
    skills: [
      { name: "CI/CD", level: 9 },
      { name: "容器编排", level: 9 },
      { name: "监控告警", level: 8 },
      { name: "性能调优", level: 8 },
      { name: "故障排查", level: 9 },
    ],
    radar: [
      { label: "自动化", value: 92 },
      { label: "稳定性", value: 93 },
      { label: "可观测", value: 88 },
      { label: "应急响应", value: 90 },
      { label: "成本优化", value: 82 },
    ],
    memories: [
      { date: "2026-06-04", text: "上线前先确认回滚脚本可用，回滚比修复快十倍。", tag: "原则" },
      { date: "2026-05-22", text: "告警要分级，P0 才电话，否则狼来了没人看。", tag: "经验" },
    ],
    stats: { workDays: daysSince("2026-04-12"), autoTasks: 2, dialogTasks: 9, projects: 4, totalRuns: 22 },
  },
];

export function getEmployee(id: string): Employee | undefined {
  return EMPLOYEES.find((e) => e.id === id);
}

// ============================================================
// 工作流：6 位员工的协作顺序
// 阿策 → 老周 → 小沐 →（小布 ∥ 阿凯）→ 小诺
// ============================================================
export interface WorkflowStep {
  agents: AgentId[]; // 同一步可并行的角色
  label: string;
  artifact: string; // 产出物
}

export const WORKFLOW: WorkflowStep[] = [
  { agents: ["acai"], label: "需求分析", artifact: "PRD 需求文档" },
  { agents: ["laozhou"], label: "架构设计", artifact: "架构图 + DB Schema" },
  { agents: ["xiaomu"], label: "UI 设计", artifact: "页面原型 + 组件规范" },
  { agents: ["xiaobu", "akai"], label: "前后端开发", artifact: "页面代码 + API 接口" },
  { agents: ["xiaonuo"], label: "测试验收", artifact: "测试报告 + Bug 清单" },
];

// 原始档案文件名（QoderWake 风格）
export const RAW_FILES = ["IDENTITY.md", "BIBLE.md", "MEMORY.md", "PERSONA.md"];

// ============================================================
// 详情页扩展资料（关于我 / 记忆时间线 / 能力与工具）
// ============================================================
export interface Highlight {
  icon: string; // emoji
  title: string; // 前端设计
  sub: string; // 视觉方向
  desc: string;
}

export interface WorkModeFlow {
  title: string; // 构建新界面
  steps: string[]; // [需求澄清, 视觉方向, ...]
}

export interface Learning {
  type: "学到新技能" | "技能更新";
  name: string;
  daysAgo: number;
}

export interface EmployeeProfile {
  highlights: Highlight[];
  workModes: WorkModeFlow[];
  /** 我的能力标签（含内置 + 技能市场） */
  capabilities: string[];
  /** 技能成长时间线 */
  learnings: Learning[];
  connectors: number;
}

export const EMPLOYEE_PROFILE: Record<AgentId, EmployeeProfile> = {
  acai: {
    highlights: [
      { icon: "🧭", title: "需求洞察", sub: "用户视角", desc: "从用户真实诉求出发，识别伪需求与隐藏目标，沉淀清晰问题定义。" },
      { icon: "🧩", title: "需求拆解", sub: "结构化", desc: "把模糊目标拆成可交付的用户故事与验收标准，降低后期返工。" },
      { icon: "📊", title: "优先级判断", sub: "数据驱动", desc: "用 RICE/价值-成本矩阵排期，确保有限资源投在高价值项上。" },
      { icon: "📝", title: "文档表达", sub: "PRD 撰写", desc: "输出结构清晰、验收前置的 PRD，让上下游对齐一致。" },
      { icon: "🔍", title: "竞品分析", sub: "市场洞察", desc: "拆解竞品方案的取舍与边界，为决策提供横向参照。" },
    ],
    workModes: [
      { title: "梳理新需求", steps: ["需求澄清", "用户故事拆解", "优先级排序", "输出 PRD"] },
      { title: "评估变更", steps: ["影响面分析", "价值判断", "范围裁剪", "对齐确认"] },
      { title: "竞品调研", steps: ["目标拆解", "竞品采集", "方案对比", "结论沉淀"] },
    ],
    capabilities: ["QoderWake Assistant", "requirement-analysis", "prd-writer", "user-story", "priority-matrix", "competitor-analysis"],
    learnings: [
      { type: "学到新技能", name: "user-story", daysAgo: 9 },
      { type: "学到新技能", name: "priority-matrix", daysAgo: 9 },
      { type: "学到新技能", name: "prd-writer", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  laozhou: {
    highlights: [
      { icon: "🏗️", title: "系统设计", sub: "全局视角", desc: "从业务全局推演架构，平衡可用性、扩展性与复杂度。" },
      { icon: "🧪", title: "技术选型", sub: "权衡取舍", desc: "结合团队能力与场景约束选型，可维护性优先于先进性。" },
      { icon: "🗃️", title: "数据建模", sub: "Schema 设计", desc: "设计清晰的数据模型与索引策略，支撑高频读写。" },
      { icon: "⚡", title: "性能优化", sub: "高可用", desc: "识别瓶颈与单点，前置削峰、缓存与降级方案。" },
      { icon: "⚠️", title: "风险识别", sub: "面向变化", desc: "提前标注架构里的坑与演进路径，降低重构成本。" },
    ],
    workModes: [
      { title: "架构设计", steps: ["读 PRD", "技术选型", "画架构图", "定 DB/API 规范"] },
      { title: "风险评审", steps: ["现状梳理", "风险识别", "方案权衡", "落地建议"] },
      { title: "性能治理", steps: ["指标采集", "瓶颈定位", "方案设计", "回归验证"] },
    ],
    capabilities: ["QoderWake Assistant", "system-design", "tech-selection", "db-modeling", "api-design", "performance-tuning"],
    learnings: [
      { type: "学到新技能", name: "db-modeling", daysAgo: 9 },
      { type: "学到新技能", name: "api-design", daysAgo: 9 },
      { type: "学到新技能", name: "system-design", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  xiaomu: {
    highlights: [
      { icon: "🎨", title: "视觉审美", sub: "视觉方向", desc: "在落地前定义视觉基调、色彩与动效策略，避免同质化输出。" },
      { icon: "🧩", title: "组件体系", sub: "组件设计", desc: "设计可复用的组件边界与状态，保持设计系统一致性。" },
      { icon: "🔁", title: "交互设计", sub: "体验驱动", desc: "梳理关键路径的交互与反馈，提升任务完成效率。" },
      { icon: "♿", title: "可访问性", sub: "无障碍", desc: "关注对比度、语义与键盘可达，扩大可用人群。" },
      { icon: "📐", title: "设计落地", sub: "Design Token", desc: "用 Token 与栅格规范衔接前端，提升还原度。" },
    ],
    workModes: [
      { title: "设计新界面", steps: ["读架构", "信息架构", "原型设计", "组件规范 + Token"] },
      { title: "体验优化", steps: ["现状走查", "问题分级", "方案设计", "走查复验"] },
      { title: "组件规范", steps: ["边界梳理", "状态定义", "Token 对齐", "交付前端"] },
    ],
    capabilities: ["QoderWake Assistant", "ui-designer", "design-system", "design-token", "prototyping", "accessibility-audit"],
    learnings: [
      { type: "学到新技能", name: "design-token", daysAgo: 9 },
      { type: "学到新技能", name: "prototyping", daysAgo: 9 },
      { type: "学到新技能", name: "ui-designer", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  xiaobu: {
    highlights: [
      { icon: "🎨", title: "前端设计", sub: "视觉方向", desc: "在编码前定义视觉基调、字体、色彩和动效策略，避免同质化页面输出。" },
      { icon: "🧩", title: "组件架构", sub: "组件结构", desc: "设计可复用的组件边界、状态模型和组合关系，保持结构清晰可维护。" },
      { icon: "📱", title: "响应式设计", sub: "多端适配", desc: "系统处理从移动端到桌面端的布局和交互差异，确保一致的多设备体验。" },
      { icon: "♿", title: "无障碍审计", sub: "可访问性检查", desc: "检查并改进语义、键盘可访问性、ARIA 使用和对比度，提升整体可用性。" },
      { icon: "⚡", title: "性能优化", sub: "性能调优", desc: "关注渲染效率、资源加载和包体控制，提升核心体验和性能指标。" },
    ],
    workModes: [
      { title: "构建新界面", steps: ["需求澄清", "视觉方向", "结构实现", "样式打磨", "分层验证"] },
      { title: "修复交互问题", steps: ["问题复现", "根因识别", "最小修复", "功能/响应式/无障碍回归"] },
      { title: "优化用户体验", steps: ["现状审计", "瓶颈识别", "定向优化", "指标复验"] },
      { title: "重构组件", steps: ["边界分析", "架构拆分", "行为对齐", "关键路径回归"] },
    ],
    capabilities: [
      "QoderWake Assistant",
      "accessibility-audit",
      "browser-harness",
      "change-validation-planner",
      "component-architecture",
      "design-system",
      "front-design",
      "performance-optimization",
      "responsive-design",
      "ui-designer",
    ],
    learnings: [
      { type: "学到新技能", name: "responsive-design", daysAgo: 8 },
      { type: "学到新技能", name: "performance-optimization", daysAgo: 8 },
      { type: "学到新技能", name: "ui-designer", daysAgo: 8 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  akai: {
    highlights: [
      { icon: "🔌", title: "接口设计", sub: "API 开发", desc: "设计幂等、可演进的 API，错误处理与契约清晰完整。" },
      { icon: "🗄️", title: "数据一致性", sub: "事务", desc: "用事务与分批提交保障写入一致，规避重复与脏数据。" },
      { icon: "🔐", title: "安全意识", sub: "认证授权", desc: "把好认证、权限与输入校验，默认最小权限。" },
      { icon: "⚡", title: "性能优化", sub: "稳定性", desc: "优化慢查询与热点，提升接口吞吐与稳定性。" },
      { icon: "🧩", title: "第三方集成", sub: "对接", desc: "稳健对接支付/消息等外部系统，重试与对账兜底。" },
    ],
    workModes: [
      { title: "实现新接口", steps: ["读架构", "建表/Migration", "写 API", "接口自测"] },
      { title: "排查线上问题", steps: ["日志定位", "根因分析", "最小修复", "回归验证"] },
      { title: "对接第三方", steps: ["协议梳理", "幂等设计", "联调", "对账兜底"] },
    ],
    capabilities: ["QoderWake Assistant", "api-development", "db-operation", "auth", "performance-tuning", "third-party-integration"],
    learnings: [
      { type: "学到新技能", name: "auth", daysAgo: 9 },
      { type: "学到新技能", name: "db-operation", daysAgo: 9 },
      { type: "学到新技能", name: "api-development", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  xiaonuo: {
    highlights: [
      { icon: "🧪", title: "用例设计", sub: "覆盖完整", desc: "围绕真实场景与边界设计用例，覆盖正常、异常与极端路径。" },
      { icon: "🧱", title: "边界意识", sub: "破坏性思维", desc: "主动构造空值、超长、并发等异常输入，提前暴露缺陷。" },
      { icon: "🤖", title: "自动化", sub: "E2E", desc: "沉淀稳定的端到端脚本，让回归可重复、可信赖。" },
      { icon: "🐞", title: "缺陷定位", sub: "Bug 报告", desc: "清晰复现步骤与定位线索，降低沟通成本。" },
      { icon: "✅", title: "质量把控", sub: "验收标准", desc: "对齐验收口径，守住上线质量底线。" },
    ],
    workModes: [
      { title: "测试验收", steps: ["读需求/代码", "设计用例", "执行测试", "出报告/Bug"] },
      { title: "回归验证", steps: ["改动梳理", "关联面分析", "回归执行", "结果复核"] },
      { title: "自动化建设", steps: ["场景梳理", "脚本编写", "稳定性治理", "纳入流水线"] },
    ],
    capabilities: ["QoderWake Assistant", "test-case-design", "automation-test", "bug-report", "regression-test", "performance-test"],
    learnings: [
      { type: "学到新技能", name: "automation-test", daysAgo: 9 },
      { type: "学到新技能", name: "regression-test", daysAgo: 9 },
      { type: "学到新技能", name: "test-case-design", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  xiaoxi: {
    highlights: [
      { icon: "🧮", title: "数据建模", sub: "口径一致", desc: "搭建清晰的指标与数据模型，保证口径统一可追溯。" },
      { icon: "🎯", title: "指标设计", sub: "指标先行", desc: "围绕业务目标定义北极星与过程指标，先指标后取数。" },
      { icon: "📈", title: "可视化", sub: "看板", desc: "用合适图表讲清结论，让数据自己说话。" },
      { icon: "🧠", title: "业务理解", sub: "洞察", desc: "结合业务上下文解读数据，避免只看表面波动。" },
      { icon: "🔬", title: "AB 实验", sub: "因果", desc: "设计实验与分群，区分相关与因果。" },
    ],
    workModes: [
      { title: "做数据分析", steps: ["明确指标", "取数建模", "分析", "输出看板/结论"] },
      { title: "搭建指标体系", steps: ["业务拆解", "指标定义", "口径对齐", "字典沉淀"] },
      { title: "AB 实验复盘", steps: ["假设设定", "分流设计", "效果评估", "结论沉淀"] },
    ],
    capabilities: ["QoderWake Assistant", "data-modeling", "metric-system", "visualization", "ab-test", "data-cleaning"],
    learnings: [
      { type: "学到新技能", name: "visualization", daysAgo: 9 },
      { type: "学到新技能", name: "ab-test", daysAgo: 9 },
      { type: "学到新技能", name: "metric-system", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
  ayan: {
    highlights: [
      { icon: "🤖", title: "自动化", sub: "IaC", desc: "能自动化就别手动，基础设施即代码，减少人为失误。" },
      { icon: "🛡️", title: "稳定性", sub: "可回滚", desc: "上线前确保回滚可用，故障可快速恢复。" },
      { icon: "👁️", title: "可观测", sub: "监控告警", desc: "建设分级监控与告警，让问题先于用户被发现。" },
      { icon: "🚨", title: "应急响应", sub: "故障排查", desc: "半夜告警也不慌，按预案快速定位与止损。" },
      { icon: "💰", title: "成本优化", sub: "资源治理", desc: "持续优化资源利用率，平衡稳定与成本。" },
    ],
    workModes: [
      { title: "搭建交付流水线", steps: ["搭流水线", "容器编排", "监控告警", "故障响应"] },
      { title: "处理线上故障", steps: ["告警确认", "影响评估", "止损回滚", "复盘改进"] },
      { title: "成本治理", steps: ["资源盘点", "瓶颈识别", "弹性调整", "效果复验"] },
    ],
    capabilities: ["QoderWake Assistant", "ci-cd", "container-orchestration", "monitoring", "performance-tuning", "troubleshooting"],
    learnings: [
      { type: "学到新技能", name: "container-orchestration", daysAgo: 9 },
      { type: "学到新技能", name: "monitoring", daysAgo: 9 },
      { type: "学到新技能", name: "ci-cd", daysAgo: 9 },
      { type: "技能更新", name: "QoderWake Assistant", daysAgo: 4 },
    ],
    connectors: 0,
  },
};

export function getProfile(id: AgentId): EmployeeProfile {
  return EMPLOYEE_PROFILE[id];
}

/** 把 YYYY-MM-DD 格式成中文「2026年5月30日」 */
export function formatJoinDateCn(date: string): string {
  const d = new Date(date);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
