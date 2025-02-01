"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../ui/search'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '../ui/avatar'
import { motion, AnimatePresence } from "framer-motion";
import { Logout } from '@/services/auth'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const hiddenPaths = ["/admin", "/login", "/daftar", '/reset-password', ];
  const [isOpen, setIsOpen] = useState(false);
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
        await Logout();
        router.push('/login'); 
      } catch (error) {
        console.error("Logout error:", error);
      }
  };

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
            !scrolled && <h1 className={`hidden sm:block sm:text-xl text-white`}>Travel Link</h1>
          ) : (
            <h1 className="hidden sm:block sm:text-xl text-black">Travel Link</h1>
          )}
        </Link>

        {pathname === "/" ? scrolled && (
          <div className='hidden md:block px-5 py-2 rounded-xl border border-gray-300 w-[50%]'>
            <Search />
          </div> )
          : null }
      </div>

        <div className='hidden lg:flex items-center font-medium gap-x-8 w-full justify-end'>
          <Link href={'#'}>Kupon</Link>
          <Link href={'login'}>Masuk</Link>
          <Link href={'daftar'} className={`px-4 py-2 rounded-md ${
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
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Keluar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Bottom Sheet Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-30"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg z-40 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <Link 
                    href="#" 
                    className="p-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Kupon
                  </Link>
                  <Link 
                    href="login" 
                    className="p-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link 
                    href="daftar" 
                    className="p-3 bg-blue-base text-white rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                  
                  <div className="border-t pt-4 mt-2">
                    <div className="flex items-center gap-4 p-3">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">User Name</p>
                        <p className="text-sm text-gray-500">user@email.com</p>
                      </div>
                    </div>
                    
                    <Link 
                      href="/myaccount" 
                      className="p-3 hover:bg-gray-100 rounded-lg block"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil
                    </Link>
                    <Link 
                      href="/myaccount/your-orders" 
                      className="p-3 hover:bg-gray-100 rounded-lg block"
                      onClick={() => setIsOpen(false)}
                    >
                      Order Anda
                    </Link>
                    <Link 
                      href="/settings" 
                      className="p-3 hover:bg-gray-100 rounded-lg block"
                      onClick={() => setIsOpen(false)}
                    >
                      Pengaturan
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full p-3 hover:bg-gray-100 rounded-lg text-left text-red-500"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar
