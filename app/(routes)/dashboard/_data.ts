import { createClient } from '@/lib/supabase/server'

export type DashboardStats = {
  stampsThisYear: number
  redemptionsThisYear: number
  joinedThisYear: number
  totalMembers: number
}

export type MonthlyPoint = { month: number; stamps: number; redemptions: number }

export type MemberRow = {
  firstName: string
  lastName: string
  email: string
  phone: string
  stampDate: string
  stampType: string
  location: string
}

export type DashboardData = {
  businessName: string | null
  isDemo: boolean
  year: number
  stats: DashboardStats
  monthly: MonthlyPoint[]
  members: MemberRow[]
}

const EMPTY_STATS: DashboardStats = {
  stampsThisYear: 0,
  redemptionsThisYear: 0,
  joinedThisYear: 0,
  totalMembers: 0,
}

const EMPTY_MONTHLY: MonthlyPoint[] = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  stamps: 0,
  redemptions: 0,
}))

/** Format an ISO timestamp as `YYYY-MM-DD HH:mm:ss` in UTC. */
function formatUtc(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
    `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`
  )
}

/**
 * Loads the dashboard for the current business.
 *
 * When a business owner is authenticated we show their business; otherwise we
 * fall back to the seeded demo business (readable via RLS). Once phone-OTP auth
 * is wired, the demo fallback can be dropped and this keeps working unchanged.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()
  const year = new Date().getUTCFullYear()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Resolve which business to show.
  const businessQuery = supabase.from('businesses').select('id, name, is_demo').limit(1)
  const { data: business } = user
    ? await businessQuery.eq('owner_id', user.id).maybeSingle()
    : await businessQuery.eq('is_demo', true).maybeSingle()

  if (!business) {
    // Authenticated owner who hasn't created a business yet.
    return {
      businessName: null,
      isDemo: false,
      year,
      stats: EMPTY_STATS,
      monthly: EMPTY_MONTHLY,
      members: [],
    }
  }

  const [statsRes, monthlyRes, membersRes] = await Promise.all([
    supabase.rpc('get_dashboard_stats', { p_business_id: business.id }).maybeSingle(),
    supabase.rpc('get_dashboard_monthly', { p_business_id: business.id, p_year: year }),
    supabase
      .from('stamp_events')
      .select(
        'created_at, event_type, member:members(first_name, last_name, email, phone), location:card_locations(business_name)',
      )
      .eq('business_id', business.id)
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  const stats: DashboardStats = statsRes.data
    ? {
        stampsThisYear: Number(statsRes.data.stamps_this_year ?? 0),
        redemptionsThisYear: Number(statsRes.data.redemptions_this_year ?? 0),
        joinedThisYear: Number(statsRes.data.joined_this_year ?? 0),
        totalMembers: Number(statsRes.data.total_members ?? 0),
      }
    : EMPTY_STATS

  const monthly: MonthlyPoint[] = (monthlyRes.data ?? EMPTY_MONTHLY).map((m) => ({
    month: Number(m.month),
    stamps: Number(m.stamps),
    redemptions: Number(m.redemptions),
  }))

  const STAMP_TYPE_LABEL: Record<string, string> = {
    join: 'Joined',
    stamp: 'Stamp',
    redeem: 'Redemption',
  }

  const members: MemberRow[] = (membersRes.data ?? []).map((e) => ({
    firstName: e.member?.first_name ?? '—',
    lastName: e.member?.last_name ?? '—',
    email: e.member?.email ?? '—',
    phone: e.member?.phone ?? '—',
    stampDate: formatUtc(e.created_at),
    stampType: STAMP_TYPE_LABEL[e.event_type] ?? e.event_type,
    location: e.location?.business_name ?? '—',
  }))

  return {
    businessName: business.name,
    isDemo: business.is_demo,
    year,
    stats,
    monthly,
    members,
  }
}
