'use client'

import { type ReactNode } from 'react'
import { useUnlock } from './UnlockProvider'

type FeatureKey = 'dashboard' | 'members' | 'communications' | 'campaigns' | 'resources'

const FEATURES: Record<FeatureKey, { title: string; tagline: string; bullets: string[] }> = {
  dashboard: {
    title: 'Dashboard',
    tagline: 'Analytics & insights for your loyalty program.',
    bullets: ['Live stamps & redemptions', 'Member growth trends', 'Activity by location'],
  },
  members: {
    title: 'Members',
    tagline: 'Your complete customer database — every member, stamp and visit in one place.',
    bullets: ['Search & filter every member', 'Export your list to CSV', 'Full stamp & redemption history'],
  },
  communications: {
    title: 'Communications',
    tagline: 'Reach your members with the right message at the right time.',
    bullets: ['Push notifications', 'SMS & email blasts', 'Reusable message templates'],
  },
  campaigns: {
    title: 'Campaigns',
    tagline: 'Run marketing campaigns that bring customers back.',
    bullets: ['Scheduled promotions', 'Audience targeting', 'Performance tracking'],
  },
  resources: {
    title: 'Resources',
    tagline: 'Guides, assets and best practices to grow your loyalty program.',
    bullets: ['Printable point-of-sale kit', 'Marketing templates', 'Step-by-step how-to guides'],
  },
}

/**
 * Wraps a locked feature page: renders the page as a blurred, non-interactive
 * preview ("how it looks") behind an upgrade card that invites the owner to
 * unlock by paying. Drop-in via a route layout.
 *
 * TODO(billing): once a plan/subscription exists, render `children` directly
 * when the business has access instead of always gating.
 */
export default function PaywallGate({
  feature,
  children,
}: {
  feature: FeatureKey
  children: ReactNode
}) {
  const { title, tagline, bullets } = FEATURES[feature]

  // Driven by the business's real subscription (from Supabase). Unlocking via
  // the plan picker unlocks every locked page at once.
  const { unlocked, openPlans } = useUnlock()

  if (unlocked) return <>{children}</>

  return (
    <div className="relative h-full min-h-full overflow-hidden">
      {/* Demo preview — lightly blurred & non-interactive */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-90 blur-[2px]">
        {children}
      </div>

      {/* Scrim — light so the preview stays visible behind the card */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/45 to-background/80" />

      {/* Upgrade card */}
      <div className="relative z-10 flex min-h-full items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-2xl backdrop-blur-xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>

          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
            Pro feature
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Unlock {title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>

          <ul className="mt-5 flex flex-col gap-2 text-left">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-success">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openPlans}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            Unlock by paying
          </button>

          <p className="mt-4 text-[11px] text-muted-foreground">
            Choose a plan to unlock every feature. This is a preview of how {title} will look.
          </p>
        </div>
      </div>
    </div>
  )
}
