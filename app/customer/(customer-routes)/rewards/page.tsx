'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

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

type Reward = {
  id: string
  title: string
  store: string
  storeInitial: string
  emoji: string
  points: number
  expiresIn: string
  category: string
}

const toClaimRewards: Reward[] = [
  {
    id: '1',
    title: 'Free Coffee',
    store: 'Bloom Café',
    storeInitial: 'B',
    emoji: '☕',
    points: 10,
    expiresIn: '3 days',
    category: 'Food & Drink',
  },
  {
    id: '2',
    title: 'Free Dessert',
    store: 'Sweet Treats',
    storeInitial: 'S',
    emoji: '🍰',
    points: 15,
    expiresIn: '7 days',
    category: 'Bakery',
  },
  {
    id: '3',
    title: 'Discount Meal',
    store: 'Urban Eats',
    storeInitial: 'U',
    emoji: '🍔',
    points: 20,
    expiresIn: '14 days',
    category: 'Restaurant',
  },
]

type HistoryReward = {
  id: string
  title: string
  store: string
  storeInitial: string
  emoji: string
  points: number
  redeemedOn: string
  status: 'Claimed' | 'Expired'
}

const historyRewards: HistoryReward[] = [
  {
    id: 'h1',
    title: 'Free Latte',
    store: 'Bloom Café',
    storeInitial: 'B',
    emoji: '☕',
    points: 10,
    redeemedOn: 'May 28, 2026',
    status: 'Claimed',
  },
  {
    id: 'h2',
    title: '10% Off Voucher',
    store: 'Urban Eats',
    storeInitial: 'U',
    emoji: '🍔',
    points: 8,
    redeemedOn: 'May 15, 2026',
    status: 'Expired',
  },
]

