import React from 'react'
import Image from 'next/image'
import Search from '../ui/search'

const HomeBanner = () => {
  return (
      <div className='flex w-full z-10'>
        <Image
          src='/home/banner-view.jpg'
          alt='home-banner'
          width={1600}
          height={1000}
          className='z-0 h-[35rem] object-cover object-center'
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center z-10 text-white -mt-24'>
          <h1 className='text-4xl mb-10'>Hei, Sedang Mau Pergi Kemana</h1>
          <div className='px-5 py-2 rounded-xl border border-gray-300 bg-white text-black text-[1em] w-full'>
            <Search/>
          </div>
        </div>
      </div>
  )
}

export default HomeBanner
