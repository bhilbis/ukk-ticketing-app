"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../ui/search'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-all duration-300 ${scrolled ? 'fixed bg-white text-black shadow-md' : 'absolute bg-transparent backdrop-blur-sm text-white'} py-2 top-0 w-full z-20
      ${pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/signup') ? 'hidden' : ''}
    `}>

      <div className='flex justify-between items-center py-2 px-5 sm:px-20'>

      <div className='flex items-center gap-4 w-full'>
        <Link 
          href={'/'} 
          className='rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center h-10 px-4 gap-x-5'
        >
          <Image
            src="/travel-ticket-logo.svg"
            alt='Vercel Logo'
            width={50}
            height={50}
          />
          { !scrolled && (
            <h1 className='sm:text-xl text-white'>Travel Link</h1>
            )
          }
        </Link>

        {scrolled && (
          <div className='hidden md:block px-5 py-2 rounded-xl border border-gray-300 w-[50%]'>
            <Search />
          </div>
        )}
      </div>

        <div className='flex items-center font-medium gap-x-8 w-full justify-end'>
          {/* <Link href={'#'}>Ticketing Rewards</Link> */}
          <Link href={'#'}>Your Orders</Link>
          <Link href={'login'}>Masuk</Link>
          <Link href={'signup'} className={`px-4 py-2 rounded-md ${
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
