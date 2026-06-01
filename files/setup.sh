#!/bin/bash
# AI Digital Software Studio — 项目初始化脚本
# 运行：chmod +x setup.sh && ./setup.sh

set -e
echo "🚀 初始化 AI Digital Software Studio..."

# ---- 根目录 ----
mkdir -p ai-digital-studio && cd ai-digital-studio

# pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

# turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev":   { "cache": false, "persistent": true },
    "lint":  {},
    "typecheck": { "dependsOn": ["^typecheck"] }
  }
}
EOF

# 根 package.json
cat > package.json << 'EOF'
{
  "name": "ai-digital-studio",
  "private": true,
  "scripts": {
    "dev":        "turbo run dev",
    "build":      "turbo run build",
    "lint":       "turbo run lint",
    "typecheck":  "turbo run typecheck",
    "db:push":    "cd apps/web && pnpm drizzle-kit push",
    "db:migrate": "cd apps/web && pnpm drizzle-kit generate && cd apps/web && pnpm drizzle-kit migrate",
    "db:studio":  "cd apps/web && pnpm drizzle-kit studio",
    "docker:up":  "docker-compose up -d",
    "docker:down":"docker-compose down",
    "setup":      "pnpm install && pnpm docker:up && sleep 3 && pnpm db:push"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
EOF

# docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: ai_studio_postgres
    environment:
      POSTGRES_DB: ai_studio
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: ai_studio_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  qdrant:
    image: qdrant/qdrant:latest
    container_name: ai_studio_qdrant
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  redis_data:
  qdrant_data:
EOF

# .env.example
cat > .env.example << 'EOF'
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_studio

# Redis
REDIS_URL=redis://localhost:6379

# Qdrant
QDRANT_URL=http://localhost:6333

# GitLab
GITLAB_URL=https://gitlab.com
GITLAB_TOKEN=glpat-xxxxxxxxxxxxxxxxxxxx
GITLAB_MEMORY_REPO_ID=your-memory-repo-id
GITLAB_OUTPUT_REPO_ID=your-output-repo-id

# AI Model (OpenAI Compatible)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
OPENAI_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o
EMBEDDING_MODEL=text-embedding-3-small

# Auth
NEXTAUTH_SECRET=change-this-to-a-random-secret
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
EOF

cp .env.example .env

# ---- 目录结构 ----
mkdir -p apps/web/src/{app,components,lib,stores,types,hooks}
mkdir -p "apps/web/src/app/(dashboard)"
mkdir -p "apps/web/src/app/api"
mkdir -p "apps/web/src/app/auth/[...nextauth]"
mkdir -p "apps/web/src/app/(dashboard)/studio"
mkdir -p "apps/web/src/app/(dashboard)/requirements"
mkdir -p "apps/web/src/app/(dashboard)/requirements/[id]"
mkdir -p "apps/web/src/app/(dashboard)/tasks"
mkdir -p "apps/web/src/app/(dashboard)/tasks/[id]"
mkdir -p "apps/web/src/app/(dashboard)/employees"
mkdir -p "apps/web/src/app/(dashboard)/employees/[id]"
mkdir -p "apps/web/src/app/(dashboard)/memory"
mkdir -p "apps/web/src/app/(dashboard)/settings"
mkdir -p apps/web/src/app/api/requirements
mkdir -p "apps/web/src/app/api/requirements/[id]/start"
mkdir -p apps/web/src/app/api/tasks
mkdir -p "apps/web/src/app/api/tasks/[id]/pause"
mkdir -p "apps/web/src/app/api/tasks/[id]/resume"
mkdir -p "apps/web/src/app/api/tasks/[id]/retry"
mkdir -p apps/web/src/app/api/employees
mkdir -p "apps/web/src/app/api/employees/[id]/memory"
mkdir -p "apps/web/src/app/api/employees/[id]/skills"
mkdir -p apps/web/src/app/api/agents
mkdir -p "apps/web/src/app/api/memory/[agentId]/sync"
mkdir -p apps/web/src/app/api/events/stream
mkdir -p apps/web/src/components/{studio,agents,requirements,tasks,ui}
mkdir -p apps/web/src/lib/{db,agents,memory,gitlab,qdrant,redis,events,auth}
mkdir -p apps/web/src/lib/db/migrations
mkdir -p packages/shared-types/src

echo "✅ 目录结构创建完成"

# ---- apps/web/package.json ----
cat > apps/web/package.json << 'EOF'
{
  "name": "@ai-studio/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev":        "next dev --turbo",
    "build":      "next build",
    "start":      "next start",
    "lint":       "next lint",
    "typecheck":  "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",

    "drizzle-orm": "^0.38.0",
    "postgres": "^3.4.0",
    "@neondatabase/serverless": "^0.10.0",

    "zustand": "^5.0.0",
    "@tanstack/react-query": "^5.0.0",

    "socket.io": "^4.8.0",
    "socket.io-client": "^4.8.0",

    "zod": "^3.23.0",

    "next-auth": "^5.0.0-beta",
    "@auth/drizzle-adapter": "^1.0.0",

    "ioredis": "^5.4.0",

    "@langchain/langgraph": "^0.2.0",
    "@langchain/openai": "^0.3.0",
    "@langchain/core": "^0.3.0",

    "@qdrant/js-client-rest": "^1.12.0",
    "@gitbeaker/rest": "^42.0.0",

    "@xyflow/react": "^12.0.0",
    "framer-motion": "^11.0.0",
    "pixi.js": "^8.0.0",
    "lucide-react": "^0.468.0",

    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0",
    "drizzle-kit": "^0.29.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0"
  }
}
EOF

# ---- tsconfig.json ----
cat > apps/web/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# ---- next.config.ts ----
cat > apps/web/next.config.ts << 'EOF'
import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    ppr: false,
    reactCompiler: true,
  },
  serverExternalPackages: [
    '@langchain/langgraph',
    '@langchain/openai',
    '@langchain/core',
    'pixi.js',
  ],
}

