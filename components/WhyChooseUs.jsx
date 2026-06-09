import React from 'react'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-6 w-6',
}

const benefits = [
  {
    title: 'Live before your coffee cools',
    text: 'Build your program, print one QR code, and start rewarding customers in under two minutes.',
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Zero friction to join',
    text: 'Customers scan once and they’re in — no app store, no downloads, no passwords to forget.',
    icon: (
      <svg {...iconProps}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
  {
    title: 'Know your regulars',
    text: 'See who visits, how often, and what they love — then turn that into smarter decisions.',
    icon: (
      <svg {...iconProps}>
        <path d="m22 7-8.5 8.5-5-5L2 17" />
        <path d="M16 7h6v6" />
      </svg>
    ),
  },
  {
    title: 'Rewards on autopilot',
    text: 'Points, stamps, and perks track themselves. You just watch your regulars keep coming back.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 11 5 12 8c1-3 3-5 4.5-5a2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
  },
  {
    title: 'Made for any counter',
    text: 'Cafés, salons, gyms, restaurants — if people come back, PassPrivé fits right in.',
    icon: (
      <svg {...iconProps}>
        <path d="M3 9 4 4h16l1 5" />
        <path d="M4 9v11h16V9" />
        <path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
  },
  {
    title: 'Pays for itself',
    text: 'One extra visit a month covers your plan. Every loyal customer after that is pure growth.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.3a2.6 2.6 0 0 0-2.5-1.6c-1.5 0-2.5.8-2.5 2 0 2.6 5 1.6 5 4.1 0 1.2-1 2-2.5 2a2.6 2.6 0 0 1-2.5-1.6" />
        <path d="M12 6.3v11.4" />
      </svg>
    ),
  },
]

const WhyChooseUs = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Why owners stick with us
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Less effort. More regulars.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to turn one-time visits into lifelong customers —
            without the busywork.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group animate-fade-up rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {b.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
