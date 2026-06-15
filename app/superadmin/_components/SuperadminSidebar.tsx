'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Store, 
  Sliders, 
  ArrowLeftRight,
  ChevronLeft,
  ShieldCheck,
  Users
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    href: '/superadmin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Business Partners',
    href: '/superadmin/partners',
    icon: Store,
  },
  {
    label: 'Users',
    href: '/superadmin/members',
    icon: Users,
  },
  {
    label: 'Configure Plans',
    href: '/superadmin/plans',
    icon: Sliders,
  },
]

export default function SuperadminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <aside className="relative flex shrink-0 flex-col bg-background border-r border-border min-h-screen">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3.5 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-sm hover:border-primary/50 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft
          className={`h-4 w-4 text-foreground/80 transition-transform duration-300 ${
            collapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`flex flex-col flex-1 overflow-hidden transition-[width] duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Header / Brand */}
        <div
          className={`flex flex-col gap-3 py-7 justify-center items-center text-center border-b border-border ${
            collapsed ? 'px-3' : 'px-5'
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 animate-pulse-glow">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>

          {!collapsed && (
            <div className="text-center animate-fade-up">
              <p className="text-[16px] font-display font-bold leading-none tracking-tight text-foreground">
                PASS PRIVÉ
              </p>
              <p className="mt-1 text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-primary">
                SUPERADMIN PANEL
              </p>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className={`flex flex-1 flex-col gap-1 py-4 ${collapsed ? 'px-2' : 'px-3'}`}>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  'flex items-center gap-3 rounded-lg py-2.5 text-sm no-underline transition-all duration-150',
                  collapsed ? 'justify-center px-2' : 'px-3',
                  active
                    ? 'bg-primary/15 text-primary font-semibold border-l-2 border-l-primary'
                    : 'text-muted-foreground font-normal border-l-2 border-l-transparent hover:bg-card hover:text-foreground',
                ].join(' ')}
              >
                <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer / Switch View */}
        <div className={`p-3 border-t border-border ${collapsed ? 'flex justify-center' : ''}`}>
          <Link
            href="/dashboard"
            title={collapsed ? 'Partner Portal' : undefined}
            className={[
              'flex items-center gap-3 rounded-lg py-2 text-xs text-muted-foreground transition-all hover:bg-card hover:text-foreground',
              collapsed ? 'p-2' : 'px-3 py-2 border border-border bg-card/50'
            ].join(' ')}
          >
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            {!collapsed && <span className="font-mono">Partner Portal</span>}
          </Link>
        </div>
      </div>
    </aside>
  )
}
