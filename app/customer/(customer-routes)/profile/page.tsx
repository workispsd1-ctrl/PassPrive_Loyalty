'use client'

import { useRouter } from 'next/navigation'

type MenuRowProps = {
  icon: React.ReactNode
  label: string
  sublabel?: string
  onClick: () => void
  isFirst?: boolean
  isLast?: boolean
}

function MenuRow({ icon, label, sublabel, onClick, isFirst, isLast }: MenuRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      className="flex items-center gap-3.5 px-4 py-3.5 transition-all duration-150 cursor-pointer select-none"
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: isFirst && isLast ? '16px' : isFirst ? '16px 16px 0 0' : isLast ? '0 0 16px 16px' : '0',
      }}
    >
      {/* Icon pill */}
      <div
        className="h-8 w-8 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{
          background: 'rgba(249,115,22,0.12)',
          border: '1px solid rgba(249,115,22,0.18)',
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{label}</p>
        {sublabel && (
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
            {sublabel}
          </p>
        )}
      </div>

      {/* Chevron */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.22)' }}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  )
}

export default function CustomerProfilePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* ── Hero Header ── */}
      <div
        style={{ background: 'linear-gradient(160deg, #1a0a00 0%, #2d1200 50%, #0d0600 100%)' }}
        className="px-5 pt-10 pb-8 relative overflow-hidden"
      >
        {/* Glow blobs */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)' }} />

        {/* Title */}
        <h1 className="text-center text-lg font-bold text-white mb-5 relative z-10">My Profile</h1>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="relative">
            <div className="h-20 w-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.20), rgba(234,88,12,0.12))',
                border: '2px solid rgba(249,115,22,0.35)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10" style={{ color: '#c2410c' }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            {/* Edit badge */}
            <button
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: '2px solid #0d0600' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="h-3 w-3">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          {/* Name + badge */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-lg font-bold text-white">Revoori Varun</h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} className="h-3.5 w-3.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span
                className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm"
                style={{ background: 'rgba(0,0,0,0.50)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                GOLD MEMBER
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>SINCE JUN 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Info ── */}
      <div className="px-5 py-5 space-y-5">

        {/* Contact card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Phone */}
          <div className="flex items-center gap-3 px-4 py-3.5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'rgba(249,115,22,0.15)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-3.5 w-3.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Phone Number
              </p>
              <p className="text-sm font-semibold text-white">+91 +919866136805</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'rgba(249,115,22,0.15)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-3.5 w-3.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Email Address
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.38)' }}>Not set</p>
            </div>
          </div>
        </div>

        {/* ── App Settings ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
            style={{ color: 'rgba(255,255,255,0.32)' }}>
            App Settings
          </p>

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <MenuRow
              isFirst
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              }
              label="Notifications"
              onClick={() => router.push('./profile/notifications')}
            />
            <MenuRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              }
              label="Dark Mode"
              onClick={() => {}}
            />
            <MenuRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              label="Privacy &amp; Security"
              onClick={() => router.push('./profile/privacy')}
            />
            <MenuRow
              isLast
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={1.8} className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              }
              label="Help &amp; Support"
              onClick={() => router.push('./profile/help')}
            />
          </div>
        </div>

        {/* Sign Out */}
        <button
          className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-150"
          style={{
            background: 'rgba(220,38,38,0.10)',
            border: '1px solid rgba(220,38,38,0.22)',
            color: '#f87171',
          }}
        >
          Sign Out
        </button>

        {/* Version */}
        <p className="text-center text-xs pb-2" style={{ color: 'rgba(255,255,255,0.18)' }}>
          PassPrivé v1.0.0 · Customer
        </p>
      </div>
    </div>
  )
}
