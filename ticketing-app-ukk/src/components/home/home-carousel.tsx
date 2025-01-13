"use client"

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Mousewheel } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Airplane {
  id: number;
  image: string;
  from: string;
  to: string;
  date: string;
  type: string;
  class: string;
  price: string;
  trip: string;
  discount?: string;
}

const airplaneList: Airplane[] = [
  {
    id: 1,
    image: "/home/airplanes.jpg",
    from: "Jakarta",
    to: "Bali",
    date: "10-01-2025",
    type: "Boeing 737",
    class: "Ekonomi",
    price: "IDR 1.200.000",
    trip: "Sekali Jalan",
    discount: "s.d 10%"
  },
  {
    id: 2,
    image: "/home/airplanes.jpg",
    from: "Surabaya",
    to: "Yogyakarta",
    date: "15-01-2025",
    type: "Airbus A320",
    class: "Bisnis",
    price: "IDR 2.500.000",
    trip: "Pulang Pergi",
    discount: "Beli 2 lebih hemat"
  },
  {
    id: 3,
    image: "/home/airplanes.jpg",
    from: "Makassar",
    to: "Jakarta",
    date: "2025-03-01",
    type: "ATR 72-600",
    class: "Ekonomi",
    price: "IDR 1.200.000",
    trip: "Sekali Jalan",
    discount: "Special Deals"
  },
  {
    id: 4,
    image: "/home/airplanes.jpg",
    from: "Bandung",
    to: "Surabaya",
    date: "2025-04-20",
    type: "Airbus A330-300",
    class: "First Class",
    price: "IDR 2.800.000",
    trip: "Pulang Pergi",
    
  },
    {
    id: 5,
    image: "/home/airplanes.jpg",
    from: "Yogyakarta",
    to: "Balikpapan",
    date: "2025-05-12",
    type: "Boeing 777-300ER",
    class: "Bisnis",
    price: "IDR 3.500.000",
    trip: "Pulang Pergi"
  },
  {
    id: 6,
    image: "/home/airplanes.jpg",
    from: "Palembang",
    to: "Batam",
    date: "2025-06-05",
    type: "Airbus A321",
    class: "Ekonomi",
    price: "IDR 900.000",
    trip: "Sekali Jalan"
  },
  {
    id: 7,
    image: "/home/airplanes.jpg",
    from: "Semarang",
    to: "Padang",
    date: "2025-07-28",
    type: "Boeing 737 MAX 8",
    class: "Bisnis",
    price: "IDR 2.200.000",
    trip: "Pulang Pergi"
  },
  {
    id: 8,
    image: "/home/airplanes.jpg",
    from: "Manado",
    to: "Jayapura",
    date: "2025-08-19",
    type: "Embraer 190",
    class: "Ekonomi",
    price: "IDR 1.800.000",
    trip: "Sekali Jalan"
  },
  {
    id: 9,
    image: "/home/airplanes.jpg",
    from: "Lombok",
    to: "Medan",
    date: "2025-09-02",
    type: "Airbus A350-900",
    class: "First Class",
    price: "IDR 4.000.000",
    trip: "Pulang Pergi"
  },
    {
    id: 10,
    image: "/home/airplanes.jpg",
    from: "Banjarmasin",
    to: "Pontianak",
    date: "2025-10-25",
    type: "Boeing 787-9 Dreamliner",
    class: "Bisnis",
    price: "IDR 2.500.000",
    trip: "Pulang Pergi"
  },
]

const HomeCarousel = () => {
  const [filter, setFilter] = useState<string>('');

  const filteredAirplanes = airplaneList.filter((airplane) => {
    if (filter === "Promo") {
      return airplane.discount; 
    }
    if (filter) {
      return airplane.class === filter; 
    }
    return true;
  })

  return (
    <div className="px-[10rem] py-10 items-start">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tiket Pesawat Terbaik</h1>
        <p className="text-gray-600">Temukan penerbangan yang sesuai dengan kebutuhan Anda</p>
      </div>
      <div className="flex mb-6 gap-5">
      <button
          onClick={() => setFilter("Ekonomi")}
          className={`px-3 py-2 border border-zinc-600 text-black text-sm rounded-xl mb-2 ${
            filter === "Ekonomi" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Ekonomi
        </button>
        <button
          onClick={() => setFilter("Bisnis")}
          className={`px-3 py-2 border border-zinc-600 text-black text-sm rounded-xl mb-2 ${
            filter === "Bisnis" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Bisnis
        </button>
        <button
          onClick={() => setFilter("First Class")}
          className={`px-3 py-2 border border-zinc-600 text-black text-sm rounded-xl mb-2 ${
            filter === "First Class" ? "bg-blue-500 text-white" : ""
          }`}
        >
          First Class
        </button>
        <button
          onClick={() => setFilter("Promo")}
          className={`px-3 py-2 border border-zinc-600 text-black text-sm rounded-xl mb-2 ${
            filter === "Promo" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Promo
        </button>
        <button
          onClick={() => setFilter("")}
          className="px-3 py-2 border border-zinc-600 text-black text-sm rounded-xl mb-2"
        >
          Reset
        </button>
      </div>
      <div className='overflow-hidden w-full'>
      <AnimatePresence>
            <motion.div 
              key={filter}
              initial={{ opacity: 0, x: 900 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              className='overflow-hidden w-full'>
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          freeMode={true}
          mousewheel={true}
          modules={[Autoplay, FreeMode, Mousewheel]}
          className='flex justify-center items-center xl:min-h-[21rem]'
        >
          
            {filteredAirplanes.map((airplane) => (
            <SwiperSlide
              key={airplane.id}
              className="!w-[16rem] !h-[24rem] bg-white rounded-lg shadow-md !flex !gap-16"
            >
              <Link href={"/"}>
                <div className="relative !w-full h-[12rem]">
                  <Image
                    src={airplane.image}
                    alt={`Flight from ${airplane.from} to ${airplane.to}`}
                    width={100}
                    height={100}
                    className="rounded-t-lg object-cover !w-full !h-full"
                  />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-2 rounded-md">
                    {airplane.trip}
                  </span>
                  {airplane.discount && (<span className="absolute -bottom-2 -right-1 bg-red-500 text-white text-xs px-2 py-2 rounded-md">
                    {airplane.trip}
                  </span>)}
                </div>
                <div className="p-4 bg-gray-300 rounded-b-lg h-full">
                  <h2 className="text-base font-bold mb-4 text-ellipsis ">{`${airplane.from}  →  ${airplane.to}`}</h2>
                  <p className="text-gray-600 text-sm">{airplane.date}</p>
                  <p className="text-gray-600 text-sm truncate sm:max-w-[13rem]">{`${airplane.type}`}</p>
                  <p className="text-gray-600 text-sm mb-4 truncate sm:max-w-[13rem]">{`${airplane.class}`}</p>
                  <p className="text-green-500 font-bold mt-2 truncate">{`${airplane.price}`}</p>
                </div>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
            </motion.div>
          </AnimatePresence>
      </div>
    </div>
  )
}

export default HomeCarousel
