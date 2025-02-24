import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';
import { useGetMy } from '@/services/methods/use-profile';
import { Skeleton } from '../ui/skeleton';

const DesktopNav = ({
    scrolled,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    handleLogout,
    pathname
  }: {
    scrolled: boolean;
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    handleLogout: () => void;
    pathname: string
  }) => {
    const { isLoggedIn, userLevel } = useAuth();
    const { data: userData, isLoading, error } = useGetMy(isLoggedIn);

    if (!isLoggedIn) {
      return (
        <div className='flex items-center justify-end font-medium gap-x-7 w-full'>
          <Link href='/login'>Masuk</Link>
          <Button variant={pathname === '/' ? scrolled ? 'sky' : 'secondary' : 'sky'} className={`rounded ${pathname !== '/' ? 'text-white' : ''}`}>
            <Link href='/daftar'>Daftar</Link>
          </Button>
        </div>
      );
    }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 px-4 py-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    )
  }

  if (error) {
    return <div className="px-4 py-3 text-red-500">Error loading user data</div>
  }

  // Pastikan struktur data sesuai dengan response API
  const user = {
    name: userData?.data?.passenger?.name_passenger || "User",
    avatar: userData?.data.user.avatar 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${userData.data.user.avatar}`
      : "https://github.com/shadcn.png"
  }

  return (
    <>
      <div className='flex items-center justify-end font-medium gap-x-7 w-full'>
        <Link href='/kereta-api'>Kereta Api</Link>
        {!isLoggedIn ? (
          <>
            <Link href='/login'>Masuk</Link>
            <Button variant={pathname === '/' ? scrolled ? 'sky' : 'secondary' : 'sky'} className={`rounded ${pathname !== '/' ? 'text-white' : ''}`}>
              <Link 
                href='/daftar'
                >
                Daftar
              </Link>
            </Button>
          </>
        ): (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-trigger bg-gray-500 rounded-xl"
            >
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
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
                  {userLevel && userLevel !==3 && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/myaccount/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  {userLevel && userLevel === 3 && (
                    <Link
                      href="/myaccount/bookings"
                      className="block px-4 pt-2 pb-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                      Order Anda
                    </Link>
                  )}
                  <hr className="my-1 mx-auto w-[90%] border-gray-200" />
                  <Link
                    href="/myaccount/settings"
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
        )}
      </div>
    </>
  ) 

};

export default DesktopNav;