'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 shrink-0 opacity-60"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Stamp Cards',
    href: '/stamp-cards',
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 9h.01M6 15h.01M18 9h.01M18 15h.01" />
      </svg>
    ),
  },
  {
    label: 'Members',
    href: '/members',
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Communications',
    href: '/communications',
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    label: 'Campaigns',
    href: '/campaigns',
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: 'Resources',
    href: '/resources',
    locked: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: 'Help & Support',
    href: '/help',
    locked: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setCollapsed(window.innerWidth < 768)
  }, [])

  return (
    <aside className='relative flex shrink-0 flex-col bg-background border-r border-border'>
      <button
        type='button'
        onClick={() => setCollapsed((c) => !c)}
        className='absolute -right-3.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm'
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='#555'
          strokeWidth={2.5}
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`h-3.5 w-3.5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>
      </button>

      <div
        className={`flex flex-col flex-1 overflow-hidden transition-[width] duration-300 ${collapsed ? 'w-16' : 'w-60'}`}
      >
        {/* Logo */}
        <div
          className={`flex flex-col gap-3 py-7 justify-center items-center text-center border-b border-border ${
            collapsed ? 'px-3' : 'px-5'
          }`}
        >
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20'>
            <svg viewBox='0 0 40 40' className='h-8 w-8'>
              <circle cx='20' cy='20' r='18' fill='white' fillOpacity='0.9' />
              <circle cx='20' cy='14' r='5' fill='#ea580c' />
              <ellipse cx='20' cy='28' rx='8' ry='6' fill='#ea580c' />
              <circle cx='25' cy='17' r='3' fill='#fb923c' opacity='0.7' />
            </svg>
          </div>

          {!collapsed && (
            <div className='text-center'>
              <p className='text-[20px] font-bold leading-none tracking-tight text-foreground'>
                SERVICE STAMPPY

              </p>
              <p className='mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground'>
                TEST CAFE
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav
          className={`flex flex-1 flex-col gap-0.5 py-3 ${collapsed ? 'px-2' : 'px-3'}`}
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  'flex items-center gap-3 rounded-lg py-2.5 text-sm no-underline transition-all duration-150',
                  collapsed ? 'justify-center px-2' : 'px-3',
                  active
                    ? 'bg-primary/10 text-primary font-semibold border-l-2 border-l-primary'
                    : 'text-muted-foreground font-normal border-l-2 border-l-transparent hover:bg-white/5 hover:text-foreground',
                ].join(' ')}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className='flex-1'>{item.label}</span>
                    {item.locked && <LockIcon />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        
      </div>
    </aside>
  );
}
