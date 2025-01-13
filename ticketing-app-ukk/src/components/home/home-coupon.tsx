"use client"

import React, { useEffect, useRef, useState } from "react";
import { 
  Copy,
  ChevronLeft,
  ChevronRight,
  TicketPercent,
} from "lucide-react";
import { Swiper,  SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigationOptions } from "swiper/types";

interface Coupon {
    type: 'kereta' | 'pesawat';
    discount: number;
    minPrice: number;
    code: string;
}

const coupons: Coupon[] = [
    { 
        type: 'kereta', 
        discount: 50, 
        minPrice: 500, 
        code: 'KERETA50' 
    },
    { 
        type: 'pesawat', 
        discount: 25, 
        minPrice: 100, 
        code: 'PESAWAT25' 
    },
    { 
        type: 'kereta', 
        discount: 10, 
        minPrice: 75, 
        code: 'KERETA10' 
    },
    { 
      type: 'kereta', 
      discount: 15, 
      minPrice: 80, 
      code: 'KERETA20' 
    },
    { 
      type: 'pesawat', 
      discount: 20, 
      minPrice: 150, 
      code: 'PESAWAT15' 
    },
];

interface CouponCardProps {
    coupon: Coupon;
    onCopy: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onCopy }) => {
  return (
    <div className="relative bg-gray-100 border-2 rounded-lg px-6 py-4 items-center shadow-xl w-full max-w-md mx-auto overflow-hidden">
      <div className="absolute top-4 p-2 bg-blue-200 -left-2 rounded-full"></div>
      <div className="flex items-center">
        <div className="mr-4">
          {coupon.type === "kereta" ? (
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
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      // Pastikan Swiper memperbarui referensi tombol navigasi
      console.log("Prev Ref:", prevRef.current);
      console.log("Next Ref:", nextRef.current);
    }
  }, [prevRef, nextRef] )

  return (
    <>
      {copied && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-sm px-4 py-2 rounded shadow-md transition-all duration-300 scale-110 opacity-100 animate-fadeIn">
          Kode Tersalin!
        </div>
      )}

    <div className="py-10 px-[10rem] w-full bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col relative">

      <div className="flex gap-3 mb-4">
        <TicketPercent className="w-7 h-7 text-blue-500"/>
        <h2 className="text-xl font-bold mb-4">Daftar Kupon yang Bisa Dipakai</h2>
      </div>

      {!isBeginning && (
      <button
        type="button"
        ref={prevRef}
        className="absolute top-[60%] left-[9rem] -translate-y-1/2 p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-gray-200 z-20"
      >
        <ChevronLeft className="w-6 h-6"/>
      </button>
      )}
      {!isEnd && (
      <button
        type="button"
        ref={nextRef}
        className="absolute top-[60%] right-[9rem] -translate-y-1/2 p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-gray-200 z-20"
      >
        <ChevronRight className="w-6 h-6"/>
      </button>
      )}

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        } as NavigationOptions}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="w-full"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
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