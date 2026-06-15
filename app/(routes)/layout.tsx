import React from 'react'
import Sidebar from './_components/Sidebar'
import { UnlockProvider } from './_components/UnlockProvider'
import { resolveCurrentBusiness } from '@/lib/supabase/current-business'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const business = await resolveCurrentBusiness()

  return (
    <UnlockProvider
      initialSubscribed={business?.subscribed ?? false}
      planId={business?.planId ?? null}
      locationLimit={business?.locationLimit ?? null}
      businessName={business?.name ?? ''}
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      </div>
    </UnlockProvider>
  )
}
