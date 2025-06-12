"use client"

import React, { useEffect, useState } from 'react'
import AirplaneCard from '../ui/airplane-card'
import Image from 'next/image'
import { useRoutes, Routes } from '@/services/methods/fetch-route'

const getClassAirplane = (routes: Routes[] | undefined) => {
  if (!routes) return [];
  
  const typeClass = routes
    .filter(route => route.transport?.type_id === 1)
    .flatMap(route => route.transport?.classes.map((cls) => cls.class_name) ?? [])
  
  return Array.from(new Set(typeClass));
};

const HomeCarousel = () => {
  const { data: routes } = useRoutes();
  const [filter, setFilter] = useState<string>('');
  const [randomAirplanes, setRandomAirplanes] = useState<Routes[]>([]);

  const airplaneTypes = getClassAirplane(routes);

  useEffect(() => {
    if (!routes) return;

    const filtered = routes
      .filter(route => {
        if (route.transport?.type_id !== 1) return false;
        
        if (!filter) return true;
        
        return route.transport.classes.some(cls => cls.class_name === filter)
      });

    const shuffleArray = (array: Routes[]) =>
      array.sort(() => Math.random() - 0.5);
    setRandomAirplanes(shuffleArray(filtered).slice(0, 10));
  }, [filter, routes]);

  return (
    <div className="px-4 md:px-16 py-10 items-start relative overflow-hidden">
      <div className="absolute z-10 sm:mt-32 md:mt-20 lg:-mt-20 -right-20">
        <Image 
          src="/home/flyingillus.png"
          alt='flying'
          draggable={false}
          width={900}
          height={900}
          className='-scale-x-100 max-w-[clamp(300px,100%,900px)] h-auto object-contain'
        />
      </div>
      <div className='z-20 relative'>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Tiket Pesawat Terbaik</h2>
          <p className="text-gray-600">Temukan penerbangan yang sesuai dengan kebutuhan Anda</p>
        </div>
        <div className="flex mb-6 gap-5 overflow-hidden">
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
        <AirplaneCard routes={randomAirplanes} filterKey={filter}/>
      </div>
    </div>
  )
}

export default HomeCarousel
