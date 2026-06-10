'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PrivacySecurityPage() {
  const router = useRouter()
  const [shareLocation, setShareLocation] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)
  const [analytics, setAnalytics] = useState(true)

  const handleSave = () => {
    // Save settings logic here
    router.back()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 border-b border-border">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-foreground">Privacy & Security</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 sm:px-6">
        <div className="space-y-4">
          {/* Share Location */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Share Location</p>
              <p className="text-sm text-muted-foreground">For nearby places & QR verification</p>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={shareLocation}
                onChange={() => setShareLocation(!shareLocation)}
                className="sr-only"
              />
              <div className={`h-6 w-11 rounded-full transition-colors ${
                shareLocation ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <div className={`h-5 w-5 rounded-full bg-white transition-transform transform ${
                  shareLocation ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>

          {/* Public Profile */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Public Profile</p>
              <p className="text-sm text-muted-foreground">Let others see your achievements</p>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={() => setPublicProfile(!publicProfile)}
                className="sr-only"
              />
              <div className={`h-6 w-11 rounded-full transition-colors ${
                publicProfile ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <div className={`h-5 w-5 rounded-full bg-white transition-transform transform ${
                  publicProfile ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-semibold text-foreground">Analytics</p>
              <p className="text-sm text-muted-foreground">Help improve the app</p>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={analytics}
                onChange={() => setAnalytics(!analytics)}
                className="sr-only"
              />
              <div className={`h-6 w-11 rounded-full transition-colors ${
                analytics ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <div className={`h-5 w-5 rounded-full bg-white transition-transform transform ${
                  analytics ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
          </div>

          {/* Data Protection Info */}
          <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <p className="font-semibold text-foreground">Data Protection</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your data is encrypted and securely stored. We never share your personal information with third parties without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-8 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
