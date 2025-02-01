"use client"
import React, { useState, useEffect } from 'react'
import TrainCard, {Transportation} from '../ui/train-card';

const TrainList: Transportation[] = [
  {
    "id": 1,
    "from": "Jakarta",
    "to": "Surabaya",
    "date": "2024-11-20",
    "type": "Argo Bromo Anggrek",
    "class": "Eksekutif",
    "price": "IDR 550000",
    "trip": "Sekali Jalan",
    "typeDiscount": "cashback",
    "discount": "Diskon Hingga 15%",
    "trainType": "Kereta Api Biasa"
  },
  {
    "id": 2,
    "from": "Bandung",
    "to": "Yogyakarta",
    "date": "2025-03-12",
    "type": "Argo Wilis",
    "class": "Bisnis",
    "price": "IDR 310000",
    "trip": "Pulang Pergi",
    "typeDiscount": "flash sale",
    "discount": "Diskon Hingga 40%",
    "trainType": "Whoosh"
  },
  {
    "id": 3,
    "from": "Jakarta",
    "to": "Bandung",
    "date": "2024-09-05",
    "type": "Whoosh",
    "class": "Eksekutif",
    "price": "IDR 300000",
    "trip": "Sekali Jalan",
    "typeDiscount": "double deals",
    "discount": "Beli 2 Lebih Hemat",
    "trainType": "Whoosh"
  },
  {
    "id": 4,
    "from": "Surabaya",
    "to": "Malang",
    "date": "2025-06-28",
    "type": "Bima",
    "class": "Bisnis",
    "price": "IDR 180000",
    "trip": "Pulang Pergi",
    "typeDiscount": "cashback",
    "discount": "Diskon Hingga 25%",
    "trainType": "Kereta Api Biasa"
  },
  {
    "id": 5,
    "from": "Yogyakarta",
    "to": "Bandung",
    "date": "2024-12-01",
    "type": "Lodaya",
    "class": "Ekonomi",
    "price": "IDR 150000",
    "trip": "Sekali Jalan",
    "typeDiscount": "flash sale",
    "discount": "Diskon Hingga 30%",
    "trainType": "Kereta Api Biasa"
  },
    {
    "id": 6,
    "from": "Jakarta",
    "to": "Surabaya",
    "date": "2025-02-18",
    "type": "Gajayana",
    "class": "Bisnis",
    "price": "IDR 400000",
    "trip": "Pulang Pergi",
    "typeDiscount": "double deals",
    "discount": "Diskon Hingga 45%",
    "trainType": "Kereta Api Biasa"
  },
  {
    "id": 7,
    "from": "Bandung",
    "to": "Jakarta",
    "date": "2024-08-10",
    "type": "Parahyangan",
    "class": "Ekonomi",
    "price": "IDR 80000",
    "trip": "Sekali Jalan",
    "typeDiscount": "cashback",
    "discount": "Diskon Hingga 20%",
    "trainType": "Kereta Api Biasa"
  },
    {
    "id": 8,
    "from": "Surabaya",
    "to": "Jakarta",
    "date": "2025-04-03",
    "type": "Mutiara Selatan",
    "class": "Bisnis",
    "price": "IDR 350000",
    "trip": "Pulang Pergi",
    "typeDiscount": "flash sale",
    "discount": "Diskon Hingga 35%",
    "trainType": "Kereta Api Biasa"
  },
    {
    "id": 9,
    "from": "Semarang",
    "to": "Surabaya",
    "date": "2024-10-25",
    "type": "Kertajaya",
    "class": "Ekonomi",
    "price": "IDR 120000",
    "trip": "Sekali Jalan",
    "typeDiscount": "double deals",
    "discount": "Diskon Hingga 10%",
    "trainType": "Kereta Api Biasa"
  },
    {
    "id": 10,
    "from": "Malang",
    "to": "Jakarta",
    "date": "2025-05-15",
    "type": "Argo Bromo Anggrek",
    "class": "Bisnis",
    "price": "IDR 600000",
    "trip": "Pulang Pergi",
    "typeDiscount": "cashback",
    "discount": "Diskon Hingga 50%",
    "trainType": "Kereta Api Biasa"
  }
]

  const trainTypes = ["Kereta Api Biasa", "Whoosh"];

const TypeTrain = () => {
    const [filter, setFilter] = useState<string>('');
    const [randomAirplanes, setRandomAirplanes] = useState<Transportation[]>([]);

    useEffect(() => { 
        const filteredAirplanes = TrainList.filter((airplane) => {
            if (!filter) return true;

            return airplane.trainType === filter;
        })
        const shuffleArray = (array: Transportation[]) =>
            array.sort(() => Math.random() - 0.5);
        setRandomAirplanes(shuffleArray(filteredAirplanes).slice(0, 10));

    }, [filter]);

  return (
    <div className='w-full px-[8rem] py-10'>
        <div className='mb-6'>
            <h2 className='text-2xl font-bold mb-3'>Jenis Kereta Api</h2>
            <p className='text-gray-600'>Beli Tiket Kereta yang ingin anda naiki</p>
        </div>
        <div className='flex mb-6 gap-5'>
            {trainTypes.map((type) => (
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
        <TrainCard train={randomAirplanes} filterKey={filter}/>
    </div>
  )
}

export default TypeTrain
