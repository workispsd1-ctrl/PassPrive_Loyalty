import React from 'react'

export default function MembersPage() {
  return (
    <>
      <header className="flex h-16 items-center border-b border-border bg-card/40 px-6 backdrop-blur-xl">
        <div>
          <h1 className="text-base font-semibold text-foreground">Members</h1>
          <p className="text-xs text-muted-foreground">View and manage your members</p>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="rounded-2xl border border-border bg-card p-10 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold text-foreground">Members</p>
          <p className="mt-1 text-sm text-muted-foreground">Coming soon</p>
        </div>
      </main>
    </>
  )
}
