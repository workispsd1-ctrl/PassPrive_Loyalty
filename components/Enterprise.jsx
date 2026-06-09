import React from 'react'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-4 w-4',
}

const Enterprise = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 backdrop-blur-xl sm:p-10">
          {/* glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Enterprise
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                For larger brands with unlimited locations
              </h3>
              <p className="mt-2 text-muted-foreground">
                Custom pricing &amp; dedicated support, tailored to how your
                business scales.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href="tel:+910000000000"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-600"
              >
                <svg {...iconProps}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call xxxxxxxxxxxxx
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <svg {...iconProps}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Enterprise
