'use client'

export default function CustomerRewardsPage() {
  const rewards = [
    {
      title: 'Free Coffee',
      store: 'Bloom Café',
      points: 10,
      color: 'from-blue-600/20 to-blue-600/5',
      borderColor: 'border-blue-600/30',
    },
    {
      title: 'Free Dessert',
      store: 'Sweet Treats',
      points: 15,
      color: 'from-pink-600/20 to-pink-600/5',
      borderColor: 'border-pink-600/30',
    },
    {
      title: 'Discount Meal',
      store: 'Urban Eats',
      points: 20,
      color: 'from-orange-600/20 to-orange-600/5',
      borderColor: 'border-orange-600/30',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-linear-to-r from-primary/10 to-primary/5 border-b border-border px-4 py-5 sm:px-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Rewards</h1>
            <p className="text-sm text-muted-foreground mt-1">Redeem your earned rewards</p>
          </div>
          <button
            type="button"
            aria-label="Profile"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 sm:px-6">
        <div className="space-y-3 pb-10">
          {rewards.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/50 p-8 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-12 w-12 text-primary/50 mx-auto mb-3">
                <path d="M20 12v10H4V12" />
              </svg>
              <p className="text-foreground font-semibold">No rewards yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start scanning to earn rewards</p>
            </div>
          ) : (
            rewards.map((reward) => (
              <div key={reward.title} className={`rounded-2xl border ${reward.borderColor} bg-linear-to-r ${reward.color} p-4 backdrop-blur-sm hover:border-opacity-100 transition-all`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{reward.store}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                        {reward.points} pts
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
