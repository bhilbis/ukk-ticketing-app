"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const HomePromo = () => {
  const [selectedPromo, setSelectedPromo] = useState<'plane' | 'train'>('plane')

  return (
    <div className="flex px-[10rem] py-10 gap-4 p-4 border rounded-lg bg-gray-500 min-h-[23rem] max-h-[23rem]">

      <div className="flex flex-col w-1/3 justify-between">
        <Image 
          src="/home/discount.png"
          width={150}
          height={150}
          alt="Promo" 
          draggable={false}
          className="mt-4" />
        <div className='mb-8 '>
          <p className="text-2xl font-bold mb-4">Cek Promo Sebelum Pergi</p>
          <button className="py-2 w-[40%] text-sm bg-blue-100 hover:bg-blue-400 hover:bg-opacity-100 text-blue-600 rounded-md">Cek Seluruh Promo</button>
        </div>
      </div>

      <div className="flex flex-col w-2/3 h-full">

        <div className="flex justify-start mb-5 gap-x-5">
          <button
            onClick={() => setSelectedPromo('plane')}
            className={`px-4 py-2 rounded-xl ${selectedPromo === 'plane' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Pesawat
          </button>
          <button
            onClick={() => setSelectedPromo('train')}
            className={`px-4 py-2 rounded-xl ${selectedPromo === 'train' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Kereta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[12rem] max-h-[12rem]">
          {selectedPromo === 'plane' ? (
            <>
              <div className="p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-2">Promo Pesawat 1</h3>
                <p className="text-gray-600">Diskon 50% untuk penerbangan domestik.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-2">Promo Pesawat 2</h3>
                <p className="text-gray-600">Diskon 30% untuk penerbangan internasional.</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-2">Promo Kereta 1</h3>
                <p className="text-gray-600">Diskon 20% untuk semua rute kereta api.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-xl font-semibold mb-2">Promo Kereta 2</h3>
                <p className="text-gray-600">Diskon 40% untuk kereta api eksekutif.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePromo
