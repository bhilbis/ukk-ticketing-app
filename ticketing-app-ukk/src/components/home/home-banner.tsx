"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Search from '../ui/search'
import { Plane, Train, SearchIcon, ChevronUp, ChevronDown } from 'lucide-react'

const TravelInput = ({ type }) => {
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [passengerDetails, setPassengerDetails] = useState({
      adults: 1,
      children: 0,
      infants: 0,
    });
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
  
    const handlePassengerChange = (key, value) => {
      setPassengerDetails((prev) => ({
        ...prev,
        [key]: Math.max(0, value),
      }));
    };
  
    return (
      <div className="w-full grid gap-3">
      
        <div className='flex justify-between items-center'>
          <button
            onClick={() => setIsRoundTrip(!isRoundTrip)}
            className="px-4 py-2 bg-blue-500 -mt-11 rounded-full"
          >
            <h3 className='text-white text-sm'>Sekali Jalan / Pulang Pergi</h3>
            {/* {isRoundTrip ? "Pulang Pergi" : "Sekali Jalan"} */}
          </button>

          <div className='flex gap-4'>
            <div className="relative">
              <button 
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className=" border border-gray-300 rounded-lg px-3 py-2 flex items-center text-white bg-white bg-opacity-40"
              >
                {`${passengerDetails.adults} Dewasa, ${passengerDetails.children} Anak, ${passengerDetails.infants} Bayi`}
              </button>
              <span className="ml-2">
                {showPassengerDropdown ? <ChevronUp className='w-5 h-5'/> : <ChevronDown className='w-5 h-5'/>}
              </span>
              {showPassengerDropdown && (
                <div className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-64 -mt-10">
                  <span className='px-4 text-lg font-medium '>Jumlah Penumpang</span>
                  {["adults", "children", "infants"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between px-4 py-2"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            handlePassengerChange(type, passengerDetails[type] - 1)
                          }
                        >
                          -
                        </button>
                        <span>{passengerDetails[type]}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            handlePassengerChange(type, passengerDetails[type] + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="border border-gray-300 rounded px-3 py-2 flex items-center"
              >
                Pilih Kelas
                <span className="ml-2">
                  {showClassDropdown ? "▲" : "▼"}
                </span>
              </button>
              {showClassDropdown && (
                <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                  {["Ekonomi", "Bisnis", "First Class"].map((kelas) => (
                    <div key={kelas} className="px-4 py-2 hover:bg-gray-100">
                      {kelas}
                    </div>
                  ))}
                </div>
              )}
          </div>

          </div>
        </div>

        <div className='flex gap-x-10'>

          <div className='flex gap-3'>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Dari</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Kota keberangkatan"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ke</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Kota tujuan"
              />
            </div>
          </div>
          
          <div className="w-full flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Tanggal Berangkat</label>
              <input
                type="date"
                className="border border-gray-300 rounded px-3 py-2"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Tanggal Pulang</label>
              <input
                type="date"
                className="border border-gray-300 rounded px-3 py-2"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={!isRoundTrip}
              />
            </div>
          </div>
    
          <button
            className="bg-blue-600 text-white rounded-full px-2 hover:bg-blue-700 flex items-center justify-center"
          >
            <SearchIcon className="w-5 h-5" />
          </button>

        </div>

      </div>
    );
};

const HomeBanner = () => {
  const [ activeTab, setActiveTab ] = useState('');
  return (
      <div className='flex w-full z-10 bg-black'>
        <Image
          src='/home/banner-view.jpg'
          alt='home-banner'
          width={1600}
          height={1000}
          className='z-0 h-[40rem] object-cover object-center opacity-60'
        />
        <div>

          <div className='absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center z-10 text-white -mt-24'>
            <h1 className='text-2xl mb-10'>Hei, Sedang Mau Pergi Kemana</h1>
            <div className='px-5 py-2 rounded-xl border border-gray-300 bg-white text-black text-[1em] w-full'>
              <Search/>
            </div>
          </div>

          <div className='absolute w-full top-[30%] left-1/2 -translate-x-1/2 flex flex-col justify-center items-center z-10'>
            <div className='flex gap-x-5'>

              <div
                onClick={() => setActiveTab('plane')}
                className={`flex flex-col justify-center items-center text-center px-4 py-2 gap-y-2 cursor-pointer ${
                  activeTab === 'plane' ? 'border border-white rounded-3xl bg-white text-black' : 'text-white'
                }`}>
                <Plane className={`w-7 h-7 items-center ${activeTab === 'plane' ? 'text-blue-500' : ''}`} />
                <h3>Tiket Pesawat</h3>
              </div>

              <div 
                onClick={() => setActiveTab('train')}
                className={`flex flex-col justify-center items-center text-center px-4 py-2 gap-y-2 cursor-pointer ${
                  activeTab === 'train' ? 'border border-white rounded-3xl bg-white text-black' : 'text-white'
                }`}>
                <Train className={`w-7 h-7 items-center ${activeTab === 'train' ? 'text-yellow-300' : ''}`} />
                <h3>Tiket Kereta Api</h3>
              </div>

            </div>
            
            <hr className='w-[80%] border border-white my-5' />

            {activeTab && (
              <div className='w-[80%]'>
                <TravelInput type={activeTab} />
              </div>
            )}
          </div>
        </div>

      </div>
  )
}

export default HomeBanner
