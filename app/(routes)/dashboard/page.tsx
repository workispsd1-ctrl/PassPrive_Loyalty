'use client'
import { useState, type CSSProperties } from 'react'

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Stamps this year',       value: '5,320', Icon: StampIcon        },
  { label: 'Redemptions this year',  value: '450',   Icon: RedemptionIcon   },
  { label: 'Joined this year',       value: '535',   Icon: JoinedIcon       },
  { label: 'Total members',          value: '4,300', Icon: TotalMembersIcon },
]

const CHART_MAX = 4
const chartData = [
  { month: 'Jan', stamps: 0,   redemptions: 0   },
  { month: 'Feb', stamps: 2,   redemptions: 1   },
  { month: 'Mar', stamps: 0,   redemptions: 0   },
  { month: 'Apr', stamps: 0,   redemptions: 0   },
  { month: 'May', stamps: 4,   redemptions: 2   },
  { month: 'Jun', stamps: 0,   redemptions: 0   },
  { month: 'Jul', stamps: 3,   redemptions: 1.5 },
  { month: 'Aug', stamps: 0,   redemptions: 0   },
  { month: 'Sep', stamps: 0,   redemptions: 0   },
  { month: 'Oct', stamps: 0,   redemptions: 0   },
  { month: 'Nov', stamps: 0,   redemptions: 0   },
  { month: 'Dec', stamps: 0,   redemptions: 0   },
]

const members = [
  { firstName: 'Harvey',  lastName: 'Cook',     email: '—', phone: '+1823190325',  stampDate: '2023-05-12 09:40:31', stampType: '—', location: 'Garden Cafe - Angel Way'   },
  { firstName: 'Toby',    lastName: 'Anderson', email: '—', phone: '+1802839392',  stampDate: '2023-05-12 10:01:31', stampType: '—', location: 'Garden Cafe - Sun Street' },
  { firstName: 'Sarah',   lastName: 'Staddon',  email: '—', phone: '+18005682031', stampDate: '2023-05-12 11:49:51', stampType: '—', location: 'Garden Cafe - Angel Way'   },
  { firstName: 'Lin',     lastName: 'Chi',      email: '—', phone: '+18110210998', stampDate: '2023-07-12 14:33:34', stampType: '—', location: 'Garden Cafe - Sun Street' },
  { firstName: 'Linda',   lastName: 'Fuertes',  email: '—', phone: '+18840201025', stampDate: '2023-07-11 08:49:31', stampType: '—', location: 'Garden Cafe - Sun Street' },
  { firstName: 'Dave',    lastName: 'Carlos',   email: '—', phone: '+19275362456', stampDate: '2023-05-11 08:55:49', stampType: '—', location: 'Garden Cafe - Sun Street' },
  { firstName: 'Carly',   lastName: 'Marks',    email: '—', phone: '+19267460908', stampDate: '2023-07-11 10:03:27', stampType: '—', location: 'Garden Cafe - Angel Way'   },
  { firstName: 'Joe',     lastName: 'Pastore',  email: '—', phone: '+1927123563',  stampDate: '2023-07-11 11:15:26', stampType: '—', location: 'Garden Cafe - Angel Way'   },
  { firstName: 'Latisha', lastName: 'Perez',    email: '—', phone: '+1625364583',  stampDate: '2023-02-11 14:49:48', stampType: '—', location: 'Angel Way'                 },
  { firstName: 'Karen',   lastName: 'Smith',    email: '—', phone: '+1902030157',  stampDate: '2023-02-11 15:17:13', stampType: '—', location: 'Garden Cafe - Sun Street' },
]

