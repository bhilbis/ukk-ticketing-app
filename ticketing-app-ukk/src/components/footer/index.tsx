"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image';

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className={`flex px-[10rem] flex-col w-full text-black py-4 ${
      pathname.startsWith('/admin') || 
      pathname.startsWith('/login') || 
      pathname.startsWith('/signup') ? 'hidden' : ''
    }`}>

      <div className="flex justify-between items-start w-full py-4">
        <div className="space-y-4">
          <h4 className="font-bold">Support</h4>
          <ul className="space-y-2">
            <li>Manage your trips</li>
            <li>Contact Customer Service</li>
            <li>Safety Resource Center</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold">Discover</h4>
          <ul className="space-y-2">
            <li>Genius loyalty program</li>
            <li>Seasonal and holiday deals</li>
            <li>Travel articles</li>
            <li>TravelLink for Business</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold">Terms and Settings</h4>
          <ul className="space-y-2">
            <li>Privacy & cookies</li>
            <li>Terms & conditions</li>
            <li>Human Rights Statement</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold">About</h4>
          <ul className="space-y-2">
            <li>About TravelLink</li>
            <li>How We Work</li>
            <li>Sustainability</li>
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <Image
            src={"/travel-ticket-logo.svg"}
            alt="Travel Link"
            width={40}
            height={40}
          />
          <div className="flex items-center space-x-2 mt-4">
            <Image
              src={"/chat-icon.svg"}
              alt="Chat Icon"
              width={24}
              height={24}
            />
            <div>
              <p className="font-bold">WhatsApp</p>
              <a href="https://wa.me/0859183953992">+62 859183953992</a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Image
              src={"/mail-icon.svg"} 
              alt="Mail Icon"
              width={24}
              height={24}
            />
            <div>
              <p className="font-bold">Email</p>
              <p>abc@email.com</p>
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
