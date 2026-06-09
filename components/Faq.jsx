import React from 'react'

/* Hardcoded for now — will later be managed from the super admin. */
const faqs = [
  {
    q: 'How long does it take to set up?',
    a: 'Most businesses are live in under two minutes. Create your program, customise your rewards, print your QR code, and you’re ready to start rewarding customers.',
  },
  {
    q: 'Do my customers need to download an app?',
    a: 'No. Customers simply scan your QR code and everything opens in their browser — no app store, no downloads, no passwords.',
  },
  {
    q: 'What kinds of businesses can use Druto?',
    a: 'Any business with repeat customers — cafés, salons, gyms, restaurants, retail and more. If people come back, Druto helps them come back more often.',
  },
  {
    q: 'How do customers earn and redeem rewards?',
    a: 'Each scan at your counter adds points or stamps automatically. Once they hit a reward, customers redeem it right from their phone by showing the screen to your staff.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — every plan starts with a 3-day free trial. No card required, and you can cancel anytime before it ends.',
  },
  {
    q: 'Can I change or cancel my plan later?',
    a: 'Absolutely. You can upgrade, downgrade, or cancel whenever you like from your dashboard. Changes take effect on your next billing cycle.',
  },
]

const Faq = () => {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Druto
          </p>
        </div>

        {/* Questions */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-border bg-card px-5 py-4 backdrop-blur-xl transition-colors open:border-primary/40 hover:border-primary/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-foreground">{faq.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
