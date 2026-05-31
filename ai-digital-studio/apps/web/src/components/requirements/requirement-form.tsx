'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function RequirementForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority: 'medium' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? '提交失败')
      }

      const requirement = await res.json()

      await fetch(`/api/requirements/${requirement.id}/start`, {
        method: 'POST',
      })

      setTitle('')
      setDescription('')
      router.push(`/requirements/${requirement.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>提交需求</CardTitle>
        <CardDescription>
          描述你的想法，阿策会自动分析并生成 PRD
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="需求标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="详细描述你的需求..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? '提交中...' : '提交并启动研发流程'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
