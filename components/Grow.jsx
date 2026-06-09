import React from 'react'

const steps = [
  {
    title: 'Launch in minutes',
    text: 'Spin up your program and print your QR code. No setup fees, no contracts, no hardware.',
  },
  {
    title: 'Engage every visit',
    text: 'Customers earn points and stamps automatically each time they scan at your counter.',
  },
  {
    title: 'Grow on autopilot',
    text: 'Watch retention climb as one-time visitors quietly turn into your most loyal regulars.',
  },
]

const metrics = [
  { label: 'Customer retention', value: 92 },
  { label: 'Repeat visit rate', value: 78 },
  { label: 'Reward redemption', value: 64 },
  { label: 'Member growth', value: 85 },
]

const Grow = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built to scale with you
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to grow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From the first scan to a counter full of regulars — PassPrivé does the
            heavy lifting so you can focus on your craft.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left — growth steps */}
          <ol className="relative space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <span className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-border" />
                )}
                <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right — progress metrics card */}
          <div className="rounded-2xl border border-border bg-card p-7 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Average results
                </p>
                <p className="text-xs text-muted-foreground">First 90 days</p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                ↑ Trending up
              </span>
            </div>

            <div className="mt-7 space-y-6">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{m.label}</span>
                    <span className="font-semibold text-primary">{m.value}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full origin-left animate-grow-x rounded-full bg-linear-to-r from-primary-400 to-primary-600"
                      style={{ width: `${m.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Grow
