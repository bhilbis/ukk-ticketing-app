"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../ui/search'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '../ui/avatar'
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hiddenPaths = ["/admin", "/login", "/signup"];

  useEffect(() => {

    if (pathname === "/") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 110);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-trigger")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [pathname]);

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div 
      className={`transition-all duration-300 ${
        pathname === "/"
          ? scrolled
            ? "fixed bg-white text-black shadow-md"
            : "absolute bg-transparent backdrop-blur-sm text-white"
          : "fixed bg-white text-black shadow-md"} py-2 top-0 w-full z-20
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
          {pathname === "/" ? (
            !scrolled && <h1 className={`sm:text-xl text-white`}>Travel Link</h1>
          ) : (
            <h1 className="sm:text-xl text-black">Travel Link</h1>
          )}
        </Link>

        {pathname === "/" ? scrolled && (
          <div className='hidden md:block px-5 py-2 rounded-xl border border-gray-300 w-[50%]'>
            <Search />
          </div> )
          : null }
      </div>

        <div className='flex items-center font-medium gap-x-8 w-full justify-end'>
          <Link href={'#'}>Kupon</Link>
          <Link href={'login'}>Masuk</Link>
          <Link href={'signup'} className={`px-4 py-2 rounded-md ${
            scrolled ? 'bg-blue-base text-white' : 'bg-blue-dark hover:bg-blue-medium text-white'
          }`}>
            Daftar
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="dropdown-trigger">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  <Link
                    href="/myaccount"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <Link
                    href="/myaccount/your-orders"
                    className="block px-4 pt-2 pb-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Order Anda
                  </Link>
                  <hr className="my-1 mx-auto w-[90%] border-gray-200" />
                  <Link
                    href="/settings"
                    className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pengaturan
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Keluar
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Navbar
