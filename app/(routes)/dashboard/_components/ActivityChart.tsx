'use client'

import { useState, type CSSProperties } from 'react'
import type { MonthlyPoint } from '../_data'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CHART_H = 160

/** Round up to a "nice" axis maximum (1, 2, 5 × 10^n). */
function niceCeil(n: number): number {
  if (n <= 1) return 1
  const pow = 10 ** Math.floor(Math.log10(n))
  const f = n / pow
  const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10
  return nf * pow
}

export default function ActivityChart({ data }: { data: MonthlyPoint[] }) {
  const [tab, setTab] = useState<'stamps' | 'redemptions'>('stamps')

  const values = data.map((d) => (tab === 'stamps' ? d.stamps : d.redemptions))
  const axisMax = niceCeil(Math.max(1, ...values))
  const ticks = [0, 1, 2, 3, 4].map((i) => Math.round((axisMax * i) / 4))

  return (
    <div className="rounded-2xl border border-border bg-card p-4 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Member activity this year</h2>
        <button type="button" aria-label="Chart options" className="text-muted-foreground transition-colors hover:text-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border">
        {(['stamps', 'redemptions'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              'px-6 py-2.5 text-sm font-medium capitalize transition-colors',
              tab === t
                ? '-mb-px border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mt-6 flex gap-2">
        {/* Y-axis labels */}
        <div className="flex w-8 shrink-0 flex-col-reverse justify-between pb-5">
          {ticks.map((v, i) => (
            <span key={i} className="text-right text-[10px] leading-none text-muted-foreground">
              {v}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="relative min-w-0 flex-1">
          {/* Horizontal grid lines */}
          <div className="pointer-events-none absolute inset-0 bottom-5 flex flex-col-reverse justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-border/30" />
            ))}
          </div>

          {/* Bars + month labels */}
          <div className="flex h-45 items-end gap-px">
            {data.map((d, i) => {
              const val = tab === 'stamps' ? d.stamps : d.redemptions
              const barH = (val / axisMax) * CHART_H
              return (
                <div key={d.month} className="group flex flex-1 flex-col items-center">
                  <div className="flex h-40 w-full items-end justify-center">
                    <div
                      title={`${MONTH_LABELS[i]}: ${val}`}
                      className={[
                        'h-(--bh) w-3/4 max-w-10 rounded-t bg-primary-300/80 transition-all duration-500 group-hover:bg-primary',
                        barH > 0 ? 'opacity-100' : 'opacity-15',
                      ].join(' ')}
                      style={{ '--bh': barH > 0 ? `${barH}px` : '2px' } as CSSProperties}
                    />
                  </div>
                  <span className="mt-1.5 text-[9px] leading-none text-muted-foreground">{MONTH_LABELS[i]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
