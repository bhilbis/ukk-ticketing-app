import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const destinationPlace = [
  {
    id: 1,
    namaTempat: "Jakarta",
    image: "/home/view-indo.jpg",
  },
  {
    id: 2,
    namaTempat: "Semarang",
    image: "/home/view-indo.jpg",
  },
  {
    id: 3,
    namaTempat: "Surabaya",
    image: "/home/view-indo.jpg",
  },
  {
    id: 4,
    namaTempat: "Yogyakarta",
    image: "/home/view-indo.jpg",
  },
  {
    id: 5,
    namaTempat: "Bali",
    image: "/home/view-indo.jpg",
  },
]
const HomeSuggest = () => {
  return (
    <div className='px-[10rem] py-10 w-full items-center justify-center'>
      
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-3'>Destinasi yang sedang populer</h2>
        <p className='text-gray-600'>Pilihan paling populer bagi wisatawan untuk berlibur</p>
      </div>

      <div className='w-full flex flex-col space-y-5'>

        <div className='flex space-x-5'>
          {destinationPlace.slice(0, 2).map(place => (
            <div key={place.id} className='relative h-64 flex-1 group transition-all duration-300 ease-in-out overflow-hidden rounded-xl'>
              <Link href={"#"}>
                  <Image 
                    src={place.image} 
                    alt={place.namaTempat} 
                    draggable={false}
                    width={1000}
                    height={1000}
                    className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:duration-500 rounded-xl'/>
                  <div className='absolute top-3 left-4 bg-opacity-50 text-lg text-white px-2 py-1 pointer-events-none'>
                    {place.namaTempat}
                  </div>
              </Link>
            </div>
          ))}
        </div>

        <div className='flex space-x-5'>
          {destinationPlace.slice(2).map(place => (
            <div key={place.id} className='relative h-64 flex-1 group transition-all duration-300 ease-in-out overflow-hidden rounded-xl'>
              <Link href="#">
                <Image 
                  src={place.image} 
                  alt={place.namaTempat} 
                  width={1000}
                  height={1000}
                  draggable={false}
                  className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:duration-500 rounded-xl'/>
                <div className='absolute top-3 left-4 bg-opacity-50 text-lg text-white px-2 py-1 pointer-events-none'>
                  {place.namaTempat}
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>  

    </div>
  )
}

export default HomeSuggest
