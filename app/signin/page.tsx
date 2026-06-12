'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignInPage() {
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
      const phone = `+91 ${phoneNumber}`
      router.push(
        `/onboard/verify?phone=${encodeURIComponent(phone)}&type=${userType}`
      )
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-transparent">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-border bg-card backdrop-blur-xl p-8 sm:p-12">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-primary/10 border border-primary/20 rotate-6 scale-95" />
              <div className="absolute inset-0 rounded-3xl bg-primary/5 border border-primary/10 -rotate-6 scale-95" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/20">
                {userType === 'customer' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01" />
                    <path d="M8 17h.01M12 17h.01M16 17h.01" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                    <path d="M12 13v4M9 15h6" />
                  </svg>
                )}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text">
              {userType === 'customer' ? (
                <>Welcome back!</>
              ) : (
                <>Sign in to your business!</>
              )}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              Enter your number — we&apos;ll handle the rest automatically.
            </p>
          </div>

          {/* Toggle */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 p-1.5">
              <button
                onClick={() => setUserType('customer')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  userType === 'customer'
                    ? 'bg-primary text-primary-foreground border border-primary shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>✨</span> Customer
              </button>
              <button
                onClick={() => setUserType('business')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  userType === 'business'
                    ? 'bg-primary text-primary-foreground border border-primary shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>🏢</span> Business
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
                <span className="absolute left-4 text-muted-foreground font-medium">+91</span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  className="w-full pl-14 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                  maxLength={10}
                  autoFocus
                />
              </div>
              {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                <p className="mt-2 text-sm text-orange-400">
                  Please enter a valid 10-digit number
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Get OTP
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already registered? Just enter your number — we&apos;ll sign you in automatically.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Trust banner */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Trusted by 500+ local businesses</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">4.9 ★</span>
            <span className="text-xs text-muted-foreground">Based on 200+ reviews</span>
          </div>
        </div>
      </div>
    </main>
  )
}
