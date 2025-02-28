/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card } from '@/components/ui/card';
import { useAllBookings } from '@/services/methods/booking';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import BookingDetailModal from '@/components/admin/booking/booking-detail';

const statusColors = {
    completed: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800'
};

const HistoryPage = () => {
    const { data: allBookings } = useAllBookings();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleShowDetail = (booking: any) => {
        setSelectedBooking(booking);
        setIsDetailModalOpen(true);
    };
    const completed = allBookings?.filter(b => b.booking_status === 'completed') || [];

    return (
        <div className='p-8 w-full min-h-screen flex flex-col space-y-6'>
            <div className='max-w-7xl space-y-8'>
                <h1 className='text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                    Booking History
                </h1>
                <Separator />
                
                <div className="space-y-4 w-full">
                    {completed?.map(booking => (
                        <Card key={booking.id} className="p-4 flex flex-col gap-4 w-full">
                            <div className="flex justify-between items-center">
                                <Badge className={statusColors.completed}>
                                    {booking.booking_status}
                                </Badge>
                                <Badge className={statusColors.paid}>
                                    {booking.payment_status}
                                </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <span className="font-semibold">#{booking.booking_code}</span>
                                    <p className="text-sm">{booking.destination}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Tanggal Berangkat</p>
                                    <p>{new Date(booking.departure_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Waktu Berangkat</p>
                                    <p>{booking.departure_time.slice(0, 5).replace(':', '.')} WIB</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleShowDetail(booking)}
                                    className="text-gray-600 hover:bg-blue-50 rounded-full"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Detail
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {isDetailModalOpen && selectedBooking &&(
                <BookingDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    booking={selectedBooking}
                />
            )}
        </div>
    );
};

export default HistoryPage;