"use client"
import { AccordionAirplane } from '@/components/airplane/accordion-airplane'
import AirlaneAirplane from '@/components/airplane/airlane-airplane'
import AirplaneBanner from '@/components/airplane/banner-airplane'
import DiscountAirplane from '@/components/airplane/discount-airplane'
import HomeCarousel from '@/components/home/home-carousel'
import React, { useRef } from 'react'

const Page = () => {
  const discountSectionRef = useRef(null);
  return (
    <div>
      <AirplaneBanner />
      <div ref={discountSectionRef}>
        <HomeCarousel />
      </div>
      <DiscountAirplane />
      <AirlaneAirplane />
      <AccordionAirplane />
    </div>
  )
}

export default Page