export default function CustomerRewardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'claim' | 'history'>('claim')
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set())
  const [activeClaimReward, setActiveClaimReward] = useState<Reward | null>(null)
  const [copied, setCopied] = useState(false)

  const handleClaim = (reward: Reward) => {
    setClaimedIds((prev) => new Set([...prev, reward.id]))
    setActiveClaimReward(reward)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 px-5 pt-12 pb-24 space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">Rewards</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Redeem your earned rewards
            </p>
          </div>

          {/* Points Pill */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 shrink-0 shadow-lg shadow-orange-500/5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-orange-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-orange-400 text-xs font-extrabold tracking-wider">45 PTS</span>
          </motion.div>
        </motion.div>

        {/* Tab Toggle Pill */}
        <motion.div
          variants={fadeUp}
          className="flex rounded-full p-1 bg-zinc-900/40 border border-white/5 relative z-10"
        >
          <button
            onClick={() => setActiveTab('claim')}
            className="flex-1 rounded-full py-2.5 text-xs uppercase tracking-wider transition-all duration-300 relative cursor-pointer"
          >
            {activeTab === 'claim' && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-zinc-800/90 border border-white/10 rounded-full shadow-lg shadow-black/40 -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className={`transition-colors duration-250 ${activeTab === 'claim' ? 'text-primary font-black' : 'text-white/45 font-bold'}`}>
              To Claim
            </span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className="flex-1 rounded-full py-2.5 text-xs uppercase tracking-wider transition-all duration-300 relative cursor-pointer"
          >
            {activeTab === 'history' && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-zinc-800/90 border border-white/10 rounded-full shadow-lg shadow-black/40 -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <span className={`transition-colors duration-250 ${activeTab === 'history' ? 'text-primary font-black' : 'text-white/45 font-bold'}`}>
              History
            </span>
          </button>
        </motion.div>

        {/* Tab Content */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'claim' ? (
              <motion.div
                key="claim"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4"
              >
                {toClaimRewards.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-4xl">
                      🎁
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">No Rewards Yet</h2>
                      <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
                        Collect stamps or scratch cards to earn free rewards!
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => router.push('/customer/explore')}
                      className="mt-3 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      Explore Businesses
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {toClaimRewards.map((reward) => {
                      const isClaimed = claimedIds.has(reward.id)
                      return (
                        <motion.div
                          key={reward.id}
                          variants={fadeUp}
                          whileHover={isClaimed ? {} : { scale: 1.015, y: -1 }}
                          whileTap={isClaimed ? {} : { scale: 0.995 }}
                          onClick={() => { if (!isClaimed) handleClaim(reward) }}
                          className={`rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 select-none
                            ${isClaimed
                              ? 'border-white/5 bg-zinc-900/20 opacity-55'
                              : 'border-white/10 bg-zinc-900/60 hover:bg-zinc-800/40 cursor-pointer'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Emoji Icon Container */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-white/5 text-xl">
                              {reward.emoji}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-white truncate">{reward.store}</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-primary">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <p className="text-xs text-white/45 mt-0.5">{reward.title}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="rounded-md border border-white/10 bg-zinc-800/80 px-2 py-0.5 text-[9px] font-medium text-white/60">
                                  {reward.category}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/25">
                                  {reward.points} PTS
                                </span>
                                <span className="text-[10px] text-white/35">
                                  · Expires in {reward.expiresIn}
                                </span>
                              </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex shrink-0 items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${isClaimed ? 'bg-zinc-500' : 'bg-orange-400 animate-pulse'}`} />
                              <span className={`text-[11px] font-bold ${isClaimed ? 'text-zinc-500' : 'text-orange-400'}`}>
                                {isClaimed ? 'Claimed' : 'Claim Now'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                    {/* Removed Summary Strip */}
                  </div>
                )}
              </motion.div>
            ) : (
              /* History Tab */
              <motion.div
                key="history"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4"
              >
                {historyRewards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center bg-zinc-900/60 border border-white/5 text-4xl">
                      📋
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">No History Yet</h2>
                      <p className="text-sm text-muted-foreground mt-1.5">
                        Claimed rewards will appear here.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {historyRewards.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeUp}
                        className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4.5 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4">
                          {/* Emoji Icon Container */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-white/5 text-xl">
                            {item.emoji}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-white truncate">{item.store}</span>
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-primary">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-xs text-white/45 mt-0.5">{item.title}</p>
                            <p className="text-[10px] text-white/35 mt-2">{item.redeemedOn}</p>
                          </div>

                          {/* Status Indicator */}
                          <div className="flex shrink-0 items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Claimed' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                            <span className={`text-[11px] font-bold ${item.status === 'Claimed' ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Ticket/Pass Reveal Modal */}
      <AnimatePresence>
        {activeClaimReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl"
            >
              {/* Glow effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="p-6 text-center border-b border-white/5 relative z-10">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl mb-3">
                  {activeClaimReward.emoji}
                </div>
                <h3 className="text-lg font-black text-white">{activeClaimReward.store}</h3>
                <p className="text-xs text-white/50 mt-1">{activeClaimReward.title}</p>
              </div>

              {/* Ticket Details */}
              <div className="p-6 space-y-5 relative z-10">
                {/* Code display */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">PROMO CODE</span>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="font-mono text-sm font-extrabold text-orange-400">
                      {activeClaimReward.store.toUpperCase().replace(/\s+/g, '')}-PASS-{activeClaimReward.id}99
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${activeClaimReward.store.toUpperCase().replace(/\s+/g, '')}-PASS-${activeClaimReward.id}99`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5 text-emerald-400">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* SVG Barcode */}
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-3.5 rounded-xl">
                    <div className="flex gap-[2px] items-stretch h-14 w-48">
                      {[2,1,3,1,2,4,1,2,3,1,2,1,4,2,1,2,3,1,2,2].map((w, idx) => (
                        <div key={idx} className="bg-black" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-white/30">#PP-LOYAL-2026</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="p-4 border-t border-white/5 bg-zinc-900/40 text-center">
                <button
                  onClick={() => setActiveClaimReward(null)}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
