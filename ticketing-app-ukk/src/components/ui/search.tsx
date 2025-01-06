"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Search = () => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = ['Your Activity', 'Penerbangan ke Surabaya', 'Tiket Kereta ke Yogyakarta']

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 3000);
        
        return () => clearInterval(interval);
        
    }, [placeholders.length]);

    return (
        <div>
            <div className='flex items-center gap-x-2 w-full'>
                <Image
                    src='/navigation/search.svg'
                    alt='Search Icon'
                    height={20}
                    width={20}
                />
                <div className='relative w-full'>
                <input 
                    type="text" 
                    placeholder={placeholders[placeholderIndex]}
                    className='focus:outline-none bg-transparent w-full'
                />
                </div>
            </div>
        </div>
    )
}

export default Search
