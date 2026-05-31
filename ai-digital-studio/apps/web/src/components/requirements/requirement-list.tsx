import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import type { Requirement } from '@/lib/db/schema'

export function RequirementList({
  requirements,
}: {
  requirements: Requirement[]
}) {
  if (requirements.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          还没有需求，提交第一个吧
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {requirements.map((item) => (
        <Link key={item.id} href={`/requirements/${item.id}`}>
          <Card className="transition-colors hover:bg-accent/40">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {item.description}
                  </CardDescription>
                </div>
                <Badge status={item.status} />
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              优先级 {item.priority} · {formatDate(item.createdAt)}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
