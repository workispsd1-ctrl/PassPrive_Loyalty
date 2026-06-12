import React from 'react'
import Link from 'next/link'

export default function StampCardsPage() {
  return (
    <>
      <main className="flex flex-1 flex-col p-6">
        {/* Title row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">My Stamp Cards</h2>
          <Link
            href="/stamp-cards/create"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground no-underline shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New
          </Link>
        </div>

        {/* Instructions + status */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 backdrop-blur-xl">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ready to test? Follow the instructions to publish your stamp card(s) to the app. If you&rsquo;re
            not quite ready to launch with customers yet, set the card to private (see advanced card settings).
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 rounded-full bg-success" />
            Ready to publish
          </span>
        </div>
      </main>
    </>
  )
}
