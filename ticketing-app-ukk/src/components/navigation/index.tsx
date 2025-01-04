"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ['Your Activity', 'Penerbangan ke Surabaya', 'Tiket Kereta ke Yogyakarta']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='fixed top-0 w-full z-50'>

      <div className={`flex justify-between items-center transition-all duration-300 py-2 ${
        scrolled ? 
        'bg-white text-black shadow-md' : 'bg-blue-500 text-white' 
        } py-1 px-5 sm:px-20`
      }>

      <div className='flex items-center gap-4'>
        <Link 
          href={'/'} 
          className='rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center hover:bg-[#383838] dark:hover:bg-blue-600 h-10 px-4'
        >
          <Image
            className='dark:invert'
            src="/vercel.svg"
            alt='Vercel Logo'
            width={25}
            height={25}
          />
        </Link>

        {scrolled && (
          <div className='hidden md:block px-6 py-2 rounded-xl border border-gray-300'>
            <div className='flex items-center gap-x-2'>
              <Image
                src='/navigation/search.svg'
                alt='Search Icon'
                width={20}
                height={20}
              />
              <div className='animated-placeholder'>
                <input 
                  type="text" 
                  placeholder={placeholders[placeholderIndex]}
                  className='focus:outline-none bg-transparent ml-2'
                  />
              </div>
            </div>
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
