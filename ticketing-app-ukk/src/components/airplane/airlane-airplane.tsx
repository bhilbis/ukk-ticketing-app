"use client"
import React, { useState, useEffect } from 'react'
import AirplaneCard, { Airplane } from '../ui/airplane-card';

  const airplaneList: Airplane[] = [
    {
      "id": 1,
      "image": "/home/airplanes.jpg",
      "from": "Jakarta",
      "to": "Denpasar",
      "date": "2024-11-20",
      "type": "Boeing 737-800",
      "class": "Ekonomi",
      "price": "IDR 1850000",
      "trip": "Sekali Jalan",
      "typeDiscount": "cashback",
      "discount": "Diskon Hingga 15%"
    },
    {
      "id": 2,
      "image": "/home/airplanes.jpg",
      "from": "Surabaya",
      "to": "Balikpapan",
      "date": "2025-03-12",
      "type": "Airbus A320",
      "class": "Bisnis",
      "price": "IDR 3100000",
      "trip": "Pulang Pergi",
      "typeDiscount": "flash sale",
      "discount": "Diskon Hingga 40%"
    },
    {
      "id": 3,
      "image": "/home/airplanes.jpg",
      "from": "Medan",
      "to": "Yogyakarta",
      "date": "2024-09-05",
      "type": "ATR 72",
      "class": "Ekonomi",
      "price": "IDR 1200000",
      "trip": "Sekali Jalan",
      "typeDiscount": "double deals",
      "discount": "Beli 2 Lebih Hemat"
    },
    {
      "id": 4,
      "image": "/home/airplanes.jpg",
      "from": "Makassar",
      "to": "Bandung",
      "date": "2025-06-28",
      "type": "Bombardier CRJ1000",
      "class": "Bisnis",
      "price": "IDR 2750000",
      "trip": "Pulang Pergi",
      "typeDiscount": "cashback",
      "discount": "Diskon Hingga 25%"
    },
    {
      "id": 5,
      "image": "/home/airplanes.jpg",
      "from": "Palembang",
      "to": "Jakarta",
      "date": "2024-12-01",
      "type": "Airbus A330",
      "class": "Ekonomi",
      "price": "IDR 2000000",
      "trip": "Sekali Jalan",
      "typeDiscount": "flash sale",
      "discount": "Diskon Hingga 30%"
    },
      {
      "id": 6,
      "image": "/home/airplanes.jpg",
      "from": "Denpasar",
      "to": "Semarang",
      "date": "2025-02-18",
      "type": "Boeing 737-900",
      "class": "Bisnis",
      "price": "IDR 3500000",
      "trip": "Pulang Pergi",
      "typeDiscount": "double deals",
      "discount": "Diskon Hingga 45%"
    },
    {
      "id": 7,
      "image": "/home/airplanes.jpg",
      "from": "Bandung",
      "to": "Medan",
      "date": "2024-08-10",
      "type": "Airbus A320",
      "class": "Ekonomi",
      "price": "IDR 1500000",
      "trip": "Sekali Jalan",
      "typeDiscount": "cashback",
      "discount": "Diskon Hingga 20%"
    },
      {
      "id": 8,
      "image": "/home/airplanes.jpg",
      "from": "Yogyakarta",
      "to": "Makassar",
      "date": "2025-04-03",
      "type": "ATR 72",
      "class": "Bisnis",
      "price": "IDR 2900000",
      "trip": "Pulang Pergi",
      "typeDiscount": "flash sale",
      "discount": "Diskon Hingga 35%"
    },
      {
      "id": 9,
      "image": "/home/airplanes.jpg",
      "from": "Semarang",
      "to": "Palembang",
      "date": "2024-10-25",
      "type": "Bombardier CRJ1000",
      "class": "Ekonomi",
      "price": "IDR 1700000",
      "trip": "Sekali Jalan",
      "typeDiscount": "double deals",
      "discount": "Diskon Hingga 10%"
    },
      {
      "id": 10,
      "image": "/home/airplanes.jpg",
      "from": "Balikpapan",
      "to": "Surabaya",
      "date": "2025-05-15",
      "type": "Airbus A330",
      "class": "Bisnis",
      "price": "IDR 3300000",
      "trip": "Pulang Pergi",
      "typeDiscount": "cashback",
      "discount": "Diskon Hingga 50%"
    }
  ]

  const airplaneTypes = ["Boeing 737-800", "Boeing 737-900", "Airbus A320", "ATR 72", "Bombardier CRJ1000", "Airbus A330"];

const AirlaneAirplane = () => {
    const [filter, setFilter] = useState<string>('');
    const [randomAirplanes, setRandomAirplanes] = useState<Airplane[]>([]);

    useEffect(() => { 
        const filteredAirplanes = airplaneList.filter((airplane) => {
            if (!filter) return true;

            return airplane.type === filter;
        })
        const shuffleArray = (array: Airplane[]) =>
            array.sort(() => Math.random() - 0.5);
        setRandomAirplanes(shuffleArray(filteredAirplanes).slice(0, 10));

    }, [filter]);

  return (
    <div className='w-full px-[8rem] pb-10 overflow-hidden'>
        <div className='mb-6'>
            <h2 className='text-2xl font-bold mb-3'>Tipe Pesawat</h2>
            <p className='text-gray-600'>Beli Tiket Pesawat dan pilih pesawat yang ingin anda naiki</p>
        </div>
        <div className='flex mb-6 gap-5 overflow-hidden'>
            {airplaneTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-3 py-2 border text-black text-sm rounded-2xl mb-2 ${
                            filter === type
                                ? 'bg-blue-100 text-blue-700 border border-blue-600'
                                : 'border-zinc-600'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            <button
                onClick={() => setFilter("")}
                className="px-3 py-2 border border-zinc-600 text-black text-sm rounded-2xl mb-2"
                >
                Reset
            </button>
        </div>
        <AirplaneCard airplanes={randomAirplanes} filterKey={filter}/>
    </div>
  )
}

export default AirlaneAirplane
