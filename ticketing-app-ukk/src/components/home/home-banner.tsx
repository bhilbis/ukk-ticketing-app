/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'
import { Plane, Train, Clock, Ticket, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '../ui/button'
import { useRoutes } from '@/services/methods/fetch-route'

const HomeBanner = () => {
  const [activeTab, setActiveTab] = useState('plane');
  const { data: routes } = useRoutes();
  const [shuffledRoutes, setShuffledRoutes] = useState<any[]>([]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      const shuffled = [...routes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(route => ({
          from: route.start_route,
          to: route.end_route,
          price: `Rp ${parseFloat(route.price.toString()).toLocaleString('id-ID')}`,
          type: route.transport?.name_transport.toLowerCase().includes('train') ? 'train' : 'plane'
        }))
      
      setShuffledRoutes(shuffled)
    }
  }, [routes])

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  }

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={slideUp}
        className="p-6 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 hover:bg-opacity-20 transition-all"
      >
        <div className="mb-4 text-blue-400">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </motion.div>
    )
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[url('/home/banner-view.jpg')] bg-cover bg-no-repeat bg-right">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 md:pt-32 md:pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Jelajahi Dunia dengan<br/>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Kemudahan Travel
            </span>
          </h1>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveTab('plane')}
              variant={activeTab === 'plane' ? 'default' : 'outline'}
              className="gap-2 px-8 py-6 rounded-full transition-transform hover:scale-105"
            >
              <Plane size={24} />
              Tiket Pesawat
            </Button>
            <Button
              onClick={() => setActiveTab('train')}
              variant={activeTab === 'train' ? 'default' : 'outline'}
              className="gap-2 px-8 py-6 rounded-full transition-transform hover:scale-105"
            >
              <Train size={24} />
              Tiket Kereta
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <FeatureCard
            icon={<Clock size={40} />}
            title="Pemesanan Instan"
            description="Dapatkan tiket Anda dalam hitungan menit dengan proses pemesanan super cepat"
          />
          <FeatureCard
            icon={<Ticket size={40} />}
            title="Harga Terbaik"
            description="Garansi harga terbaik dengan penawaran eksklusif setiap hari"
          />
          <FeatureCard
            icon={<ShieldCheck size={40} />}
            title="100% Aman"
            description="Transaksi aman dengan sistem pembayaran terenkripsi"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUp}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Cara Memesan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Pilih Rute', 'Tentukan Kursi', 'Bayar', 'E-Tiket Dikirim'].map((step, index) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/5 rounded-xl border border-white/20"
              >
                <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-300">Langkah pemesanan yang mudah dan cepat</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Routes */}
        {shuffledRoutes.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="mt-24"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Rute Populer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shuffledRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-full ${route.type === 'plane' ? 'bg-blue-400' : 'bg-orange-400'}`}>
                    {route.type === 'plane' ? <Plane size={24} /> : <Train size={24} />}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl text-purple-400 font-semibold">{route.from} → {route.to}</h3>
                    <p className="text-gray-300">Mulai dari</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400">{route.price}</div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-24 text-center p-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800"
        >
          <Sparkles size={48} className="mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Siap Berangkat?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Temukan pengalaman travel terbaikmu sekarang!
          </p>
          <div className="flex justify-center gap-4">
            <Button className="px-8 py-6 rounded-full text-lg bg-white text-blue-600 hover:bg-gray-100">
              Download App
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-full text-lg border-white text-blue-600 hover:text-white hover:bg-white/10">
              Lihat Promo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomeBanner