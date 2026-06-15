import React from 'react'
import SuperadminSidebar from './_components/SuperadminSidebar'

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Background layer for gradients */}
      <div aria-hidden className="app-background pointer-events-none fixed inset-0 -z-10" />
      
      {/* Sidebar */}
      <SuperadminSidebar />

      {/* Main Content Pane */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
