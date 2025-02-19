/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import RouteForm from '@/components/admin/ticket/route-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useDeleteRoute, useRoutes } from '@/services/methods/route'
import { ArrowRight, Clock, MapPin, Pencil, PlusIcon, Trash, Wallet } from 'lucide-react'
import { useState } from 'react'

const Page = () => {
  const { data } = useRoutes();
  const deleteMutation = useDeleteRoute();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (route: any) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRoute(null);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  return (
    <div className='p-8 w-full min-h-screen flex flex-col space-y-6'>
      <div className='max-w-7xl space-y-4'>
        <h1 className='text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Manajemen Rute Perjalanan</h1>
        
        <div className='flex'>
          {data?.length === 0 ? (
            <div className="w-full text-center py-12">
              <p className='text-gray-500 text-lg'>Belum ada rute tersedia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {data?.map((route) => (
                <Card key={route.id} className="hover:shadow-xl transition-all duration-300 group border-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{route.destination}</h3>
                      <div className="flex items-center text-blue-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <div className="flex items-center space-x-2">
                          <span className="font-medium bg-blue-50 px-3 py-1 rounded-full text-sm">
                            {route.start_route}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                          <span className="font-medium bg-blue-50 px-3 py-1 rounded-full text-sm">
                            {route.end_route}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detail Rute */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-6 h-6 mr-3 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500">Durasi Perjalanan</p>
                          <p className="font-semibold text-gray-800">{route.travel_duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Wallet className="w-6 h-6 mr-3 text-yellow-500" />
                        <div>
                          <p className="text-xs text-gray-500">Harga Tiket</p>
                          <p className="font-semibold text-gray-800">
                            {formatPrice(route.price)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 border-t border-gray-100 pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(route)}
                        className="text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMutation.mutate(route.id)}
                        className="text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-8 right-8'>
        <Button 
          onClick={handleAdd}
          className="rounded-full px-6 py-6 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <PlusIcon className="w-5 h-5 mr-2 text-white" />
          <span className="text-white font-semibold">Tambah Rute Baru</span>
        </Button>
      </div>

      {isModalOpen && (
        <RouteForm 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          route={selectedRoute}
        />
      )}
    </div>
  )
}

export default Page
