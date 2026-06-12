'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

const TABS = ['Social Media', 'Print Resources', 'Staff Resources', 'Business Growth'] as const
type Tab = (typeof TABS)[number]

type Layout = 'centered' | 'bold' | 'minimal'

type CardConfig = {
  businessName: string
  tagline: string
  headline: string
  bgColor: string
  layout: Layout
}

type ResourceItem = {
  id: number
  title: string
  dimensions: string
  isCustomizable?: boolean
  isNew?: boolean
  Preview: () => React.ReactNode
}

// ─── Canvas renderer ──────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawCard(canvas: HTMLCanvasElement, cfg: CardConfig) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = 1080, H = 1080
  canvas.width = W
  canvas.height = H

  // Background
  ctx.fillStyle = cfg.bgColor
  ctx.fillRect(0, 0, W, H)

  if (cfg.layout === 'centered') {
    // Soft decorative circles
    ctx.globalAlpha = 0.13
    ctx.fillStyle = '#ffffff'
    ctx.beginPath(); ctx.arc(W * 0.87, H * 0.13, 310, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(W * 0.08, H * 0.9, 220, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1

    // White inner card
    ctx.fillStyle = 'rgba(255,255,255,0.88)'
    roundRect(ctx, W * 0.1, H * 0.33, W * 0.80, H * 0.34, 36)
    ctx.fill()

    // Loyalty dots row
    const dotColors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff']
    dotColors.forEach((c, i) => {
      ctx.beginPath()
      ctx.arc(W * 0.1 + 132 + i * 120, H * 0.435, 26, 0, Math.PI * 2)
      ctx.fillStyle = c + '99'
      ctx.fill()
    })

    // Business name
    ctx.fillStyle = cfg.bgColor
    ctx.font = `bold 68px system-ui, -apple-system, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(cfg.businessName, W / 2, H * 0.545)

    // Tagline
    ctx.font = `400 36px system-ui`
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.fillText(cfg.tagline, W / 2, H * 0.618)

    // Top headline
    ctx.font = `600 46px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.93)'
    ctx.fillText(cfg.headline, W / 2, H * 0.215)

    ctx.font = `300 34px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.fillText('& earn rewards!', W / 2, H * 0.285)

  } else if (cfg.layout === 'bold') {
    // Left accent band
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    ctx.fillRect(0, 0, W * 0.4, H)

    // Vertical word on the band
    ctx.save()
    ctx.translate(W * 0.2, H * 0.52)
    ctx.rotate(-Math.PI / 2)
    ctx.font = `bold 64px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('LOYALTY', 0, 0)
    ctx.restore()

    // Right content
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'

    ctx.font = `300 40px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.65)'
    ctx.fillText(cfg.headline, W * 0.46, H * 0.26)

    ctx.font = `bold 74px system-ui`
    ctx.fillStyle = '#ffffff'
    const words = cfg.businessName.split(' ')
    if (words.length > 1) {
      const half = Math.ceil(words.length / 2)
      ctx.fillText(words.slice(0, half).join(' '), W * 0.46, H * 0.43)
      ctx.fillText(words.slice(half).join(' '), W * 0.46, H * 0.525)
    } else {
      ctx.fillText(cfg.businessName, W * 0.46, H * 0.48)
    }

    ctx.font = `400 36px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.fillText(cfg.tagline, W * 0.46, H * 0.65)

    // Pill badge
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    roundRect(ctx, W * 0.46, H * 0.73, W * 0.44, 76, 38)
    ctx.fill()
    ctx.font = `600 28px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Earn rewards with every visit', W * 0.46 + W * 0.22, H * 0.73 + 38)

  } else {
    // Minimal
    ctx.globalAlpha = 0.07
    ctx.fillStyle = '#ffffff'
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 430, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.font = `300 40px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.fillText(cfg.headline.toUpperCase(), W / 2, H * 0.3)

    ctx.font = `bold 88px system-ui`
    ctx.fillStyle = '#ffffff'
    ctx.fillText(cfg.businessName, W / 2, H * 0.46)

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W * 0.22, H * 0.555)
    ctx.lineTo(W * 0.78, H * 0.555)
    ctx.stroke()

    ctx.font = `300 38px system-ui`
    ctx.fillStyle = 'rgba(255,255,255,0.65)'
    ctx.fillText(cfg.tagline, W / 2, H * 0.635)
  }

  // Bottom bar (shared)
  ctx.fillStyle = 'rgba(0,0,0,0.22)'
  ctx.fillRect(0, H - 86, W, 86)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.font = `500 26px system-ui`
  ctx.fillText('Download PassPrive  ·  App Store  ·  Google Play', W / 2, H - 42)

  // Logo pill top-left
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  roundRect(ctx, 30, 28, 188, 52, 26)
  ctx.fill()
  ctx.font = `bold 24px system-ui`
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('✦ PassPrive', 50, 54)
}

