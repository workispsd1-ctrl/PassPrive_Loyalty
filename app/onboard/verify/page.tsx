'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * UNIFIED OTP VERIFICATION — handles both Sign-In and Sign-Up
 *
 * After OTP entry, simulates a backend lookup:
 *   ─ Registered as business → /dashboard (skip onboarding)
 *   ─ Registered as customer → /customer/dashboard (skip onboarding)
 *   ─ New / unregistered    → continue onboarding flow based on `type` param
 *       • business → /onboard/welcome → /onboard/business → /onboard/success → /dashboard
 *       • customer → /customer/welcome → /customer/dashboard
 *
 * DEMO OTP codes (replace with real API in production):
 *   1111 = registered business user
 *   2222 = registered customer user
 *   any other 4-digit = new user → onboarding
 */

type CheckState = 'idle' | 'checking' | 'done'

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || '+91 9876543210'
  const userType = searchParams.get('type') || 'business'

  const [otp, setOtp] = useState(['', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(15)
  const [canResend, setCanResend] = useState(false)
  const [checkState, setCheckState] = useState<CheckState>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setStatusMsg('')
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpCode = otp.join('')
    if (otpCode.length !== 4) return

    setCheckState('checking')
    setStatusMsg('')

    // Simulate backend API call
    await new Promise((r) => setTimeout(r, 900))

    // --- Simulated registration check ---
    if (otpCode === '1111') {
      // Already registered as BUSINESS → skip onboarding, go to dashboard
      setStatusMsg('Welcome back! Taking you to your dashboard…')
      await new Promise((r) => setTimeout(r, 600))
      router.push(`/dashboard?phone=${encodeURIComponent(phone)}`)
    } else if (otpCode === '2222') {
      // Already registered as CUSTOMER → skip onboarding, go to customer home
      setStatusMsg('Welcome back! Taking you to your rewards…')
      await new Promise((r) => setTimeout(r, 600))
      router.push(`/customer/home?phone=${encodeURIComponent(phone)}`)
    } else {
      // NEW USER → continue with onboarding flow
      setStatusMsg('New account! Let\'s get you set up…')
      await new Promise((r) => setTimeout(r, 600))
      if (userType === 'customer') {
        router.push(`/customer/welcome?phone=${encodeURIComponent(phone)}`)
      } else {
        router.push(`/onboard/welcome?phone=${encodeURIComponent(phone)}&type=${userType}`)
      }
    }

    setCheckState('done')
  }

  const handleResend = () => {
    setOtp(['', '', '', ''])
    setTimeLeft(15)
    setCanResend(false)
    setCheckState('idle')
    setStatusMsg('')
    inputRefs.current[0]?.focus()
    // TODO: Call resend OTP API
  }

  const handleChangeNumber = () => {
    router.back()
  }

  const isComplete = otp.every((digit) => digit !== '')
  const isChecking = checkState === 'checking'

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
              {isChecking ? (
                <>
                  <div className="absolute inset-0 rounded-3xl border border-primary/20 animate-pulse" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <div className="relative w-16 h-16 rounded-2xl bg-muted/55 flex items-center justify-center">
                    <span className="text-2xl animate-bounce">⏳</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-3xl bg-primary/10 border border-primary/20 rotate-6 scale-95" />
                  <div className="absolute inset-0 rounded-3xl bg-primary/5 border border-primary/10 -rotate-6 scale-95" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                </>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text">
              {isChecking ? 'Checking…' : 'Verify your number'}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              We&apos;ve sent a 4-digit code to{' '}
              <span className="text-primary font-semibold tracking-wide">{phone}</span>
            </p>

            {/* Status message */}
            {statusMsg && (
              <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/30 px-5 py-4 text-sm font-semibold text-primary animate-fade-up shadow-lg shadow-primary/5 flex items-center justify-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {statusMsg}
              </div>
            )}

            {/* Demo hint */}
            {!isChecking && !statusMsg && (
              <div className="mt-6 rounded-2xl border border-border/80 bg-muted/20 backdrop-blur-md p-4 text-xs text-muted-foreground text-left space-y-2 max-w-md mx-auto">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-primary">💡</span> Demo Codes:
                </p>
                <div className="grid grid-cols-1 gap-1.5 pl-5">
                  <div>
                    <span className="font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">1111</span>
                    <span className="ml-2 text-muted-foreground">Registered Business user</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">2222</span>
                    <span className="ml-2 text-muted-foreground">Registered Customer user</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-foreground bg-muted border border-border px-1.5 py-0.5 rounded">Other</span>
                    <span className="ml-2 text-muted-foreground">New user onboarding flow</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OTP Input */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-foreground mb-6 text-center">
              Enter 4-digit code
            </label>
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={isChecking}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-bold bg-muted/50 border-2 border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  placeholder="•"
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || isChecking}
            className="w-full py-4 px-6 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-8"
          >
            {isChecking ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Checking…
              </>
            ) : (
              <>
                Verify &amp; Continue
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
              </>
            )}
          </button>

          {/* Resend Timer */}
          <div className="text-center mb-6">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-primary hover:text-primary-600 font-semibold transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2-8.83" />
                </svg>
                Resend code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Resend in {timeLeft}s
              </p>
            )}
          </div>

          {/* Change Number */}
          <button
            onClick={handleChangeNumber}
            className="w-full text-center py-2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Change number
          </button>
        </div>
      </div>
    </main>
  )
}
