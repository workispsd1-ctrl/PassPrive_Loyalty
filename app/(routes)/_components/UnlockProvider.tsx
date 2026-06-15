'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import PlanModal from './PlanModal'
import { subscribeBusiness } from '../billing-actions'
import { DEFAULT_LOCATION_LIMIT, planById, type PlanId } from '@/lib/plans'

type UnlockContextValue = {
  /** True when the business has an active subscription (real, from Supabase). */
  unlocked: boolean
  /** Open the plan picker (called from a locked page's "Unlock" button). */
  openPlans: () => void
  /** Current plan id (null = not subscribed). */
  planId: PlanId | null
  /** Plan display name, e.g. "Basic". Defaults to "Basic" before subscribing. */
  planName: string
  /** How many locations this plan allows. */
  locationLimit: number
  /** The logged-in business's account name (from businesses.name). */
  businessName: string
}

const UnlockContext = createContext<UnlockContextValue>({
  unlocked: false,
  openPlans: () => {},
  planId: null,
  planName: 'Basic',
  locationLimit: DEFAULT_LOCATION_LIMIT,
  businessName: '',
})

/**
 * Holds the "is this business subscribed" state for the whole app. The initial
 * value comes from Supabase (resolved server-side in the layout), so a
 * subscribed business is unlocked on first paint with no flash. Choosing a plan
 * persists the subscription to Supabase and unlocks every locked page at once.
 */
export function UnlockProvider({
  initialSubscribed,
  planId: initialPlanId,
  locationLimit: initialLimit,
  businessName,
  children,
}: {
  initialSubscribed: boolean
  planId: string | null
  locationLimit: number | null
  businessName: string
  children: ReactNode
}) {
  const [unlocked, setUnlocked] = useState(initialSubscribed)
  const [planId, setPlanId] = useState<PlanId | null>(planById(initialPlanId)?.id ?? null)
  const [locationLimit, setLocationLimit] = useState<number>(initialLimit ?? DEFAULT_LOCATION_LIMIT)
  const [plansOpen, setPlansOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const planName = planById(planId)?.name ?? 'Basic'

  const openPlans = useCallback(() => setPlansOpen(true), [])

  const handleSelect = useCallback(async (selected: PlanId) => {
    setSubmitting(true)
    try {
      await subscribeBusiness(selected)
      setUnlocked(true)
      setPlanId(selected)
      setLocationLimit(planById(selected)?.locations ?? DEFAULT_LOCATION_LIMIT)
      setPlansOpen(false)
    } catch {
      // keep the modal open so the user can retry
    } finally {
      setSubmitting(false)
    }
  }, [])

  return (
    <UnlockContext.Provider value={{ unlocked, openPlans, planId, planName, locationLimit, businessName }}>
      {children}
      <PlanModal
        open={plansOpen}
        submitting={submitting}
        onClose={() => (submitting ? null : setPlansOpen(false))}
        onSelect={handleSelect}
      />
    </UnlockContext.Provider>
  )
}

export function useUnlock() {
  return useContext(UnlockContext)
}
