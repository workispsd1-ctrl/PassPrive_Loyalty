'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { icon: '☕', label: 'Café', value: 'cafe' },
  { icon: '🍽️', label: 'Restaurant', value: 'restaurant' },
  { icon: '🥐', label: 'Bakery', value: 'bakery' },
  { icon: '🍺', label: 'Bar', value: 'bar' },
  { icon: '🍦', label: 'Ice Cream', value: 'ice-cream' },
  { icon: '💇', label: 'Salon & Spa', value: 'salon-spa' },
  { icon: '🏋️', label: 'Gym & Fitness', value: 'gym' },
  { icon: '🚗', label: 'Car Wash', value: 'car-wash' },
  { icon: '💎', label: 'Jewelry', value: 'jewelry' },
  { icon: '🐾', label: 'Pet Store', value: 'pet-store' },
  { icon: '📚', label: 'Bookstore', value: 'bookstore' },
  { icon: '👗', label: 'Clothing', value: 'clothing' },
  { icon: '📱', label: 'Electronics', value: 'electronics' },
  { icon: '💊', label: 'Pharmacy', value: 'pharmacy' },
  { icon: '📦', label: 'Other', value: 'other' },
]

export default function BusinessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ''
  const name = searchParams.get('name') || ''
  const userType = searchParams.get('type') || 'business'

  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [businessPhone, setBusinessPhone] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocationPin = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          console.log('Location access denied')
        }
      )
    }
  }

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault()
    if (businessName.trim() && category) {
      // TODO: Create business with backend
      console.log({
        name,
        businessName,
        category,
        location,
        businessPhone,
        phone,
        userType,
      })
      // For now, redirect to success or dashboard
      router.push('/onboard/success')
    }
  }

  const selectedCategory = CATEGORIES.find((cat) => cat.value === category)

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border">
        <div className="h-full w-2/3 bg-primary transition-all duration-500" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-border bg-card backdrop-blur-xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              About your business
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell us a bit more to set up your profile.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateBusiness} className="space-y-8">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Business Name
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
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
                <input
                  type="text"
                  placeholder="e.g. Blue Coffee"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Category — dropdown */}
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Category
              </label>

              {/* Trigger button */}
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full px-5 py-4 bg-muted border-2 border-border rounded-2xl text-foreground hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all flex items-center justify-between"
              >
                {category ? (
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{CATEGORIES.find(c => c.value === category)?.icon}</span>
                    <span className="font-medium">{CATEGORIES.find(c => c.value === category)?.label}</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Select a category</span>
                )}
                <svg
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Floating solid dropdown panel */}
              {showDropdown && (
                <div
                  className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-border shadow-2xl overflow-hidden"
                  style={{ background: 'hsl(var(--card))', backdropFilter: 'none' }}
                >
                  <div className="max-h-64 overflow-y-auto divide-y divide-border">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value)
                          setShowDropdown(false)
                        }}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                          category === cat.value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        style={category !== cat.value ? { background: 'hsl(var(--card))' } : undefined}
                      >
                        <span className="text-xl shrink-0">{cat.icon}</span>
                        <span className="font-medium text-sm">{cat.label}</span>
                        {category === cat.value && (
                          <svg className="ml-auto h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Location
              </label>
              <button
                type="button"
                onClick={handleLocationPin}
                className={`w-full px-4 py-4 border-2 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  location
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-muted/50 border-border text-primary hover:border-primary/50'
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location ? 'Location pinned ✓' : 'Pin current location'}
              </button>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Help us verify your business location for customer visits.
              </p>
            </div>

            {/* Business Phone (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Business Phone (Optional)
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={!businessName.trim() || !category}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Create My Business
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Powered by Druto Rewards
          </p>
        </div>
      </div>
    </main>
  )
}
