'use client'
import { useState } from 'react'

export default function CustomerScanPage() {
  const [isScanning, setIsScanning] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border px-4 py-5 sm:px-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Scan</h1>
            <p className="text-sm text-muted-foreground mt-1">Tap to start scanning QR codes</p>
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`relative h-64 w-64 rounded-3xl border-4 flex items-center justify-center transition-all ${
            isScanning
              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/30'
              : 'border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10'
          }`}
        >
          <div className="text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`h-20 w-20 mx-auto mb-4 ${
              isScanning ? 'text-primary animate-pulse' : 'text-primary/50'
            }`}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
            </svg>
            <p className="text-lg font-bold text-foreground">
              {isScanning ? 'Scanning...' : 'Open Scanner'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Point camera at QR code</p>
          </div>
        </button>

        {/* Recent Scans */}
        <div className="mt-12 w-full max-w-md">
          <h3 className="text-sm font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
            <p className="text-muted-foreground">No scans yet</p>
          </div>
        </div>
      </div>
    </div>
  )
}
