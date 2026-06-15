import Link from 'next/link'
import { getStampCards } from './actions'

export const dynamic = 'force-dynamic'

export default async function StampCardsPage() {
  const cards = await getStampCards()
  const publishedCount = cards.filter((c) => c.published).length

  return (
    <main className="flex flex-1 flex-col p-6">
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">My Stamp Cards</h2>
        <Link
          href="/stamp-cards/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground no-underline shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create New
        </Link>
      </div>

      {/* Instructions + status */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 backdrop-blur-xl">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Ready to test? Follow the instructions to publish your stamp card(s) to the app. If you&rsquo;re not
          quite ready to launch with customers yet, set the card to private (see advanced card settings).
        </p>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          {publishedCount} published
        </span>
      </div>

      {/* Cards */}
      {cards.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <circle cx="12" cy="12" r="3" />
              <path d="M6 9h.01M6 15h.01M18 9h.01M18 15h.01" />
            </svg>
          </span>
          <p className="mt-4 text-base font-semibold text-foreground">No stamp cards yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first stamp card to start rewarding your customers.
          </p>
          <Link
            href="/stamp-cards/create"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-600"
          >
            Create your first card
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                {/* QR thumbnail */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                  {card.qrImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.qrImageUrl} alt={`${card.name} QR`} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-2xl">{card.stampIcon ?? '☕'}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-foreground">{card.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{card.businessName ?? '—'}</p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      card.published
                        ? 'border border-success/30 bg-success/10 text-success'
                        : 'border border-border bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${card.published ? 'bg-success' : 'bg-muted-foreground'}`} />
                    {card.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                <div>
                  <p className="text-sm font-semibold text-foreground">{card.stampsRequired}</p>
                  <p className="text-[11px] text-muted-foreground">Stamps</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{card.rewardCount}</p>
                  <p className="text-[11px] text-muted-foreground">Reward{card.rewardCount === 1 ? '' : 's'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{card.locationCount}</p>
                  <p className="text-[11px] text-muted-foreground">Location{card.locationCount === 1 ? '' : 's'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
