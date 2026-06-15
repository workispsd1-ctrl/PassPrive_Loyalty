'use client'

import { useState } from 'react'
import { PLANS, MAX_SELF_SERVE_LOCATIONS, type PlanId } from '@/lib/plans'

export default function PlanModal({
  open,
  submitting,
  onClose,
  onSelect,
}: {
  open: boolean
  submitting: boolean
  onClose: () => void
  onSelect: (planId: PlanId) => void
}) {
  const [selected, setSelected] = useState<PlanId>('growth')

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={submitting ? undefined : onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-[#111114] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Choose your plan</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Unlock every feature. Pick the plan that fits your number of locations.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-40"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Plans */}
        <div className="overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PLANS.map((plan) => {
              const active = selected === plan.id
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelected(plan.id)}
                  disabled={submitting}
                  className={`flex flex-col rounded-xl border p-4 text-left transition-colors disabled:opacity-60 ${
                    active
                      ? 'border-primary bg-primary/10 ring-2 ring-ring/30'
                      : 'border-border bg-muted hover:border-primary/50'
                  }`}
                >
                  <span className={`text-sm font-semibold ${active ? 'text-primary' : 'text-foreground'}`}>
                    {plan.name}
                  </span>
                  <span className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </span>
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-background px-2 py-0.5 text-xs font-medium text-foreground">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-primary">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {plan.locations} location{plan.locations > 1 ? 's' : ''}
                  </span>
                  <span className="mt-2 text-xs text-muted-foreground">{plan.tagline}</span>
                </button>
              )
            })}
          </div>

          {/* Contact us for more than 6 locations */}
          <div className="mt-4 flex flex-col items-start justify-between gap-2 rounded-xl border border-border bg-muted px-4 py-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              Need more than {MAX_SELF_SERVE_LOCATIONS} locations? Restaurants, chains or any sector —
              we&rsquo;ll tailor a plan for you.
            </p>
            <a
              href="mailto:hello@passprive.com?subject=Enterprise%20plan%20enquiry"
              className="shrink-0 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/20"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <p className="text-xs text-muted-foreground">No payment required during testing.</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="inline-flex items-center rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10 disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSelect(selected)}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-600 disabled:opacity-60"
            >
              {submitting ? 'Activating…' : `Subscribe to ${PLANS.find((p) => p.id === selected)?.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
