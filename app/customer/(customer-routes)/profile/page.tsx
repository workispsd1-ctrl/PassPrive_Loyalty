'use client'

export default function CustomerProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border px-4 py-5 sm:px-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your account</p>
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 sm:px-6">
        <div className="space-y-4 pb-10">
          {/* Profile Header */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">Revoori Varun</h3>
                <p className="text-sm text-muted-foreground mt-1">varun@example.com</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Member since 2024</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-primary/30 bg-card p-4 text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">Total Points</p>
            </div>
            <div className="rounded-xl border border-success/30 bg-card p-4 text-center">
              <p className="text-2xl font-bold text-success">0</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">Rewards</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-card p-4 text-center">
              <p className="text-2xl font-bold text-accent">0</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">Programs</p>
            </div>
          </div>

          {/* Profile Options */}
          <div className="space-y-2 pt-2">
            <button className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Edit Profile</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-muted-foreground">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Preferences</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-muted-foreground">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Help & Support</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-muted-foreground">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Share Referral Code</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-muted-foreground">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Logout</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-muted-foreground">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
