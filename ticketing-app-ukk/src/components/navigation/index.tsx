"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLogout } from '@/services/methods/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import DesktopNav from './DekstopNav'
import MobileNav from './HamburgerNav'
import Search from '../ui/search'
// import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const isMobile = useIsMobile();
  // const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hiddenPaths = ["/admin", "/login", "/daftar", '/reset-password', ];
  const logoutMutation = useLogout();
  // const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);

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

  const handleLogout = async() => {
      try {
        await logoutMutation.mutate();
        // logout();
        window.location.href = ('/login'); 
      } catch (error) {
        console.error("Logout error:", error);
      }
  };

  return (
    <div 
      className={`transition-all duration-300 ${
        pathname === "/" ? scrolled ? "fixed bg-white text-black shadow-md" : "fixed bg-transparent backdrop-blur-sm text-white"
          : "fixed bg-white text-black shadow-md"} py-2 top-0 left-0 z-50 w-full
    `}>

      <div className='flex justify-between items-center py-2 px-5 lg:px-20'>

      <div className='flex items-center gap-2 w-full'>
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
            !scrolled && <h1 className={`${isMobile ? 'hidden' : 'block'} sm:text-xl text-white`}>TravelLink</h1>
          ) : (
            <h1 className={`${isMobile ? 'hidden' : 'block'} sm:text-xl text-black`}>TravelLink</h1>
          )}
        </Link>

        
        {pathname === "/" && scrolled && (
            <>
            {isMobile ? (
                <div className='hidden xl:hidden lg:flex'>
                <Search />
              </div>
            ) : 
              <div className='hidden lg:flex px-5 py-2 rounded-xl lg:border border-gray-300 w-[30%] items-start'>
                <Search />
              </div>
            }
            </>
        )}
      </div>

        {
          isMobile ? <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} /> 
          : <DesktopNav scrolled={scrolled} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} dropdownRef={dropdownRef} handleLogout={handleLogout} pathname={pathname}/>}
      </div>
    </div>
  )
}

export default Navbar
