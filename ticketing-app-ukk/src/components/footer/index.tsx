"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const pathname = usePathname();

  const hiddenPaths = ['/admin', '/login', '/signup', '/myaccount']

  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className={`flex px-[10rem] flex-col w-full text-black py-4 ${
      pathname.startsWith('/admin') || 
      pathname.startsWith('/login') || 
      pathname.startsWith('/signup') ||
      pathname.startsWith('/profile')
      ? 'hidden' : ''
    }`}>

      <div className="flex justify-between items-start w-full py-4 mr-5 min-h-[16rem]">
        <div className="space-y-12">
          <h4 className="font-bold text-xl">Support</h4>
          <ul className="space-y-4 text-base">
            <li>Kelola perjalanan Anda</li>
            <li>Hubungi Layanan Pelanggan</li>
            <li>Pusat Sumber Daya Keselamatan</li>
          </ul>
        </div>
        <div className="space-y-12">
          <h4 className="font-bold text-xl">Discover</h4>
          <ul className="space-y-4 text-base">
            <li>Program loyalitas Genius</li>
            <li>Penawaran musiman dan liburan</li>
            <li>Artikel perjalanan</li>
            <li>TravelLink untuk Bisnis</li>
          </ul>
        </div>
        <div className="space-y-12">
          <h4 className="font-bold text-xl">Terms and Settings</h4>
          <ul className="space-y-4 text-base">
            <li>Privasi & cookie</li>
            <li>Syarat & ketentuan</li>
            <li>Pernyataan Hak Asasi Manusia</li>
          </ul>
        </div>
        <div className="space-y-12">
          <h4 className="font-bold text-xl">About</h4>
          <ul className="space-y-4 text-base">
            <li>Tentang TravelLink</li>
            <li>Cara Kerja Kami</li>
            <li>Keberlanjutan</li>
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <div className='flex space-x-4 items-center -mt-3'>
            <Image
              src={"/travel-ticket-logo.svg"}
              alt="Travel Link"
              width={50}
              height={50}
            />
            <h2 className='text-xl font-bold'>TravelLink</h2>
            </div>
          <div className="flex items-center space-x-4 mt-9">
            <Image
              src={"/home/chat-bubble-3d.svg"}
              alt="Chat Icon"
              width={60}
              height={60}
            />
            <div>
              <p className="font-bold">WhatsApp</p>
              <Link href="https://wa.me/0859183953992" target="_blank">+62 859183953992</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-5">
            <Image
              src={"/home/input-mail-3d.svg"} 
              alt="Mail Icon"
              width={60}
              height={60}
            />
            <div>
              <p className="font-bold">Email</p>
              <Link href='mailto:bhilbis@hotmail.com'>bhilbis@gmail.com</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-2 mt-4 w-full">
        &copy; 2025 TravelLink. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
