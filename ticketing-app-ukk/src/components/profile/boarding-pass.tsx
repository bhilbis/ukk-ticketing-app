import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Train, Plane, User, Clock, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { cn } from "@/lib/utils";
import Barcode from 'react-barcode';
import { PassengerBookingsResponse } from '@/services/methods/booking';

const BoardingPass = ({ passenger, booking }: { passenger: PassengerBookingsResponse['passenger']; booking: PassengerBookingsResponse['passenger']['booking'][0] }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isPlane = booking?.route?.transport?.type_id === 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate unique value for barcodes
  const generateBarcodeValue = () => {
    return `${booking.booking_code}-${booking.seat_code}-${booking.route?.transport?.code}`;
  };

  // Calculate time remaining before departure
  const getTimeRemaining = () => {
    const departure = new Date(`${booking.departure_date} ${booking.departure_time}`).getTime();
    const now = new Date().getTime();
    const diff = departure - now;
    
    if (diff < 0) return 'Departed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} hari ${hours} jam lagi`;
    return `${hours} jam lagi`;
};

  if (!booking || !passenger) return null;

  return (
    <Card className="max-w-xl mx-auto bg-white print:shadow-none print:border-gray-200 overflow-hidden border-0">
      <CardHeader className="flex-row justify-between items-center space-y-0 pb-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {isPlane ? 'Boarding Pass' : 'E-Ticket Kereta'}
            </h2>
            <div className='print:hidden'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {getTimeRemaining()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Waktu menuju keberangkatan
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <p className="text-sm text-gray-500">Ref: {booking.booking_code}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowDetails(!showDetails)} 
            variant="ghost" 
            size="sm" 
            className="print:hidden"
          >
            <Info className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => window.print()} 
            variant="outline" 
            size="sm" 
            className="print:hidden hover:bg-primary hover:text-white transition-colors"
          >
            Cetak Tiket
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Transport Info with Enhanced Design */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white shadow-sm">
              {isPlane ? (
                <Plane className="w-6 h-6 text-primary" />
              ) : (
                <Train className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium text-lg">
                {booking.route?.transport?.name_transport}
              </p>
              <p className="text-sm text-gray-500">
                {booking.route?.transport?.code}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{booking.seat_code}</p>
            <p className="text-sm text-gray-500">{isPlane ? 'Nomor Kursi' : 'Nomor Gerbong'}</p>
          </div>
        </div>

        <div className="relative border border-dashed rounded-xl p-6 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-8 relative">
            <div className="relative z-10">
              <p className="text-sm text-gray-500">Keberangkatan</p>
              <p className="text-lg font-bold mt-1">{booking.route?.start_route}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-primary" />
                <span>
                  {formatDate(booking.departure_date)}
                  <br />
                  {booking.departure_time?.slice(0, 5).replace(':', '.')} WIB
                </span>
              </div>
            </div>
            
            <div className="relative z-10 text-end">
              <p className="text-sm text-gray-500">Tujuan</p>
              <p className="text-lg font-bold mt-1">{booking.route?.end_route}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-primary" />
                <span>Durasi: {booking.route?.travel_duration?.slice(0, 5).replace(':', '.')} Jam</span>
              </div>
            </div>

            {/* Route Line */}
            <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center -translate-y-1/2">
              <div className="h-0.5 w-full bg-primary/20"></div>
              <ArrowRight className="w-6 h-6 text-primary absolute" />
            </div>
          </div>

          {/* Passenger Info */}
          <div className="pt-4 border-t border-dashed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{passenger.name_passenger}</p>
                  <p className="text-sm text-gray-500">{passenger.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Panel */}
          {showDetails && (
            <div className="pt-4 border-t border-dashed mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium">{isPlane ? '2 jam sebelum keberangkatan' : '30 menit sebelum keberangkatan'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Confirmed</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QR and Barcode Section */}
        <div className="grid gap-4">
          <div className="bg-gray-900 p-4 rounded-xl flex items-center justify-center">
            <Barcode
              value={generateBarcodeValue()}
              height={50}
              width={1.5}
              displayValue={false}
              background="#111827"
              lineColor="#ffffff"
            />
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          Scan {isPlane ? 'boarding pass' : 'tiket'} saat {isPlane ? 'check-in' : 'masuk gerbong'}
        </p>
      </CardContent>
    </Card>
  );
};

export default BoardingPass;