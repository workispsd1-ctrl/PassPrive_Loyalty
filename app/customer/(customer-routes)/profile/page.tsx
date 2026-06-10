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

type MenuRowProps = {
  icon: React.ReactNode
  label: string
  sublabel?: string
  onClick: () => void
  isFirst?: boolean
  isLast?: boolean
  showToggle?: boolean
  toggleValue?: boolean
}

function MenuRow({ icon, label, sublabel, onClick, isFirst, isLast, showToggle, toggleValue }: MenuRowProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ x: showToggle ? 0 : 4, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
      whileTap={{ scale: 0.995 }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      className={`flex items-center gap-3.5 px-4 py-4 transition-colors cursor-pointer select-none border-white/5
        ${isLast ? '' : 'border-b'}
        ${isFirst && isLast ? 'rounded-2xl' : isFirst ? 'rounded-t-2xl' : isLast ? 'rounded-b-2xl' : ''}
      `}
    >
      {/* Icon pill */}
      <div className="h-9 w-9 rounded-xl flex-shrink-0 flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400">
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white leading-tight">{label}</p>
        {sublabel && (
          <p className="text-xs mt-1 text-white/40 leading-normal">
            {sublabel}
          </p>
        )}
      </div>

      {/* Toggle or Chevron */}
      {showToggle ? (
        <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-250 ${toggleValue ? 'bg-primary' : 'bg-zinc-800 border border-white/10'}`}>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="w-4 h-4 rounded-full bg-white shadow-md"
            animate={{ x: toggleValue ? 16 : 0 }}
          />
        </div>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className="h-4 w-4 flex-shrink-0 text-white/20">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </motion.div>
  )
}

export default function CustomerProfilePage() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(true)
  const [phone, setPhone] = useState('+91 9866136805')
  const [email, setEmail] = useState('')
  const [tempPhone, setTempPhone] = useState(phone)
  const [tempEmail, setTempEmail] = useState(email)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div 
        variants={stagger} 
        initial="hidden" 
        animate="show"
        className="flex-1 px-5 pt-12 pb-10 space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">Profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your account and preferences.
            </p>
          </div>
        </motion.div>

        {/* Hero / Avatar Card */}
        <motion.div 
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
          
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="relative">
              <motion.div 
                variants={scaleIn}
                className="h-24 w-24 rounded-full flex items-center justify-center bg-linear-to-br from-orange-500/20 to-orange-500/5 border-2 border-orange-500/35"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-orange-400">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </motion.div>
              {/* Edit badge */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full flex items-center justify-center bg-linear-to-r from-orange-500 to-orange-600 border-2 border-zinc-900 shadow-md shadow-orange-500/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="h-3.5 w-3.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </motion.button>
            </div>

            {/* Name + badge */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-xl font-bold text-white tracking-tight">Revoori Varun</h2>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/10 text-white border border-white/10">
                  GOLD MEMBER
                </span>
                <span className="text-xs text-white/40">SINCE JUN 2026</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info Card */}
        <motion.div 
          variants={fadeUp}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 overflow-hidden backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Contact Information</span>
            {!isEditing ? (
              <button 
                onClick={() => {
                  setTempPhone(phone)
                  setTempEmail(email)
                  setIsEditing(true)
                }}
                className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setIsEditing(false)
                  }}
                  className="text-xs font-bold text-white/50 hover:text-white/70 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setPhone(tempPhone)
                    setEmail(tempEmail)
                    setIsEditing(false)
                  }}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3.5 px-5 py-4 border-b border-white/5">
            <div className="h-8 w-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                Phone Number
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              ) : (
                <p className="text-sm font-bold text-white mt-0.5">{phone || 'Not set'}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3.5 px-5 py-4">
            <div className="h-8 w-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                Email Address
              </p>
              {isEditing ? (
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-sm font-bold text-white mt-1 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              ) : (
                <p className={`text-sm font-bold mt-0.5 ${email ? 'text-white' : 'text-white/40'}`}>
                  {email || 'Not set'}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* App Settings */}
        <div className="space-y-3">
          <motion.p 
            variants={fadeUp}
            className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-1"
          >
            App Settings
          </motion.p>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 overflow-hidden backdrop-blur-sm flex flex-col">
            <MenuRow
              isFirst
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              }
              label="Notifications"
              onClick={() => router.push('./profile/notifications')}
            />
            <MenuRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              }
              label="Dark Mode"
              showToggle
              toggleValue={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            />
            <MenuRow
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              label="Privacy & Security"
              onClick={() => router.push('./profile/privacy')}
            />
            <MenuRow
              isLast
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              }
              label="Help & Support"
              onClick={() => router.push('./profile/help')}
            />
          </div>
        </div>

        {/* Sign Out */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl text-sm font-bold transition-all border border-primary/20 bg-primary/15 text-primary cursor-pointer"
        >
          Sign Out
        </motion.button>

        {/* Version */}
        <motion.p 
          variants={fadeUp}
          className="text-center text-[10px] text-white/20 tracking-wider"
        >
          PassPrivé v1.0.0 · Customer
        </motion.p>
      </motion.div>
    </div>
  )
}
