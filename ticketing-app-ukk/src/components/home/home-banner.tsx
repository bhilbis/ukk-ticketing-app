"use client"

import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import Search from '../ui/search'
import { Plane, Train, SearchIcon, ChevronDown, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip'
import { format } from "date-fns";
import { Calendar } from '../ui/calendar'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { useIsMobile } from '@/hooks/use-mobile'

interface TravelInputProps {
  activeTab: string;
}

const TravelInput: React.FC<TravelInputProps> = ({ activeTab }) => {  
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [selectedClass, setSelectedClass] = useState('');
    
    const [passengerDetails, setPassengerDetails] = useState({
      adults: 1,
      children: 0,
      infants: 0,
    });

    const handlePassengerChange = (key: keyof typeof passengerDetails, value: number) => {
      const newTotal = Object.values(passengerDetails).reduce((acc, curr) => acc + curr, 0) + value - passengerDetails[key];
      if (newTotal <= 7) {
        setPassengerDetails((prev) => ({
          ...prev,
          [key]: Math.max(0, value),
        }));
      }
    };
    
    const getDropdownOptions = () => {
      if (activeTab === 'plane') {
          return ['Ekonomi', 'Bisnis', 'First Class'];
      } else if (activeTab === 'train') {
          return ['Eksekutif', 'Bisnis', 'Ekonomi'];
      }
      return [];
  };
  const totalPassengers = Object.values(passengerDetails).reduce((acc, curr) => acc + curr, 0);
  
    return (
      <TooltipProvider>
        <div className="hidden lg:block w-full">
          <div className='flex justify-between items-center lg:mb-4 xl:mb-0'>
            <span className="px-3 py-2 bg-blue-500 rounded-full text-white text-xs xl:text-sm pointer-events-none">
              Sekali Jalan / Pulang Pergi
            </span>

            <div className='flex gap-4 items-center'>
              <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white bg-opacity-40 text-white text-sm">
                        {`${passengerDetails.adults} Dewasa, ${passengerDetails.children} Anak, ${passengerDetails.infants} Bayi`}
                        <ChevronDown className="ml-2 w-5 h-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <span className='text-base xl:text-lg font-medium'>Jumlah Penumpang</span>
                  {['adults', 'children', 'infants'].map((type) => (
                      <div key={type} className="flex justify-between py-2 lg:text-sm xl:text-base items-center">
                          <span className="capitalize">{type}</span>
                          <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handlePassengerChange(type as keyof typeof passengerDetails, passengerDetails[type as keyof typeof passengerDetails] - 1)}>-</Button>
                              <span>{passengerDetails[type as keyof typeof passengerDetails]}</span>
                              <Button variant="ghost" size="icon" onClick={() => handlePassengerChange(type as keyof typeof passengerDetails, passengerDetails[type as keyof typeof passengerDetails] + 1)}>+</Button>
                          </div>
                      </div>
                  ))}
                  {totalPassengers >= 7 && (
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <div className="flex items-center text-red-500 mt-2">
                                  <AlertCircle className="mr-1" /> Tidak bisa melebihi 7
                              </div>
                          </TooltipTrigger>
                          <TooltipContent>
                              Maksimal 7 penumpang diperbolehkan per pemesanan.
                          </TooltipContent>
                      </Tooltip>
                  )}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white bg-opacity-40 min-w-[9rem] text-white">
                        {selectedClass || 'Pilih Kelas'}
                        <ChevronDown className="ml-2 w-5 h-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    {getDropdownOptions().map((kelas) => (
                        <div key={kelas} className="flex items-center gap-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedClass(kelas)}>
                            <input type="radio" name="kelas" checked={selectedClass === kelas} readOnly />
                            <span>{kelas}</span>
                        </div>
                    ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center w-full xl:mt-10">
              <div className="grid grid-cols-2 gap-4 items-center w-full">
                  <div className='flex flex-col'>
                    <Label className='text-sm font-medium mb-2 text-white'>Asal</Label>
                    <input type="text" className="border rounded px-3 py-[0.3rem]" placeholder="Kota keberangkatan" />
                  </div>
                  <div className='flex flex-col'>
                    <Label className='text-sm font-medium mb-2 text-white'>Tujuan</Label>
                    <input type="text" className="border rounded px-3 py-[0.3rem]" placeholder="Kota tujuan" />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center w-full">
                <div className='flex flex-col'>
                  <Label className="text-sm font-medium mb-2 text-white">Tanggal Berangkat</Label>
                  <Popover>
                      <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full bg-transparent">{format(departureDate, "dd MMM yyyy")}</Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                          <Calendar mode="single" selected={departureDate} onSelect={(day) => {
                            if (day) setDepartureDate(day);
                          }} />
                      </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <div className='flex gap-2'>
                    <Checkbox className='border-white mt-[2px] ml-2' onClick={() => setIsRoundTrip(!isRoundTrip)} />
                    <Label className="text-sm font-medium mb-2 text-white">Tanggal Pulang</Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full bg-transparent" disabled={!isRoundTrip}>
                            {returnDate ? format(returnDate, "dd MMM yyyy") : "Pilih Tanggal"}
                        </Button>
                    </PopoverTrigger>
                    {isRoundTrip && (
                            <PopoverContent align="start">
                                <Calendar mode="single" selected={returnDate || undefined} onSelect={(day) => {
                                  if (day) setReturnDate(day);
                                }} disabled={(date) => date <= departureDate} />
                            </PopoverContent>
                    )}
                  </Popover>
                </div>
              </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 flex items-center justify-center">
              <SearchIcon className="w-5 h-5 mr-2" /> Cari Tiket
          </Button>
        </div>
      </TooltipProvider>
    );
};

