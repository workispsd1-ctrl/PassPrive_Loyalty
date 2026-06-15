'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface BusinessRow {
  id: string
  owner_id: string | null
  name: string
  created_at: string
  updated_at: string
  owner_name: string | null
  category: string | null
  phone: string | null
  logo_url: string | null
  location: string | null
  is_demo: boolean
  plan_id: string | null
  location_limit: number | null
  subscribed_at: string | null
}

export interface MemberRow {
  id: string
  phone: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  created_at: string
}

/** Fetch all registered partners from the businesses table. */
export async function fetchPartners(): Promise<BusinessRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching partners:', error)
    throw new Error(error.message)
  }

  return (data || []) as BusinessRow[]
}

/** Update subscription plan, location limit, and sandbox status for a partner. */
export async function updatePartnerSubscription(
  businessId: string,
  name: string,
  ownerName: string,
  phone: string,
  category: string,
  location: string,
  planId: 'basic' | 'growth' | 'pro' | null,
  locationLimit: number,
  isDemo: boolean
): Promise<{ ok: boolean }> {
  const supabase = await createClient()

  const subscribedAt = planId ? new Date().toISOString() : null

  const { error } = await supabase
    .from('businesses')
    .update({
      name: name,
      owner_name: ownerName,
      phone: phone,
      category: category,
      location: location,
      plan_id: planId,
      location_limit: locationLimit,
      is_demo: isDemo,
      subscribed_at: subscribedAt,
      updated_at: new Date().toISOString()
    })
    .eq('id', businessId)

  if (error) {
    console.error('Error updating partner subscription:', error)
    throw new Error(error.message)
  }

  // Clear caches to reflect updates
  revalidatePath('/superadmin/partners')
  revalidatePath('/superadmin/dashboard')
  revalidatePath('/superadmin/partner-requests')
  revalidatePath('/dashboard')

  return { ok: true }
}

export interface DashboardData {
  totalPartners: number
  activeSubscriptions: number
  monthlyRevenue: number
  pendingRequests: number
  totalMembers: number
  recentBusinesses: BusinessRow[]
}

/** Retrieve aggregated system analytics from Supabase. */
export async function getSuperadminDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()

  // 1. Fetch businesses
  const { data: bizData, error: bizError } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })

  if (bizError) {
    console.error('Error loading superadmin dashboard stats:', bizError)
    throw new Error(bizError.message)
  }

  // 2. Fetch members count
  const { count: memberCount, error: memberError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })

  if (memberError) {
    console.error('Error loading members count:', memberError)
    // Non-blocking fallback
  }

  const list = (bizData || []) as BusinessRow[]

  let totalPartners = list.length
  let activeSubscriptions = 0
  let monthlyRevenue = 0
  let pendingRequests = 0

  list.forEach((biz) => {
    if (!biz.plan_id) {
      pendingRequests++
    } else {
      activeSubscriptions++
      if (biz.plan_id === 'basic') monthlyRevenue += 499
      else if (biz.plan_id === 'growth') monthlyRevenue += 999
      else if (biz.plan_id === 'pro') monthlyRevenue += 1499
    }
  })

  return {
    totalPartners,
    activeSubscriptions,
    monthlyRevenue,
    pendingRequests,
    totalMembers: memberCount || 0,
    recentBusinesses: list.slice(0, 5)
  }
}

/** Fetch all registered members from the members table. */
export async function fetchMembers(): Promise<MemberRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching members:', error)
    throw new Error(error.message)
  }

  return (data || []) as MemberRow[]
}

/** Update member contact details in the database. */
export async function updateMemberContact(
  memberId: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): Promise<{ ok: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('members')
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    })
    .eq('id', memberId)

  if (error) {
    console.error('Error updating member:', error)
    throw new Error(error.message)
  }

  revalidatePath('/superadmin/members')
  revalidatePath('/superadmin/dashboard')

  return { ok: true }
}

/** Delete a member permanently from the members table. */
export async function deleteMember(memberId: string): Promise<{ ok: boolean }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId)

  if (error) {
    console.error('Error deleting member:', error)
    throw new Error(error.message)
  }

  revalidatePath('/superadmin/members')
  revalidatePath('/superadmin/dashboard')

  return { ok: true }
}

/** Delete a partner business permanently from the businesses table. */
export async function deletePartner(businessId: string): Promise<{ ok: boolean }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', businessId)

  if (error) {
    console.error('Error deleting partner:', error)
    throw new Error(error.message)
  }

  revalidatePath('/superadmin/partners')
  revalidatePath('/superadmin/dashboard')
  revalidatePath('/superadmin/partner-requests')
  revalidatePath('/dashboard')

  return { ok: true }
}
