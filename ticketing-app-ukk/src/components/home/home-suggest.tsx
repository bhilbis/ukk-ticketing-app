import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const destinationPlace = [
  {
    id: 1,
    namaTempat: 'Jakarta',
    image: 'https://plus.unsplash.com/premium_photo-1697730084912-1baae78c1bb3?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    namaTempat: 'Semarang',
    image: 'https://images.unsplash.com/photo-1614739556877-2bd89020f340?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    namaTempat: 'Surabaya',
    image: 'https://images.unsplash.com/photo-1566176553949-872b2a73e04e?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    namaTempat: 'Yogyakarta',
    image: 'https://plus.unsplash.com/premium_photo-1700954824012-08ce5362e6c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    namaTempat: 'Bali',
    image: 'https://plus.unsplash.com/premium_photo-1668883189152-d771c402c385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const HomeSuggest = () => {
  return (
    <div className='px-4 md:px-16 pb-10 w-full flex flex-col items-center'>
      <div className='mb-6 text-center'>
        <h2 className='text-2xl font-bold mb-3'>Destinasi yang sedang populer</h2>
        <p className='text-gray-600'>Pilihan paling populer bagi wisatawan untuk berlibur</p>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {destinationPlace.map((place) => (
          <div key={place.id} className='relative h-64 group transition-all duration-300 ease-in-out overflow-hidden rounded-xl'>
            <Link href='#'>
              <Image
                src={place.image}
                alt={place.namaTempat}
                width={600}
                height={400}
                draggable={false}
                className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-xl'
              />
              <div className='absolute top-3 left-4 bg-black bg-opacity-50 text-lg text-white px-3 py-1 rounded-md pointer-events-none'>
                {place.namaTempat}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSuggest;
