"use client"

import React, { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  Copy,
  TicketPercent,
} from "lucide-react";
import { Swiper,  SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Coupon {
    type: 'kereta' | 'pesawat';
    discount: number;
    minPrice: number;
    code: string;
    category: "cashback" | "double deals" | "flash sale";
}

const coupons: Coupon[] = [
    { 
        type: 'kereta', 
        discount: 50, 
        minPrice: 500, 
        code: 'KERETA50',
        category: 'cashback'
    },
    { 
        type: 'pesawat', 
        discount: 25, 
        minPrice: 100, 
        code: 'PESAWAT25',
        category: 'flash sale'
    },
    { 
        type: 'kereta', 
        discount: 10, 
        minPrice: 75, 
        code: 'KERETA10',
        category: 'cashback'
    },
    { 
      type: 'kereta', 
      discount: 15, 
      minPrice: 80, 
      code: 'KERETA20',
      category: 'cashback'
    },
    { 
      type: 'pesawat', 
      discount: 20, 
      minPrice: 150, 
      code: 'PESAWAT15',
      category: 'flash sale'
    },
];

interface CouponCardProps {
    coupon: Coupon;
    onCopy: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onCopy }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulasi delay loading
    return () => clearTimeout(timer);
  }, []);

  const getCategoryColor = () => {
    switch (coupon.category) {
      case "cashback":
      return "bg-green-100 border-green-500 text-green-800";
      case "double deals":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "flash sale":
        return "bg-red-100 border-red-500 text-red-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  return !isLoading ? (
    <div className={`relative ${getCategoryColor()} rounded-lg px-6 py-4 items-center shadow-xl w-full sm:min-w-md mx-auto overflow-hidden`}>

      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 top-3"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 top-[27%] translate-y-1/2"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 bottom-3"></div>
      
      <div className="flex items-center">
        <div className="mr-4">
          {coupon.type === "kereta" ? (
            <span role="img" aria-label="kereta" className="text-4xl">🚆</span>
          ) : (
            <span role="img" aria-label="pesawat" className="text-4xl">✈️</span>
          )}
        </div>
        <div>
          <p className="text-lg font-bold">Diskon s.d {coupon.discount}%</p>
          <p className="text-sm text-gray-500">min. transaksi Rp {coupon.minPrice}Rb</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-2">
          <Copy className="w-5 h-5" />
          <p className="text-sm font-mono rounded-md">{coupon.code}</p>
        </div>
        <button
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onCopy(coupon.code)}
        >
          Copy
        </button>

      </div>
    </div>
  ) : (
    <div className="relative bg-gray-100 rounded-lg px-6 py-4 items-center shadow-xl w-full sm:min-w-md mx-auto overflow-hidden">
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-gray-200 border border-[#e5e7eb] z-10 top-3"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-gray-200 border border-[#e5e7eb] z-10 top-[27%] translate-y-1/2"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-gray-200 border border-[#e5e7eb] z-10 bottom-3"></div>

      <div className="flex">
        <Skeleton className="w-14 h-14 rounded-full mr-4" />
        <div>
          <Skeleton className="h-6 w-[9rem] mb-2" />
          <Skeleton className="h-4 w-[5rem]" />
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-6 w-[7rem]" />
        <Skeleton className="h-6 w-[7rem] rounded" />
      </div>
    </div>
  )
};

const HomeCoupon: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      {copied && (
        <div
          className="fixed top-24 right-4 bg-green-400 text-white text-sm pointer-events-none px-4 py-2 rounded-md shadow-md transition-all duration-300 scale-110 opacity-100 animate-fadeIn z-10"
        >
          Kode Tersalin!
        </div>
      )}


    <div className="py-10 px-[8rem] w-full bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col relative">

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <TicketPercent className="w-7 h-7 text-blue-base"/>
          <h2 className="text-xl font-bold mb-4 text-blue-base">Daftar Kupon yang Bisa Dipakai</h2>
        </div>
        <div className="flex gap-1 items-center">
          <Link href="/myaccount/coupons" className="text-blue-base">View More</Link>
          <ArrowRightIcon className="w-5 h-5 text-blue-base"/>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={15}
        navigation
        className="w-full"
      >
        {coupons.map((coupon, index) => (
          <SwiperSlide key={index}>
              <CouponCard coupon={coupon} onCopy={handleCopy} />
              
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

export default HomeCoupon;