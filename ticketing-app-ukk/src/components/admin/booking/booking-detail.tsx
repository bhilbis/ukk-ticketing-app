/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Calendar, Clock, MapPin, CreditCard, 
  Ticket, Building, Phone, Mail, ArrowRight 
} from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  unpaid: 'bg-red-100 text-red-800',
  paid: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  partial: 'bg-orange-100 text-orange-800'
};

interface BookingDetailProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    booking_status: keyof typeof statusColors;
    payment_status: keyof typeof statusColors;
    [key: string]: any;
  };
}

const BookingDetailModal: React.FC<BookingDetailProps> = ({ isOpen, onClose, booking }) => {
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: any) => {
    return timeString?.slice(0, 5) || '';
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              Detail Booking
            </div>
            <span className="text-sm lg:text-base font-medium">#{booking?.booking_code}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={`${statusColors[booking?.booking_status]} text-xs`}>
              Status: {booking?.booking_status}
            </Badge>
            <Badge className={`${statusColors[booking?.payment_status]} text-xs`}>
              Pembayaran: {booking?.payment_status}
            </Badge>
          </div>

          {/* Passenger Info */}
          <Card>
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                Informasi Penumpang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="text-sm font-medium">{booking?.passenger?.name_passenger}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm font-medium">{booking?.passenger?.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium break-all">{booking?.passenger?.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Telepon</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium">{booking?.passenger?.telp}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journey Details */}
          <Card>
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                Detail Perjalanan
              </h3>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                  <span className="bg-blue-50 px-3 py-1 rounded-full">
                    {booking?.route?.start_route}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-blue-50 px-3 py-1 rounded-full">
                    {booking?.route?.end_route}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tanggal Berangkat</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-sm">{formatDate(booking?.departure_date)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Jam Berangkat</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm">{formatTime(booking?.departure_time.replace(':', '.'))} WIB</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Check-in</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm">{formatTime(booking?.check_in_time).replace(':', '.')} WIB</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Nomor Kursi</p>
                    <p className="text-sm font-medium">{booking?.seat_code}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg space-y-1">
                    <p className="text-sm text-gray-500">Transportasi</p>
                    <p className="text-sm font-medium">{booking?.route?.transport?.name_transport}</p>
                    <p className="text-xs text-gray-500">Kode: {booking?.route?.transport?.code}</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardContent className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                Detail Pembayaran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Yang Harus di Bayar</p>
                  <p className="text-sm font-medium">{formatPrice(booking?.total_payment)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Tempat Booking</p>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium">{booking?.booking_place}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <div className="text-xs lg:text-sm text-gray-500 space-y-1 p-1">
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <p>Dibuat : {formatDate(booking?.created_at)}</p>
              <p>Terakhir diupdate : {formatDate(booking?.updated_at)}</p>
            </div>
            {booking?.completed_at && (
              <p>Diselesaikan : {formatDate(booking?.completed_at)}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailModal;