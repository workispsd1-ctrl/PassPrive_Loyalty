import { getDashboardData } from './_data'
import ActivityChart from './_components/ActivityChart'
import MembersTable from './_components/MembersTable'

// Always render fresh data (dashboards should not be statically cached).
export const dynamic = 'force-dynamic'

// ─── Stat icons ───────────────────────────────────────────────────────────────

const StampIcon = () => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="4" y="13" width="16" height="8" rx="1.5" />
      <rect x="8" y="7" width="8" height="7" rx="1" />
      <line x1="3" y1="21" x2="21" y2="21" strokeWidth={2} />
    </svg>
  </div>
)

const RedemptionIcon = () => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M20 12v10H4V12" />
      <path d="M22 7H2v5h20V7z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      <path d="M9 14l1.5 1.5L14 12" />
    </svg>
  </div>
)

const JoinedIcon = () => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  </div>
)

const TotalMembersIcon = () => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-800/25 text-primary-300">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const { stats, monthly, members, isDemo } = await getDashboardData()

  const statCards = [
    { label: 'Stamps this year', value: stats.stampsThisYear, Icon: StampIcon },
    { label: 'Redemptions this year', value: stats.redemptionsThisYear, Icon: RedemptionIcon },
    { label: 'Joined this year', value: stats.joinedThisYear, Icon: JoinedIcon },
    { label: 'Total members', value: stats.totalMembers, Icon: TotalMembersIcon },
  ]

  return (
    <div className="flex flex-col overflow-auto">
      {/* Page header */}
      <div className="flex items-start justify-between px-4 pt-5 pb-4 sm:px-6 sm:pt-8 sm:pb-5 md:px-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dashboard</h1>
        <button
          type="button"
          aria-label="Profile"
          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-6 sm:gap-5 sm:px-6 sm:pb-8 md:px-8">
        {/* Demo banner — only when viewing the seeded demo business */}
        {isDemo && (
          <div className="flex flex-col gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-indigo-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Demo View
            </span>
            <p className="text-sm text-muted-foreground">
              You&rsquo;re viewing example data from a demo business. Sign in and publish a Stamp Card to see your own
              real data here.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {(['All Locations', 'All Stamp Cards', 'This Year'] as const).map((label) => (
            <select
              key={label}
              aria-label={label}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
            >
              <option>{label}</option>
            </select>
          ))}
        </div>

        {/* Stat cards — gap-px + bg-border creates thin dividers */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {statCards.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center gap-3 bg-card px-4 py-4 backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-5">
              <Icon />
              <div>
                <p className="text-xl font-bold text-foreground sm:text-2xl">{value.toLocaleString()}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity chart (client — has tab state) */}
        <ActivityChart data={monthly} />

        {/* Search + Members table (client — has search state) */}
        <MembersTable members={members} />
      </div>
    </div>
  )
}
