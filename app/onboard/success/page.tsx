'use client'

import React from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border">
        <div className="h-full w-full bg-primary" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-border bg-card backdrop-blur-xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-block mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-primary animate-pulse-glow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            All set! 🎉
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your loyalty program is live and ready to go. Start by printing your QR code and placing it at your counter.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: '📱', label: 'Share QR Code' },
              { icon: '📊', label: 'View Analytics' },
              { icon: '🎁', label: 'Manage Rewards' },
              { icon: '👥', label: 'Track Members' },
            ].map((feature) => (
              <div
                key={feature.label}
                className="p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="text-sm font-semibold text-foreground">{feature.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex w-full justify-center py-4 px-6 bg-primary hover:bg-primary-600 text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
            >
              Go to Dashboard
              <svg
                className="h-5 w-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/print-qr"
              className="inline-flex w-full justify-center py-4 px-6 border-2 border-border bg-card hover:bg-muted text-foreground font-semibold rounded-2xl transition-all"
            >
              Print QR Code
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-10 text-xs text-muted-foreground">
            Powered by Druto Rewards
          </p>
        </div>
      </div>
    </main>
  )
}
