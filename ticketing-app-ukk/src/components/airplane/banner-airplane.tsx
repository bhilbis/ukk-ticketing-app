"use client"
import React, { useRef } from 'react'

const AirplaneBanner = () => {
  const discountSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToDiscount = () => {
    if (discountSectionRef.current) {
      const yOffset = -75;
      const element = discountSectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  return (
    <>
      <div className="relative w-full z-10 sm:h-[24rem] md:h-[27rem] xl:h-[35rem] 1xl:h-[42rem] overflow-hidden bg-[url('/airplane/clouds.jpg')] bg-cover bg-no-repeat">
        <div className="relative 1xl:pb-6 h-full w-full flex justify-center overflow-hidden">
          <div className="inset-0 mt-10 flex flex-col items-center justify-center text-white px-8 max-w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-full  z-20  w-full">
            <h1 className="text-4xl font-bold mb-4">Penawaran Terbang Terbaik</h1>
              <p className="text-lg mb-8">Cari diskon dan penerbanganmu hanya disini</p>
              <button 
                onClick={handleScrollToDiscount} 
                className="bg-blue-base hover:bg-blue-medium text-white py-2 px-4 rounded-md">Cari Penerbangan</button>
          </div>
        </div>
      </div>

      <div ref={discountSectionRef}>
      {/* Placeholder - this will be replaced in the parent component */}
      </div>
    </>
  )
}

export default AirplaneBanner
