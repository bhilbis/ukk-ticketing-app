/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Plane, TrainFront, Wallet, ArrowRight } from 'lucide-react';

interface RouteDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    route: any;
}

const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ isOpen, onClose, route }) => {
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detail Rute ke {route?.destination}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informasi Rute</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-50 px-3 py-1 rounded-full">
                      {route?.start_route}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    <span className="bg-blue-50 px-3 py-1 rounded-full">
                      {route?.end_route}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-green-500" />
                  <span>Durasi: {route?.travel_duration.slice(0, 5).replace(":", ".")} Jam</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-3 text-yellow-500" />
                  <span>Harga: {formatPrice(route?.price)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informasi Transportasi</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  {route?.transport?.type_id === 1 ? (
                    <Plane className="w-5 h-5 mr-3 text-blue-500" />
                  ) : (
                    <TrainFront className="w-5 h-5 mr-3 text-blue-500" />
                  )}
                  <div>
                    <p className="font-medium">{route?.transport?.name_transport}</p>
                    <p className="text-sm text-gray-500">Kode: {route?.transport?.code}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-medium mb-2">Kelas Tersedia:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {route?.transport?.classes.map((cls: any) => (
                      <div key={cls.id} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">{cls.class_name}</p>
                        <p className="text-sm text-gray-500">
                          {cls.seat_count} Kursi
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <div className="text-sm text-gray-500">
            <p>Dibuat: {formatDate(route?.created_at)}</p>
            <p>Terakhir diupdate: {formatDate(route?.updated_at)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetailModal;