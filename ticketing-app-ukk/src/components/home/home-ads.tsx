import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeAds = () => {
    return (
        <div className='w-full px-[10rem] py-10'>
            <Link href={"/"} className='cursor-pointer'>
                <Image
                    src="/home/ads.png"
                    alt='ads'
                    width={1000}
                    height={1000}
                    className='w-full h-full rounded-xl'
                />
            </Link>
        </div>
    )
}

export default HomeAds
