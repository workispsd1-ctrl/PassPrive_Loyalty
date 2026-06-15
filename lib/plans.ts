// Subscription plans. Shared by the plan picker (client) and the subscribe
// server action (validation). The location limit per plan is also enforced in
// the subscribe_business SQL function.

export type PlanId = 'basic' | 'growth' | 'pro'

export type Plan = {
  id: PlanId
  name: string
  price: number // INR / month
  locations: number
  tagline: string
}

export const PLANS: Plan[] = [
  { id: 'basic', name: 'Basic', price: 499, locations: 1, tagline: '1 main location' },
  { id: 'growth', name: 'Growth', price: 999, locations: 3, tagline: 'Up to 3 locations' },
  { id: 'pro', name: 'Pro', price: 1499, locations: 6, tagline: 'Up to 6 locations' },
]

export const PLAN_IDS = PLANS.map((p) => p.id)

/** Plan a business is on before subscribing (free preview = 1 main location). */
export const DEFAULT_LOCATION_LIMIT = 1

/** Max locations before we ask the customer to contact us. */
export const MAX_SELF_SERVE_LOCATIONS = 6

export function planById(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}
