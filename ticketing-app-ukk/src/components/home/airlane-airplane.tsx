"use client";
import React, { useState, useEffect } from 'react';
import AirplaneCard from '../ui/airplane-card';
import { useRoutes, Routes } from '@/services/methods/route';

const getUniqueAirplaneTypes = (routes: Routes[] | undefined) => {
  if (!routes) return [];
  
  const types = routes
    .filter(route => route.transport?.type_id === 1)
    .map(route => route.transport?.name_transport)
    .filter((type): type is string => !!type);
  
  return Array.from(new Set(types));
};

const AirlaneAirplane = () => {
  const { data: routes } = useRoutes();
  const [filter, setFilter] = useState<string>('');
  const [filteredRoutes, setFilteredRoutes] = useState<Routes[]>([]);
  
  const airplaneTypes = getUniqueAirplaneTypes(routes);

  useEffect(() => {
    if (!routes) return;

    const filtered = routes
      .filter(route => {
        if (route.transport?.type_id !== 1) return false;
        
        if (!filter) return true;
        
        return route.transport.name_transport === filter;
      });

    const shuffleArray = (array: Routes[]) => 
      [...array].sort(() => Math.random() - 0.5);
    
    setFilteredRoutes(shuffleArray(filtered).slice(0, 10));
  }, [filter, routes]);

  return (
    <div className='w-full px-[8rem] pb-10 overflow-hidden'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-3'>Cari Tipe Pesawat</h2>
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
      <AirplaneCard routes={filteredRoutes} filterKey={filter} />
    </div>
  );
};

export default AirlaneAirplane;