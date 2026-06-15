'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveCurrentBusiness } from '@/lib/supabase/current-business'
import { PLAN_IDS, type PlanId } from '@/lib/plans'

/**
 * Subscribe the current business to a plan. No payment gateway yet, so picking
 * a plan marks the business subscribed immediately (and stores its location
 * allowance) in Supabase. Replace the trigger with a payment webhook later.
 */
export async function subscribeBusiness(planId: PlanId): Promise<{ ok: boolean }> {
  if (!PLAN_IDS.includes(planId)) throw new Error('Invalid plan')

  const business = await resolveCurrentBusiness()
  if (!business) throw new Error('No business found to subscribe')

  const supabase = await createClient()
  const { error } = await supabase.rpc('subscribe_business', {
    p_business_id: business.id,
    p_plan_id: planId,
  })
  if (error) throw new Error(error.message)

  return { ok: true }
}
