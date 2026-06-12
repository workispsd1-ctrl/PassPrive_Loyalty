import React from 'react'
import CustomerNav from './_components/CustomerNav'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-background">
      {/* Orange ambient patches */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -top-24 -right-20 h-96 w-120 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute top-2/3 -right-28 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute bottom-24 left-1/4 h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto pb-20">{children}</div>
      <CustomerNav />
    </div>
  )
}
