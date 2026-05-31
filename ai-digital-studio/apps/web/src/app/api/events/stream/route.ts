import { NextRequest } from 'next/server'
import { desc, gt } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { events } from '@/lib/db/schema'

export async function GET(req: NextRequest) {
  const db = await getDb()
  const encoder = new TextEncoder()
  const lastEventId = req.nextUrl.searchParams.get('lastEventId')

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      send({ type: 'connected', timestamp: new Date().toISOString() })

      let cursor = lastEventId ?? undefined

      const poll = async () => {
        try {
          const recent = cursor
            ? await db
                .select()
                .from(events)
                .where(gt(events.id, cursor))
                .orderBy(desc(events.createdAt))
                .limit(20)
            : await db
                .select()
                .from(events)
                .orderBy(desc(events.createdAt))
                .limit(20)

          for (const event of recent.reverse()) {
            send({
              type: event.type,
              agentId: event.agentId,
              taskId: event.taskId,
              payload: event.payload,
              timestamp: event.createdAt.toISOString(),
            })
            cursor = event.id
          }
        } catch {
          // DB may not be ready yet
        }
      }

      await poll()
      const interval = setInterval(poll, 2000)

      req.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