// ─── Color presets ────────────────────────────────────────────────────────────

const COLOR_PRESETS = [
  { label: 'Rose',    hex: '#e11d48' },
  { label: 'Orange',  hex: '#ea580c' },
  { label: 'Amber',   hex: '#b45309' },
  { label: 'Emerald', hex: '#059669' },
  { label: 'Blue',    hex: '#2563eb' },
  { label: 'Violet',  hex: '#7c3aed' },
  { label: 'Indigo',  hex: '#4f46e5' },
  { label: 'Slate',   hex: '#334155' },
  { label: 'Black',   hex: '#0f172a' },
]

const LAYOUTS: { key: Layout; label: string; desc: string }[] = [
  { key: 'centered', label: 'Centered',  desc: 'Classic card in the middle' },
  { key: 'bold',     label: 'Bold',      desc: 'Split accent band + large type' },
  { key: 'minimal',  label: 'Minimal',   desc: 'Clean & typographic' },
]

const DEFAULT_CONFIG: CardConfig = {
  businessName: 'My Business',
  tagline: 'Join our loyalty program today',
  headline: 'Join Our Loyalty Program',
  bgColor: '#e11d48',
  layout: 'centered',
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const LockIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─── Placeholder preview images ───────────────────────────────────────────────

const SocialPostPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-rose-50">
    <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-rose-200/60" />
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-rose-100/80" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="mx-4 rounded-xl bg-white/70 px-4 py-3 text-center shadow-sm">
        <div className="mb-1 flex justify-center gap-1">
          {[0,1,2].map(i => <div key={i} className="h-2.5 w-2.5 rounded-full bg-rose-300" />)}
        </div>
        <p className="text-[9px] font-semibold uppercase tracking-wide text-rose-500">Join our</p>
        <p className="text-[9px] font-bold uppercase tracking-wide text-rose-700">Loyalty Program</p>
        <p className="mt-0.5 text-[8px] text-rose-400">&amp; earn rewards!</p>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-rose-400 py-1.5">
      <div className="h-2 w-10 rounded-full bg-white/70" />
      <div className="h-2 w-10 rounded-full bg-white/70" />
    </div>
  </div>
)

const AppPostPreview = ({ duo = false }: { duo?: boolean }) => (
  <div className="relative h-full w-full overflow-hidden bg-rose-400">
    <div className="absolute inset-0 flex items-center justify-center gap-2">
      {duo ? (
        <>
          <div className="relative h-28 w-14 rounded-2xl border-2 border-white/80 bg-rose-50 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-white/60" />
            <div className="mt-4 flex flex-col items-center gap-1.5 px-1.5">
              {[0,1,2,3,4].map(i => <div key={i} className="h-1 w-full rounded-full bg-rose-200" />)}
            </div>
          </div>
          <div className="relative -ml-4 h-24 w-12 rounded-2xl border-2 border-white/60 bg-rose-50 shadow-md opacity-80">
            <div className="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-white/60" />
          </div>
        </>
      ) : (
        <div className="relative h-32 w-16 rounded-2xl border-2 border-white/80 bg-rose-50 shadow-xl">
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-white/60" />
          <div className="mt-4 flex flex-col items-center gap-1.5 px-2">
            {[0,1,2,3,4,5].map(i => <div key={i} className={`h-1 rounded-full bg-rose-200 ${i === 0 ? 'w-3/4' : 'w-full'}`} />)}
          </div>
        </div>
      )}
    </div>
    <div className="absolute inset-x-0 top-3 text-center">
      <p className="text-[8px] font-semibold uppercase tracking-widest text-white/80">Join Our Loyalty Program</p>
    </div>
    <div className="absolute inset-x-0 bottom-6 text-center">
      <p className="text-sm font-extrabold text-white drop-shadow">Download</p>
      <p className="text-base font-extrabold leading-none text-white drop-shadow">PassPrive!</p>
      <p className="mt-0.5 text-[8px] font-medium text-white/70">&amp; earn rewards!</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-1.5">
      {[0,1].map(i => (
        <div key={i} className="flex items-center gap-0.5 rounded bg-black/40 px-1.5 py-0.5">
          <div className="h-2 w-2 rounded-sm bg-white/80" />
          <div className="h-1.5 w-8 rounded-full bg-white/60" />
        </div>
      ))}
    </div>
  </div>
)

const GenericPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-gray-50">
    <div className="grid h-full w-full grid-cols-3 gap-1 p-2 opacity-70">
      {['bg-red-300','bg-yellow-300','bg-blue-300','bg-green-300','bg-purple-300','bg-pink-300','bg-orange-300','bg-teal-300','bg-rose-300'].map((c,i) => (
        <div key={i} className={`rounded ${c} flex items-center justify-center`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="h-4 w-4 opacity-80">
            <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        </div>
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full border-4 border-white bg-white/80 p-4 text-center shadow-md">
        <p className="text-[7px] font-bold uppercase tracking-wide text-gray-700">Join our</p>
        <p className="text-[7px] font-bold uppercase text-gray-900">Loyalty Program</p>
        <p className="text-[7px] text-gray-500">&amp; earn rewards!</p>
      </div>
    </div>
  </div>
)

const PhotoPreview = ({ tint = 'bg-stone-300' }: { tint?: string }) => (
  <div className={`relative h-full w-full overflow-hidden ${tint}`}>
    <div className="absolute inset-0 opacity-30">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[12.5%] border-b border-black/5 bg-linear-to-r from-black/5 to-transparent" />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full border-4 border-white/90 bg-white/80 p-3 text-center shadow-md">
        <div className="mb-0.5 flex justify-center">
          <div className="h-4 w-4 rounded-full border-2 border-rose-300 bg-rose-100" />
        </div>
        <p className="text-[6px] font-semibold uppercase tracking-wide text-gray-600">Join our</p>
        <p className="text-[6px] font-bold uppercase text-gray-800">Loyalty Program</p>
        <p className="text-[6px] text-gray-500">&amp; earn rewards!</p>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex justify-center bg-rose-500/80 py-1">
      <p className="text-[7px] font-bold text-white">Download <span className="font-extrabold">PassPrive!</span></p>
    </div>
  </div>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const socialTemplates: ResourceItem[] = [
  { id: 1, title: 'Social Media Post Template', dimensions: '(1080 × 1080px) PNG', isNew: true, isCustomizable: true, Preview: () => <SocialPostPreview /> },
]

const socialPosts: ResourceItem[] = [
  { id: 1, title: 'PassPrive App',        dimensions: '(1080 × 1080px) PNG', Preview: () => <AppPostPreview /> },
  { id: 2, title: 'PassPrive App (Duo)',  dimensions: '(1080 × 1080px) PNG', Preview: () => <AppPostPreview duo /> },
  { id: 3, title: 'Generic',              dimensions: '(1080 × 1080px) PNG', Preview: () => <GenericPreview /> },
  { id: 4, title: 'Café',                dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-amber-200" /> },
  { id: 5, title: 'Coffee Shop',          dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-stone-300" /> },
  { id: 6, title: 'Restaurant',           dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-slate-300" /> },
  { id: 7, title: 'Salon',               dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-pink-200" /> },
  { id: 8, title: 'Gym',                 dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-blue-200" /> },
  { id: 9, title: 'Retail',              dimensions: '(1080 × 1080px) PNG', Preview: () => <PhotoPreview tint="bg-purple-200" /> },
]

const printResources: ResourceItem[] = [
  { id: 1, title: 'A4 Poster',           dimensions: '(2480 × 3508px) PDF', Preview: () => <PhotoPreview tint="bg-emerald-100" /> },
  { id: 2, title: 'A5 Flyer',            dimensions: '(1748 × 2480px) PDF', Preview: () => <PhotoPreview tint="bg-teal-100" /> },
  { id: 3, title: 'Counter Card',        dimensions: '(900 × 600px) PDF',   Preview: () => <PhotoPreview tint="bg-cyan-100" /> },
  { id: 4, title: 'Window Cling',        dimensions: '(1000 × 1000px) PDF', Preview: () => <PhotoPreview tint="bg-sky-100" /> },
]

const staffResources: ResourceItem[] = [
  { id: 1, title: 'Staff Handbook',      dimensions: '(A4) PDF',            Preview: () => <PhotoPreview tint="bg-indigo-100" /> },
  { id: 2, title: 'Quick Start Guide',   dimensions: '(A5) PDF',            Preview: () => <PhotoPreview tint="bg-violet-100" /> },
  { id: 3, title: 'FAQ Sheet',           dimensions: '(A4) PDF',            Preview: () => <PhotoPreview tint="bg-fuchsia-100" /> },
]

const businessGrowth: ResourceItem[] = [
  { id: 1, title: 'Email Template',      dimensions: '(600px) HTML',        Preview: () => <PhotoPreview tint="bg-yellow-100" /> },
  { id: 2, title: 'SMS Template',        dimensions: 'Text',                Preview: () => <PhotoPreview tint="bg-orange-100" /> },
  { id: 3, title: 'Loyalty Guide',       dimensions: '(A4) PDF',            Preview: () => <PhotoPreview tint="bg-red-100" /> },
  { id: 4, title: 'Growth Playbook',     dimensions: '(A4) PDF',            Preview: () => <PhotoPreview tint="bg-rose-100" /> },
]

// ─── Card Customizer Modal ────────────────────────────────────────────────────

function CardCustomizer({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG)
  const [downloaded, setDownloaded] = useState(false)

  const update = useCallback(<K extends keyof CardConfig>(key: K, val: CardConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: val }))
  }, [])

  useEffect(() => {
    if (canvasRef.current) drawCard(canvasRef.current, config)
  }, [config])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${config.businessName.replace(/\s+/g, '-').toLowerCase()}-social-post.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    }, 'image/png')
  }

  function handleReset() {
    setConfig(DEFAULT_CONFIG)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl lg:flex-row max-h-[92vh]">

        {/* ── Left: controls ──────────────────────────────────────── */}
        <div className="flex flex-col gap-5 overflow-y-auto border-b border-white/10 bg-zinc-900 p-6 lg:w-80 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Customize Post</h2>
            <button type="button" aria-label="Close customizer" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <XIcon />
            </button>
          </div>

          {/* Business name */}
          <fieldset className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Business Name</label>
            <input
              type="text"
              value={config.businessName}
              maxLength={28}
              onChange={e => update('businessName', e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
              placeholder="My Business"
            />
          </fieldset>

          {/* Headline */}
          <fieldset className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Headline</label>
            <input
              type="text"
              value={config.headline}
              maxLength={40}
              onChange={e => update('headline', e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
              placeholder="Join Our Loyalty Program"
            />
          </fieldset>

          {/* Tagline */}
          <fieldset className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tagline</label>
            <input
              type="text"
              value={config.tagline}
              maxLength={48}
              onChange={e => update('tagline', e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
              placeholder="Join our loyalty program today"
            />
          </fieldset>

          {/* Background color */}
          <fieldset className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Background Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map(c => (
                <button
                  key={c.hex}
                  type="button"
                  title={c.label}
                  onClick={() => update('bgColor', c.hex)}
                  className={[
                    'h-8 w-8 rounded-full transition-all',
                    config.bgColor === c.hex
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-card'
                      : 'ring-1 ring-transparent',
                  ].join(' ')}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {/* Custom color input */}
              <label title="Custom color" className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                <input
                  type="color"
                  aria-label="Custom background color"
                  value={config.bgColor}
                  onChange={e => update('bgColor', e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex h-full w-full items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-muted-foreground">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Layout */}
          <fieldset className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Layout</label>
            <div className="flex flex-col gap-2">
              {LAYOUTS.map(l => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => update('layout', l.key)}
                  className={[
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                    config.layout === l.key
                      ? 'border-primary/60 bg-primary/8 text-foreground'
                      : 'border-border bg-muted/40 text-muted-foreground hover:border-border/80 hover:text-foreground',
                  ].join(' ')}
                >
                  <div className={`h-2 w-2 rounded-full ${config.layout === l.key ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                  <div>
                    <p className="text-sm font-medium leading-none">{l.label}</p>
                    <p className="mt-1 text-[11px] leading-none text-muted-foreground">{l.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-95"
            >
              <DownloadIcon />
              {downloaded ? 'Downloaded!' : 'Download PNG'}
            </button>
          </div>
        </div>

        {/* ── Right: live preview ──────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-950 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live Preview · 1080 × 1080px</p>
          <div className="w-full max-w-sm">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-xl">
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                className="block h-full w-full"
              />
            </div>
          </div>
          <p className="max-w-xs text-center text-[11px] text-muted-foreground">
            Changes reflect instantly. Click <strong>Download PNG</strong> to save the full 1080 × 1080 image.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Locked resource modal ────────────────────────────────────────────────────

function LockedModal({ title, onClose }: { title: string; onClose: () => void }) {
  const router = useRouter()

  function handleCreate() {
    onClose()
    router.push('/stamp-cards')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
          <XIcon />
        </button>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <LockIcon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This resource is locked. Create and publish your first Stamp Card to unlock all downloadable assets.
        </p>
        <button
          type="button"
          onClick={handleCreate}
          className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Create a Stamp Card
        </button>
      </div>
    </div>
  )
}

// ─── Resource card ────────────────────────────────────────────────────────────

function ResourceCard({ title, dimensions, isNew, isCustomizable, Preview, onClick }: ResourceItem & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98] cursor-pointer w-full"
    >
      {isCustomizable && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600">
          Customizable
        </span>
      )}
      {isNew && (
        <div className="absolute right-0 top-0 z-10">
          <span className="block rounded-bl-lg bg-orange-400 px-2.5 py-1 text-[10px] font-bold text-white">New</span>
        </div>
      )}
      <div className={`absolute z-10 text-muted-foreground/50 ${isNew ? 'right-14 top-2.5' : 'right-2.5 top-2.5'}`}>
        {isCustomizable
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          : <LockIcon />
        }
      </div>
      <div className="aspect-square overflow-hidden">
        <Preview />
      </div>
      <div className="border-t border-border bg-card p-3 text-center">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground/60">{dimensions}</p>
      </div>
    </button>
  )
}

// ─── Tab: Social Media ────────────────────────────────────────────────────────

function SocialMediaTab({ onCustomize, onLocked }: { onCustomize: () => void; onLocked: (title: string) => void }) {
  return (
    <div className="p-6">
      {/* Templates */}
      <section className="mb-8">
        <h2 className="mb-4 text-base font-semibold text-foreground">Templates</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {socialTemplates.map(t => (
            <ResourceCard key={t.id} {...t} onClick={t.isCustomizable ? onCustomize : () => onLocked(t.title)} />
          ))}
        </div>
      </section>

      {/* Posts */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-foreground">Posts</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {socialPosts.map(p => (
            <ResourceCard key={p.id} {...p} onClick={() => onLocked(p.title)} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Tab: Generic ─────────────────────────────────────────────────────────────

function GenericTab({ items, onLocked }: { items: ResourceItem[]; onLocked: (title: string) => void }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map(item => (
          <ResourceCard key={item.id} {...item} onClick={() => onLocked(item.title)} />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Social Media')
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const [lockedItem, setLockedItem] = useState<string | null>(null)

  return (
    <div className="flex flex-col overflow-auto">

      {/* Customizer modal */}
      {customizerOpen && <CardCustomizer onClose={() => setCustomizerOpen(false)} />}

      {/* Locked modal */}
      {lockedItem && <LockedModal title={lockedItem} onClose={() => setLockedItem(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4 sm:px-6 sm:pt-8 sm:pb-5 md:px-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Resources</h1>
        <button type="button" aria-label="Profile" className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-6 sm:gap-5 sm:px-6 sm:pb-8 md:px-8">

        {/* Demo banner */}
        <div className="flex flex-col gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-indigo-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Demo View
          </span>
          <p className="text-sm text-muted-foreground">
            Create &amp; publish a Stamp Card first to unlock this area.
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          A collection of editable and downloadable posters, social media assets and more to help you promote your PassPrive loyalty program.
        </p>

        {/* Tabs + content */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-xl">
          <div className="flex border-b border-border">
            {TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  'flex-1 whitespace-nowrap px-4 py-3.5 text-sm font-medium transition-colors',
                  activeTab === tab
                    ? '-mb-px border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Social Media' && (
            <SocialMediaTab
              onCustomize={() => setCustomizerOpen(true)}
              onLocked={setLockedItem}
            />
          )}
          {activeTab === 'Print Resources' && <GenericTab items={printResources} onLocked={setLockedItem} />}
          {activeTab === 'Staff Resources' && <GenericTab items={staffResources} onLocked={setLockedItem} />}
          {activeTab === 'Business Growth' && <GenericTab items={businessGrowth} onLocked={setLockedItem} />}
        </div>

      </div>
    </div>
  )
}
