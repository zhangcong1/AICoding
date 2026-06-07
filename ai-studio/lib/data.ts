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
