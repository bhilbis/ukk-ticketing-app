"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className={`flex w-full bg-slate-800 justify-center items-center text-white py-56 ${
      pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/signup') ? 'hidden' : ''
    }`}>
        <h1>Ini Footer</h1>
    </div>
  )
}

export default Footer
