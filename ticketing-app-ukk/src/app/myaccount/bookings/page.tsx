/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/services/methods/use-payment";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Bookings, useUserBookings } from "@/services/methods/booking";
import PaymentMethods from "@/components/profile/payment-method";
import { PaymentMethod } from "@/services/methods/payment-method";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Train, Plane, Clock, User, Ticket, Wallet } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BoardingPass from "@/components/profile/boarding-pass";

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    pending: "bg-amber-100 text-amber-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

const BookingList = () => {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: bookings, isLoading } = useUserBookings();
  const { processPayment, cancelBooking } = usePayment();

  const handlePayment = (paymentMethod: PaymentMethod) => {
    if (!selectedBooking) return;

    try {
      processPayment.mutate({
        booking_id: selectedBooking.id!,
        payment_method_id: paymentMethod.id!,
        amount: selectedBooking.total_payment
      });
      
      toast({
        title: "Pembayaran Berhasil",
        description: "Pembayaran Anda telah berhasil diproses",
      });
      setShowPaymentDialog(false);
    } catch (error) {
      toast({
        title: "Gagal",
        description: (error as any).response?.data?.message || 'Gagal memproses pembayaran',
        variant: "destructive"
      });
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await cancelBooking.mutateAsync(bookingId);
      toast({
        title: "Berhasil",
        description: "Pemesanan berhasil dibatalkan",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: (error as any).response?.data?.message || 'Gagal membatalkan pemesanan',
        variant: "destructive"
      });
    }
  };

  const toggleExpand = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const filteredBookings = bookings?.booking.filter((booking: Bookings) => {
    if (activeTab === "all") return true;
    return booking.booking_status === activeTab;
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Pemesanan</h1>
        <p className="text-gray-600">Kelola semua pemesanan tiket Anda di satu tempat</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            Semua {bookings?.booking.length ? `( ${bookings.booking.length} )` : ''}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending {bookings?.booking.filter((booking: Bookings) => booking.booking_status === 'pending').length ? `( ${bookings.booking.filter((booking: Bookings) => booking.booking_status === 'pending').length} )` : ''}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Selesai {bookings?.booking.filter((booking: Bookings) => booking.booking_status === 'completed').length ? `( ${bookings.booking.filter((booking: Bookings) => booking.booking_status === 'completed').length} )` : ''}
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Dibatalkan {bookings?.booking.filter((booking: Bookings) => booking.booking_status === 'cancelled').length ? `( ${bookings.booking.filter((booking: Bookings) => booking.booking_status === 'cancelled').length} )` : ''}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredBookings?.map((booking: Bookings) => (
          <Collapsible 
            key={booking.id}
            open={expandedBooking === booking.id?.toString()}
            onOpenChange={() => booking.id && toggleExpand(booking.id.toString())}
            className="border rounded-xl shadow-sm bg-white overflow-hidden"
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {booking.route?.transport?.type_id === 1 ? (
                      <Plane className="w-6 h-6 text-blue-500" />
                    ) : (
                      <Train className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg text-start font-semibold">
                      {booking.route?.start_route} → {booking.route?.end_route}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(booking.departure_date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} {booking.departure_time?.slice(0, 5).replace(':', '.')} WIB
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={`${getStatusColor(booking.booking_status || '')} rounded-lg px-3 py-1`}>
                    {booking.booking_status}
                  </Badge>
                  <ChevronDown className={`w-5 h-5 transform transition-transform ${
                    expandedBooking === booking.id?.toString() ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-6 pb-6 pt-2 border-t">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="w-5 h-5" /> Detail Pemesan
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Ticket className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          Kode Booking: {booking.booking_code}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Ticket className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          Kursi: {booking.seat_code}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Wallet className="w-5 h-5" /> Pembayaran
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total:</span>
                        <span>Rp {parseInt(booking.total_payment).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Metode:</span>
                        <span className="capitalize">{booking.payment?.payment_method}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status Pembayaran:</span>
                        <Badge variant={booking.payment_status === 'paid' ? 'success' : 'destructive'}>
                          {booking.payment_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  {booking.booking_status === 'pending' && booking.payment_status === 'unpaid' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleCancelBooking(booking.id!)}
                      >
                        Batalkan Pemesanan
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowPaymentDialog(true);
                        }}
                      >
                        Bayar Sekarang
                      </Button>
                    </>
                  )}
                  
                  {booking.booking_status === 'completed' && booking.payment_status === 'paid' && (
                    <Button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowBoardingPass(true);
                      }}
                    >
                      Lihat Boarding Pass
                    </Button>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="w-5 h-5" /> Pilih Metode Pembayaran
            </DialogTitle>
          </DialogHeader>
          
          <PaymentMethods
            onSelectMethod={handlePayment}
            selectedAmount={parseFloat(selectedBooking?.total_payment || '0')}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && bookings?.booking && (
            <BoardingPass 
              passenger={bookings} 
              booking={selectedBooking} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingList;