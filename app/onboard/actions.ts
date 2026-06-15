'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { BUSINESS_COOKIE } from './session'

/**
 * Test-phase "session": an httpOnly cookie ([[BUSINESS_COOKIE]]) holding the
 * current business id, set after the test OTP (1234) is entered. Once phone-OTP
 * auth is wired, the real Supabase session replaces this and the dashboard
 * reads auth.getUser().
 */
async function setBusinessCookie(businessId: string) {
  const cookieStore = await cookies()
  cookieStore.set(BUSINESS_COOKIE, businessId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

/** Find an existing (unclaimed/test) business by the login phone. */
export async function findBusinessByPhone(phone: string): Promise<string | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('businesses')
    .select('id')
    .eq('phone', phone)
    .is('owner_id', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data?.id ?? null
}

/** Sign in an existing business by phone; sets the session cookie if found. */
export async function signInBusiness(phone: string): Promise<{ exists: boolean }> {
  const id = await findBusinessByPhone(phone)
  if (id) await setBusinessCookie(id)
  return { exists: Boolean(id) }
}

export type RegisterBusinessInput = {
  businessName: string
  ownerName?: string
  category: string
  phone: string
  location?: string
}

/** Create the business in Supabase and start the session. Returns its id. */
export async function registerBusiness(input: RegisterBusinessInput): Promise<string> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('register_business', {
    p_business_name: input.businessName,
    p_owner_name: input.ownerName ?? '',
    p_category: input.category,
    p_phone: input.phone,
    p_location: input.location ?? '',
  })

  if (error) throw new Error(error.message)

  const id = data as unknown as string
  await setBusinessCookie(id)
  return id
}
