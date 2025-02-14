import ResetPassword from '@/components/authentication/reset-password'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className='relative flex w-full items-center justify-center min-h-screen bg-gray-200'>
        <div className='rounded-lg shadow-lg flex items-center justify-center bg-white p-10'>
            <div className='w-full h-full max-w-lg items-center justify-center '>
                <ResetPassword />
            </div>
            <div className='w-full max-w-2xl h-full flex-1 text-black items-center justify-center'>
                <div>
                    <Image
                        src="/authentication/key-password.jpg"
                        alt='key-password'
                        draggable={false}
                        width={1920}
                        height={1282}
                        className='w-full h-full rounded-lg'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page
