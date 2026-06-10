import React from 'react'
import CustomerNav from './_components/CustomerNav'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>
      <CustomerNav />
    </div>
  )
}
