'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Animation variants (matching Home/Explore) ────────────────────────────────
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

// ─── Types ─────────────────────────────────────────────────────────────────────
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

type HistoryReward = {
  id: string
  title: string
  store: string
  emoji: string
  points: number
  redeemedOn: string
  status: 'Claimed' | 'Expired'
}

// ─── Data ──────────────────────────────────────────────────────────────────────
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

const historyRewards: HistoryReward[] = [
  {
    id: 'h1',
    title: 'Free Latte',
    store: 'Bloom Café',
    emoji: '☕',
    points: 10,
    redeemedOn: 'May 28, 2026',
    status: 'Claimed',
  },
  {
    id: 'h2',
    title: '10% Off Voucher',
    store: 'Urban Eats',
    emoji: '🍔',
    points: 8,
    redeemedOn: 'May 15, 2026',
    status: 'Expired',
  },
]

// ─── Stat cards (matching Home page pattern) ───────────────────────────────────
const statCards = [
  {
    label: 'Available',
    value: '3',
    card: 'border-orange-500/30 from-orange-500/10 to-orange-500/5',
    icon: 'bg-orange-500/15 text-orange-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M20 12v10H4V12" /><path d="M22 7H2v5h20V7z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    label: 'Claimed',
    value: '2',
    card: 'border-emerald-500/30 from-emerald-500/10 to-emerald-500/5',
    icon: 'bg-emerald-500/15 text-emerald-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: 'Expiring',
    value: '1',
    card: 'border-rose-500/30 from-rose-500/10 to-rose-500/5',
    icon: 'bg-rose-500/15 text-rose-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

// ─── Dynamic modal message ─────────────────────────────────────────────────────
const getRewardMessage = (reward: Reward) => {
  const s = reward.store.toLowerCase()
  const t = reward.title.toLowerCase()
  if (s.includes('bloom') || t.includes('coffee') || t.includes('latte'))
    return { title: 'Freshly Brewed!', subtitle: 'A warm cup of joy is waiting for you.', quote: '"Today\'s good mood is sponsored by coffee." ☕' }
  if (s.includes('sweet') || t.includes('dessert'))
    return { title: 'Life is Sweet!', subtitle: 'Indulge in a moment of pure bliss.', quote: '"Save room for dessert; it goes straight to the heart." 🍰' }
  if (s.includes('urban') || t.includes('meal') || t.includes('burger'))
    return { title: 'Tasty Times Ahead!', subtitle: 'Savor every bite of your reward.', quote: '"One cannot think well if one has not dined well." — Virginia Woolf 🍔' }
  return { title: 'Awesome Choice!', subtitle: 'Enjoy your special reward!', quote: '"Celebrate every small victory!" 🎁' }
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CustomerRewardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'claim' | 'history'>('claim')
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set())
  const [activeClaimReward, setActiveClaimReward] = useState<Reward | null>(null)
  const [points, setPoints] = useState(45)

  const handleClaim = (reward: Reward) => {
    if (points >= reward.points) {
      setClaimedIds((prev) => new Set([...prev, reward.id]))
      setPoints((prev) => prev - reward.points)
      setActiveClaimReward(reward)
    } else {
      alert('Not enough points to claim this reward!')
    }
  }

  const rewardMsg = activeClaimReward ? getRewardMessage(activeClaimReward) : null
  const maxPoints = 60
  const pct = Math.min((points / maxPoints) * 100, 100)

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 px-5 pt-12 pb-24 space-y-6"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">Rewards</h1>
            <p className="mt-2 text-sm text-muted-foreground">Redeem your earned rewards</p>
          </div>
          {/* Points pill */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-extrabold tracking-wider">{points} PTS</span>
          </motion.div>
        </motion.div>

        {/* ── Points progress card (Home stat card style) ─────────────────── */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-orange-500/20 bg-[#181818] p-5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400/70">Points Balance</p>
                <p className="text-3xl font-bold text-white mt-0.5">{points} <span className="text-base font-semibold text-white/40">/ {maxPoints}</span></p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            {/* Progress bar (matching Home featured card style) */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-orange-400"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: pct / 100 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="text-[10px] text-white/35 mt-2">{maxPoints - points} more points to next milestone</p>
          </div>
        </motion.div>

        {/* ── Stat cards row (Home page grid style) ──────────────────────── */}
        <motion.div variants={stagger} className="grid grid-cols-3 gap-3">
          {statCards.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-2xl border bg-gradient-to-br p-4 backdrop-blur-sm ${s.card}`}
            >
              <div className={`mb-2.5 flex h-8 w-8 items-center justify-center rounded-xl ${s.icon}`}>
                {s.svg}
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/45">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tab Toggle (matching existing pill style) ────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="flex rounded-full p-1 bg-zinc-900/40 border border-white/5 relative z-10"
        >
          {(['claim', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 rounded-full py-2.5 text-xs uppercase tracking-wider transition-all duration-300 relative cursor-pointer"
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-zinc-800/90 border border-white/10 rounded-full shadow-lg shadow-black/40 -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className={`transition-colors duration-250 ${activeTab === tab ? 'text-primary font-black' : 'text-white/45 font-bold'}`}>
                {tab === 'claim' ? 'To Claim' : 'History'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Tab Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'claim' ? (
              <motion.div
                key="claim"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {toClaimRewards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-4xl">🎁</div>
                    <div>
                      <h2 className="text-lg font-bold text-white">No Rewards Yet</h2>
                      <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">Collect stamps or scratch cards to earn free rewards!</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => router.push('/customer/explore')}
                      className="mt-3 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      Explore Businesses
                    </motion.button>
                  </div>
                ) : (
                  /* ── Explore-style table card ────────────────────────── */
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="overflow-hidden rounded-2xl border border-border/50 bg-zinc-800/20"
                  >
                    {/* Table header row */}
                    <div className="flex items-center justify-between border-b border-border/40 bg-zinc-500/10 px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reward</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                    </div>

                    {/* Reward rows */}
                    <div className="divide-y divide-border/25">
                      {toClaimRewards.map((reward) => {
                        const isClaimed = claimedIds.has(reward.id)
                        return (
                          <motion.div
                            key={reward.id}
                            variants={fadeUp}
                            whileTap={isClaimed ? {} : { scale: 0.995 }}
                            onClick={() => { if (!isClaimed) handleClaim(reward) }}
                            className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors select-none ${isClaimed ? 'opacity-45 cursor-default' : 'hover:bg-muted/30'}`}
                          >
                            {/* Emoji */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xl">
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
                              <p className="mt-0.5 text-xs text-muted-foreground">{reward.title}</p>
                              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="rounded-md border border-border/50 bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                  {reward.category}
                                </span>
                                <span className="text-[10px] font-bold text-orange-400">
                                  {reward.points} PTS
                                </span>
                                <span className="text-[10px] text-white/30">· Expires {reward.expiresIn}</span>
                              </div>
                            </div>

                            {/* Status + chevron */}
                            <div className="flex shrink-0 items-center gap-1.5">
                              <div className="flex items-center gap-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${isClaimed ? 'bg-zinc-500' : 'bg-orange-400 animate-pulse'}`} />
                                <span className={`text-[10px] font-bold ${isClaimed ? 'text-zinc-500' : 'text-orange-400'}`}>
                                  {isClaimed ? 'Claimed' : 'Claim'}
                                </span>
                              </div>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-muted-foreground/50">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Earn More CTA ────────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                  className="mt-4"
                >
                  <button
                    onClick={() => router.push('/customer/explore')}
                    className="w-full flex items-center gap-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-4 py-4 cursor-pointer hover:bg-orange-500/10 transition-colors group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 text-xl">
                      ✨
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-bold text-white">Earn more points</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Visit a business to collect stamps &amp; unlock rewards</p>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-orange-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>

            ) : (
              /* ── History Tab (Explore row style) ────────────────────────── */
              <motion.div
                key="history"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {historyRewards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center bg-zinc-900/60 border border-white/5 text-4xl">📋</div>
                    <div>
                      <h2 className="text-lg font-bold text-white">No History Yet</h2>
                      <p className="text-sm text-muted-foreground mt-1.5">Claimed rewards will appear here.</p>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="overflow-hidden rounded-2xl border border-border/50 bg-zinc-800/20"
                  >
                    {/* Table header */}
                    <div className="flex items-center justify-between border-b border-border/40 bg-zinc-500/10 px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Past Reward</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                    </div>

                    {/* History rows */}
                    <div className="divide-y divide-border/25">
                      {historyRewards.map((item) => {
                        const isClaimed = item.status === 'Claimed'
                        return (
                          <motion.div
                            key={item.id}
                            variants={fadeUp}
                            className="flex items-center gap-3 px-4 py-3.5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xl">
                              {item.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-white truncate">{item.store}</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-primary">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <p className="mt-0.5 text-xs text-muted-foreground">{item.title}</p>
                              <div className="mt-1.5 flex items-center gap-2">
                                <span className="text-[10px] text-white/30">{item.redeemedOn}</span>
                                <span className={`text-[10px] font-bold ${isClaimed ? 'text-emerald-400' : 'text-rose-400'}`}>· {item.points} PTS</span>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-1">
                              <span className={`h-1.5 w-1.5 rounded-full ${isClaimed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                              <span className={`text-[10px] font-bold ${isClaimed ? 'text-emerald-400' : 'text-rose-400'}`}>{item.status}</span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Reward Claimed Modal ──────────────────────────────────────────────── */}
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
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="px-6 pt-6 pb-5 text-center relative z-10">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-3xl mb-3">
                  {activeClaimReward.emoji}
                </div>
                <h3 className="text-xl font-black text-white">{rewardMsg?.title}</h3>
                <p className="text-[11px] text-white/40 mt-1 tracking-wide">{rewardMsg?.subtitle}</p>
              </div>

              {/* Reward Row (Explore row style) */}
              <div className="mx-5 mb-4 flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-3.5 relative z-10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-white/5 text-xl">
                  {activeClaimReward.emoji}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-bold text-white truncate">{activeClaimReward.store}</p>
                  <p className="text-[11px] text-white/45 mt-0.5">{activeClaimReward.title}</p>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-extrabold">
                  {activeClaimReward.points} PTS
                </span>
              </div>

              {/* Quote */}
              {rewardMsg?.quote && (
                <p className="mx-5 mb-5 text-[11px] italic text-zinc-500 text-center leading-relaxed relative z-10">
                  {rewardMsg.quote}
                </p>
              )}

              {/* Done Button */}
              <div className="px-5 pb-6 relative z-10">
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
