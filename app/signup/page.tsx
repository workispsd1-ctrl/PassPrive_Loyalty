'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<'customer' | 'business'>('business')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'customer') setUserType('customer')
    else if (type === 'business') setUserType('business')
  }, [searchParams])

  const handleGetOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length === 10) {
      // TODO: Call OTP API endpoint
      const phone = `+91 ${phoneNumber}`
      router.push(
        `/onboard/verify?phone=${encodeURIComponent(phone)}&type=${userType}`
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
          <div className="text-center mb-10">
            <div className="text-4xl mb-2">{userType === 'customer' ? '✨' : '🚀'}</div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {userType === 'customer' ? (
                <>Start earning <span className="text-primary">free rewards!</span></>
              ) : (
                <>Grow your business with <span className="text-primary">loyalty!</span></>
              )}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {userType === 'customer'
                ? 'Enter your number — sign in or join for free!'
                : "Enter your number — sign in or set up your loyalty program"}
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 p-1.5">
              <button
                onClick={() => setUserType('customer')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${userType === 'customer'
                    ? 'bg-primary text-primary-foreground border border-primary shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className="text-base">✨</span>
                Customer
              </button>
              <button
                onClick={() => setUserType('business')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${userType === 'business'
                    ? 'bg-card text-foreground border border-border shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className="text-base">🏢</span>
                Business
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleGetOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-muted-foreground font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-14 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                  maxLength={10}
                />
              </div>
              {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                <p className="mt-2 text-sm text-warning">
                  Please enter a valid 10-digit number
                </p>
              )}
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Get OTP
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
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Already registered? Just enter your number — we&apos;ll recognize you automatically.
            </p>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Trust banner */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by 500+ local businesses
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">4.9 ★</span>
            <span className="text-xs text-muted-foreground">Based on 200+ reviews</span>
          </div>
        </div>
      </div>
    </main>
  )
}
