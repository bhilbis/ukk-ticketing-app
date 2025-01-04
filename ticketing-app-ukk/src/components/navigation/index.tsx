import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center sticky bg-blue-300 text-white py-1 px-20'>
      <Link 
        href={'/'} 
        className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
      >
        <Image
          src="/vercel.svg"
          alt='Vercel Logo'
          width={30}
          height={30}
        />
      </Link>

      <div className='flex font-600 gap-x-8 py-2'>
        <span>Ticketing Rewards</span>
        <span>Your Orders</span>
        <span>Masuk</span>
        <span className='px-3 rounded-md bg-blue-800'>Daftar</span>
      </div>
    </div>
  )
}

export default Navbar
