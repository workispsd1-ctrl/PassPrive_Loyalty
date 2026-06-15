import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { BUSINESS_COOKIE } from '@/app/onboard/session'

export type CurrentBusiness = {
  id: string
  name: string
  isDemo: boolean
  planId: string | null
  locationLimit: number | null
  subscribed: boolean
}

const SELECT = 'id, name, is_demo, plan_id, location_limit, subscribed_at'

/**
 * Resolves which business the current request belongs to:
 *   1. authenticated owner   → their business (real auth, once MSG91 is live)
 *   2. test-session cookie    → the business they signed in / registered with
 *   3. fallback               → the seeded demo business
 *
 * Shared by the dashboard, the paywall layout, and the subscribe action so they
 * always agree on "the current business".
 */
export async function resolveCurrentBusiness(): Promise<CurrentBusiness | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const cookieStore = await cookies()
  const cookieId = cookieStore.get(BUSINESS_COOKIE)?.value

  type Row = {
    id: string
    name: string
    is_demo: boolean
    plan_id: string | null
    location_limit: number | null
    subscribed_at: string | null
  }
  let row: Row | null = null

  if (user) {
    row = (await supabase.from('businesses').select(SELECT).eq('owner_id', user.id).limit(1).maybeSingle()).data
  }
  if (!row && cookieId) {
    row = (await supabase.from('businesses').select(SELECT).eq('id', cookieId).maybeSingle()).data
  }
  if (!row) {
    row = (await supabase.from('businesses').select(SELECT).eq('is_demo', true).limit(1).maybeSingle()).data
  }
  if (!row) return null

  return {
    id: row.id,
    name: row.name,
    isDemo: row.is_demo,
    planId: row.plan_id,
    locationLimit: row.location_limit,
    subscribed: row.subscribed_at != null,
  }
}
