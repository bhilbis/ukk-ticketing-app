"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Search = () => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const placeholders = ['Your Activity', 'Penerbangan ke Surabaya', 'Tiket Kereta ke Yogyakarta']

    useEffect(() => {
        if (!isFocused) {
            const interval = setInterval(() => {
                setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
            }, 5000);
            
            return () => clearInterval(interval);
        }
    }, [isFocused ,placeholders.length]);

    return (
        <div className='w-full'>
            <div className='flex items-center gap-x-2 w-full'>
                <Image
                    src='/navigation/search.svg'
                    alt='Search Icon'
                    height={20}
                    width={20}
                />
                <div className='relative w-full'>
                    <AnimatePresence initial={false}>
                        {!isFocused && (
                            <motion.div
                                key={placeholderIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{}}
                                transition={{ duration: 1 }}
                                className='absolute inset-0 flex items-center pointer-events-none z-[1]'
                                style={{ zIndex: 1 }}
                            >
                                <span className='text-gray-500'>
                                    {placeholders[placeholderIndex]}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {isFocused && (
                        <div className='absolute inset-0 flex items-center pointer-events-none z-[1]'>
                            <span className='text-gray-500'>
                                {placeholders[placeholderIndex]}
                            </span>
                        </div>
                    )}
                    <input 
                        type="text" 
                        className='focus:outline-none bg-transparent w-full relative z-10'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                {/* <input 
                    type="text" 
                    placeholder={placeholders[placeholderIndex]}
                    className={`focus:outline-none bg-transparent w-full placeholderAnimation`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                /> */}
                </div>
            </div>
        </div>
    )
}

export default Search
