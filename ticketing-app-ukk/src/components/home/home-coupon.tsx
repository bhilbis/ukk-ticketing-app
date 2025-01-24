"use client"

import React, { useState } from "react";
import { 
  Copy,
  TicketPercent,
} from "lucide-react";
import { Swiper,  SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface Coupon {
    type: 'train' | 'plane';
    discount: number;
    minPrice: number;
    code: string;
    category: 'cashback' | 'discount';
}

const coupons: Coupon[] = [
    { 
        type: 'train', 
        discount: 50, 
        minPrice: 500, 
        code: 'KERETA50',
        category: 'cashback'
    },
    { 
        type: 'plane', 
        discount: 25, 
        minPrice: 100, 
        code: 'PESAWAT25',
        category: 'discount'
    },
    { 
        type: 'train', 
        discount: 10, 
        minPrice: 75, 
        code: 'KERETA10',
        category: 'cashback'
    },
    { 
      type: 'train', 
      discount: 15, 
      minPrice: 80, 
      code: 'KERETA20',
      category: 'cashback'
    },
    { 
      type: 'plane', 
      discount: 20, 
      minPrice: 150, 
      code: 'PESAWAT15',
      category: 'discount'
    },
];

interface CouponCardProps {
    coupon: Coupon;
    onCopy: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onCopy }) => {
  const getCategoryColor = () => {
    switch (coupon.category) {
      case 'cashback':
        return 'bg-yellow-200';
      case 'discount':
        return 'bg-green-200';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`relative ${getCategoryColor()} rounded-lg px-6 py-4 items-center shadow-xl w-full sm:min-w-md mx-auto overflow-hidden coupon-card`}>

      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 top-3"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 top-[27%] translate-y-1/2"></div>
      <div className="absolute -left-4 w-8 h-8 outline-none rounded-[50%] bg-white border border-[#e5e7eb] z-10 bottom-3"></div>
      
      <div className="flex items-center">
        <div className="mr-4">
          {coupon.type === "train" ? (
            <span role="img" aria-label="train" className="text-4xl">🚆</span>
          ) : (
            <span role="img" aria-label="plane" className="text-4xl">✈️</span>
          )}
        </div>
        <div>
          <p className="text-lg font-bold">Diskon s.d {coupon.discount}%</p>
          <p className="text-sm text-gray-500">min. transaksi Rp {coupon.minPrice}Rb</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex gap-2">
          <Copy className="w-5 h-5" />
          <p className="text-sm font-mono rounded-md mb-2">{coupon.code}</p>
        </div>
        <button
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onCopy(coupon.code)}
        >
          Copy
        </button>

      </div>
    </div>
  );
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


    <div className="py-10 px-[10rem] w-full bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col relative">

      <div className="flex gap-3 mb-4 ">
        <TicketPercent className="w-7 h-7 text-blue-500"/>
        <h2 className="text-xl font-bold mb-4 text-blue-500">Daftar Kupon yang Bisa Dipakai</h2>
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