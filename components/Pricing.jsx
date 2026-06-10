import React from 'react'

/* Placeholder pricing — will later be managed from the super admin. */
const plans = [
  {
    name: 'Starter',
    price: '999',
    tagline: 'For new businesses finding their regulars.',
    cta: 'Start free trial',
    featured: false,
    features: [
      '1 location',
      'Up to 500 members',
      'QR loyalty card',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '2,499',
    tagline: 'For growing businesses ready to scale loyalty.',
    cta: 'Start free trial',
    featured: true,
    features: [
      'Up to 3 locations',
      'Up to 5,000 members',
      'Custom rewards & tiers',
      'Advanced analytics',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '4,999',
    tagline: 'For established brands that want it all.',
    cta: 'Contact sales',
    featured: false,
    features: [
      'Unlimited locations',
      'Unlimited members',
      'API & integrations',
      'Dedicated account manager',
      'Custom branding',
    ],
  },
]

const Check = () => (
  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
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
)

const Pricing = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Pricing
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free for 3 days. No card required, cancel anytime. Pick a plan
            that grows with your business.
          </p>
        </div>

        {/* Plans */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{ animationDelay: `${i * 0.1}s` }}
              className={`relative flex animate-fade-up flex-col rounded-2xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'border-primary/60 bg-white/6 shadow-xl shadow-primary/15 lg:-mt-4 lg:mb-4'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  ₹{plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>

              <a
                href="/signup"
                className={`mt-6 w-full inline-flex justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-primary text-primary-foreground hover:bg-primary-600'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {plan.cta}
              </a>

              <div className="my-6 h-px w-full bg-border" />

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All plans include the QR loyalty card, member tracking, and unlimited
          rewards. Prices in INR, exclusive of GST.
        </p>
      </div>
    </section>
  )
}

export default Pricing
