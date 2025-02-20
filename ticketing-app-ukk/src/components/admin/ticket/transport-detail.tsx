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
import { Plane, TrainFront, Tag, Clock } from 'lucide-react';
import Image from 'next/image';

interface TransportDetailProps {
  isOpen: boolean;
  onClose: () => void;
  transport: any;
}

const TransportDetailModal: React.FC<TransportDetailProps> = ({ isOpen, onClose, transport }) => {
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-5 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {transport?.type_id === 1 ? (
              <Plane className="w-5 h-5 text-blue-500" />
            ) : (
              <TrainFront className="w-5 h-5 text-orange-500" />
            )}
            Detail Transportasi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Main Image */}
          <div className="relative h-40 w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={"/airplane/clouds.jpg"}
              alt={transport?.name_transport}
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Basic Info */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">
                  {transport?.name_transport}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>Kode: {transport?.code}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {transport?.description || "Tidak ada deskripsi"}
              </p>
            </CardContent>
          </Card>

          {/* Class Information */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-md font-medium text-gray-800 mb-3">Kelas Tersedia</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transport?.classes.map((cls: any) => (
                  <div
                    key={cls.id}
                    className="p-3 border border-gray-100 bg-gray-50 rounded-md flex justify-between items-center shadow-sm"
                  >
                    <h4 className="font-medium text-gray-900">{cls.class_name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {cls.seat_count} Kursi
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <div className="text-xs text-gray-500 space-y-1">
            <p><Clock className="w-3 h-3 inline-block mr-1" /> Dibuat: {formatDate(transport?.created_at)}</p>
            <p><Clock className="w-3 h-3 inline-block mr-1" /> Terakhir diupdate: {formatDate(transport?.updated_at)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransportDetailModal;
