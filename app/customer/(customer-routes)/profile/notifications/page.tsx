'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ToggleSwitchProps = {
  checked: boolean
  onChange: () => void
  id: string
}

function ToggleSwitch({ checked, onChange, id }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative flex-shrink-0 focus:outline-none"
      style={{
        width: '48px',
        height: '28px',
        borderRadius: '14px',
        background: checked
          ? 'linear-gradient(135deg, #f97316, #ea580c)'
          : 'rgba(255,255,255,0.12)',
        boxShadow: checked ? '0 0 14px rgba(249,115,22,0.45)' : 'none',
        border: checked ? 'none' : '1px solid rgba(255,255,255,0.15)',
        transition: 'all 0.25s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 5px rgba(0,0,0,0.30)',
          transform: checked ? 'translateX(23px)' : 'translateX(3px)',
          transition: 'transform 0.25s ease',
          display: 'block',
        }}
      />
    </button>
  )
}

type SettingRowProps = {
  label: string
  sublabel: string
  checked: boolean
  onChange: () => void
  id: string
  isLast?: boolean
}

function SettingRow({ label, sublabel, checked, onChange, id, isLast }: SettingRowProps) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {sublabel}
        </p>
      </div>
      <ToggleSwitch id={id} checked={checked} onChange={onChange} />
    </div>
  )
}

export default function NotificationsSettingsPage() {
  const router = useRouter()
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [rewardAlerts, setRewardAlerts] = useState(true)
  const [newPlacesNearby, setNewPlacesNearby] = useState(true)
  const [promotions, setPromotions] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      router.back()
    }, 800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* ── Header ── */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1a0a00 0%, #2d1200 50%, #0d0600 100%)',
        }}
        className="px-5 pt-10 pb-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-white">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Notifications</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
              Control what alerts you receive
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-5 py-5">
        {/* Settings Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          <SettingRow
            id="push-notif"
            label="Push Notifications"
            sublabel="Receive alerts on your device"
            checked={pushNotifications}
            onChange={() => setPushNotifications((v) => !v)}
          />
          <SettingRow
            id="email-notif"
            label="Email Notifications"
            sublabel="Get updates via email"
            checked={emailNotifications}
            onChange={() => setEmailNotifications((v) => !v)}
          />
          <SettingRow
            id="reward-alerts"
            label="Reward Alerts"
            sublabel="When you earn or can claim rewards"
            checked={rewardAlerts}
            onChange={() => setRewardAlerts((v) => !v)}
          />
          <SettingRow
            id="new-places"
            label="New Places Nearby"
            sublabel="Discover new restaurants"
            checked={newPlacesNearby}
            onChange={() => setNewPlacesNearby((v) => !v)}
          />
          <SettingRow
            id="promotions"
            label="Promotions"
            sublabel="Special offers and deals"
            checked={promotions}
            onChange={() => setPromotions((v) => !v)}
            isLast
          />
        </div>

        {/* Info note */}
        <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
          You can change these settings at any time
        </p>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200"
          style={{
            background: saved
              ? 'linear-gradient(135deg, #16a34a, #15803d)'
              : 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#fff',
            boxShadow: saved
              ? '0 4px 20px rgba(22,163,74,0.40)'
              : '0 4px 20px rgba(249,115,22,0.40)',
          }}
        >
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
