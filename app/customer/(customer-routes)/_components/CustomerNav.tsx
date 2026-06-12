'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Compass, ScanQrCode, Gift, User } from 'lucide-react'

const navItems = [
  { label: 'Home',    href: '/customer/home',    Icon: Home },
  { label: 'Explore', href: '/customer/explore',  Icon: Compass },
  { label: 'Scan',    href: '/customer/scan',     Icon: ScanQrCode, special: true },
  { label: 'Rewards', href: '/customer/rewards',  Icon: Gift },
  { label: 'Profile', href: '/customer/profile',  Icon: User },
]

export default function CustomerNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none pb-5 z-50">
      {/* Ambient glow bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="pointer-events-auto w-[92vw] max-w-md flex items-center justify-between px-3 py-2 rounded-[28px] bg-[#0f0f12]/85 border border-white/8 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)]">
        {navItems.map(({ label, href, Icon, special }) => {
          const segment = href.split('/').pop() ?? ''
          const active = pathname === href || pathname.startsWith('/customer/' + segment + '/')

          if (special) {
            return (
              <Link key={href} href={href} className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.91 }}
                  className="relative flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-primary-400 to-primary-600 text-white shadow-[0_0_24px_rgba(249,115,22,0.55)]"
                  style={{ width: '3.25rem', height: '3.25rem' }}
                >
                  <Icon size={22} strokeWidth={2} />
                  <span className="absolute inset-0 rounded-full animate-pulse-glow" />
                </motion.div>
              </Link>
            )
          }

          return (
            <Link key={href} href={href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.87 }}
                className="relative flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded-[20px]"
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-[20px] bg-primary/13"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                <div className={`relative z-10 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                </div>

                <span className={`relative z-10 text-[9px] font-semibold tracking-widest uppercase transition-colors ${active ? 'text-primary' : 'text-muted-foreground/55'}`}>
                  {label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
