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
import { Clock, Calendar, MapPin, ArrowRight, Wallet } from 'lucide-react';

interface ScheduleDetailProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: any;
}

const ScheduleDetailModal: React.FC<ScheduleDetailProps> = ({ isOpen, onClose, schedule }) => {
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Detail Jadwal Perjalanan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Schedule Info */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Informasi Jadwal</h3>
                  <Badge variant="outline">#{schedule?.id}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-700">Tanggal Keberangkatan</span>
                    </div>
                    <p className="text-gray-600">{formatDate(schedule?.departure_date)}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-700">Waktu Keberangkatan</span>
                    </div>
                    <p className="text-gray-600">Pukul {schedule?.departure_time.slice(0, 5)} WIB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Routes */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Rute Perjalanan</h3>
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2"
                style={{ scrollbarWidth: 'thin' }}>
                {schedule?.routes.map((route: any) => (
                  <div
                    key={route.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">
                        {route.destination}
                      </h4>
                      <Badge>{formatPrice(route.price)}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-50 py-1 rounded-full">
                            {route.start_route}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                          <span className="bg-blue-50 py-1 rounded-full">
                            {route.end_route}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-green-500" />
                        <span>Durasi: {route.travel_duration.slice(0, 5)} Jam</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Wallet className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>Transport ID: {route.transport_id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <div className="text-sm text-gray-500 space-y-1 flex items-center justify-between">
            <p>Dibuat: {formatDate(schedule?.created_at)}</p>
            <p>Terakhir diupdate: {formatDate(schedule?.updated_at)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailModal;