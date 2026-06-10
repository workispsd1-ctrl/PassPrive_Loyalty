'use client'
import { useState } from 'react'

export default function CustomerHomePage() {
  const [isDemoMode, setIsDemoMode] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background px-4 pt-6 pb-8 sm:px-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest">Welcome</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">Revoori Varun</h1>
            <p className="text-sm text-muted-foreground mt-2">Track your rewards and earn more</p>
          </div>
          <button
            type="button"
            aria-label="Profile"
            className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>

        {/* Unique Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Rewards */}
          <div className="rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 to-success/5 px-4 py-4 backdrop-blur-sm hover:border-success/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-success">
                  <path d="M20 12v10H4V12" />
                  <path d="M22 7H2v5h20V7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-success/60">↑</span>
            </div>
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground font-medium">Available</p>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-4 backdrop-blur-sm hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-primary">
                  <rect x="4" y="13" width="16" height="8" rx="1.5" />
                  <rect x="8" y="7" width="8" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-xs font-bold text-primary/60">○</span>
            </div>
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground font-medium">Active Stamps</p>
          </div>

          {/* Lifetime */}
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 px-4 py-4 backdrop-blur-sm hover:border-accent/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-accent">
                  <path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-accent/60">★</span>
            </div>
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground font-medium">Lifetime Visits</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 sm:px-6 space-y-6">
        {/* Featured Programs Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Featured Programs</h2>
            <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">View All →</button>
          </div>
          
          <div className="space-y-3">
            {/* Card 1 */}
            <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-blue-100">Coffee Shop</p>
                  <h3 className="text-xl font-bold mt-1">Scan & Earn</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M3 3h18v18H3z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-blue-100">Earn stamps with every purchase</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-100">Exclusive</p>
                  <h3 className="text-xl font-bold mt-1">Everything Free!</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M12 2L9 9H2L8 13L5 20L12 16L19 20L16 13L22 9H15L12 2Z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-emerald-100">Get rewards on your next visit</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-purple-100">Restaurant</p>
                  <h3 className="text-xl font-bold mt-1">Special Offers</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                    <path d="M6 9l6 6 6-6M12 3v12" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-purple-100">Limited time rewards available</p>
            </div>
          </div>
        </div>

        {/* Your Rewards Section */}
        <div className="pb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">Your Rewards</h2>
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-primary">
                <path d="M20 12v10H4V12" />
                <path d="M22 7H2v5h20V7z" />
              </svg>
            </div>
            <p className="text-foreground font-semibold">No rewards yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start scanning to earn rewards from your favorite places</p>
            <button className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all">
              Start Scanning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
