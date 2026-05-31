import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AGENTS } from '@ai-studio/shared-types'
import { formatDate } from '@/lib/utils'
import type { Task } from '@/lib/db/schema'

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          暂无任务
        </CardContent>
      </Card>
    )
  }

  const agentMap = new Map(AGENTS.map((a) => [a.id, a]))

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => {
        const agent = agentMap.get(task.agentId)
        return (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <Card className="transition-colors hover:bg-accent/40">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-base">
                    {agent?.avatar} {agent?.name} · {task.phase}
                  </CardTitle>
                  <Badge status={task.status} />
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {formatDate(task.createdAt)}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
