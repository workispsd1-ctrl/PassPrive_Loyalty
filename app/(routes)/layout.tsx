import React from 'react'
import Sidebar from './_components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
    </div>
  )
}
