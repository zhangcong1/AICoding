import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { requirements, tasks } from '@/lib/db/schema'
import { formatDate } from '@/lib/utils'

export default async function RequirementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const db = await getDb()
  const { id } = await params

  const [requirement] = await db
    .select()
    .from(requirements)
    .where(eq(requirements.id, id))
    .limit(1)

  if (!requirement) notFound()

  const relatedTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.requirementId, id))

  const agentMap = new Map(AGENTS.map((a) => [a.id, a]))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{requirement.title}</h1>
          <p className="mt-2 text-muted-foreground">
            创建于 {formatDate(requirement.createdAt)}
          </p>
        </div>
        <Badge status={requirement.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>需求描述</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{requirement.description}</p>
        </CardContent>
      </Card>

      <section>
        <h2 className="mb-4 text-xl font-semibold">关联任务</h2>
        <div className="flex flex-col gap-3">
          {relatedTasks.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                暂无任务
                <form action={`/api/requirements/${id}/start`} method="POST">
                  <Button className="mt-4" type="submit">
                    启动研发流程
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            relatedTasks.map((task) => {
              const agent = agentMap.get(task.agentId)
              return (
                <Link key={task.id} href={`/tasks/${task.id}`}>
                  <Card className="transition-colors hover:bg-accent/40">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {agent?.avatar} {agent?.name} · {task.phase}
                        </CardTitle>
                        <Badge status={task.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {task.output ? '已有产物' : '执行中...'}
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
