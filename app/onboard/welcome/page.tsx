'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ''
  const userType = searchParams.get('type') || 'business'

  const [fullName, setFullName] = useState('')

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (fullName.trim()) {
      router.push(
        `/onboard/business?phone=${encodeURIComponent(phone)}&name=${encodeURIComponent(fullName)}&type=${userType}`
      )
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border">
        <div className="h-full w-1/3 bg-primary transition-all duration-500" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-border bg-card backdrop-blur-xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-4xl">👋</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Welcome aboard!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's start by getting to know you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Your Full Name
              </label>
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 h-5 w-5 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={!fullName.trim()}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Continue
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Powered by PassPrivé
          </p>
        </div>
      </div>
    </main>
  )
}
