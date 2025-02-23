/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllBookings, useValidateBooking } from '@/services/methods/booking';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BookingDetailModal from '@/components/admin/booking/booking-detail';
import { Eye } from 'lucide-react';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    unpaid: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    partial: 'bg-orange-100 text-orange-800'
};

const BookingList = ({ isAdmin = true }) => {
    const { data: allBookings, error } = useAllBookings();
    const { mutate: completeBooking } = useValidateBooking();
    const [selectedTab, setSelectedTab] = useState('unpaid');
    const [apiError, setApiError] = useState<string | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        if (error) {
            setApiError(error.message || 'Terjadi kesalahan saat memuat data booking');
        }
    }, [error]);

    const formatIDR = (amount: number) => {
        return amount.toLocaleString("id-ID"); // Format angka ke "ID" (Indonesia)
    };
    
    const bookingsFilter = allBookings?.map(b => ({
        ...b,
        formatted_total_payment: formatIDR(Number(b.total_payment))
    }));


    const unpaid = bookingsFilter?.filter(b => 
        b.payment_status === 'unpaid' && b.booking_status !== 'completed'
    ) || [];
    console.log('Unpaid :',unpaid);
    
    const confirmed = bookingsFilter?.filter(b => 
        b.booking_status === 'confirmed' && b.payment_status === 'paid'
    ) || [];

    const handleCompleteBooking = (bookingId: number) => {
        completeBooking(bookingId, {
            onError: (err) => {
                setApiError(err.message || 'Gagal validasi penyelesaian');
            }
        });
    };

    const handleShowDetail = (booking: any) => {
        setSelectedBooking(booking);
        setIsDetailModalOpen(true);
    };

    return (
        <div className='p-8 w-full min-h-screen flex flex-col space-y-6'>
            <div className='max-w-7xl space-y-8 mx-auto w-full'>
                <h1 className='text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                    Booking Management
                </h1>
                <Separator />

                {apiError && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                )}
                
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto gap-2">
                        <TabsTrigger value="unpaid">Unpaid ({unpaid.length})</TabsTrigger>
                        <TabsTrigger value="completed">Confirmed ({confirmed.length})</TabsTrigger>
                    </TabsList>

                    {/* Unpaid Tab */}
                    <TabsContent value="unpaid" className="w-full">
                        <div className="space-y-4 w-full">
                            {unpaid.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Tidak ada booking yang belum dibayar
                                </div>
                            ) : (
                                unpaid.map(booking => (
                                    <Card key={booking.id} className="p-4 flex flex-col gap-4 w-full">
                                        <div className="flex justify-between items-center">
                                            <Badge className={statusColors[booking.booking_status || 'pending']}>
                                                {booking.booking_status}
                                            </Badge>
                                            <Badge className={statusColors[booking.payment_status || 'pending']}>
                                                {booking.payment_status}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm">Total: Rp{booking.formatted_total_payment}</p>
                                            <p className="text-sm">Kursi: {booking.seat_code}</p>
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
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Completed Tab */}
                    <TabsContent value="completed" className="w-full">
                        <div className="space-y-4 w-full">
                            {confirmed.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Tidak ada booking yang telah Dibayar
                                </div>
                            ) : (
                                confirmed.map(booking => (
                                    <Card key={booking.id} className="p-4 flex flex-col gap-4 w-full">
                                        <div className="flex justify-between items-center">
                                            <Badge className={statusColors[booking.booking_status || 'pending']}>
                                                {booking.booking_status}
                                            </Badge>
                                            <Badge className={statusColors[booking.payment_status || 'pending']}>
                                                {booking.payment_status}
                                            </Badge>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">#{booking.booking_code}</span>
                                                <span className="text-sm font-medium">
                                                    Total: Rp{booking.formatted_total_payment}
                                                </span>
                                            </div>
                                            <p className="text-sm">{booking.destination}</p>
                                        </div>

                                        <div className="flex sm:justify-between sm:items-center">
                                            <span className="text-sm">
                                                <p className="text-gray-500">Transportasi</p>
                                                <p>{booking.route?.transport?.name_transport}</p>
                                            </span>
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
                                        
                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Kursi</p>
                                                <p>{booking.seat_code}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Tanggal</p>
                                                <p>{new Date(booking.departure_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Waktu</p>
                                                <p>{booking.departure_time.slice(0, 5).replace(':', '.')} WIB</p>
                                            </div>

                                            {isAdmin && (
                                                <Button 
                                                size="sm" 
                                                onClick={() => handleCompleteBooking(Number(booking.id))}
                                                variant="default"
                                                >
                                                    Validasi Penyelesaian
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {isDetailModalOpen && selectedBooking && (
                <BookingDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    booking={selectedBooking}
                />
            )}                
        </div>
    );
};

export default BookingList;