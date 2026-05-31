import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { tasks } from '@/lib/db/schema'
import { formatDate } from '@/lib/utils'

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const db = await getDb()
  const { id } = await params

  const [task] = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1)
  if (!task) notFound()

  const agent = AGENTS.find((a) => a.id === task.agentId)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {agent?.avatar} {agent?.name} 任务
          </h1>
          <p className="mt-2 text-muted-foreground">
            阶段 {task.phase} · {formatDate(task.createdAt)}
          </p>
        </div>
        <Badge status={task.status} />
      </div>

      {task.errorMessage ? (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">错误信息</CardTitle>
          </CardHeader>
          <CardContent>{task.errorMessage}</CardContent>
        </Card>
      ) : null}

      {task.output ? (
        <Card>
          <CardHeader>
            <CardTitle>任务产物</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
              {JSON.stringify(task.output, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            任务执行中或暂无产物
          </CardContent>
        </Card>
      )}
    </div>
  )
}
