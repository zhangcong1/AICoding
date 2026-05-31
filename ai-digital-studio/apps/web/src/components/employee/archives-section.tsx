'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

const archiveFiles = [
  { name: 'IDENTITY.md', key: 'identity' as const },
  { name: 'BIBLE.md', key: 'bible' as const },
  { name: 'MEMORY.md', key: 'memory' as const },
  { name: 'PERSONA.md', key: 'persona' as const },
]

export function ArchivesSection({
  files,
}: {
  files: Record<'identity' | 'persona' | 'bible' | 'memory', string>
}) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold">原始档案</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {archiveFiles.map((file) => (
          <button
            key={file.key}
            type="button"
            onClick={() => setActive(active === file.key ? null : file.key)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
              active === file.key
                ? 'border-foreground bg-muted'
                : 'border-border hover:bg-muted/50'
            }`}
          >
            <FileText className="size-4 text-muted-foreground" />
            {file.name}
          </button>
        ))}
      </div>

      {active && (
        <div className="rounded-lg bg-muted/40 p-4">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {files[active as keyof typeof files]}
          </pre>
        </div>
      )}
    </section>
  )
}
