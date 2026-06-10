'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Reward = {
  id: string
  title: string
  store: string
  storeInitial: string
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
    points: 10,
    expiresIn: '3 days',
    category: 'Food & Drink',
  },
  {
    id: '2',
    title: 'Free Dessert',
    store: 'Sweet Treats',
    storeInitial: 'S',
    points: 15,
    expiresIn: '7 days',
    category: 'Bakery',
  },
  {
    id: '3',
    title: 'Discount Meal',
    store: 'Urban Eats',
    storeInitial: 'U',
    points: 20,
    expiresIn: '14 days',
    category: 'Restaurant',
  },
]

const historyRewards = [
  {
    id: 'h1',
    title: 'Free Latte',
    store: 'Bloom Café',
    storeInitial: 'B',
    points: 10,
    redeemedOn: 'May 28, 2026',
    status: 'Claimed',
  },
  {
    id: 'h2',
    title: '10% Off Voucher',
    store: 'Urban Eats',
    storeInitial: 'U',
    points: 8,
    redeemedOn: 'May 15, 2026',
    status: 'Expired',
  },
]

export default function CustomerRewardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'claim' | 'history'>('claim')
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set())

  const handleClaim = (id: string) => {
    setClaimedIds((prev) => new Set([...prev, id]))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Header ── */}
      <div
        style={{
          background:
            'linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #0d0600 100%)',
        }}
        className="px-5 pt-8 pb-6"
      >
        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              My Rewards
            </h1>
            <p className="text-white/50 text-xs mt-0.5">
              Your earned treats &amp; history
            </p>
          </div>
          {/* Points pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(249,115,22,0.18)', border: '1px solid rgba(249,115,22,0.35)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-orange-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-orange-300 text-xs font-bold">45 pts</span>
          </div>
        </div>

        {/* Toggle pill */}
        <div
          className="flex rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <button
            onClick={() => setActiveTab('claim')}
            className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all duration-300"
            style={
              activeTab === 'claim'
                ? {
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#fff',
                    boxShadow: '0 2px 12px rgba(249,115,22,0.45)',
                  }
                : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            To Claim
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-all duration-300"
            style={
              activeTab === 'history'
                ? {
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#fff',
                    boxShadow: '0 2px 12px rgba(249,115,22,0.45)',
                  }
                : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            History
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-5 py-5 pb-24">
        {activeTab === 'claim' ? (
          toClaimRewards.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center gap-4 py-24">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center text-4xl"
                style={{ background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.20)' }}
              >
                🎁
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-white">No Rewards Yet</h2>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Collect stamps or scratch cards to earn free rewards!
                </p>
              </div>
              <button
                onClick={() => router.push('/customer/explore')}
                className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(249,115,22,0.35)',
                }}
              >
                Explore Businesses
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {toClaimRewards.map((reward) => {
                const isClaimed = claimedIds.has(reward.id)
                return (
                  <div
                    key={reward.id}
                    className="rounded-2xl p-4 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      opacity: isClaimed ? 0.55 : 1,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Store avatar */}
                      <div
                        className="h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-bold"
                        style={{
                          background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(234,88,12,0.15))',
                          border: '1px solid rgba(249,115,22,0.30)',
                          color: '#f97316',
                        }}
                      >
                        {reward.storeInitial}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">{reward.title}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {reward.store}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              background: 'rgba(249,115,22,0.15)',
                              color: '#fb923c',
                              border: '1px solid rgba(249,115,22,0.25)',
                            }}
                          >
                            {reward.points} pts
                          </span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            · Expires in {reward.expiresIn}
                          </span>
                        </div>
                      </div>

                      {/* Claim button */}
                      <button
                        disabled={isClaimed}
                        onClick={() => handleClaim(reward.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex-shrink-0"
                        style={
                          isClaimed
                            ? {
                                background: 'rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.35)',
                                cursor: 'default',
                              }
                            : {
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                color: '#fff',
                                boxShadow: '0 2px 10px rgba(249,115,22,0.40)',
                              }
                        }
                      >
                        {isClaimed ? 'Claimed' : 'Claim'}
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Summary strip */}
              <div
                className="rounded-2xl p-4 flex items-center justify-between mt-2"
                style={{
                  background: 'rgba(249,115,22,0.07)',
                  border: '1px solid rgba(249,115,22,0.18)',
                }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    AVAILABLE TO CLAIM
                  </p>
                  <p className="text-lg font-bold text-white mt-0.5">
                    {toClaimRewards.length - claimedIds.size} rewards
                  </p>
                </div>
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.20)' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-orange-400">
                    <path d="M20 7h-1.26A4.5 4.5 0 0 0 12 4.5 4.5 4.5 0 0 0 5.26 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-8-1a2.5 2.5 0 0 1 2.45 2h-4.9A2.5 2.5 0 0 1 12 6zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </div>
              </div>
            </div>
          )
        ) : (
          /* ── History tab ── */
          historyRewards.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center text-4xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                📋
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-white">No History Yet</h2>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Claimed rewards will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {historyRewards.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-bold"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {item.storeInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
                        {item.store}
                      </p>
                      <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.30)' }}>
                        {item.redeemedOn}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                      style={
                        item.status === 'Claimed'
                          ? { background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }
                          : { background: 'rgba(220,38,38,0.12)', color: '#f87171', border: '1px solid rgba(220,38,38,0.20)' }
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
