"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Search = () => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <>
            <div className='relative w-full'>
                <button className='flex lg:hidden items-center' onClick={() => setIsModalOpen(true)}>
                    <Image
                        src='/navigation/search.svg'
                        alt='Search Icon'
                        height={35}
                        width={35}
                    />
                </button>

                <div className='items-center gap-x-2 w-full hidden lg:flex'>
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
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 1 }}
                                    className='absolute inset-0 flex items-center pointer-events-none z-[1] overflow-hidden'
                                    style={{ zIndex: 1 }}
                                >
                                    <span className='text-gray-500 truncate'>
                                        {placeholders[placeholderIndex]}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <input 
                            type="text" 
                            className={`focus:outline-none bg-transparent w-full relative z-10`}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
            {isModalOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='bg-white p-6 rounded-xl w-96 shadow-lg'
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <div className='flex items-center gap-2 border-b pb-2'>
                            <Image src='/navigation/search.svg' alt='Search' height={20} width={20} />
                            <input 
                                type='text' 
                                placeholder='Search...'
                                className='w-full focus:outline-none bg-transparent overflow-y-hidden'
                                autoFocus
                            />
                        </div>
                        {/* Suggestions */}
                        <div className='mt-4 text-gray-600'>
                            <p className='text-sm font-semibold'>Suggestions:</p>
                            <ul className='mt-2 space-y-1 text-sm'>
                                {placeholders.map((text, index) => (
                                    <li key={index} className='cursor-pointer hover:text-black'>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    )
}

export default Search
