"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import 'swiper/css'

const HomeCarousel = () => {
  const airplaneList = [
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
    },
    {
      "id": 3,
      "image": "/home/airplanes.jpg",
      "from": "Makassar",
      "to": "Jakarta",
      "date": "2025-03-01",
      "type": "ATR 72-600",
      "class": "Ekonomi",
      "price": "IDR 1.200.000",
      "trip": "Sekali Jalan"
    },
    {
      "id": 4,
      "image": "/home/airplanes.jpg",
      "from": "Bandung",
      "to": "Surabaya",
      "date": "2025-04-20",
      "type": "Airbus A330-300",
      "class": "First Class",
      "price": "IDR 2.800.000",
      "trip": "Pulang Pergi"
    },
      {
      "id": 5,
      "image": "/home/airplanes.jpg",
      "from": "Yogyakarta",
      "to": "Balikpapan",
      "date": "2025-05-12",
      "type": "Boeing 777-300ER",
      "class": "Bisnis",
      "price": "IDR 3.500.000",
      "trip": "Pulang Pergi"
    },
    {
      "id": 6,
      "image": "/home/airplanes.jpg",
      "from": "Palembang",
      "to": "Batam",
      "date": "2025-06-05",
      "type": "Airbus A321",
      "class": "Ekonomi",
      "price": "IDR 900.000",
      "trip": "Sekali Jalan"
    },
    {
      "id": 7,
      "image": "/home/airplanes.jpg",
      "from": "Semarang",
      "to": "Padang",
      "date": "2025-07-28",
      "type": "Boeing 737 MAX 8",
      "class": "Bisnis",
      "price": "IDR 2.200.000",
      "trip": "Pulang Pergi"
    },
    {
      "id": 8,
      "image": "/home/airplanes.jpg",
      "from": "Manado",
      "to": "Jayapura",
      "date": "2025-08-19",
      "type": "Embraer 190",
      "class": "Ekonomi",
      "price": "IDR 1.800.000",
      "trip": "Sekali Jalan"
    },
    {
      "id": 9,
      "image": "/home/airplanes.jpg",
      "from": "Lombok",
      "to": "Medan",
      "date": "2025-09-02",
      "type": "Airbus A350-900",
      "class": "First Class",
      "price": "IDR 4.000.000",
      "trip": "Pulang Pergi"
    },
      {
      "id": 10,
      "image": "/home/airplanes.jpg",
      "from": "Banjarmasin",
      "to": "Pontianak",
      "date": "2025-10-25",
      "type": "Boeing 787-9 Dreamliner",
      "class": "Bisnis",
      "price": "IDR 2.500.000",
      "trip": "Pulang Pergi"
    },
  ]

  return (
    <div className="flex justify-center py-10">
      <div className='flex justify-center gap-4 overflow-hidden'>
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          freeMode={true}
          modules={[Autoplay, FreeMode]}
          className='flex justify-center items-center w-[85%] xl:min-h-[25rem]'
        >
            {airplaneList.map((airplane) => (
            <SwiperSlide
              key={airplane.id}
              className="!w-[16rem] !h-[23rem] bg-white rounded-lg shadow-md flex"
            >
              <Link href={"/"}>
                <div className="relative w-full h-[12rem]">
                  <Image
                    src={airplane.image}
                    alt={`Flight from ${airplane.from} to ${airplane.to}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-2 rounded-md">
                    {airplane.trip}
                  </span>
                </div>
                <div className="p-4 ">
                  <h2 className="text-base font-bold mb-4">{`${airplane.from} → ${airplane.to}`}</h2>
                  <p className="text-gray-600 text-sm">{airplane.date}</p>
                  <p className="text-gray-600 text-sm">{`Pesawat: ${airplane.type}`}</p>
                  <p className="text-gray-600 text-sm mb-4">{`Kelas: ${airplane.class}`}</p>
                  <p className="text-green-500 font-bold mt-2">{`Mulai dari: ${airplane.price}`}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  )
}

export default HomeCarousel
