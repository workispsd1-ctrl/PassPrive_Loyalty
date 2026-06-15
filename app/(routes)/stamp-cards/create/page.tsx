'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import { useUnlock } from '../../_components/UnlockProvider'
import { getSavedLocations, publishStampCard, type SavedLocation } from '../actions'

/* ------------------------------------------------------------------ */
/*  Stamp icon options                                                 */
/* ------------------------------------------------------------------ */
const STAMP_ICONS = ['☕', '🍕', '🍔', '🍩', '🍦', '🧁', '🥐', '🍷', '🍺', '⭐', '❤️', '🎁', '✂️', '💅', '🐾', '🌮']

const TERMS_MAX = 500

const TERMS_PLACEHOLDER_RE = /\[[^\]]+\]/g

const DEFAULT_TERMS =
  'Collect [one] stamp for every [qualifying purchase/action/spend] and get [reward] after [X] stamps! ' +
  'Excludes [X, Y, Z]. Rewards expire [X days] from issue and cannot be reinstated. ' +
  'Rewards are non-transferable and not valid with other offers. ' +
  'We reserve the right to change these terms at any time.'

/** Fills in the placeholders we already know about from the card data. */
function buildTermsTemplate(stamps: number, rewards: Reward[]) {
  const mainReward = rewards.find((r) => r.type === 'main') ?? rewards[0]
  const expiringReward = rewards.find((r) => r.expiry)

  let text = DEFAULT_TERMS.replace('[X] stamps', `${stamps} stamps`)
  if (mainReward) text = text.replace('[reward]', mainReward.name)
  if (expiringReward) text = text.replace('[X days]', `${expiringReward.expiryDays} days`)
  return text
}

/* ------------------------------------------------------------------ */
/*  Small reusable field primitives                                    */
/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      {children}
      {error && <span className="text-xs font-medium text-destructive">{error}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-input bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'

function SettingRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted px-4 py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          value ? 'bg-primary' : 'bg-white/15'
        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step timeline                                                      */
/* ------------------------------------------------------------------ */
const STEPS = ['Card Design', 'Rewards', 'Location', 'Style', 'Publish']

const PRESET_LOGOS = ['☕', '🍰', '🍔', '🥐', '🍕', '🍦']

/* Contrast helpers — used to confirm a custom QR stays scannable. */
function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function relativeLuminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(a: string, b: string) {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const hi = Math.max(la, lb) + 0.05
  const lo = Math.min(la, lb) + 0.05
  return hi / lo
}

type StyleTemplate = 'plain' | 'poster' | 'customise'

const STYLE_TEMPLATES: { value: StyleTemplate; label: string; description: string }[] = [
  {
    value: 'plain',
    label: 'Plain QR',
    description: 'Clean and simple — just the QR code, ready to print.',
  },
  {
    value: 'poster',
    label: 'Poster Style',
    description: 'Headline, reward title & logo included — great for counters.',
  },
  {
    value: 'customise',
    label: 'Customise',
    description: 'Full control over colours, fonts, text and layout.',
  },
]

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : done
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-border bg-muted text-muted-foreground'
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  active ? 'text-foreground' : done ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`mx-3 h-px flex-1 rounded ${done ? 'bg-primary' : 'bg-border'}`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="truncate font-medium text-foreground">{value}</dd>
    </div>
  )
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile preview                                                     */
/* ------------------------------------------------------------------ */
function PhonePreview({
  cardName,
  stamps,
  description,
  icon,
  iconImage,
  businessName,
}: {
  cardName: string
  stamps: number
  description: string
  icon: string
  iconImage: string | null
  businessName: string
}) {
  const slots = Array.from({ length: Math.max(stamps, 1) })
  const renderStamp = () =>
    iconImage ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconImage} alt="" className="h-5 w-5 object-contain" />
    ) : (
      <span className="text-lg leading-none">{icon}</span>
    )

  return (
    <div className="relative mx-auto h-[620px] w-[300px] rounded-[2.5rem] border-[10px] border-neutral-800 bg-black shadow-2xl">
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-neutral-800" />
      {/* screen */}
      <div className="h-full w-full overflow-y-auto rounded-[1.8rem] bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 pb-6 pt-9">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {businessName || 'Your Business'}
        </p>

        {/* card */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white shadow-lg ring-1 ring-white/10">
          <p className="text-lg font-bold leading-tight">{cardName || 'Card Name'}</p>
          <p className="mt-0.5 text-xs text-white/80">
            Collect {stamps} stamps to earn your reward
          </p>

          {/* stamp grid */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {slots.map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-full border border-white bg-white shadow-sm"
              >
                {renderStamp()}
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-white/80">Start collecting today</p>
        </div>

        {description && (
          <p className="mt-4 whitespace-pre-wrap text-[13px] leading-relaxed text-neutral-300">{description}</p>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Rewards                                                             */
/* ------------------------------------------------------------------ */
type RewardType = 'main' | 'signup' | 'interim'

type Reward = {
  id: string
  type: RewardType
  name: string
  stamps: number
  expiry: boolean
  expiryDays: number
}

const REWARD_TYPES: { value: RewardType; label: string; hint: string }[] = [
  {
    value: 'main',
    label: 'Main',
    hint: 'This reward will issue automatically after the highest stamp is achieved.',
  },
  {
    value: 'signup',
    label: 'Sign up',
    hint: 'This reward will issue automatically when a member signs up.',
  },
  {
    value: 'interim',
    label: 'Interim',
    hint: 'This reward will issue automatically at a chosen stamp along the way.',
  },
]

function RewardModal({
  totalStamps,
  onClose,
  onSave,
}: {
  totalStamps: number
  onClose: () => void
  onSave: (reward: Reward) => void
}) {
  const [type, setType] = useState<RewardType>('main')
  const [name, setName] = useState('')
  const [atStamp, setAtStamp] = useState(Math.max(1, Math.floor(totalStamps / 2)))
  const [expiry, setExpiry] = useState(false)
  const [expiryDays, setExpiryDays] = useState(30)
  const [nameError, setNameError] = useState('')

  const stampsForType = type === 'signup' ? 0 : type === 'main' ? totalStamps : atStamp
  const activeHint = REWARD_TYPES.find((t) => t.value === type)?.hint

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Reward name is required.')
      return
    }
    onSave({
      id: crypto.randomUUID(),
      type,
      name: name.trim(),
      stamps: stampsForType,
      expiry,
      expiryDays,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-[#111114] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">Add a reward</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          {/* Reward type */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Reward type<span className="text-destructive"> *</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {REWARD_TYPES.map((t) => {
                const selected = type === t.value
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary ring-2 ring-ring/30'
                        : 'border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
            <p className="rounded-lg bg-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {activeHint}
            </p>
          </div>

          {/* Reward name */}
          <Field label="Reward name" required error={nameError}>
            <input
              className={`${inputClass} ${nameError ? 'border-destructive' : ''}`}
              placeholder="e.g. Free coffee"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (nameError) setNameError('')
              }}
            />
          </Field>

          {/* When it issues */}
          {type === 'interim' ? (
            <Field label="Issue after" hint="Choose at which stamp this reward is earned.">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, totalStamps - 1)}
                  className={`${inputClass} w-24`}
                  value={atStamp}
                  onChange={(e) =>
                    setAtStamp(Math.max(1, Math.min(totalStamps - 1, Number(e.target.value))))
                  }
                />
                <span className="text-sm text-muted-foreground">stamps</span>
              </div>
            </Field>
          ) : (
            <p className="text-sm text-muted-foreground">
              {type === 'signup' ? 'Issued on sign up' : `Issued after ${totalStamps} stamps`}
            </p>
          )}

          {/* Settings */}
          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <span className="text-sm font-semibold text-foreground">Settings</span>
            <div className="flex flex-col gap-3">
              <SettingRow label="Expiry" value={expiry} onChange={setExpiry} />
              {expiry && (
                <div className="ml-1 flex flex-col gap-1.5 border-l-2 border-primary/30 pl-4">
                  <span className="text-xs font-medium text-foreground">Expires after</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      className={`${inputClass} w-24`}
                      value={expiryDays}
                      onChange={(e) => setExpiryDays(Math.max(1, Number(e.target.value)))}
                    />
                    <span className="text-sm text-muted-foreground">days from issue</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-600"
          >
            Add reward
          </button>
        </div>
      </div>
    </div>
  )
}

const REWARD_TYPE_LABEL: Record<RewardType, string> = {
  main: 'Main',
  signup: 'Sign up',
  interim: 'Interim',
}

function rewardWhen(r: Reward) {
  if (r.type === 'signup') return 'on sign up'
  return `after ${r.stamps} stamp${r.stamps === 1 ? '' : 's'}`
}

/* ------------------------------------------------------------------ */
/*  Locations                                                          */
/* ------------------------------------------------------------------ */
type StoreLocation = {
  id: string
  businessName: string
  address: string
  logoImage: string | null
  logoPreset: string | null
}

function LocationModal({
  defaultBusinessName,
  savedLocations,
  onClose,
  onSave,
}: {
  defaultBusinessName: string
  savedLocations: SavedLocation[]
  onClose: () => void
  onSave: (location: StoreLocation) => void
}) {
  const [businessName, setBusinessName] = useState(defaultBusinessName)
  const [address, setAddress] = useState('')
  const [manualAddress, setManualAddress] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [logoPreset, setLogoPreset] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const logoRef = useRef<HTMLInputElement>(null)

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setLogoImage(reader.result as string)
      setLogoPreset(null)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const next: Record<string, string> = {}
    if (!businessName.trim()) next.businessName = 'Business name is required.'
    if (!address.trim() && !selectedLocation) next.address = 'Enter an address or choose a location.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const picked = savedLocations.find((l) => l.id === selectedLocation)
    onSave({
      id: crypto.randomUUID(),
      businessName: businessName.trim(),
      address: address.trim() || picked?.address || '',
      logoImage,
      logoPreset,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-[#111114] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">Add location</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
          <Field label="Business name" required error={errors.businessName}>
            <input
              className={`${inputClass} ${errors.businessName ? 'border-destructive' : ''}`}
              placeholder="Test Cafe"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Field>

          <Field label="Address" required error={errors.address}>
            <input
              className={`${inputClass} ${errors.address ? 'border-destructive' : ''}`}
              placeholder="Enter a location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Can&rsquo;t find your address?</span>
              <button
                type="button"
                onClick={() => setManualAddress((v) => !v)}
                className="font-semibold text-primary hover:underline"
              >
                {manualAddress ? 'Use search instead' : 'Enter manually'}
              </button>
            </div>
          </Field>

          {manualAddress && (
            <div className="ml-1 flex flex-col gap-3 border-l-2 border-primary/30 pl-4">
              <input className={inputClass} placeholder="Address line 1" />
              <input className={inputClass} placeholder="Address line 2 (optional)" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className={inputClass} placeholder="City / Town" />
                <input className={inputClass} placeholder="Postcode" />
              </div>
            </div>
          )}

          {savedLocations.length > 0 && (
            <Field label="Or choose from your locations">
              <select
                className={inputClass}
                value={selectedLocation}
                onChange={(e) => {
                  const id = e.target.value
                  setSelectedLocation(id)
                  const picked = savedLocations.find((l) => l.id === id)
                  if (picked) {
                    setBusinessName(picked.businessName)
                    setAddress(picked.address)
                    setErrors({})
                  }
                }}
              >
                <option value="">Select a saved location</option>
                {savedLocations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.businessName}
                    {l.address ? ` — ${l.address}` : ''}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Field label="Logo" hint="128×128px (square) — JPG / PNG / GIF only">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted text-3xl">
                {logoImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoImage} alt="Logo" className="h-full w-full object-cover" />
                ) : logoPreset ? (
                  logoPreset
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted-foreground">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </div>
              <button
                type="button"
                onClick={() => logoRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload
              </button>
              <input ref={logoRef} type="file" accept="image/jpeg,image/png,image/gif" className="hidden" onChange={onLogoUpload} />
            </div>

            <span className="mt-2 text-xs text-muted-foreground">Or select one of the below:</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_LOGOS.map((emoji) => {
                const selected = !logoImage && logoPreset === emoji
                return (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setLogoPreset(emoji)
                      setLogoImage(null)
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl transition-colors ${
                      selected
                        ? 'border-primary bg-primary/10 ring-2 ring-ring/40'
                        : 'border-border bg-muted hover:border-primary/50'
                    }`}
                  >
                    {emoji}
                  </button>
                )
              })}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-600"
          >
            Add location
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function CreateStampCardPage() {
  // Plan + the logged-in business's account name (from Supabase, via the layout).
  const { locationLimit, planName, openPlans, businessName: accountBusinessName } = useUnlock()

  const [cardName, setCardName] = useState('')
  const [stamps, setStamps] = useState(10)
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState(STAMP_ICONS[0])
  const [iconImage, setIconImage] = useState<string | null>(null)

  const [websiteUrl, setWebsiteUrl] = useState('')
  const [businessName, setBusinessName] = useState(accountBusinessName)
  const [terms, setTerms] = useState('')

  const [stampingDelay, setStampingDelay] = useState(false)
  const [stampingDelayValue, setStampingDelayValue] = useState(2)
  const [stampingDelayUnit, setStampingDelayUnit] = useState<'minutes' | 'hours' | 'days'>('days')
  const [reviewLink, setReviewLink] = useState(false)
  const [reviewUrl, setReviewUrl] = useState('')
  const [multiStamping, setMultiStamping] = useState(false)
  const [maxStampsPerVisit, setMaxStampsPerVisit] = useState(2)

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [rewards, setRewards] = useState<Reward[]>([])
  const [rewardModalOpen, setRewardModalOpen] = useState(false)

  // Location step — capped by the business's plan (location_limit from Supabase)
  const [locations, setLocations] = useState<StoreLocation[]>([])
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([])
  const limitReached = locations.length >= locationLimit

  useEffect(() => {
    getSavedLocations()
      .then(setSavedLocations)
      .catch(() => setSavedLocations([]))
  }, [])

  // Style step — a unique QR is generated per card (client-side, so it can be
  // downloaded and saved to Supabase later without depending on any third party)
  const [styleTemplate, setStyleTemplate] = useState<StyleTemplate>('plain')
  const [published, setPublished] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const [cardId] = useState(() => crypto.randomUUID())
  const qrUrl = `https://app.passprive.com/c/${cardId}`
  const [qrSrc, setQrSrc] = useState('')

  // Custom colours (only applied for the "Customise" template)
  const [qrColor, setQrColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')

  const customising = styleTemplate === 'customise'
  const dark = customising ? qrColor : '#000000'
  const light = customising ? bgColor : '#ffffff'

  // Scannability: black-on-white = 21:1. Map contrast to a 0–100% visibility
  // score, and require the QR to be darker than its background (correct polarity).
  const ratio = contrastRatio(dark, light)
  const correctPolarity = relativeLuminance(dark) < relativeLuminance(light)
  const visibility = correctPolarity ? Math.min(100, Math.round((ratio / 7) * 100)) : 0
  const scannable = visibility >= 100

  useEffect(() => {
    QRCode.toDataURL(qrUrl, {
      width: 600,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark, light },
    })
      .then(setQrSrc)
      .catch(() => setQrSrc(''))
  }, [qrUrl, dark, light])

  const handleDownloadQr = () => {
    if (!qrSrc) return
    const link = document.createElement('a')
    link.href = qrSrc
    link.download = `${(cardName || 'stamp-card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-qr.png`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const fileRef = useRef<HTMLInputElement>(null)

  const validateStep1 = () => {
    const next: Record<string, string> = {}
    if (!cardName.trim()) next.cardName = 'Card name is required.'
    if (!businessName.trim()) next.businessName = 'Business name is required.'
    if (!stamps || stamps < 1) next.stamps = 'Enter the number of stamps to earn a reward.'
    if (!terms.trim()) {
      next.terms = 'Terms and conditions are required.'
    } else {
      const placeholders = terms.match(TERMS_PLACEHOLDER_RE)
      if (placeholders && placeholders.length > 0) {
        next.terms = `Replace the placeholder text in brackets: ${[...new Set(placeholders)].join('  ')}`
      }
    }
    if (reviewLink && !reviewUrl.trim()) next.reviewUrl = 'Add the review link URL or turn the setting off.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleContinue = async () => {
    if (step === 0 && !validateStep1()) {
      // bring the first error into view
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Final step — publish to Supabase.
    if (step === STEPS.length - 1) {
      if (publishing) return
      setPublishing(true)
      setPublishError('')
      try {
        await publishStampCard({
          name: cardName.trim(),
          stampsRequired: stamps,
          description,
          stampIcon: iconImage ? '' : icon,
          stampIconUrl: iconImage,
          websiteUrl,
          businessName: businessName.trim(),
          terms,
          stampingDelay,
          stampingDelayValue,
          stampingDelayUnit,
          reviewLink,
          reviewUrl,
          multiStamping,
          maxStampsPerVisit,
          styleTemplate,
          qrColor: dark,
          bgColor: light,
          qrToken: cardId,
          qrUrl,
          qrImageUrl: qrSrc || null,
          rewards: rewards.map((r) => ({
            type: r.type,
            name: r.name,
            stamps: r.stamps,
            expiry: r.expiry,
            expiryDays: r.expiryDays,
          })),
          locations: locations.map((l) => ({
            businessName: l.businessName,
            address: l.address,
            logoUrl: l.logoImage,
            logoEmoji: l.logoPreset,
          })),
        })
        setPublished(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        setPublishError('Could not publish your card. Please try again.')
      } finally {
        setPublishing(false)
      }
      return
    }
    // Entering the Rewards step for the first time — prompt to add a reward.
    if (step === 0 && rewards.length === 0) {
      setRewardModalOpen(true)
    }
    // Entering the Location step for the first time — prompt to add a location.
    if (step === 1 && locations.length === 0) {
      setLocationModalOpen(true)
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setIconImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  if (published) {
    return (
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card p-8 text-center backdrop-blur-xl">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground">Card published!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{cardName || 'Your stamp card'}</span> is live. Print
            the QR code below and keep it on the table — customers can scan it to join and collect stamps.
          </p>

          <div className="mt-6 flex h-44 w-44 items-center justify-center rounded-xl p-3" style={{ backgroundColor: light }}>
            {qrSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrSrc} alt="Card QR code" className="h-full w-full object-contain" />
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleDownloadQr}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-600"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download QR
            </button>
            <Link
              href="/stamp-cards"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-white/10"
            >
              Back to stamp cards
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/stamp-cards"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground no-underline transition-colors hover:text-foreground"
          aria-label="Back to stamp cards"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{STEPS[step]}</h2>
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length}
            {step === 0 && ' — design the front and back of your card'}
          </p>
        </div>
      </div>

      {/* Step timeline */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 backdrop-blur-xl">
        <Stepper current={step} />
      </div>

      {/* Body: form + preview */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Form column */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {step === 0 && (
          <>
          {/* FRONT OF CARD */}
          <SectionCard title="Front of Card">
            <Field label="Card name" required error={errors.cardName}>
              <input
                className={`${inputClass} ${errors.cardName ? 'border-destructive' : ''}`}
                placeholder="e.g. Coffee Lovers Club"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </Field>

            <Field label="Stamps" hint="Total stamps to earn a reward" error={errors.stamps}>
              <input
                type="number"
                min={1}
                max={50}
                className={`${inputClass} ${errors.stamps ? 'border-destructive' : ''}`}
                value={stamps}
                onChange={(e) => setStamps(Math.max(1, Number(e.target.value)))}
              />
            </Field>

            <Field label="Card description">
              <textarea
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Tell customers what they'll earn…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <Field
              label="Stamp icon"
              hint="Select an icon or upload your own image to represent a stamp."
            >
              <div className="flex flex-wrap gap-2">
                {STAMP_ICONS.map((emoji) => {
                  const selected = !iconImage && emoji === icon
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setIcon(emoji)
                        setIconImage(null)
                      }}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border text-xl transition-colors ${
                        selected
                          ? 'border-primary bg-primary/10 ring-2 ring-ring/40'
                          : 'border-border bg-muted hover:border-primary/50'
                      }`}
                    >
                      {emoji}
                    </button>
                  )
                })}

                {/* upload tile */}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
                    iconImage
                      ? 'border-primary bg-primary/10 ring-2 ring-ring/40'
                      : 'border-dashed border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                  aria-label="Upload custom stamp icon"
                >
                  {iconImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={iconImage} alt="Custom stamp" className="h-7 w-7 rounded object-contain" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  )}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
              </div>
            </Field>
          </SectionCard>

          {/* BACK OF CARD */}
          <SectionCard title="Back of Card">
            <Field label="Website URL">
              <input
                className={inputClass}
                placeholder="https://yourbusiness.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </Field>
            <Field label="Business name" required error={errors.businessName} hint="Pulled from your account — edit if your card should show a different name.">
              <input
                className={`${inputClass} ${errors.businessName ? 'border-destructive' : ''}`}
                placeholder="Your Business Ltd."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </Field>
            <Field label="Terms and conditions" required error={errors.terms}>
              <button
                type="button"
                onClick={() => setTerms(buildTermsTemplate(stamps, rewards).slice(0, TERMS_MAX))}
                className="-mt-0.5 mb-1 inline-flex w-fit items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Insert T&amp;Cs Template
              </button>
              <textarea
                rows={5}
                maxLength={TERMS_MAX}
                className={`${inputClass} resize-y ${errors.terms ? 'border-destructive' : ''}`}
                placeholder="Enter the terms and conditions for this stamp card…"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Please replace placeholder text in brackets.</span>
                <span
                  className={`text-xs tabular-nums ${
                    terms.length >= TERMS_MAX ? 'text-destructive' : 'text-muted-foreground'
                  }`}
                >
                  {terms.length}/{TERMS_MAX} characters
                </span>
              </div>
            </Field>
          </SectionCard>

          {/* ADVANCED CARD SETTINGS */}
          <SectionCard
            title="Advanced Card Settings"
            description="Additional settings will become available in edit mode after you publish your Stamp Card for testing."
          >
            <div className="flex flex-col gap-3">
              <SettingRow label="Stamping time delay" value={stampingDelay} onChange={setStampingDelay} />
              {stampingDelay && (
                <div className="ml-1 flex flex-col gap-1.5 border-l-2 border-primary/30 pl-4">
                  <span className="text-xs font-medium text-foreground">Minimum time between stamps</span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      className={`${inputClass} w-28`}
                      value={stampingDelayValue}
                      onChange={(e) => setStampingDelayValue(Math.max(1, Number(e.target.value)))}
                    />
                    <select
                      className={`${inputClass} w-32`}
                      value={stampingDelayUnit}
                      onChange={(e) => setStampingDelayUnit(e.target.value as 'minutes' | 'hours' | 'days')}
                    >
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                        <option value="days">Days</option>
                    </select>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    A member can only collect another stamp after this delay.
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <SettingRow label="Leave review link" value={reviewLink} onChange={setReviewLink} />
              {reviewLink && (
                <div className="ml-1 flex flex-col gap-1.5 border-l-2 border-primary/30 pl-4">
                  <span className="text-xs font-medium text-foreground">Review link URL</span>
                  <input
                    type="url"
                    className={`${inputClass} ${errors.reviewUrl ? 'border-destructive' : ''}`}
                    placeholder="https://g.page/r/your-business/review"
                    value={reviewUrl}
                    onChange={(e) => setReviewUrl(e.target.value)}
                  />
                  {errors.reviewUrl ? (
                    <span className="text-xs font-medium text-destructive">{errors.reviewUrl}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Members will be prompted to leave a review at this link.
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <SettingRow label="Member multi-stamping" value={multiStamping} onChange={setMultiStamping} />
              {multiStamping && (
                <div className="ml-1 flex flex-col gap-1.5 border-l-2 border-primary/30 pl-4">
                  <span className="text-xs font-medium text-foreground">Max stamps per visit</span>
                  <input
                    type="number"
                    min={1}
                    max={stamps}
                    className={`${inputClass} w-28`}
                    value={maxStampsPerVisit}
                    onChange={(e) => setMaxStampsPerVisit(Math.max(1, Math.min(stamps, Number(e.target.value))))}
                  />
                  <span className="text-xs text-muted-foreground">
                    Allow members to collect multiple stamps in a single visit, up to this limit.
                  </span>
                </div>
              )}
            </div>
          </SectionCard>
          </>
          )}

          {step === 1 && (
            <SectionCard title="My rewards" description="Make these something your customers will love!">
              <p className="rounded-lg border border-border bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> In-app vouchers are generated by
                default. If you don&rsquo;t want these, please proceed by adding rewards and then contact us.
              </p>

              {/* Reward list */}
              {rewards.length > 0 && (
                <div className="flex flex-col gap-3">
                  {rewards.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <polyline points="20 12 20 22 4 22 4 12" />
                            <rect x="2" y="7" width="20" height="5" />
                            <line x1="12" y1="22" x2="12" y2="7" />
                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                            {REWARD_TYPE_LABEL[r.type]} Reward
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {r.name} {rewardWhen(r)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {r.expiry ? `Expires ${r.expiryDays} days from issue` : 'No expiry'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRewards((list) => list.filter((x) => x.id !== r.id))}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-destructive"
                        aria-label={`Remove ${r.name}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add reward */}
              <button
                type="button"
                onClick={() => setRewardModalOpen(true)}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add reward
              </button>
            </SectionCard>
          )}

          {step === 2 && (
            <SectionCard title="Locations" description="Where can your customers collect stamps?">
              {/* Location list */}
              {locations.length > 0 && (
                <div className="flex flex-col gap-3">
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-xl text-primary">
                          {loc.logoImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={loc.logoImage} alt="" className="h-full w-full object-cover" />
                          ) : loc.logoPreset ? (
                            loc.logoPreset
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{loc.businessName}</p>
                          <p className="text-xs text-muted-foreground">{loc.address}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLocations((list) => list.filter((x) => x.id !== loc.id))}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-destructive"
                        aria-label={`Remove ${loc.businessName}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add location — or upgrade prompt when the plan limit is reached */}
              {limitReached ? (
                <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-primary">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <p className="text-sm text-foreground">
                      Your <span className="font-semibold">{planName}</span> plan only supports {locationLimit}{' '}
                      {locationLimit === 1 ? 'main location' : 'locations'}.{' '}
                      {planName === 'Pro'
                        ? 'Contact us to add more branches.'
                        : 'Upgrade to Growth or Pro plan to add branches.'}
                    </p>
                  </div>
                  {planName !== 'Pro' && (
                    <button
                      type="button"
                      onClick={openPlans}
                      className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-600"
                    >
                      Upgrade plan
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add location
                </button>
              )}
            </SectionCard>
          )}

          {step === 3 && (
            <SectionCard
              title="Choose a Style"
              description="Pick a template to get started — you can always customise later in settings."
            >
              <div className="flex flex-col gap-3">
                {STYLE_TEMPLATES.map((t) => {
                  const selected = styleTemplate === t.value
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setStyleTemplate(t.value)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-primary bg-primary/10 ring-2 ring-ring/30'
                          : 'border-border bg-muted hover:border-primary/50'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected ? 'border-primary' : 'border-muted-foreground/40'
                        }`}
                      >
                        {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </span>
                      <span>
                        <span className={`block text-sm font-semibold ${selected ? 'text-primary' : 'text-foreground'}`}>
                          {t.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{t.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Customise — colour controls + scannability check */}
              {customising && (
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-foreground">QR colour</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent"
                        />
                        <span className="font-mono text-xs uppercase text-muted-foreground">{qrColor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-foreground">Background colour</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent"
                        />
                        <span className="font-mono text-xs uppercase text-muted-foreground">{bgColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visibility meter */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">Scan visibility</span>
                      <span className={`font-semibold ${scannable ? 'text-success' : 'text-warning'}`}>
                        {visibility}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all ${scannable ? 'bg-success' : 'bg-warning'}`}
                        style={{ width: `${visibility}%` }}
                      />
                    </div>
                    <p className={`text-xs ${scannable ? 'text-success' : 'text-warning'}`}>
                      {scannable
                        ? 'Great contrast — this QR is fully scannable and ready to save.'
                        : correctPolarity
                          ? 'Low contrast — increase the difference between the colours to reach 100%.'
                          : 'The QR colour must be darker than the background to stay scannable.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Preview + download */}
              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted p-6">
                {styleTemplate === 'poster' ? (
                  /* Poster layout */
                  <div className="w-full max-w-xs rounded-xl bg-white p-6 text-center shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 text-3xl">
                      {locations[0]?.logoImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={locations[0].logoImage} alt="" className="h-full w-full object-cover" />
                      ) : (
                        locations[0]?.logoPreset ?? icon
                      )}
                    </div>
                    <p className="mt-3 text-lg font-bold leading-tight text-neutral-900">
                      {cardName || 'Your Stamp Card'}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
                      {rewards.find((r) => r.type === 'main')?.name ?? rewards[0]?.name ?? 'Earn a reward'}
                    </p>
                    {qrSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={qrSrc} alt="Card QR code" className="mx-auto mt-4 h-44 w-44 object-contain" />
                    ) : (
                      <div className="mx-auto mt-4 flex h-44 w-44 items-center justify-center text-xs text-neutral-400">
                        Generating…
                      </div>
                    )}
                    <p className="mt-2 text-xs text-neutral-500">Scan to join &amp; collect stamps</p>
                  </div>
                ) : (
                  /* Plain / Customise QR — shown big */
                  <div
                    className="flex h-56 w-56 items-center justify-center rounded-lg p-3"
                    style={{ backgroundColor: light }}
                  >
                    {qrSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={qrSrc} alt="Unique card QR code" className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-xs text-neutral-400">Generating…</span>
                    )}
                  </div>
                )}

                <div className="w-full text-center">
                  <p className="text-sm font-semibold text-foreground">Your unique QR code</p>
                  <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
                    A unique QR code is generated for this card. Customers scan it to join and collect stamps.
                  </p>
                  <p className="mx-auto mt-2 max-w-md truncate rounded-md bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground">
                    {qrUrl}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    disabled={!qrSrc || (customising && !scannable)}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download QR
                  </button>
                  {customising && !scannable && (
                    <p className="mt-2 text-[11px] text-warning">
                      Reach 100% visibility to save and download this QR.
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    PNG — print it and keep it on the table. Saved to your account so you can download it anytime.
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {step === 4 && (
            <SectionCard
              title="Review &amp; Publish"
              description="Check everything looks right, then publish your stamp card."
            >
              {/* Card design */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Card design</h4>
                  <button type="button" onClick={() => setStep(0)} className="text-xs font-semibold text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 rounded-lg bg-muted p-4 text-sm sm:grid-cols-2">
                  <ReviewItem label="Card name" value={cardName || '—'} />
                  <ReviewItem label="Stamps" value={String(stamps)} />
                  <ReviewItem label="Business name" value={businessName || '—'} />
                  <ReviewItem label="Website" value={websiteUrl || '—'} />
                  <ReviewItem label="Stamp icon" value={iconImage ? 'Custom image' : icon} />
                  <ReviewItem label="Description" value={description || '—'} />
                </dl>
              </div>

              {/* Rewards */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Rewards</h4>
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="rounded-lg bg-muted p-4 text-sm">
                  {rewards.length === 0 ? (
                    <p className="text-muted-foreground">No rewards added.</p>
                  ) : (
                    <ul className="flex flex-col gap-1.5">
                      {rewards.map((r) => (
                        <li key={r.id} className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase text-primary">{REWARD_TYPE_LABEL[r.type]}</span>
                          <span className="text-foreground">{r.name}</span>
                          <span className="text-muted-foreground">· {rewardWhen(r)}</span>
                          <span className="text-muted-foreground">· {r.expiry ? `expires ${r.expiryDays}d` : 'no expiry'}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Locations */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Locations</h4>
                  <button type="button" onClick={() => setStep(2)} className="text-xs font-semibold text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="rounded-lg bg-muted p-4 text-sm">
                  {locations.length === 0 ? (
                    <p className="text-muted-foreground">No locations added.</p>
                  ) : (
                    <ul className="flex flex-col gap-1.5">
                      {locations.map((loc) => (
                        <li key={loc.id} className="text-foreground">
                          {loc.businessName}
                          <span className="text-muted-foreground"> · {loc.address}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Style + QR */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Style &amp; QR</h4>
                  <button type="button" onClick={() => setStep(3)} className="text-xs font-semibold text-primary hover:underline">
                    Edit
                  </button>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg p-1.5" style={{ backgroundColor: light }}>
                    {qrSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={qrSrc} alt="QR code" className="h-full w-full object-contain" />
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium capitalize text-foreground">{styleTemplate} template</p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{qrUrl}</p>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {step === 0 ? (
              <Link
                href="/stamp-cards"
                className="inline-flex items-center rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-white/10"
              >
                Cancel
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
            )}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <Link
                    href="/stamp-cards"
                    className="inline-flex items-center rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-white/10"
                  >
                    Save &amp; Exit
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={publishing}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
                >
                  {step === STEPS.length - 1
                    ? publishing
                      ? 'Publishing…'
                      : 'Publish'
                    : step === 0
                      ? 'Continue'
                      : 'Next'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
              {publishError && <p className="text-sm font-medium text-destructive">{publishError}</p>}
            </div>
          </div>
        </div>

        {/* Preview column */}
        <div className="lg:sticky lg:top-6 lg:w-[340px] lg:shrink-0">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Live preview
          </p>
          <PhonePreview
            cardName={cardName}
            stamps={stamps}
            description={description}
            icon={icon}
            iconImage={iconImage}
            businessName={businessName}
          />
        </div>
      </div>

      {rewardModalOpen && (
        <RewardModal
          totalStamps={stamps}
          onClose={() => setRewardModalOpen(false)}
          onSave={(reward) => {
            setRewards((list) => [...list, reward])
            setRewardModalOpen(false)
          }}
        />
      )}

      {locationModalOpen && (
        <LocationModal
          defaultBusinessName={businessName}
          savedLocations={savedLocations}
          onClose={() => setLocationModalOpen(false)}
          onSave={(location) => {
            setLocations((list) => [...list, location])
            setLocationModalOpen(false)
          }}
        />
      )}
    </main>
  )
}
