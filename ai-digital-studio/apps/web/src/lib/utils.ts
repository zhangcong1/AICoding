import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: '待处理',
    analyzing: '分析中',
    in_progress: '进行中',
    completed: '已完成',
    failed: '失败',
    running: '运行中',
    paused: '已暂停',
    skipped: '已跳过',
    idle: '空闲',
    thinking: '思考中',
    working: '工作中',
    error: '异常',
  }
  return labels[status] ?? status
}
