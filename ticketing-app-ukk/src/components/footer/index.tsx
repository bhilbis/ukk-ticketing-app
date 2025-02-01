"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const pathname = usePathname();

  const hiddenPaths = ['/admin', '/login', '/daftar', '/reset-password','/myaccount']

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <>
      <hr className="bg-black"/>
      <div className="flex flex-col w-full text-black py-4 px-4 md:px-8 lg:px-16 xl:px-[8rem]">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10  w-full py-4">
          {/* Support Section */}
          <div className="space-y-6 lg:space-y-12">
            <h4 className="font-bold text-lg">Support</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm">
              <li>Kelola perjalanan Anda</li>
              <li>Hubungi Layanan Pelanggan</li>
              <li>Pusat Sumber Daya Keselamatan</li>
            </ul>
          </div>

          {/* Discover Section */}
          <div className="space-y-6 lg:space-y-12 mt-4 md:mt-0">
            <h4 className="font-bold text-lg">Discover</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm">
              <li>Program loyalitas Genius</li>
              <li>Penawaran musiman dan liburan</li>
              <li>Artikel perjalanan</li>
              <li>TravelLink untuk Bisnis</li>
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-6 lg:space-y-12 mt-4 md:mt-0">
            <h4 className="font-bold text-lg">About</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm">
              <li>Tentang TravelLink</li>
              <li>Cara Kerja Kami</li>
              <li>Syarat & ketentuan</li>
              <li>Keberlanjutan</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="sm:colspan-2 md:col-span-1 flex flex-col items-start mt-5 md:mt-0 xl:-mt-3">
            <div className="flex space-x-4 items-center">
              <Image
                src="/travel-ticket-logo.svg"
                alt="Travel Link"
                width={50}
                height={50}
              />
              <h2 className="text-lg font-bold">TravelLink</h2>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-7">
              <Image
                src="/home/chat-bubble-3d.svg"
                alt="Chat Icon"
                width={50}
                height={50}
              />
              <div>
                <p className="font-bold">WhatsApp</p>
                <Link href="https://wa.me/0859183953992" className="hover:underline underline-offset-4" target="_blank">
                  +62 859183953992
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-5">
              <Image
                src="/home/input-mail-3d.svg"
                alt="Mail Icon"
                width={50}
                height={50}
              />
              <div>
                <p className="font-bold">Email</p>
                <Link href="mailto:bhilbis@hotmail.com" className="hover:underline underline-offset-4">
                  bhilbis@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-2 mt-4 w-full">
          &copy; 2025 TravelLink. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Footer
