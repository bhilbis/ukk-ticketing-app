import React from 'react'
import Image from 'next/image'
import Search from '../ui/search'

const HomeBanner = () => {
  return (
    <div className='flex'>
      <Image
        src='/home/banner-view.jpg'
        alt='home-banner'
        layout='fill'
        objectFit='cover'
        className='z-0'
      />
      <div className='absolute inset-0 flex flex-col justify-center items-center z-10 text-white'>
        <h1 className='text-4xl mb-4'>Hei, Sedang Mau Pergi Kemana</h1>
        <div className='px-10 py-2 rounded-xl border border-gray-300 bg-white text-black'>
          <Search/>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
