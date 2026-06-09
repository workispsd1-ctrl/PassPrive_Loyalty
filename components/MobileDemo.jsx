import React from 'react'

/* ── Real QR-style code: finder patterns, timing rows, data modules ── */
const QrCode = ({ className = '' }) => {
  const SIZE = 21 // version-1 QR grid
  const finders = [
    [0, 0],
    [0, SIZE - 7],
    [SIZE - 7, 0],
  ]

  const moduleState = (r, c) => {
    for (const [r0, c0] of finders) {
      if (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7) {
        const dr = r - r0
        const dc = c - c0
        const ring = dr === 0 || dr === 6 || dc === 0 || dc === 6
        const center = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
        return ring || center ? 'dark' : 'light'
      }
    }
    for (const [r0, c0] of finders) {
      if (r >= r0 - 1 && r <= r0 + 7 && c >= c0 - 1 && c <= c0 + 7) return 'light'
    }
    if (r === 6 || c === 6) return (r === 6 ? c : r) % 2 === 0 ? 'dark' : 'light'
    return ((r * 5 + c * 3 + r * c * 7 + ((r ^ c) * 11)) % 7) < 3 ? 'dark' : 'light'
  }

  const cells = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (moduleState(r, c) === 'dark') cells.push({ r, c })
    }
  }

  return (
    <svg viewBox="-2 -2 25 25" shapeRendering="crispEdges" className={className}>
      <rect x="-2" y="-2" width="25" height="25" rx="1" fill="#ffffff" />
      {cells.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0a0a0d" />
      ))}
    </svg>
  )
}

/* Reusable phone frame at a realistic mobile aspect ratio (~9:19.5) */
const Phone = ({ children, className = '' }) => (
  <div
    className={`relative w-80 shrink-0 rounded-[3rem] border border-border bg-[#18181b] p-3 shadow-2xl shadow-black/60 ${className}`}
  >
    {/* Notch */}
    <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[#18181b]" />
    {/* Screen */}
    <div className="flex aspect-9/19.5 flex-col overflow-hidden rounded-[2.25rem] bg-background">
      {children}
    </div>
  </div>
)

const StatusBar = ({ light = false }) => (
  <div
    className={`flex items-center justify-between px-6 pt-3 text-[11px] font-semibold ${
      light ? 'text-primary-foreground' : 'text-foreground'
    }`}
  >
    <span>9:41</span>
    <span className="flex items-center gap-1">
      <span className="h-2.5 w-2.5 rounded-xs bg-current opacity-70" />
      <span className="h-2.5 w-2.5 rounded-full bg-current opacity-70" />
      <span className="h-2.5 w-4 rounded-[3px] bg-current opacity-70" />
    </span>
  </div>
)

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const BottomNav = () => (
  <div className="mt-auto flex items-end justify-between border-t border-border px-8 py-3">
    {/* Home */}
    <svg {...iconProps} className="h-6 w-6 text-primary">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
    {/* QR scanner — raised primary button */}
    <div className="-mt-6 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40">
      <svg {...iconProps} className="h-6 w-6">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10" />
      </svg>
    </div>
    {/* Rewards */}
    <svg {...iconProps} className="h-6 w-6 text-muted-foreground">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 11 5 12 8c1-3 3-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  </div>
)

/* Floating glass card that drifts gently around the hero phone */
const FloatCard = ({ className = '', delay = 0, children }) => (
  <div
    className={`absolute z-20 hidden animate-float rounded-2xl border border-border bg-card p-3 shadow-xl shadow-black/40 backdrop-blur-xl md:block ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
)

const MobileDemo = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Right on their phone
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The whole experience lives in a tap
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Customers scan, collect stamps, and claim rewards — all from the
            browser on their phone. No app download, ever.
          </p>
        </div>

        {/* Hero phone with floating UI cards */}
        <div className="relative mx-auto mt-16 flex max-w-3xl justify-center sm:mt-20">
          {/* glow behind the phone */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          {/* ── Floating card: points earned ── */}
          <FloatCard className="left-0 top-16 lg:left-8" delay={0}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary">
                <svg {...iconProps} className="h-5 w-5">
                  <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16.5 7.1 18.2l1-5.5-4-3.9 5.5-.8z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">+1 point earned</p>
                <p className="text-[10px] text-muted-foreground">Sara · just now</p>
              </div>
            </div>
          </FloatCard>

          {/* ── Floating card: reward unlocked ── */}
          <FloatCard className="right-0 top-8 lg:right-6" delay={1}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <svg {...iconProps} className="h-5 w-5">
                  <rect x="3" y="8" width="18" height="4" rx="1" />
                  <path d="M12 8v13" />
                  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 11 5 12 8c1-3 3-5 4.5-5a2.5 2.5 0 0 1 0 5" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">Reward unlocked</p>
                <p className="text-[10px] text-muted-foreground">Free coffee ready</p>
              </div>
            </div>
          </FloatCard>

          {/* ── Floating card: stamp progress ── */}
          <FloatCard className="bottom-28 left-0 lg:left-2" delay={1.6}>
            <p className="text-[10px] font-semibold text-foreground">Stamp card</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-lg font-bold text-primary">8/10</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          </FloatCard>

          {/* ── Floating card: repeat-visit stat ── */}
          <FloatCard className="right-0 bottom-20 lg:right-2" delay={0.6}>
            <p className="text-2xl font-bold text-primary">+38%</p>
            <p className="text-[10px] text-muted-foreground">repeat visits</p>
          </FloatCard>

          {/* ── The hero phone ── */}
          <div className="relative z-10 animate-fade-up">
            <div className="animate-float">
            <Phone>
              {/* Header with KPIs */}
              <div className="bg-linear-to-br from-primary-400 to-primary-600 px-5 pb-6 text-primary-foreground">
                <StatusBar light />
                <div className="mt-4 flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 font-bold backdrop-blur">
                    B
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-tight">Bloom Café</p>
                    <p className="text-[11px] opacity-90">Gold member</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { value: '120', label: 'Points' },
                    { value: '8', label: 'Visits' },
                    { value: '3', label: 'Rewards' },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl bg-white/15 px-2 py-2.5 text-center backdrop-blur"
                    >
                      <p className="text-lg font-bold leading-none">{kpi.value}</p>
                      <p className="mt-1 text-[10px] opacity-90">{kpi.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR card */}
              <div className="px-5 pt-4">
                <div className="rounded-2xl border border-border bg-muted p-4">
                  <QrCode className="mx-auto h-28 w-28" />
                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    Scan at checkout to earn points
                  </p>
                </div>
              </div>

              {/* Progress + activity */}
              <div className="flex-1 space-y-4 px-5 pt-5">
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-foreground">Next reward</span>
                    <span className="text-muted-foreground">2 visits to go</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-4/5 origin-left animate-grow-x rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">
                    Recent activity
                  </p>
                  <div className="mt-2 space-y-2">
                    {[
                      { label: 'Earned 1 point', time: 'Today' },
                      { label: 'Redeemed free coffee', time: 'Mon' },
                    ].map((a) => (
                      <div
                        key={a.label}
                        className="flex items-center justify-between rounded-xl bg-muted px-3 py-2"
                      >
                        <span className="text-[11px] font-medium text-foreground">
                          {a.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {a.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <BottomNav />
            </Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileDemo
