'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// This route is no longer used.
// Both signin and signup share /onboard/verify for OTP verification.
// This redirect ensures old links don't break.
export default function SignInVerifyRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const phone = searchParams.get('phone') || ''
    const type = searchParams.get('type') || 'business'
    router.replace(
      `/onboard/verify?phone=${encodeURIComponent(phone)}&type=${type}`
    )
  }, [router, searchParams])

  return null
}
