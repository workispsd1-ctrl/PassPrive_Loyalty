'use client'

import { useState } from 'react'
import type { MemberRow } from '../_data'

const TABLE_COLS = ['First Name', 'Last Name', 'Email', 'Phone', 'Stamp Date', 'Stamp Type', 'Location']

export default function MembersTable({ members }: { members: MemberRow[] }) {
  const [search, setSearch] = useState('')

  const filtered = members.filter(
    (m) =>
      search === '' ||
      `${m.firstName} ${m.lastName} ${m.email} ${m.phone}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-xl">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm sm:flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone number"
            className="w-full rounded-lg border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <button type="button" aria-label="Download" className="rounded p-1.5 transition-colors hover:bg-muted hover:text-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button type="button" aria-label="More options" className="rounded p-1.5 transition-colors hover:bg-muted hover:text-foreground">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <circle cx="12" cy="5" r="1.2" />
              <circle cx="12" cy="12" r="1.2" />
              <circle cx="12" cy="19" r="1.2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-10 px-4 py-3" aria-label="Select all">
                <input type="checkbox" aria-label="Select all rows" className="accent-primary" />
              </th>
              {TABLE_COLS.map((col) => (
                <th key={col} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    {col}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 opacity-40">
                      <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                    </svg>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLS.length + 1} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No member activity yet.
                </td>
              </tr>
            ) : (
              filtered.map((m, i) => (
                <tr
                  key={i}
                  className={`transition-colors hover:bg-muted/30 ${i !== filtered.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" aria-label={`Select ${m.firstName} ${m.lastName}`} className="accent-primary" />
                  </td>
                  <td className="px-3 py-3 text-foreground">{m.firstName}</td>
                  <td className="px-3 py-3 text-foreground">{m.lastName}</td>
                  <td className="px-3 py-3 text-muted-foreground">{m.email}</td>
                  <td className="px-3 py-3 text-muted-foreground">{m.phone}</td>
                  <td className="px-3 py-3 text-muted-foreground">{m.stampDate}</td>
                  <td className="px-3 py-3 text-muted-foreground">{m.stampType}</td>
                  <td className="px-3 py-3 text-muted-foreground">{m.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground sm:gap-6">
        <div className="flex items-center gap-2">
          <span>Jump to page:</span>
          <input
            type="number"
            defaultValue={1}
            min={1}
            aria-label="Page number"
            className="w-14 rounded border border-border bg-muted px-2 py-1 text-center text-foreground focus:border-primary/50 focus:outline-none"
          />
          <span>of 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select aria-label="Rows per page" className="rounded border border-border bg-muted px-2 py-1 text-foreground focus:outline-none">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span>Showing {filtered.length} of {members.length}</span>
          <div className="flex gap-1">
            <button type="button" disabled className="rounded border border-border px-2 py-1 opacity-40">
              &#8249;
            </button>
            <button type="button" disabled className="rounded border border-border px-2 py-1 opacity-40">
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* UTC note */}
      <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">All times/dates displayed in UTC</div>
    </div>
  )
}