const TABLE_COLS = ['First Name', 'Last Name', 'Email', 'Phone', 'Stamp Date', 'Stamp Type', 'Location']
const CHART_H = 160

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tab, setTab] = useState<'stamps' | 'redemptions'>('stamps')
  const [search, setSearch] = useState('')

  const filtered = members.filter(m =>
    search === '' ||
    `${m.firstName} ${m.lastName} ${m.email} ${m.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

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

        {/* Demo banner */}
        <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-accent px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Demo View
          </span>
          <p className="text-sm text-muted-foreground">
            Create &amp; publish a Stamp Card first to unlock this area with your real data and functionality. Data shown is an example.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {(['All Locations', 'All Stamp Cards', 'This Year'] as const).map(label => (
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
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-center gap-3 bg-card px-4 py-4 backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-5">
              <Icon />
              <div>
                <p className="text-xl font-bold text-foreground sm:text-2xl">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity chart */}
        <div className="rounded-2xl border border-border bg-card p-4 backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Member activity this year</h2>
            <button type="button" aria-label="Chart options" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <line x1="3"  y1="6"  x2="21" y2="6"  />
                <line x1="3"  y1="12" x2="21" y2="12" />
                <line x1="3"  y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex border-b border-border">
            {(['stamps', 'redemptions'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={[
                  'px-6 py-2.5 text-sm font-medium capitalize transition-colors',
                  tab === t
                    ? '-mb-px border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Bar chart */}
          <div className="mt-6 flex gap-2">
            {/* Y-axis labels */}
            <div className="flex w-7 shrink-0 flex-col-reverse justify-between pb-5">
              {[0, 1, 2, 3, 4].map(v => (
                <span key={v} className="text-right text-[10px] leading-none text-muted-foreground">
                  {v}.0
                </span>
              ))}
            </div>

            {/* Chart area */}
            <div className="relative min-w-0 flex-1">
              {/* Horizontal grid lines */}
              <div className="pointer-events-none absolute inset-0 bottom-5 flex flex-col-reverse justify-between">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full border-t border-border/30" />
                ))}
              </div>

              {/* Bars + month labels — CHART_H=160 so container is h-[180px] */}
              <div className="flex h-45 items-end gap-px">
                {chartData.map(d => {
                  const val = tab === 'stamps' ? d.stamps : d.redemptions
                  const barH = (val / CHART_MAX) * CHART_H
                  return (
                    <div key={d.month} className="flex flex-1 flex-col items-center">
                      <div className="flex h-40 w-full items-end justify-center">
                        <div
                          className={[
                            'h-(--bh) w-3/4 max-w-10 rounded-t bg-primary-300/80 transition-all duration-500',
                            barH > 0 ? 'opacity-100' : 'opacity-15',
                          ].join(' ')}
                          style={{ '--bh': barH > 0 ? `${barH}px` : '2px' } as CSSProperties}
                        />
                      </div>
                      <span className="mt-1.5 text-[9px] leading-none text-muted-foreground">{d.month}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Search + Members table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-xl">

          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm sm:flex-1">
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email or phone number"
                className="w-full rounded-lg border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <button type="button" aria-label="Download" className="rounded p-1.5 transition-colors hover:bg-muted hover:text-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button type="button" aria-label="More options" className="rounded p-1.5 transition-colors hover:bg-muted hover:text-foreground">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <circle cx="12" cy="5"  r="1.2" />
                  <circle cx="12" cy="12" r="1.2" />
                  <circle cx="12" cy="19" r="1.2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-10 px-4 py-3" aria-label="Select all">
                    <input type="checkbox" aria-label="Select all rows" className="accent-primary" />
                  </th>
                  {TABLE_COLS.map(col => (
                    <th key={col} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        {col}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 opacity-40">
                          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                        </svg>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr
                    key={i}
                    className={`transition-colors hover:bg-muted/30 ${i !== filtered.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" aria-label={`Select ${m.firstName} ${m.lastName}`} className="accent-primary" />
                    </td>
                    <td className="px-3 py-3 text-foreground">{m.firstName}</td>
                    <td className="px-3 py-3 text-foreground">{m.lastName}</td>
                    <td className="px-3 py-3 text-muted-foreground">{m.email}</td>
                    <td className="px-3 py-3 text-muted-foreground">{m.phone}</td>
                    <td className="px-3 py-3 text-muted-foreground">{m.stampDate}</td>
                    <td className="px-3 py-3 text-muted-foreground">{m.stampType}</td>
                    <td className="px-3 py-3 text-muted-foreground">{m.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground sm:gap-6">
            <div className="flex items-center gap-2">
              <span>Jump to page:</span>
              <input
                type="number"
                defaultValue={1}
                min={1}
                aria-label="Page number"
                className="w-14 rounded border border-border bg-muted px-2 py-1 text-center text-foreground focus:border-primary/50 focus:outline-none"
              />
              <span>of 1</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select aria-label="Rows per page" className="rounded border border-border bg-muted px-2 py-1 text-foreground focus:outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span>Showing 1/1 of {filtered.length}</span>
              <div className="flex gap-1">
                <button type="button" disabled className="rounded border border-border px-2 py-1 opacity-40">&#8249;</button>
                <button type="button" disabled className="rounded border border-border px-2 py-1 opacity-40">&#8250;</button>
              </div>
            </div>
          </div>

          {/* UTC note */}
          <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
            All times/dates{' '}
            <button type="button" className="text-primary underline hover:no-underline">
              displayed in UTC
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
