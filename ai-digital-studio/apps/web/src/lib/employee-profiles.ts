import type { AgentId } from '@ai-studio/shared-types'

export interface SkillItem {
  icon: string
  title: string
  description: string
}

export interface WorkModeFlow {
  title: string
  steps: string[]
}

export interface LearnedSkill {
  name: string
  slug: string
  time: string
}

export interface EmployeeProfile {
  id: AgentId
  code: string
  joinDate: string
  bio: string
  strengths: SkillItem[]
  workStyle: string[]
  workModes: WorkModeFlow[]
  capabilityTags: string[]
  learnedSkills: LearnedSkill[]
}

const baseProfiles: Record<AgentId, Omit<EmployeeProfile, 'id'>> = {
  pm: {
    code: 'pm001',
    joinDate: '2026年5月28日',
    bio: '专注产品规划与需求分析，擅长用户故事拆解、优先级排序与 MVP 范围界定。遵循数据驱动决策，平衡用户价值与交付节奏。',
    strengths: [
      { icon: '🎯', title: '需求分析', description: '从用户视角拆解需求，识别核心痛点与边界场景' },
      { icon: '📋', title: 'PRD 编写', description: '输出结构化产品文档，明确功能与非功能需求' },
      { icon: '📊', title: '优先级排序', description: '基于价值与成本矩阵排列迭代顺序' },
      { icon: '🔍', title: '竞品分析', description: '对比市场方案，提炼差异化机会' },
    ],
    workStyle: ['用户故事优先', 'MVP 思维', '数据驱动决策', '逻辑严谨'],
    workModes: [
      { title: '需求澄清', steps: ['接收需求', '用户访谈', 'PRD 输出', '评审确认'] },
      { title: '迭代规划', steps: ['范围界定', '优先级矩阵', '里程碑设定'] },
    ],
    capabilityTags: ['prd-writer', 'user-story', 'priority-matrix', 'competitive-analysis', 'mvp-scoping'],
    learnedSkills: [
      { name: '需求拆解', slug: 'requirement-analysis', time: '刚刚' },
      { name: '用户故事', slug: 'user-story', time: '1 小时前' },
    ],
  },
  architect: {
    code: 'arch001',
    joinDate: '2026年5月28日',
    bio: '专注系统架构设计与技术选型，擅长数据库设计、API 规范与性能优化。遵循高可用、简单可维护的设计原则。',
    strengths: [
      { icon: '🏗️', title: '系统设计', description: '全局视角规划模块边界与服务拆分' },
      { icon: '🗄️', title: '数据库设计', description: 'Schema 建模、索引策略与迁移方案' },
      { icon: '🔌', title: 'API 设计', description: 'RESTful 规范、版本管理与幂等性' },
      { icon: '⚡', title: '性能优化', description: '瓶颈分析、缓存策略与扩展方案' },
    ],
    workStyle: ['高可用优先', '简单可维护', '面向变化设计', '全局视角'],
    workModes: [
      { title: '架构设计', steps: ['需求理解', '技术选型', '架构文档', '评审'] },
      { title: 'Schema 设计', steps: ['实体建模', '关系设计', 'Migration'] },
    ],
    capabilityTags: ['system-design', 'database-schema', 'api-spec', 'tech-selection', 'performance-tuning'],
    learnedSkills: [
      { name: '微服务拆分', slug: 'microservices', time: '刚刚' },
      { name: '缓存策略', slug: 'caching', time: '2 小时前' },
    ],
  },
  ui: {
    code: 'ui001',
    joinDate: '2026年5月29日',
    bio: '专注界面设计与用户体验，擅长组件规范、Design Token 与交互原型。遵循一致性、可访问性与少即是多的设计原则。',
    strengths: [
      { icon: '🎨', title: 'UI 设计', description: '视觉语言、排版层级与色彩策略' },
      { icon: '🧩', title: '组件设计', description: '可复用组件边界与变体体系' },
      { icon: '📱', title: '响应式布局', description: '跨端适配与断点策略' },
      { icon: '♿', title: '无障碍设计', description: '语义结构、键盘导航与 ARIA 合规' },
    ],
    workStyle: ['一致性原则', '可访问性优先', '少即是多', '细节控'],
    workModes: [
      { title: '视觉方向', steps: ['需求理解', '风格定义', '组件规范', '原型输出'] },
    ],
    capabilityTags: ['ui-designer', 'design-token', 'component-spec', 'responsive-design', 'accessibility-audit'],
    learnedSkills: [
      { name: 'Design Token', slug: 'design-token', time: '刚刚' },
      { name: '组件变体', slug: 'component-variants', time: '30 分钟前' },
    ],
  },
  fe: {
    code: 'bcpj6393',
    joinDate: '2026年5月30日',
    bio: '专注前端界面设计与实现，擅长组件架构、视觉语言打磨、响应式适配、无障碍优化与性能调优。遵循增量交付、分层验证与证据驱动检查，兼顾用户体验与工程质量。',
    strengths: [
      { icon: '🎨', title: '前端设计 / 视觉方向', description: '聚焦 design token、排版层级与色彩策略' },
      { icon: '🧩', title: '组件架构', description: '设计可复用组件边界与状态模型' },
      { icon: '📱', title: '响应式设计', description: '处理移动端与桌面端布局适配' },
      { icon: '♿', title: '无障碍审计', description: '检查语义 HTML、键盘导航与 ARIA 合规' },
      { icon: '⚡', title: '性能优化', description: '关注渲染效率与资源加载策略' },
    ],
    workStyle: ['Design First', 'Small Iterations', 'Evidence-driven Validation', 'Accessibility First'],
    workModes: [
      { title: '前端交付', steps: ['需求澄清', '视觉方向', '结构实现', '样式打磨', '分层验证'] },
      { title: '组件开发', steps: ['边界设计', '状态模型', 'Story 验证', '集成测试'] },
    ],
    capabilityTags: [
      'QoderWake Assistant',
      'accessibility-audit',
      'browser-harness',
      'ui-designer',
      'responsive-design',
      'performance-optimization',
      'component-architecture',
      'design-token',
      'frontend-testing',
      'visual-regression',
    ],
    learnedSkills: [
      { name: 'ui-designer', slug: 'ui-designer', time: '刚刚' },
      { name: 'responsive-design', slug: 'responsive-design', time: '刚刚' },
      { name: 'performance-optimization', slug: 'performance-optimization', time: '刚刚' },
    ],
  },
  be: {
    code: 'be001',
    joinDate: '2026年5月29日',
    bio: '专注后端 API 与数据层开发，擅长认证授权、事务处理与第三方集成。遵循数据安全、接口幂等与完整错误处理。',
    strengths: [
      { icon: '⚙️', title: 'API 开发', description: 'RESTful 接口设计与实现' },
      { icon: '🔒', title: '认证授权', description: 'JWT、OAuth 与权限模型' },
      { icon: '🗄️', title: '数据库操作', description: 'ORM、Migration 与查询优化' },
      { icon: '🔗', title: '第三方集成', description: 'Webhook、SDK 与消息队列' },
    ],
    workStyle: ['数据安全', '接口幂等', '错误处理完整', '注释详尽'],
    workModes: [
      { title: 'API 开发', steps: ['接口设计', '实现', '单元测试', '文档'] },
      { title: '数据迁移', steps: ['Schema 变更', 'Migration', '回滚方案'] },
    ],
    capabilityTags: ['api-development', 'auth-jwt', 'database-migration', 'transaction', 'webhook-integration'],
    learnedSkills: [
      { name: '事务处理', slug: 'transaction', time: '刚刚' },
      { name: '接口幂等', slug: 'idempotency', time: '1 小时前' },
    ],
  },
  qa: {
    code: 'qa001',
    joinDate: '2026年5月30日',
    bio: '专注质量保障与测试验收，擅长测试用例设计、边界条件分析与自动化测试。遵循测试覆盖率与用户真实场景验证。',
    strengths: [
      { icon: '🔍', title: '测试用例设计', description: '覆盖正常路径与边界场景' },
      { icon: '🤖', title: '自动化测试', description: 'E2E、单元测试脚本生成' },
      { icon: '🐛', title: 'Bug 报告', description: '结构化缺陷描述与复现步骤' },
      { icon: '📈', title: '回归测试', description: '变更影响分析与回归策略' },
    ],
    workStyle: ['破坏性思维', '边界意识', '质量标准严格', '用户真实场景'],
    workModes: [
      { title: '测试验收', steps: ['用例设计', '执行测试', 'Bug 报告', '回归验证'] },
    ],
    capabilityTags: ['test-case-design', 'e2e-testing', 'bug-report', 'regression-testing', 'boundary-testing'],
    learnedSkills: [
      { name: '边界测试', slug: 'boundary-testing', time: '刚刚' },
      { name: 'E2E 脚本', slug: 'e2e-testing', time: '45 分钟前' },
    ],
  },
}

export function getEmployeeProfile(id: AgentId): EmployeeProfile {
  return { id, ...baseProfiles[id] }
}

export const employeeNavItems = [
  { key: 'home', label: '首页', href: '' },
  { key: 'projects', label: '项目', href: 'projects' },
  { key: 'auto-tasks', label: '自动任务', href: 'auto-tasks' },
  { key: 'chat-tasks', label: '对话任务', href: 'chat-tasks' },
  { key: 'memory', label: '记忆', href: 'memory' },
  { key: 'skills', label: '技能', href: 'skills' },
  { key: 'connectors', label: '连接器', href: 'connectors' },
  { key: 'im', label: 'IM', href: 'im' },
  { key: 'permissions', label: '权限', href: 'permissions' },
] as const
