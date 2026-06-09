import React from 'react'
import Hero from '@/components/Hero'
import MobileDemo from '@/components/MobileDemo'
import WhyChooseUs from '@/components/WhyChooseUs'
import Grow from '@/components/Grow'
import Pricing from '@/components/Pricing'
import Enterprise from '@/components/Enterprise'
import Faq from '@/components/Faq'
import FinalCta from '@/components/FinalCta'

const page = () => {
  return (
    <main className="flex flex-col pb-24">
      <Hero />
      <MobileDemo />
      <WhyChooseUs />
      <Grow />
      <Pricing />
      <Enterprise />
      <Faq />
      <FinalCta />
    </main>
  )
}

export default page
