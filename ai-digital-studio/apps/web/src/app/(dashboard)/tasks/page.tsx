import { desc } from 'drizzle-orm'
import { TaskList } from '@/components/tasks/task-list'
import { getDb } from '@/lib/db'
import { tasks } from '@/lib/db/schema'

export default async function TasksPage() {
  const db = await getDb()
  const taskList = await db.select().from(tasks).orderBy(desc(tasks.createdAt))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">任务中心</h1>
        <p className="mt-2 text-muted-foreground">查看所有 AI 员工任务流水线</p>
      </div>
      <TaskList tasks={taskList} />
    </div>
  )
}
