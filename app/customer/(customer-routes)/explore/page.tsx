'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { businesses } from './_data'

// ─── categories ───────────────────────────────────────────────────────────────

const categories = [
  {
    label: 'All',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>,
  },
  {
    label: 'Restaurant',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  },
  {
    label: 'Coffee',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>,
  },
  {
    label: 'Salon',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M6 3l6 9 6-9M6 21l6-9 6 9"/></svg>,
  },
  {
    label: 'Gym',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h18M6 8v8M18 8v8"/></svg>,
  },
  {
    label: 'Retail',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  },
  {
    label: 'Pharmacy',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2z"/></svg>,
  },
]

// ─── variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerExplorePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = businesses.filter(b =>
    (activeCategory === 'All' || b.category === activeCategory) &&
    (search === '' || b.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col min-h-screen">


      <div className="px-5 pt-12 pb-6">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-white">Explore</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover exclusive rewards at elite establishments near you.
            </p>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            whileTap={{ scale: 0.96 }}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-zinc-900 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground/80 transition-colors hover:bg-zinc-800"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-primary">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Use my current location
          </motion.button>
        </div>
      </div>


      <div className="sticky top-0 z-20 space-y-3 border-b border-border/30 bg-background/85 px-5 pb-4 pt-1 backdrop-blur-xl">

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Find businesses, premium services, or rewards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-border bg-muted/30 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:bg-muted/50 transition-all"
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none"
        >
          {categories.map(cat => {
            const active = activeCategory === cat.label
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={[
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all',
                  active
                    ? 'border-primary/70 bg-primary text-white hover:bg-primary/90'
                    : 'border-border/50 bg-zinc-900/80 text-muted-foreground hover:border-foreground/25 hover:text-foreground',
                ].join(' ')}
              >
                {cat.icon}
                {cat.label}
              </button>
            )
          })}
        </motion.div>
      </div>


      <div className="flex-1 px-5 py-5 pb-10">

        {/* Business table card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="overflow-hidden rounded-2xl border border-border/50 bg-zinc-800/20"
        >
          {/* Table header */}
          <div className="flex items-center justify-between border-b border-border/40 bg-zinc-500/10 px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Business Name</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
          </div>

          {/* Rows */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="divide-y divide-border/25">
            {filtered.map(biz => {
              const status = biz.closingSoon ? 'Closing Soon' : biz.open ? 'Open Now' : 'Closed'
              const statusColor = biz.closingSoon
                ? 'text-orange-400'
                : biz.open ? 'text-emerald-400' : 'text-rose-400'
              const dotColor = biz.closingSoon
                ? 'bg-orange-400'
                : biz.open ? 'bg-emerald-400' : 'bg-rose-400'

              return (
                <motion.div key={biz.id} variants={fadeUp}>
                  <Link href={`/customer/explore/${biz.id}`} className="no-underline">
                    <motion.div
                      whileTap={{ scale: 0.995 }}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/30"
                    >
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xl">
                        {biz.emoji}
                      </div>

                      {/* Name + subtitle + meta row */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-foreground truncate">{biz.name}</span>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-primary">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{biz.subtitle}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="rounded-md border border-border/50 bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {biz.categoryLabel}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {biz.distance}
                          </span>
                          <span className="text-[10px] font-bold text-primary">{biz.reward}</span>
                        </div>
                      </div>

                      {/* Status + chevron */}
                      <div className="flex shrink-0 items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                          <span className={`text-[10px] font-bold ${statusColor}`}>{status}</span>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-muted-foreground/50">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}

            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center">
                <p className="text-sm text-muted-foreground">No businesses match your search.</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* ── Bottom info cards ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-5 grid grid-cols-3 gap-3"
        >
          {/* Discovery Pool */}
          <div className="rounded-2xl border border-border/50 bg-zinc-900/60 p-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">Discovery Pool</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Explore 12 new high-tier businesses added this week.
            </p>
          </div>

          {/* Active Multiplier */}
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">Active Multiplier</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Visit any &apos;Gold&apos; status location for 2× reward points today.
            </p>
            <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary-foreground">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* Nearby Map */}
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-zinc-900/60 p-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">Nearby Map</h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Visual grid of all reward-ready locations.
            </p>
            <div className="mt-3 grid grid-cols-5 gap-0.5 opacity-50">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-sm ${[1, 4, 6, 9, 11, 14, 17].includes(i) ? 'bg-primary/70' : 'bg-zinc-700'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
