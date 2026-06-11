'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, ZapOff, MapPin, Camera, AlertCircle, Sparkles, Check } from 'lucide-react'

// ─── Animation variants ────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

// ─── Confetti particle ────────────────────────────────────────────────────────
function ConfettiDot({
  color, delay, tx, ty, size,
}: { color: string; delay: number; tx: number; ty: number; size: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${color}`}
      style={{ left: '50%', top: '30%', width: size, height: size }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, scale: 0.15 }}
      transition={{ delay, duration: 1.6 + Math.random() * 0.4, ease: [0.1, 0.6, 0.3, 1] }}
    />
  )
}

export default function CustomerScanPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'scanning' | 'denied' | 'success'>('idle')
  const [torchOn, setTorchOn] = useState(false)
  const [locationEnabled] = useState(true)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [cameraStream])

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current)
      scanTimerRef.current = null
    }
  }

  const handleStartScanning = async () => {
    setStatus('scanning')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      setCameraStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Simulate a scan detection after 2.5 seconds
      scanTimerRef.current = setTimeout(() => {
        handleScanSuccess()
      }, 2500)

    } catch (err) {
      console.error('Camera access error:', err)
      setStatus('denied')
      stopCamera()
    }
  }

  const handleScanSuccess = () => {
    stopCamera()
    setStatus('success')
  }

  const toggleTorch = async () => {
    if (!cameraStream) return
    const track = cameraStream.getVideoTracks()[0]
    if (track) {
      try {
        const capabilities = track.getCapabilities() as any
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: !torchOn }]
          } as any)
          setTorchOn(!torchOn)
        } else {
          // Fallback simulation for browsers that don't support real torch control
          setTorchOn(!torchOn)
        }
      } catch (err) {
        console.warn('Torch not supported or failed to toggle:', err)
        setTorchOn(!torchOn)
      }
    }
  }

  // 32 confetti dots, burst outward + bias upward like celebration rain
  const confettiDots = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * 2 * Math.PI - Math.PI / 2
    const spread = 120 + (i % 5) * 30
    const upBias = -Math.abs(Math.sin(angle)) * 60
    return {
      id: i,
      tx: Math.cos(angle) * spread,
      ty: Math.sin(angle) * spread + upBias - 80,
      delay: (i % 8) * 0.04,
      size: 6 + (i % 4) * 3,
      color: ['bg-orange-400', 'bg-pink-400', 'bg-yellow-300', 'bg-emerald-400', 'bg-violet-400', 'bg-cyan-300', 'bg-rose-400', 'bg-white'][i % 8],
    }
  })

  return (
    <div className="flex flex-col min-h-screen text-foreground relative overflow-hidden">

      {/* ── Top Navigation Bar ── */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => {
            stopCamera()
            router.push('/customer/home')
          }}
          className="p-2.5 rounded-full bg-white/5 border border-white/8 hover:bg-white/10 transition-colors"
          aria-label="Go Back"
        >
          <X className="h-5 w-5 text-white/80" />
        </button>
        <span className="font-display text-lg font-bold tracking-tight text-white">Scan QR Code</span>
        <button
          onClick={toggleTorch}
          disabled={status !== 'scanning'}
          className={`p-2.5 rounded-full border transition-all ${torchOn
              ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/25'
              : 'bg-white/5 border-white/8 text-white/50 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5'
            }`}
          aria-label="Toggle Flashlight"
        >
          {torchOn ? <Zap className="h-5 w-5" /> : <ZapOff className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Content Viewport ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 relative z-10">

        <AnimatePresence mode="wait">
          {/* Idle / Initial State */}
          {status === 'idle' && (
            <motion.div
              key="idle"
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center space-y-6 max-w-sm"
            >
              {/* QR Code Container */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center justify-center w-36 h-36 rounded-[2.5rem] bg-gradient-to-tr from-primary-500/20 to-primary-500/5 border border-primary/20 shadow-xl shadow-primary/10"
              >
                <div className="absolute inset-0 rounded-[2.5rem] bg-primary/10 blur-xl opacity-50" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-16 w-16 text-primary animate-pulse"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" strokeWidth={3} strokeLinecap="round" />
                </svg>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white font-display">Ready to Scan</h2>
                <p className="text-sm text-muted-foreground px-4">
                  Point your camera at the vendor's QR code to register your visit and earn rewards.
                </p>
              </motion.div>

              {/* Location Badge */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold"
              >
                <MapPin className="h-3.5 w-3.5" />
                Location enabled
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartScanning}
                className="w-full max-w-xs flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Camera className="h-4.5 w-4.5" />
                Open Camera
              </motion.button>
            </motion.div>
          )}

          {/* Active Camera Scanning State */}
          {status === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-sm flex flex-col items-center"
            >
              {/* Rounded Scanner Frame */}
              <div className="relative w-80 h-80 rounded-[3rem] border border-white/10 bg-black overflow-hidden shadow-2xl shadow-black/80">
                {/* Real Video Component */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Glass Overlays and Finder Brackets */}
                <div className="absolute inset-0 border-[24px] border-black/40 pointer-events-none" />

                {/* Laser scan line animating */}
                <motion.div
                  className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_#f97316]"
                  initial={{ top: '15%' }}
                  animate={{ top: '85%' }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Reticle brackets */}
                <div className="absolute inset-6 pointer-events-none border border-white/20 rounded-2xl">
                  {/* Top Left Bracket */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-primary rounded-tl-xl" />
                  {/* Top Right Bracket */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-primary rounded-tr-xl" />
                  {/* Bottom Left Bracket */}
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-primary rounded-bl-xl" />
                  {/* Bottom Right Bracket */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-primary rounded-br-xl" />
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold tracking-wider uppercase text-primary animate-pulse">
                Scanning QR Code...
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Keep the code steady inside the scanner window
              </p>

              {/* Demo button to trigger instant success */}
              <button
                onClick={handleScanSuccess}
                className="mt-8 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/50 text-xs hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                Simulate Successful Scan
              </button>
            </motion.div>
          )}

          {/* Camera Permission Denied State */}
          {status === 'denied' && (
            <motion.div
              key="denied"
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-6 max-w-sm"
            >
              <motion.div
                variants={scaleIn}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500"
              >
                <AlertCircle className="h-10 w-10" />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display">Camera Access Denied</h3>
                <p className="text-xs text-rose-400 font-semibold px-6 leading-relaxed">
                  Camera access denied. Please enable camera permissions in your browser settings.
                </p>
                <p className="text-xs text-muted-foreground px-6 pt-1">
                  We need camera permissions to scan code stamps directly at the store location.
                </p>
              </motion.div>

              <div className="w-full flex flex-col gap-3">
                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartScanning}
                  className="py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Retry Request
                </motion.button>

                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleScanSuccess}
                  className="py-3.5 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Simulate Demo Scan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Successful Scan Celebration Modal ── */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.85 }}
              className="relative w-full max-w-md overflow-hidden bg-zinc-950 rounded-t-[2.5rem] border-t border-x border-white/8 shadow-2xl"
            >
              {/* Confetti Explosion */}
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {confettiDots.map(d => (
                  <ConfettiDot key={d.id} color={d.color} delay={d.delay} tx={d.tx} ty={d.ty} size={d.size} />
                ))}
              </div>

              {/* Backlight ambient glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-40 bg-[#7f0b18]/25 rounded-full blur-3xl pointer-events-none" />

              {/* Drag handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-9 h-[3px] rounded-full bg-white/15" />
              </div>

              <div className="px-6 pt-2 pb-8 relative z-10 text-center">

                {/* ── Fanned Card Stack ── */}
                <div className="relative w-full h-44 flex items-center justify-center mb-6 mt-2">
                  {/* Card 1 (Left tilt - Back) */}
                  <motion.div 
                    className="absolute w-24 h-36 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 shadow-xl flex flex-col justify-between p-3 select-none"
                    style={{ x: -45, y: 10, rotate: -15, zIndex: 10 }}
                    initial={{ opacity: 0, x: 0, rotate: 0 }}
                    animate={{ opacity: 0.6, x: -45, y: 10, rotate: -15 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 15 }}
                  >
                    <div className="text-[8px] font-bold tracking-widest text-white/25">PASSPRIVÉ</div>
                    <div className="text-xl">🍰</div>
                    <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                  </motion.div>

                  {/* Card 2 (Right tilt - Back) */}
                  <motion.div 
                    className="absolute w-24 h-36 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 shadow-xl flex flex-col justify-between p-3 select-none"
                    style={{ x: 45, y: 10, rotate: 15, zIndex: 10 }}
                    initial={{ opacity: 0, x: 0, rotate: 0 }}
                    animate={{ opacity: 0.6, x: 45, y: 10, rotate: 15 }}
                    transition={{ type: 'spring', delay: 0.15, stiffness: 200, damping: 15 }}
                  >
                    <div className="text-[8px] font-bold tracking-widest text-white/25">PASSPRIVÉ</div>
                    <div className="text-xl">🍔</div>
                    <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                  </motion.div>

                  {/* Card 3 (Center - Front Active) */}
                  <motion.div 
                    className="absolute w-28 h-40 rounded-2xl bg-gradient-to-br from-[#7f0b18]/30 via-[#7f0b18]/15 to-transparent border border-[#7f0b18]/45 shadow-2xl shadow-[#7f0b18]/20 flex flex-col justify-between p-4 z-20 select-none"
                    style={{ y: 0, rotate: 0 }}
                    initial={{ scale: 0.5, y: 25, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.2, stiffness: 250, damping: 18 }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#ff4d62]">Loyalty Pass</span>
                      <span className="text-xs text-[#ff4d62]">✨</span>
                    </div>
                    <div className="text-3xl my-auto text-center">☕</div>
                    <div className="flex justify-between items-end gap-1.5">
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-bold text-white truncate">Bloom Café</p>
                        <p className="text-[8px] text-white/50 truncate">Scan &amp; Earn</p>
                      </div>
                      <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <motion.h3
                    className="text-2xl font-black text-white tracking-tight font-display"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.35 }}
                  >
                    Visit Logged!
                  </motion.h3>
                  <motion.p
                    className="text-xs text-white/50 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 0.35 }}
                  >
                    You earned a stamp at Bloom Café
                  </motion.p>
                </div>

                {/* Stamp Card Progress Area */}
                <motion.div
                  className="rounded-3xl border border-white/8 bg-white/5 p-5 mb-6 text-left"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Bloom Café</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">Scan &amp; Earn Reward</h4>
                    </div>
                    <span className="text-xs font-semibold text-primary">5 of 10 stamps</span>
                  </div>

                  {/* Stamp Dots Grid (Animates the 5th stamp) */}
                  <div className="flex flex-wrap gap-2.5 my-3">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const isNewStamp = i === 4
                      const isFilled = i < 4

                      return (
                        <motion.div
                          key={i}
                          initial={isNewStamp ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                          animate={isNewStamp ? { scale: 1, opacity: 1 } : {}}
                          transition={isNewStamp ? { delay: 0.75, type: 'spring', stiffness: 200, damping: 12 } : {}}
                          className={`h-7 w-7 rounded-full border-2 flex items-center justify-center relative ${isFilled || isNewStamp
                              ? 'bg-primary border-primary shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                              : 'bg-zinc-800 border-zinc-700'
                            }`}
                        >
                          {(isFilled || isNewStamp) && (
                            <motion.span
                              initial={isNewStamp ? { scale: 0.3 } : { scale: 1 }}
                              animate={isNewStamp ? { scale: 1 } : {}}
                              transition={{ delay: 0.85, type: 'spring' }}
                              className="text-[10px] font-bold text-white"
                            >
                              ☕
                            </motion.span>
                          )}
                          {isNewStamp && (
                            <motion.span
                              className="absolute inset-0 rounded-full border-2 border-white"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 1.8, opacity: 0 }}
                              transition={{ delay: 0.8, duration: 0.8 }}
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800 relative">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ scaleX: 4 / 10, originX: 0 }}
                        animate={{ scaleX: 5 / 10 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Done Button */}
                <motion.button
                  onClick={() => {
                    setStatus('idle')
                    router.push('/customer/home')
                  }}
                  className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/25"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.32 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Done
                </motion.button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

