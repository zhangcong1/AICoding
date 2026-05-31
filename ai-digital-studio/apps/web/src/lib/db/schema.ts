import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const requirementStatusEnum = pgEnum('requirement_status', [
  'pending',
  'analyzing',
  'in_progress',
  'completed',
  'failed',
])

export const taskStatusEnum = pgEnum('task_status', [
  'pending',
  'running',
  'paused',
  'completed',
  'failed',
  'skipped',
])

export const agentIdEnum = pgEnum('agent_id', [
  'pm',
  'architect',
  'ui',
  'fe',
  'be',
  'qa',
])

export const agentStatusEnum = pgEnum('agent_status', [
  'idle',
  'thinking',
  'working',
  'completed',
  'error',
])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const requirements = pgTable(
  'requirements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: requirementStatusEnum('status').default('pending').notNull(),
    priority: text('priority').default('medium').notNull(),
    createdBy: uuid('created_by').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [index('req_status_idx').on(t.status)],
)

export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    requirementId: uuid('requirement_id')
      .references(() => requirements.id)
      .notNull(),
    agentId: agentIdEnum('agent_id').notNull(),
    phase: text('phase').notNull(),
    status: taskStatusEnum('status').default('pending').notNull(),
    input: jsonb('input'),
    output: jsonb('output'),
    errorMessage: text('error_message'),
    retryCount: integer('retry_count').default(0).notNull(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    index('task_req_idx').on(t.requirementId),
    index('task_agent_idx').on(t.agentId),
  ],
)

export const agentStates = pgTable('agent_states', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: agentIdEnum('agent_id').notNull().unique(),
  status: agentStatusEnum('status').default('idle').notNull(),
  currentTaskId: uuid('current_task_id').references(() => tasks.id),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const agentMemories = pgTable(
  'agent_memories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    agentId: agentIdEnum('agent_id').notNull(),
    taskId: uuid('task_id').references(() => tasks.id),
    content: text('content').notNull(),
    summary: text('summary'),
    tags: text('tags').array(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [index('mem_agent_idx').on(t.agentId)],
)

export const agentSkills = pgTable('agent_skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: agentIdEnum('agent_id').notNull(),
  skillName: text('skill_name').notNull(),
  category: text('category').notNull(),
  level: integer('level').default(1).notNull(),
  experience: integer('experience').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const events = pgTable(
  'events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: text('type').notNull(),
    agentId: agentIdEnum('agent_id'),
    taskId: uuid('task_id'),
    payload: jsonb('payload'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [index('event_created_idx').on(t.createdAt)],
)

export const requirementsRelations = relations(requirements, ({ many }) => ({
  tasks: many(tasks),
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  requirement: one(requirements, {
    fields: [tasks.requirementId],
    references: [requirements.id],
  }),
}))

export type Requirement = typeof requirements.$inferSelect
export type Task = typeof tasks.$inferSelect
export type AgentState = typeof agentStates.$inferSelect
