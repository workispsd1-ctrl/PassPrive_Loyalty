'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { businesses } from '../_data'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const biz = businesses.find(b => b.id === Number(id))

  if (!biz) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Business not found.</p>
      </div>
    )
  }

  const pct = Math.round((biz.stamps / biz.totalStamps) * 100)

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden px-5 pt-12 pb-10">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

        {/* Back button */}
        <motion.button
          type="button"
          onClick={() => router.back()}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </motion.button>

        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex items-center gap-5"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-border bg-muted text-4xl shadow-lg">
            {biz.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground leading-tight">{biz.name}</h1>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-primary">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{biz.category}</p>
            <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${biz.open ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
              {biz.open ? '● Open now' : '● Closed'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 space-y-4 px-5 pb-10"
      >

        {/* Stamp card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 to-primary/5 p-5"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-foreground">Your Stamp Card</p>
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
              {biz.stamps}/{biz.totalStamps}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{biz.reward}</p>

          {/* Dots */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: biz.totalStamps }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.25, ease: 'backOut' }}
                className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm
                  ${i < biz.stamps
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted/40 text-muted-foreground'}`}
              >
                {i < biz.stamps ? '✓' : ''}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            />
          </div>
          <p className="mt-1.5 text-right text-xs text-muted-foreground">{pct}% complete</p>
        </motion.div>

        {/* About */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <p className="mb-2 text-sm font-bold text-foreground">About</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{biz.description}</p>
        </motion.div>

        {/* Info */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm space-y-3">
          <p className="text-sm font-bold text-foreground">Details</p>
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              text: biz.address,
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.36 19.36 0 0 1 1.64 2.9 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/></svg>,
              text: biz.phone,
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              text: biz.hours,
            },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              {icon}
              <span className="text-sm text-muted-foreground">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 animate-pulse-glow"
        >
          Collect a Stamp
        </motion.button>

      </motion.div>
    </div>
  )
}
