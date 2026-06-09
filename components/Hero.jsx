import React from 'react'

const page = () => {
  return (
    <main className="relative flex-1">
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built for small business owners
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Launch a loyalty program{' '}
            <span className="text-primary">in minutes</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Put one QR code on your counter and start rewarding regulars today.
            No app to build, no hardware to buy — just more repeat business.
          </p>

          {/* Feature checks */}
          <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2 lg:mx-0">
            {[
              'Set up in under 2 minutes',
              'Works for any business',
              'Customers just scan — no app',
              'See who keeps coming back',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 6.5l2.5 2.5 4.5-5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-9 w-full max-w-md sm:w-fit sm:max-w-none lg:mx-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="w-full rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-600 sm:w-auto">
                Start Free Trial
              </button>
              <button className="w-full rounded-md border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto">
                I&apos;m a customer
              </button>
            </div>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Already have a business?{' '}
              <a
                href="#"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Sign In
              </a>
            </p>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              3-day free trial • No payment required • Cancel anytime
            </p>
          </div>
        </div>

        {/* Right — business dashboard preview */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Bloom Café
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                Live
              </span>
            </div>

            {/* Stat tiles */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted p-4">
                <p className="text-2xl font-bold text-foreground">1,284</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <p className="text-2xl font-bold text-primary">+38%</p>
                <p className="text-xs text-muted-foreground">Repeat visits</p>
              </div>
            </div>

            {/* Activity */}
            <div className="mt-5 space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                Recent activity
              </p>
              {[
                { name: 'Sara M.', action: 'Earned 1 point', time: '2m' },
                { name: 'Liam K.', action: 'Redeemed reward', time: '14m' },
                { name: 'Noah P.', action: 'Joined program', time: '1h' },
              ].map((row) => (
                <div key={row.name} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {row.name.charAt(0)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {row.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating QR chip */}
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card p-3 shadow-lg sm:block">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-xs ${
                    [0, 2, 4, 6, 8].includes(i) ? 'bg-foreground' : 'bg-primary'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    
    </main>
  )
}

export default page
