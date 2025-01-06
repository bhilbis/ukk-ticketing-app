"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../ui/search'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${scrolled ? 'fixed bg-white text-black shadow-md' : 'relative bg-transparent backdrop-blur-sm text-white'} py-2 top-0 w-full z-50`}>

      <div className={`flex justify-between items-center transition-all duration-300 py-2 ${
        scrolled ? 
        '' : '' 
        } py-1 px-5 sm:px-20`
      }>

      <div className='flex items-center gap-4'>
        <Link 
          href={'/'} 
          className='rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center hover:bg-[#383838] dark:hover:bg-blue-600 h-10 px-4'
        >
          <Image
            className={`${scrolled ? '' : 'dark:invert'}`}
            src="/travel-ticket-logo.svg"
            alt='Vercel Logo'
            width={50}
            height={50}
          />
        </Link>

        {scrolled && (
          <div className='hidden md:block px-5 py-2 rounded-xl border border-gray-300'>
            <Search />
          </div>
        )}
      </div>

        <div className='flex items-center font-medium gap-x-8'>
          <Link href={'#'}>Ticketing Rewards</Link>
          <Link href={'#'}>Your Orders</Link>
          <Link href={'#'}>Masuk</Link>
          <Link href={'#'} className={`px-4 py-2 rounded-md ${
            scrolled ? 'bg-blue-500 text-white' : 'bg-blue-700 hover:bg-blue-600 text-white'
          }`}>
            Daftar
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Navbar
