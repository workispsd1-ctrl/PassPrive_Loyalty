'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

// ─── Animation variants ────────────────────────────────────────────────────────
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

// ─── Types (no points) ────────────────────────────────────────────────────────
type Reward = {
  id: string
  title: string
  store: string
  emoji: string
  stampsNeeded: number
  stampsCollected: number
  expiresIn: string
  category: string
  urgent: boolean
}

type HistoryReward = {
  id: string
  title: string
  store: string
  emoji: string
  redeemedOn: string
  status: 'Claimed' | 'Expired'
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const toClaimRewards: Reward[] = [
  {
    id: '1',
    title: 'Free Coffee',
    store: 'Bloom Café',
    emoji: '☕',
    stampsNeeded: 10,
    stampsCollected: 10,
    expiresIn: '3 days',
    category: 'Food & Drink',
    urgent: true,
  },
  {
    id: '2',
    title: 'Free Dessert',
    store: 'Sweet Treats',
    emoji: '🍰',
    stampsNeeded: 8,
    stampsCollected: 8,
    expiresIn: '7 days',
    category: 'Bakery',
    urgent: false,
  },
  {
    id: '3',
    title: 'Discount Meal',
    store: 'Urban Eats',
    emoji: '🍔',
    stampsNeeded: 12,
    stampsCollected: 12,
    expiresIn: '14 days',
    category: 'Restaurant',
    urgent: false,
  },
]

const historyRewards: HistoryReward[] = [
  {
    id: 'h1',
    title: 'Free Latte',
    store: 'Bloom Café',
    emoji: '☕',
    redeemedOn: 'May 28, 2026',
    status: 'Claimed',
  },
  {
    id: 'h2',
    title: '10% Off Voucher',
    store: 'Urban Eats',
    emoji: '🍔',
    redeemedOn: 'May 15, 2026',
    status: 'Expired',
  },
]

// ─── Stat cards ───────────────────────────────────────────────────────────────
const statCards = [
  {
    label: 'Total Stamps',
    value: '24',
    card: 'border-orange-500/30 from-orange-500/10 to-orange-500/5',
    icon: 'bg-orange-500/15 text-orange-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Rewards Ready',
    value: String(toClaimRewards.length),
    card: 'border-emerald-500/30 from-emerald-500/10 to-emerald-500/5',
    icon: 'bg-emerald-500/15 text-emerald-400',
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
    label: 'Expiring Soon',
    value: String(toClaimRewards.filter(r => r.urgent).length),
    card: 'border-rose-500/30 from-rose-500/10 to-rose-500/5',
    icon: 'bg-rose-500/15 text-rose-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

// ─── Modal message ─────────────────────────────────────────────────────────────
const getRewardMessage = (reward: Reward) => {
  const s = reward.store.toLowerCase()
  const t = reward.title.toLowerCase()
  if (s.includes('bloom') || t.includes('coffee') || t.includes('latte'))
    return {
      title: 'Freshly Brewed! ☕',
      subtitle: 'A warm cup of joy is waiting for you.',
      quote: '"Today\'s good mood is sponsored by coffee."',
      steps: ['Head to Bloom Café', 'Show this screen to the barista', 'Enjoy your free coffee!'],
    }
  if (s.includes('sweet') || t.includes('dessert'))
    return {
      title: 'Life is Sweet! 🍰',
      subtitle: 'Indulge in a moment of pure bliss.',
      quote: '"Save room for dessert; it goes straight to the heart."',
      steps: ['Visit Sweet Treats', 'Show this screen at the counter', 'Enjoy your free treat!'],
    }
  if (s.includes('urban') || t.includes('meal') || t.includes('burger'))
    return {
      title: 'Tasty Times Ahead! 🍔',
      subtitle: 'Savor every bite of your reward.',
      quote: '"One cannot think well if one has not dined well."',
      steps: ['Head over to Urban Eats', 'Present this screen to staff', 'Enjoy your discounted meal!'],
    }
  return {
    title: 'Awesome Choice! 🎁',
    subtitle: 'Enjoy your special reward!',
    quote: '"Celebrate every small victory!"',
    steps: ['Visit the store', 'Show this screen to staff', 'Collect your reward!'],
  }
}

// ─── Confetti particle — spawns from modal center, explodes outward + upward ──
function ConfettiDot({
  color, delay, tx, ty, size,
}: { color: string; delay: number; tx: number; ty: number; size: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${color}`}
      style={{ left: '50%', top: '30%', width: size, height: size }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, scale: 0.15 }}
      transition={{ delay, duration: 1.6 + Math.random() * 0.4, ease: [0.1, 0.6, 0.3, 1] }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomerRewardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'claim' | 'history'>('claim')
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set())
  const [activeClaimReward, setActiveClaimReward] = useState<Reward | null>(null)
  const [confettiKey, setConfettiKey] = useState(0)

  const handleClaim = (reward: Reward) => {
    setClaimedIds(prev => new Set([...prev, reward.id]))
    setActiveClaimReward(reward)
    setConfettiKey(k => k + 1)
  }

  // 32 confetti dots, burst outward + bias upward like celebration rain
  const confettiDots = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * 2 * Math.PI - Math.PI / 2
    const spread = 120 + (i % 5) * 30
    const upBias = -Math.abs(Math.sin(angle)) * 60
    return {
      id: i,
      tx: Math.cos(angle) * spread,
      ty: Math.sin(angle) * spread + upBias - 80,
      delay: (i % 8) * 0.04,
      size: 6 + (i % 4) * 3,
      color: ['bg-orange-400', 'bg-pink-400', 'bg-yellow-300', 'bg-emerald-400', 'bg-violet-400', 'bg-cyan-300', 'bg-rose-400', 'bg-white'][i % 8],
    }
  })

  const rewardMsg = activeClaimReward ? getRewardMessage(activeClaimReward) : null

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 px-5 pt-12 pb-24 space-y-6"
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">Rewards</h1>
            <p className="mt-2 text-sm text-muted-foreground">Redeem your earned rewards</p>
          </div>
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-extrabold tracking-wider">24 Stamps</span>
          </motion.div>
        </motion.div>

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
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

        {/* ── Tab Toggle ──────────────────────────────────────────────────── */}
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

            {/* ════ CLAIM TAB ════ */}
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
                      <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">Collect stamps at your favourite spots to unlock free rewards!</p>
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
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="overflow-hidden rounded-2xl border border-border/50 bg-zinc-800/20"
                  >
                    {/* Table header */}
                    <div className="flex items-center justify-between border-b border-border/40 bg-zinc-500/10 px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reward</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                    </div>

                    <div className="divide-y divide-border/25">
                      {toClaimRewards.map((reward) => {
                        const isClaimed = claimedIds.has(reward.id)
                        return (
                          <motion.div
                            key={reward.id}
                            variants={fadeUp}
                            whileTap={isClaimed ? {} : { scale: 0.995 }}
                            onClick={() => { if (!isClaimed) handleClaim(reward) }}
                            className={`flex items-center gap-3 px-4 py-3.5 transition-colors select-none ${isClaimed ? 'opacity-45 cursor-default' : 'cursor-pointer hover:bg-muted/30'}`}
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
                                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-orange-400/60">
                                  Expires {reward.expiresIn}
                                </span>
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

                {/* ── Collect more stamps CTA ────────────────────────────── */}
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
                      <p className="text-sm font-bold text-white">Collect more stamps</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Visit a business to stamp &amp; unlock exclusive rewards</p>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-orange-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>

            ) : (
              /* ════ HISTORY TAB ════ */
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
                    <div className="flex items-center justify-between border-b border-border/40 bg-zinc-500/10 px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Past Reward</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                    </div>

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
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 text-white/25">
                                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="text-[10px] text-white/30">{item.redeemedOn}</span>
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
        {activeClaimReward && rewardMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 backdrop-blur-sm"
            onClick={() => setActiveClaimReward(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.85 }}
              className="relative w-full max-w-md overflow-hidden bg-zinc-950 rounded-t-[2.5rem] border-t border-x border-white/8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Confetti */}
              <div key={confettiKey} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {confettiDots.map(d => (
                  <ConfettiDot key={d.id} color={d.color} delay={d.delay} tx={d.tx} ty={d.ty} size={d.size} />
                ))}
              </div>

              {/* Glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Drag handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-9 h-[3px] rounded-full bg-white/15" />
              </div>

              <div className="px-6 pt-2 pb-8 relative z-10">

                {/* ── Fanned Card Stack ── */}
                <div className="relative w-full h-52 flex items-center justify-center mb-4 mt-2">
                  {/* Card 1 (Left tilt - Back) */}
                  <motion.div 
                    className="absolute w-26 h-40 rounded-2xl bg-zinc-900/90 border border-white/5 shadow-xl flex flex-col justify-between p-3 select-none"
                    style={{ x: -50, y: 15, rotate: -15, zIndex: 10 }}
                    initial={{ opacity: 0, x: 0, rotate: 0 }}
                    animate={{ opacity: 0.5, x: -50, y: 15, rotate: -15 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 15 }}
                  >
                    <div className="text-[7px] font-bold tracking-widest text-white/20">PASSPRIVÉ</div>
                    <div className="text-xl">🍰</div>
                    <div className="h-1.5 w-10 bg-white/5 rounded-full" />
                  </motion.div>

                  {/* Card 2 (Right tilt - Back) */}
                  <motion.div 
                    className="absolute w-26 h-40 rounded-2xl bg-zinc-900/90 border border-white/5 shadow-xl flex flex-col justify-between p-3 select-none"
                    style={{ x: 50, y: 15, rotate: 15, zIndex: 10 }}
                    initial={{ opacity: 0, x: 0, rotate: 0 }}
                    animate={{ opacity: 0.5, x: 50, y: 15, rotate: 15 }}
                    transition={{ type: 'spring', delay: 0.15, stiffness: 200, damping: 15 }}
                  >
                    <div className="text-[7px] font-bold tracking-widest text-white/20">PASSPRIVÉ</div>
                    <div className="text-xl">🍔</div>
                    <div className="h-1.5 w-10 bg-white/5 rounded-full" />
                  </motion.div>

                  {/* Card 3 (Center - Front Active) */}
                  <motion.div 
                    className="absolute w-32 h-48 rounded-2xl bg-zinc-900/95 border border-orange-500/35 shadow-2xl shadow-orange-500/10 flex flex-col justify-between p-4 z-20 select-none overflow-hidden"
                    style={{ y: 0, rotate: 0 }}
                    initial={{ scale: 0.5, y: 25, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.2, stiffness: 250, damping: 18 }}
                  >
                    {/* Glowing card spot */}
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />

                    <div className="flex justify-between items-start relative z-10">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-orange-400">Claimed Pass</span>
                      <span className="text-xs text-orange-400">✨</span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto relative z-10 w-full">
                      <div className="h-11 w-11 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-2xl shadow-inner mb-2">
                        {activeClaimReward.emoji}
                      </div>
                      <p className="text-[10px] font-bold text-white text-center truncate w-full">{activeClaimReward.store}</p>
                      <p className="text-[8px] text-white/50 text-center truncate w-full mt-0.5">{activeClaimReward.title}</p>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-xl bg-emerald-500/12 border border-emerald-500/25 relative z-10 w-full">
                      <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-wider">Claimed</span>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <motion.h3
                    className="text-2xl font-black text-white tracking-tight text-center font-display"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.35 }}
                  >
                    {rewardMsg.title}
                  </motion.h3>
                  <motion.p
                    className="text-xs text-white/40 mt-1 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 0.35 }}
                  >
                    {rewardMsg.subtitle}
                  </motion.p>
                </div>

                {/* How to Redeem section follows directly */}
                {/* ── How to redeem ── */}
                <motion.div
                  className="rounded-2xl bg-white/3 border border-white/6 p-4 mb-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.35 }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-3">How to Redeem</p>
                  <div className="flex flex-col gap-2.5">
                    {rewardMsg.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.38 + i * 0.08, duration: 0.28 }}
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 border border-orange-500/25 text-[10px] font-black text-orange-400">
                          {i + 1}
                        </div>
                        <span className="text-xs text-white/55 font-medium">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* ── Done button ── */}
                <motion.button
                  onClick={() => setActiveClaimReward(null)}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 transition-colors cursor-pointer shadow-lg shadow-orange-500/25"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.32 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
