import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">系统设置</h1>
        <p className="mt-2 text-muted-foreground">
          配置 GitLab、AI 模型与基础设施连接
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GitLab</CardTitle>
            <CardDescription>
              在 .env 中配置 GITLAB_URL、GITLAB_TOKEN、GITLAB_MEMORY_REPO_ID
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            未配置时使用内置员工模板
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI 模型</CardTitle>
            <CardDescription>
              配置 OPENAI_API_KEY、OPENAI_BASE_URL、LLM_MODEL
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            未配置 API Key 时使用 Mock PRD 模式
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>基础设施</CardTitle>
            <CardDescription>
              PostgreSQL、Redis、Qdrant 通过 docker-compose 启动
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            运行 pnpm docker:up 启动本地服务
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
