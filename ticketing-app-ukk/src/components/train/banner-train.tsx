import React from 'react'

const BannerTrain = () => {
  return (
    <div className="relative w-full z-10 sm:h-[20rem] md:h-[23rem] xl:h-[31rem] 1xl:h-[38rem] overflow-hidden bg-[url('/train/station1.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="relative 1xl:pb-6 h-full w-full flex justify-center overflow-hidden">
          <div className="inset-0 mt-6 flex flex-col items-center justify-center text-white px-8  max-w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-full  z-20  w-full">
            <h1 className="text-4xl font-bold mb-4">Penawaran Kereta Terbaik</h1>
            <p className="text-lg mb-8">Cari diskon dan keberangkatanmu disini hanya disini</p>
          </div>
        </div>
    </div>
  )
}

export default BannerTrain