const HomeBanner = () => {
  const [ activeTab, setActiveTab ] = useState('plane');
  const [ scrolled, setScrolled ] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 110);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full z-10 h-[21rem] sm:h-[24rem] md:h-[27rem] lg:h-[32rem] xl:h-[40rem] 1xl:[43rem] overflow-hidden bg-[url('/home/banner-view.jpg')] bg-cover bg-no-repeat bg-center">
      <div className='relative 1xl:pb-6 h-full w-full flex justify-center overflow-hidden'>
        <div className="inset-0 mt-6 flex flex-col items-center justify-center text-white px-8  max-w-full md:max-w-md-content lg:max-w-lg-content xl:max-w-full  z-20  w-full">
            {!scrolled && !isMobile && (

              <div className='flex absolute lg:top-[45%] xl:top-[40%] 2xl:top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center z-10 text-white lg:-mt-24'>
                <h1 className='text-base lg:text-xl xl:text-2xl mb-4 2xl:mb-8 pointer-events-none'>Hei, Sedang Mau Pergi Kemana</h1>
                <div className='px-5 py-2 rounded-xl border border-gray-300 bg-white text-black text-[1em] w-full'>
                  <Search/>
                </div>
              </div>
              )}

              <div className='hidden lg:flex absolute w-full top-[35%] left-1/2 -translate-x-1/2 flex-col justify-center items-center z-10'>
                <div className='flex gap-x-5 mt-4 xl:mt-0'>
                  <div
                    onClick={() => setActiveTab('plane')}
                    className={`flex flex-col justify-center items-center text-center px-4 py-2 gap-y-2 cursor-pointer ${
                      activeTab === 'plane' ? 'border border-white rounded-3xl bg-white text-black' : 'text-white'
                    }`}>
                    <Plane className={`w-7 xl:w-9 h-7 xl:h-9 items-center ${activeTab === 'plane' ? 'text-blue-500' : ''}`} />
                    <h3 className='text-sm xl:text-base'>Tiket Pesawat</h3>
                  </div>

                  <div 
                    onClick={() => setActiveTab('train')}
                    className={`flex flex-col justify-center items-center text-center px-4 py-2 gap-y-2 cursor-pointer ${
                      activeTab === 'train' ? 'border border-white rounded-3xl bg-white text-black' : 'text-white'
                    }`}>
                    <Train className={`w-7 xl:w-9 h-7 xl:h-9 items-center ${activeTab === 'train' ? 'text-yellow-300' : ''}`} />
                    <h3 className='text-sm xl:text-base'>Tiket Kereta Api</h3>
                  </div>

                </div>
                
                <hr className='w-[80%] border border-white my-5' />

                {activeTab && (
                  <div className='w-[80%]'>
                    <TravelInput activeTab={activeTab}/>
                  </div>
                )}
              </div>

          
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
