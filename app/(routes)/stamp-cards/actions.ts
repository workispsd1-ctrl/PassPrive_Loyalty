'use server'

import { createClient } from '@/lib/supabase/server'
import { resolveCurrentBusiness } from '@/lib/supabase/current-business'

export type SavedLocation = { id: string; businessName: string; address: string }

export type StampCardSummary = {
  id: string
  name: string
  businessName: string | null
  stampsRequired: number
  published: boolean
  qrImageUrl: string | null
  stampIcon: string | null
  locationCount: number
  rewardCount: number
  createdAt: string
}

/** All stamp cards for the current business, newest first. */
export async function getStampCards(): Promise<StampCardSummary[]> {
  const business = await resolveCurrentBusiness()
  if (!business) return []

  const supabase = await createClient()
  const { data } = await supabase
    .from('stamp_cards')
    .select(
      'id, name, business_name, stamps_required, published, qr_image_url, stamp_icon, created_at, card_locations(count), rewards(count)',
    )
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    businessName: c.business_name,
    stampsRequired: c.stamps_required,
    published: c.published,
    qrImageUrl: c.qr_image_url,
    stampIcon: c.stamp_icon,
    locationCount: c.card_locations?.[0]?.count ?? 0,
    rewardCount: c.rewards?.[0]?.count ?? 0,
    createdAt: c.created_at,
  }))
}

export type PublishCardInput = {
  name: string
  stampsRequired: number
  description: string
  stampIcon: string
  stampIconUrl: string | null
  websiteUrl: string
  businessName: string
  terms: string
  stampingDelay: boolean
  stampingDelayValue: number | null
  stampingDelayUnit: string | null
  reviewLink: boolean
  reviewUrl: string | null
  multiStamping: boolean
  maxStampsPerVisit: number | null
  styleTemplate: string
  qrColor: string
  bgColor: string
  qrToken: string
  qrUrl: string
  qrImageUrl: string | null
  rewards: {
    type: string
    name: string
    stamps: number
    expiry: boolean
    expiryDays: number | null
  }[]
  locations: {
    businessName: string
    address: string
    logoUrl: string | null
    logoEmoji: string | null
  }[]
}

/**
 * Persist a published stamp card (plus its rewards and locations) to Supabase
 * for the current business. Returns the new card id.
 */
export async function publishStampCard(input: PublishCardInput): Promise<{ id: string }> {
  const business = await resolveCurrentBusiness()
  if (!business) throw new Error('No business found to publish to')

  const supabase = await createClient()

  // 1) the card
  const { data: card, error: cardError } = await supabase
    .from('stamp_cards')
    .insert({
      business_id: business.id,
      name: input.name,
      stamps_required: input.stampsRequired,
      description: input.description || null,
      stamp_icon: input.stampIcon || null,
      stamp_icon_url: input.stampIconUrl,
      website_url: input.websiteUrl || null,
      business_name: input.businessName || null,
      terms: input.terms || null,
      stamping_delay: input.stampingDelay,
      stamping_delay_value: input.stampingDelay ? input.stampingDelayValue : null,
      stamping_delay_unit: input.stampingDelay ? input.stampingDelayUnit : null,
      review_link: input.reviewLink,
      review_url: input.reviewLink ? input.reviewUrl : null,
      multi_stamping: input.multiStamping,
      max_stamps_per_visit: input.multiStamping ? input.maxStampsPerVisit : null,
      style_template: input.styleTemplate,
      qr_color: input.qrColor,
      bg_color: input.bgColor,
      qr_token: input.qrToken,
      qr_url: input.qrUrl,
      qr_image_url: input.qrImageUrl,
      published: true,
    })
    .select('id')
    .single()

  if (cardError || !card) throw new Error(cardError?.message ?? 'Could not save the card')

  // 2) rewards
  if (input.rewards.length > 0) {
    const { error } = await supabase.from('rewards').insert(
      input.rewards.map((r) => ({
        card_id: card.id,
        type: r.type,
        name: r.name,
        stamps: r.stamps,
        expiry: r.expiry,
        expiry_days: r.expiry ? r.expiryDays : null,
      })),
    )
    if (error) throw new Error(error.message)
  }

  // 3) locations
  if (input.locations.length > 0) {
    const { error } = await supabase.from('card_locations').insert(
      input.locations.map((l) => ({
        card_id: card.id,
        business_name: l.businessName,
        address: l.address || null,
        logo_url: l.logoUrl,
        logo_emoji: l.logoEmoji,
      })),
    )
    if (error) throw new Error(error.message)
  }

  return { id: card.id }
}

/**
 * Locations the current business has already saved (across its stamp cards),
 * for the "choose from your locations" picker. Empty until the business has
 * published a card with locations.
 */
export async function getSavedLocations(): Promise<SavedLocation[]> {
  const business = await resolveCurrentBusiness()
  if (!business) return []

  const supabase = await createClient()
  const { data } = await supabase
    .from('card_locations')
    .select('id, business_name, address, stamp_cards!inner(business_id)')
    .eq('stamp_cards.business_id', business.id)
    .order('created_at', { ascending: false })

  // de-duplicate by name + address
  const seen = new Set<string>()
  const out: SavedLocation[] = []
  for (const row of data ?? []) {
    const key = `${row.business_name}|${row.address ?? ''}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ id: row.id, businessName: row.business_name, address: row.address ?? '' })
  }
  return out
}
