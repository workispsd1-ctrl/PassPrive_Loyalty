'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}



const stats = [
  {
    label: 'Total Rewards',
    value: '0',
    card:   'border-orange-500/30 from-orange-500/10 to-orange-500/5',
    icon:   'bg-orange-500/15 text-orange-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path d="M20 12v10H4V12" /><path d="M22 7H2v5h20V7z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    label: 'Active Offers',
    value: '0',
    card:   'border-purple-500/30 from-purple-500/10 to-purple-500/5',
    icon:   'bg-purple-500/15 text-purple-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <rect x="4" y="13" width="16" height="8" rx="1.5" />
        <rect x="8" y="7" width="8" height="7" rx="1" />
        <line x1="3" y1="21" x2="21" y2="21" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: 'Total Visits',
    value: '0',
    card:   'border-emerald-500/30 from-emerald-500/10 to-emerald-500/5',
    icon:   'bg-emerald-500/15 text-emerald-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

const featuredCards = [
  {
    id: 1,
    business: 'Bloom Café',
    title: 'Scan & Earn Reward',
    desc: 'Earn a stamp with every coffee purchase',
    stamps: 4,
    total: 10,
    accent:     'text-orange-400',
    dot_filled: 'bg-orange-400 border-orange-400',
    dot_empty:  'bg-zinc-800 border-zinc-700',
    bar:        'bg-orange-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white/60">
        <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    id: 2,
    business: 'Bloom Café',
    title: 'Everything Free!',
    desc: 'Collect 8 stamps — your next visit is on us',
    stamps: 6,
    total: 8,
    accent:     'text-emerald-400',
    dot_filled: 'bg-emerald-400 border-emerald-400',
    dot_empty:  'bg-zinc-800 border-zinc-700',
    bar:        'bg-emerald-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white/60">
        <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/>
        <path d="M12 22V7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
  },
  {
    id: 3,
    business: 'Bloom Café',
    title: 'Collect, Stamp & Get',
    desc: 'Double stamps this week limited-time offer',
    stamps: 2,
    total: 12,
    accent:     'text-purple-400',
    dot_filled: 'bg-purple-400 border-purple-400',
    dot_empty:  'bg-zinc-800 border-zinc-700',
    bar:        'bg-purple-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white/60">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
]



const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}



function StampDots({
  filled, total, dotFilled, dotEmpty,
}: { filled: number; total: number; dotFilled: string; dotEmpty: string }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.05 * i, duration: 0.25, ease: 'backOut' }}
          className={`h-6 w-6 rounded-full border-2 ${i < filled ? dotFilled : dotEmpty}`}
        />
      ))}
    </div>
  )
}



export default function CustomerHomePage() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => { setGreeting(getGreeting()) }, [])

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-12 pb-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">

          {/* Greeting row */}
          <div className="flex items-start justify-between">
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">{greeting}</p>
              <h1 className="mt-1 text-4xl font-bold tracking-normal  text-foreground leading-tight">Krittika Tiwari</h1>
              <p className="mt-1 text-sm text-muted-foreground">Track your rewards &amp; earn more</p>
            </motion.div>

            <motion.button
              variants={scaleIn}
              whileTap={{ scale: 0.9 }}
              type="button"
              aria-label="Profile"
              className="mt-1 grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all hover:bg-primary/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div variants={stagger} className="mt-6 grid grid-cols-3 gap-5">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-2xl border bg-linear-to-br p-5 backdrop-blur-sm ${s.card}`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.icon}`}>
                  {s.svg}
                </div>
                <p className="text-3xl font-bold text-foreground">{s.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-8 px-5 pb-10">

        {/* Featured Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold  text-foreground">Featured Programs</h2>
            <button type="button" className="text-xs font-semibold text-primary transition-colors hover:text-primary/70">
              View All →
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none">
            {featuredCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="relative shrink-0 w-96 cursor-pointer select-none overflow-hidden rounded-2xl border border-white/8 bg-[#181818] p-5"
              >
                {/* Top row: business name + icon button */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${card.accent}`}>{card.business}</p>
                    <h3 className="mt-1.5 text-lg font-bold leading-snug text-white">{card.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">{card.desc}</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
                    {card.icon}
                  </div>
                </div>

                {/* Stamp dots */}
                <StampDots
                  filled={card.stamps}
                  total={card.total}
                  dotFilled={card.dot_filled}
                  dotEmpty={card.dot_empty}
                />

                {/* Progress row */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/45">{card.stamps} of {card.total} stamps</span>
                  <span className={`text-sm font-bold ${card.accent}`}>
                    {Math.round((card.stamps / card.total) * 100)}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    className={`h-full rounded-full ${card.bar}`}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: card.stamps / card.total }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="mb-4 text-xl font-bold  text-foreground">Your Rewards</h2>

          <div className="rounded-3xl border border-border bg-card p-8 text-center backdrop-blur-sm">
            <div className="mb-5 flex justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9 text-primary">
                  <path d="M20 12v10H4V12" /><path d="M22 7H2v5h20V7z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </motion.div>
            </div>

            <p className="text-base font-bold text-foreground">No active rewards yet</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Scan a QR code at your favorite venue to start collecting stamps.<br />
              Every visit brings you one step closer to unlocking exclusive premium rewards.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 animate-pulse-glow"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Scan QR Code
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
