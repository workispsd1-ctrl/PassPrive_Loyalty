'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  CreditCard, 
  IndianRupee, 
  FileCheck,
  TrendingUp,
  ArrowRight,
  Store,
  Users
} from 'lucide-react'
import { getSuperadminDashboardData, type DashboardData } from '../superadmin-actions'

export default function SuperadminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getSuperadminDashboardData()
        setData(result)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Calculate plan breakdown count from recentBusinesses
  const getPlanCounts = () => {
    if (!data) return { basic: 0, growth: 0, pro: 0, free: 0 }
    let basic = 0, growth = 0, pro = 0, free = 0
    data.recentBusinesses.forEach((biz) => {
      if (biz.plan_id === 'basic') basic++
      else if (biz.plan_id === 'growth') growth++
      else if (biz.plan_id === 'pro') pro++
      else free++
    })
    return { basic, growth, pro, free }
  }

  const formatTimeAgo = (dateString: string) => {
    try {
      const created = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - created.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      return `${diffDays}d ago`
    } catch {
      return 'recent'
    }
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-card rounded-xl" />
            <div className="h-4 w-72 bg-card rounded-md" />
          </div>
          <div className="h-10 w-36 bg-card rounded-xl" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-card rounded-2xl border border-border/50" />
          ))}
        </div>

        {/* Sections Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-card rounded-2xl border border-border/50" />
          <div className="h-96 bg-card rounded-2xl border border-border/50" />
        </div>
      </div>
    )
  }

  const stats = data || {
    totalPartners: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    pendingRequests: 0,
    totalMembers: 0,
    recentBusinesses: []
  }

  const plans = getPlanCounts()

  // Mock revenue coordinates for SVG line chart (representing monthly MRR growth in INR)
  const revenueTrendPoints = [
    { label: 'Jan', val: Math.max(0, stats.monthlyRevenue * 0.4) },
    { label: 'Feb', val: Math.max(0, stats.monthlyRevenue * 0.5) },
    { label: 'Mar', val: Math.max(0, stats.monthlyRevenue * 0.65) },
    { label: 'Apr', val: Math.max(0, stats.monthlyRevenue * 0.75) },
    { label: 'May', val: Math.max(0, stats.monthlyRevenue * 0.9) },
    { label: 'Jun', val: stats.monthlyRevenue },
  ]

  // Math conversions to render Line coordinates inside standard 500x150 SVG box
  const maxVal = Math.max(...revenueTrendPoints.map((p) => p.val), 5000)
  const chartHeight = 130
  const chartWidth = 460
  const pointsString = revenueTrendPoints
    .map((p, idx) => {
      const x = 20 + idx * (chartWidth / (revenueTrendPoints.length - 1))
      const y = chartHeight - (p.val / maxVal) * (chartHeight - 20)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            Dashboard
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time analytics, subscription management, and partner requests.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Partners */}
        <div className="group relative bg-card backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground text-xs font-medium">Business Partners</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Building2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground">{stats.totalPartners}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">+8%</span> this month
            </p>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="group relative bg-card backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground text-xs font-medium">Active Subs</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground">{stats.activeSubscriptions}</h3>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-foreground/85 font-semibold">
                {stats.totalPartners > 0 ? ((stats.activeSubscriptions / stats.totalPartners) * 100).toFixed(1) : 0}%
              </span> conversion rate
            </p>
          </div>
        </div>

        {/* Total Members */}
        <Link 
          href="/superadmin/members"
          className="group relative bg-card backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground text-xs font-medium group-hover:text-primary transition-colors">Total Users</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
              {stats.totalMembers}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">+18.5%</span> growth rate
            </p>
          </div>
        </Link>

        {/* Monthly Recurring Revenue */}
        <div className="group relative bg-card backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground text-xs font-medium">MRR (INR)</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <IndianRupee className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground">
              ₹{stats.monthlyRevenue.toLocaleString('en-IN')}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">+12.4%</span> vs last month
            </p>
          </div>
        </div>

        {/* Free Previews */}
        <Link 
          href="/superadmin/partner-requests"
          className="group relative bg-card backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <span className="text-muted-foreground text-xs font-medium group-hover:text-primary transition-colors">Free Previews</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <FileCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
              {stats.pendingRequests}
            </h3>
            <p className="text-[10px] text-primary font-semibold mt-1 flex items-center gap-1">
              Review requests <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>
      </div>

      {/* Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SVG Line Chart: Revenue Trend */}
        <div className="lg:col-span-2 bg-card backdrop-blur-md p-6 rounded-2xl border border-border space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Monthly Recurring Revenue (MRR)</h2>
            <p className="text-xs text-muted-foreground">Historical growth and projections</p>
          </div>

          <div className="relative w-full h-48 bg-black/20 rounded-xl p-2 border border-border/40 overflow-hidden flex items-center justify-center">
            {/* SVG Visual Graph */}
            <svg viewBox="0 0 500 150" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Horizontal Grid lines */}
              <line x1="20" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="20" y1="56.6" x2="480" y2="56.6" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="20" y1="93.3" x2="480" y2="93.3" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="20" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.08)" />

              {/* Gradient Area under path */}
              <path
                d={`M 20,130 L ${pointsString} L 480,130 Z`}
                fill="url(#chartGradient)"
              />

              {/* Line path */}
              <polyline
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
                className="drop-shadow-[0_4px_10px_rgba(249,115,22,0.3)]"
              />

              {/* Data points (dots) */}
              {revenueTrendPoints.map((p, idx) => {
                const x = 20 + idx * (chartWidth / (revenueTrendPoints.length - 1))
                const y = chartHeight - (p.val / maxVal) * (chartHeight - 20)
                return (
                  <g key={idx} className="group/dot cursor-pointer">
                    <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="var(--color-primary)" strokeWidth="2.5" />
                    <text x={x} y={y - 12} fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.8">
                      ₹{Math.round(p.val / 100) / 10}k
                    </text>
                  </g>
                )
              })}

              {/* X Axis labels */}
              {revenueTrendPoints.map((p, idx) => {
                const x = 20 + idx * (chartWidth / (revenueTrendPoints.length - 1))
                return (
                  <text key={idx} x={x} y="145" fill="#a1a1aa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                    {p.label}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        {/* SVG Bar Chart: Subscriptions Distribution */}
        <div className="bg-card backdrop-blur-md p-6 rounded-2xl border border-border flex flex-col justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-display font-bold text-foreground">Plan Distribution</h2>
            <p className="text-xs text-muted-foreground">Subscribed business partners share</p>
          </div>

          <div className="relative w-full h-44 bg-black/20 rounded-xl p-3 border border-border/40 flex items-center justify-center">
            {/* SVG Visual Bars */}
            <svg viewBox="0 0 240 130" className="w-full h-full">
              {/* Grid lines */}
              <line x1="20" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
              <line x1="20" y1="100" x2="220" y2="100" stroke="rgba(255,255,255,0.08)" />

              {/* Basic Bar */}
              <rect x="35" y={100 - Math.min(80, plans.basic * 15)} width="25" height={Math.min(80, plans.basic * 15)} rx="3" fill="#3b82f6" />
              <text x="47.5" y={95 - Math.min(80, plans.basic * 15)} fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">{plans.basic}</text>
              <text x="47.5" y="115" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Basic</text>

              {/* Growth Bar */}
              <rect x="85" y={100 - Math.min(80, plans.growth * 15)} width="25" height={Math.min(80, plans.growth * 15)} rx="3" fill="var(--color-primary)" />
              <text x="97.5" y={95 - Math.min(80, plans.growth * 15)} fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">{plans.growth}</text>
              <text x="97.5" y="115" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Growth</text>

              {/* Pro Bar */}
              <rect x="135" y={100 - Math.min(80, plans.pro * 15)} width="25" height={Math.min(80, plans.pro * 15)} rx="3" fill="#10b981" />
              <text x="147.5" y={95 - Math.min(80, plans.pro * 15)} fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">{plans.pro}</text>
              <text x="147.5" y="115" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Pro</text>

              {/* Free Preview Bar */}
              <rect x="185" y={100 - Math.min(80, plans.free * 15)} width="25" height={Math.min(80, plans.free * 15)} rx="3" fill="#64748b" />
              <text x="197.5" y={95 - Math.min(80, plans.free * 15)} fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">{plans.free}</text>
              <text x="197.5" y="115" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Free</text>
            </svg>
          </div>

          <div className="border-t border-border pt-3 text-center">
            <Link 
              href="/superadmin/plans" 
              className="text-xs text-primary hover:underline font-semibold flex items-center justify-center gap-1.5"
            >
              Configure Plan Parameters <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-card backdrop-blur-md p-6 rounded-2xl border border-border space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Recent Registrations</h2>
            <p className="text-xs text-muted-foreground">Latest businesses registered in Supabase</p>
          </div>
          <Link 
            href="/superadmin/partners" 
            className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            View all business partners <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-border/60">
          {stats.recentBusinesses.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No business partner records found in the database.</p>
          ) : (
            stats.recentBusinesses.map((biz) => (
              <div key={biz.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-start group">
                <div className="p-2 rounded-xl bg-muted border border-border shrink-0 mt-0.5">
                  {biz.plan_id ? (
                    <CreditCard className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Store className="h-4 w-4 text-orange-400" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {biz.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {formatTimeAgo(biz.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Owner: {biz.owner_name || '—'} | Phone: {biz.phone || '—'}
                  </p>
                </div>
                <div className="shrink-0 pl-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    !biz.plan_id 
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    {biz.plan_id ? biz.plan_id.toUpperCase() : 'FREE PREVIEW'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
