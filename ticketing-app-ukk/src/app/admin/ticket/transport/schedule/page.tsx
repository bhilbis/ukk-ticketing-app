/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import ScheduleDetailModal from '@/components/admin/ticket/schedule-detail';
import ScheduleForm from '@/components/admin/ticket/schedule-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useDeleteSchedule, useSchedules } from '@/services/methods/schedule'
import { Eye, Pencil, PlusIcon, Trash } from 'lucide-react';
import React, { useState } from 'react'

const Page = () => {
  const {userLevel} = useAuth();
  const { data } = useSchedules();
  const deleteMutation = useDeleteSchedule();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleShow = (schedule: any) => {
    setSelectedSchedule(schedule);
    setIsDetailModalOpen(true);
    setIsReadOnly(true);
  };

  const handleEdit = (schedule: any) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
    setIsReadOnly(false);
  };

  const handleAdd = () => {
    setSelectedSchedule(null);
    setIsModalOpen(true);
    setIsReadOnly(false);
  };
  
  return (
    <div className="p-8 w-full min-h-screen flex flex-col space-y-6">
      <div className='max-w-7xl space-y-4'>
        <h1 className='text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Jadwal Perjalanan</h1>
        <div className='flex'>
          {data?.length === 0 ? (
            <div className="w-full text-center py-12">
              <p className='text-gray-500'>Tidak Ada Jadwal Perjalanan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {data?.map((schedule) => (
                <Card key={schedule.id} className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    {/* Route visualization */}
                    <div className="flex items-center mb-6">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-6 h-6 rounded-full bg-blue-500 mb-1"></div>
                        <div className="w-1 h-16 bg-blue-200"></div>
                        <div className="w-6 h-6 rounded-full bg-red-500"></div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 space-y-3">
                          <h3 className="font-bold text-lg text-gray-800">Keberangkatan</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(schedule.departure_date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {schedule.departure_time.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShow(schedule)}
                          className="text-gray-600 hover:bg-gray-100"
                          title='Lihat Detail Jadwal'
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {userLevel && userLevel === 1 && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(schedule)}
                              className="text-blue-600 hover:bg-blue-50"
                              title='Edit Jadwal'
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMutation.mutate(schedule.id)}
                              className="text-red-600 hover:bg-red-50"
                              title='Hapus Jadwal'
                              >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        #{schedule.id}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
        
      {userLevel && userLevel === 1 && (
        <div className='fixed bottom-8 right-8'>
          <Button 
            onClick={handleAdd}
            className="rounded-full px-6 py-6 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
            <PlusIcon className="w-5 h-5 mr-2 text-white" />
            <span className="text-white font-semibold">Tambah Jadwal Baru</span>
          </Button>
        </div>
      )}

      {isModalOpen && (
        <ScheduleForm 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          schedule={selectedSchedule}
          isReadOnly={isReadOnly}
        />
      )}

      {isDetailModalOpen && (
        <ScheduleDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          schedule={selectedSchedule}
        />
      )}
    </div>
  )
}

export default Page