import { desc } from 'drizzle-orm'
import { RequirementForm } from '@/components/requirements/requirement-form'
import { RequirementList } from '@/components/requirements/requirement-list'
import { getDb } from '@/lib/db'
import { requirements } from '@/lib/db/schema'

export default async function RequirementsPage() {
  const db = await getDb()
  const reqList = await db
    .select()
    .from(requirements)
    .orderBy(desc(requirements.createdAt))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">需求中心</h1>
        <p className="mt-2 text-muted-foreground">提交和管理产品需求</p>
      </div>
      <RequirementForm />
      <RequirementList requirements={reqList} />
    </div>
  )
}
