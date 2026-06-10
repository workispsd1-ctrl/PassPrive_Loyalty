'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

// Animation variants matching Home/Explore
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

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
      className={`relative flex-shrink-0 h-5 w-9 rounded-full p-0.5 transition-colors duration-250 cursor-pointer focus:outline-none
        ${checked ? 'bg-primary' : 'bg-zinc-800 border border-white/10'}
      `}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="block h-3.5 w-3.5 rounded-full bg-white shadow-md"
        animate={{ x: checked ? 16 : 0 }}
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
    <motion.div
      variants={fadeUp}
      className={`flex items-center justify-between px-4 py-4.5 border-white/5
        ${isLast ? '' : 'border-b'}
      `}
    >
      <div className="flex-1 pr-4 min-w-0">
        <p className="text-sm font-bold text-white leading-tight">{label}</p>
        <p className="text-xs text-white/40 mt-1 leading-normal">
          {sublabel}
        </p>
      </div>
      <ToggleSwitch id={id} checked={checked} onChange={onChange} />
    </motion.div>
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
    <div className="flex flex-col min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 px-5 pt-12 pb-24 space-y-6"
      >
        {/* Header with back arrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="h-10 w-10 rounded-2xl flex items-center justify-center bg-zinc-900/60 border border-white/10 text-white cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white leading-none">Notifications</h1>
            <p className="text-xs text-white/45 mt-1.5">
              Control what alerts you receive
            </p>
          </div>
        </motion.div>

        {/* Settings Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 overflow-hidden backdrop-blur-sm flex flex-col"
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
        </motion.div>

        {/* Info Note */}
        <motion.p
          variants={fadeUp}
          className="text-center text-[10px] text-white/20 tracking-wider"
        >
          You can change these settings at any time
        </motion.p>

        {/* Save Button */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all cursor-pointer border shadow-lg
            ${saved
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5'
              : 'bg-primary/15 border-primary/30 text-primary shadow-primary/5 hover:bg-primary/20'
            }
          `}
        >
          {saved ? '✓ Saved!' : 'Save Settings'}
        </motion.button>
      </motion.div>
    </div>
  )
}
