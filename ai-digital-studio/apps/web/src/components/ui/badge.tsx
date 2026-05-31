import { cn, getStatusLabel } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  pending: 'bg-slate-100 text-slate-700',
  analyzing: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
  running: 'bg-blue-100 text-blue-700',
  paused: 'bg-orange-100 text-orange-700',
  idle: 'bg-slate-100 text-slate-600',
  thinking: 'bg-violet-100 text-violet-700',
  working: 'bg-cyan-100 text-cyan-700',
  error: 'bg-red-100 text-red-700',
}

export function Badge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status] ?? 'bg-slate-100 text-slate-700',
        className,
      )}
    >
      {getStatusLabel(status)}
    </span>
  )
}
