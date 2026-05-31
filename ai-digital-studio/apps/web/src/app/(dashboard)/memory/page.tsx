import { desc } from 'drizzle-orm'
import { AGENTS } from '@ai-studio/shared-types'
import { getDb } from '@/lib/db'
import { agentMemories } from '@/lib/db/schema'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default async function MemoryPage() {
  const db = await getDb()
  const memories = await db
    .select()
    .from(agentMemories)
    .orderBy(desc(agentMemories.createdAt))
    .limit(20)

  const agentMap = new Map(AGENTS.map((a) => [a.id, a]))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">记忆中心</h1>
        <p className="mt-2 text-muted-foreground">
          浏览 AI 员工的短期工作记忆
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {memories.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              完成任务后，记忆会自动出现在这里
            </CardContent>
          </Card>
        ) : (
          memories.map((memory) => {
            const agent = agentMap.get(memory.agentId)
            return (
              <Card key={memory.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {agent?.avatar} {agent?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{memory.summary ?? memory.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(memory.createdAt)}
                  </p>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
