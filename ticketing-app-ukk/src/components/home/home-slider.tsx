"use client"

import React from "react";
import Marquee from "react-fast-marquee";

interface SliderItemProps {
    message: string;
}

const sliderItems: SliderItemProps[] = [
    { message: "Promo Tiket Kereta: Diskon 50% untuk Awal Tahun Baru!" },
    { message: "Tiket Pesawat Mulai dari Rp 400.000 untuk Januari!" },
    { message: "Cashback Hingga Rp 150.000 untuk Semua Pembelian!" },
  ];

const HomeSlider: React.FC = () => {
  return (
    <div className="home">
      <div className="bg-blue-50 p-4">
        <Marquee gradient={false} speed={50}>
          {sliderItems.map((item, index) => (
            <span key={index} className="mr-6 font-semibold text-blue-600">
                {item.message}
            </span> 
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HomeSlider;
