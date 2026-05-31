'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from './app-sidebar'
import { EmployeeSidebar } from './employee-sidebar'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const employeeMatch = pathname.match(/^\/employees\/([^/]+)$/)
  const agentId = employeeMatch?.[1]

  return (
    <div className="flex min-h-screen">
      {agentId ? (
        <EmployeeSidebar agentId={agentId} />
      ) : (
        <AppSidebar />
      )}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
