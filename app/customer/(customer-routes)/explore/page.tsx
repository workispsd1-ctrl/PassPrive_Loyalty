'use client'

export default function CustomerExplorePage() {
  const businesses = [
    {
      name: 'Bloom Café',
      category: 'Coffee Shop',
      stamps: 4,
      color: 'from-blue-600 to-blue-700',
      icon: '☕',
    },
    {
      name: 'Urban Eats',
      category: 'Restaurant',
      stamps: 6,
      color: 'from-orange-600 to-orange-700',
      icon: '🍽️',
    },
    {
      name: 'Wellness Zone',
      category: 'Gym',
      stamps: 3,
      color: 'from-emerald-600 to-emerald-700',
      icon: '💪',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border px-4 py-5 sm:px-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Explore</h1>
            <p className="text-sm text-muted-foreground mt-1">Discover new loyalty programs</p>
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
        <div className="space-y-3">
          {businesses.map((business) => (
            <div key={business.name} className={`rounded-2xl bg-gradient-to-r ${business.color} p-6 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02]`}>
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{business.icon}</div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">⭐</svg>
                  {business.stamps} stamps
                </span>
              </div>
              <h3 className="text-xl font-bold">{business.name}</h3>
              <p className="text-sm text-white/80 mt-1">{business.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