export default config
EOF

# ---- drizzle.config.ts ----
cat > apps/web/drizzle.config.ts << 'EOF'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out:    './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
EOF

# ---- shared types ----
cat > packages/shared-types/package.json << 'EOF'
{
  "name": "@ai-studio/shared-types",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
EOF

cat > packages/shared-types/src/index.ts << 'EOF'
// Agent 相关类型
export type AgentId = 'pm' | 'architect' | 'ui' | 'fe' | 'be' | 'qa'
export type AgentStatus = 'idle' | 'thinking' | 'working' | 'completed' | 'error'
export type Phase = 'pending' | 'analyzing' | 'designing' | 'developing' | 'testing' | 'completed'
export type TaskStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'skipped'

export interface AgentInfo {
  id: AgentId
  name: string
  role: string
  avatar: string
  status: AgentStatus
}

export const AGENTS: AgentInfo[] = [
  { id: 'pm',         name: '阿策', role: '产品经理',   avatar: '🎯', status: 'idle' },
  { id: 'architect',  name: '老周', role: '系统架构师', avatar: '🏗️', status: 'idle' },
  { id: 'ui',         name: '小沐', role: 'UI设计师',   avatar: '🎨', status: 'idle' },
  { id: 'fe',         name: '小布', role: '前端工程师', avatar: '💻', status: 'idle' },
  { id: 'be',         name: '阿凯', role: '后端工程师', avatar: '⚙️',  status: 'idle' },
  { id: 'qa',         name: '小诺', role: '测试工程师', avatar: '🔍', status: 'idle' },
]

// WebSocket 事件类型
export interface StudioEvent {
  type: string
  agentId?: AgentId
  taskId?: string
  payload?: Record<string, unknown>
  timestamp: string
}
EOF

echo "✅ 所有配置文件生成完成"
echo ""
echo "下一步："
echo "  1. cd ai-digital-studio"
echo "  2. cp .env.example .env  (填写 API Keys)"
echo "  3. pnpm install"
echo "  4. pnpm docker:up"
echo "  5. pnpm db:push"
echo "  6. pnpm dev"
echo ""
echo "🎉 项目初始化完成！开始 Sprint 1 开发吧。"
