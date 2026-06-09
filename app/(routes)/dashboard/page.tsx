import React from 'react'

const stats = [
  { label: 'Total Members', value: '1,284', change: '+12%', up: true },
  { label: 'Repeat Visits', value: '38%', change: '+6%', up: true },
  { label: 'Rewards Redeemed', value: '342', change: '+21%', up: true },
  { label: 'Avg. Points / Member', value: '94', change: '-3%', up: false },
]

const activity = [
  { name: 'Sara M.', action: 'Earned 1 point', time: '2m ago', type: 'earn' },
  { name: 'Liam K.', action: 'Redeemed reward', time: '14m ago', type: 'redeem' },
  { name: 'Noah P.', action: 'Joined program', time: '1h ago', type: 'join' },
  { name: 'Aisha R.', action: 'Earned 1 point', time: '2h ago', type: 'earn' },
  { name: 'Carlos D.', action: 'Redeemed reward', time: '3h ago', type: 'redeem' },
  { name: 'Priya S.', action: 'Joined program', time: '5h ago', type: 'join' },
]

const topMembers = [
  { name: 'Sara M.', visits: 48, points: 312, tier: 'Gold' },
  { name: 'Liam K.', visits: 41, points: 278, tier: 'Gold' },
  { name: 'Priya S.', visits: 36, points: 241, tier: 'Silver' },
  { name: 'Noah P.', visits: 29, points: 198, tier: 'Silver' },
  { name: 'Aisha R.', visits: 22, points: 145, tier: 'Bronze' },
]

const metrics = [
  { label: 'Customer retention', value: 92 },
  { label: 'Repeat visit rate', value: 78 },
  { label: 'Reward redemption', value: 64 },
  { label: 'Member growth', value: 85 },
]

const tierColor: Record<string, string> = {
  Gold: 'text-yellow-400 bg-yellow-400/10',
  Silver: 'text-zinc-300 bg-zinc-300/10',
  Bronze: 'text-orange-400 bg-orange-400/10',
}

const actionColor: Record<string, string> = {
  earn: 'bg-primary/15 text-primary',
  redeem: 'bg-success/15 text-success',
  join: 'bg-accent text-accent-foreground',
}

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-border bg-card/40 px-6 backdrop-blur-xl">
        <div>
          <h1 className="text-base font-semibold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground">Bloom Café · This month</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">B</span>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Stat tiles */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{s.value}</p>
              <span className={`mt-1 inline-block text-xs font-semibold ${s.up ? 'text-primary' : 'text-destructive'}`}>
                {s.change} vs last month
              </span>
            </div>
          ))}
        </div>

        {/* Middle row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Performance</p>
                <p className="text-xs text-muted-foreground">First 90 days</p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">↑ Trending up</span>
            </div>
            <div className="mt-6 space-y-5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{m.label}</span>
                    <span className="font-semibold text-primary">{m.value}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full origin-left animate-grow-x rounded-full bg-linear-to-r from-primary-400 to-primary-600" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-foreground">Recent Activity</p>
            <p className="text-xs text-muted-foreground">Last 6 actions</p>
            <div className="mt-5 space-y-4">
              {activity.map((row) => (
                <div key={row.name + row.time} className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${actionColor[row.type]}`}>
                    {row.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.action}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top members table */}
        <div className="rounded-2xl border border-border bg-card backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Top Members</p>
              <p className="text-xs text-muted-foreground">Ranked by total visits</p>
            </div>
            <button className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/70">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Visits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Tier</th>
                </tr>
              </thead>
              <tbody>
                {topMembers.map((m, i) => (
                  <tr key={m.name} className={`transition-colors hover:bg-muted/40 ${i !== topMembers.length - 1 ? 'border-b border-border' : ''}`}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{m.name.charAt(0)}</span>
                        <span className="font-medium text-foreground">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">{m.visits}</td>
                    <td className="px-6 py-3.5 font-semibold text-foreground">{m.points}</td>
                    <td className="px-6 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tierColor[m.tier]}`}>{m.tier}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
