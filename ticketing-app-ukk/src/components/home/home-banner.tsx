import React from 'react'
import Image from 'next/image'
import Search from '../ui/search'

const HomeBanner = () => {
  return (
    // <div className='flex min-h-screen justify-center items-center text-center w-full'>
      <div className='flex w-full'>
        <Image
          src='/home/banner-view.jpg'
          alt='home-banner'
          width={1600}
          height={1000}
          className='z-0 h-[35rem] object-cover object-center'
        />
        <div className='absolute inset-0 flex flex-col justify-center items-center z-10 text-white -mt-24'>
          <h1 className='text-4xl mb-4'>Hei, Sedang Mau Pergi Kemana</h1>
          <div className='px-5 py-2 rounded-xl border border-gray-300 bg-white text-black w-[40%]'>
            <Search/>
          </div>
        </div>
      </div>
    // </div> 
  )
}

export default HomeBanner
