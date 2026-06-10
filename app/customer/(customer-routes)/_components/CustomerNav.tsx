'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CustomerNav = () => {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Home',
      href: '/customer/home',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      label: 'Explore',
      href: '/customer/explore',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      ),
    },
    {
      label: 'Scan',
      href: '/customer/scan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
        </svg>
      ),
    },
    {
      label: 'Rewards',
      href: '/customer/rewards',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <path d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2M6 9a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2" />
          <path d="M9 13h6" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      href: '/customer/profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.includes(item.href.split('/').pop() || '')
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center justify-center gap-1 py-3 px-4 transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={isActive ? 'text-primary' : ''}>{item.icon}</div>
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default CustomerNav
