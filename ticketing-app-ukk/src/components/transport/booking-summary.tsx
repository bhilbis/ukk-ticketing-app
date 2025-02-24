"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bookings } from "@/services/methods/booking";
import { UseMutationResult } from "@tanstack/react-query";
import { useFormik } from "formik";

interface BookingSummaryProps {
  selectedClass: { class_name: string; seat_count: number } | null;
  formik: ReturnType<typeof useFormik<Bookings>>;
  bookingMutation: UseMutationResult<Bookings, unknown, Bookings, unknown>;
}

export const BookingSummary = ({
  selectedClass,
  formik,
  bookingMutation,
}: BookingSummaryProps) => {
  return (
    <Card className="shadow-lg lg:sticky top-20 h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">Ringkasan Pemesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row justify-between">
            <span>Tanggal Keberangkatan</span>
            <span className="font-bold">{formik.values.departure_date}</span>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <span>Waktu Keberangkatan</span>
            <span className="font-bold">{formik.values.departure_time.slice(0, 5).replace(':', '.')} WIB</span>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <span>Kelas</span>
            <span className="font-bold">{selectedClass?.class_name || '-'}</span>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <span>Nomor Kursi</span>
            <span className="font-bold">{formik.values.seat_code || '-'}</span>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <span>Total</span>
            <span className="font-bold text-red-500">
              IDR {parseInt(formik.values.total_payment).toLocaleString('id-ID')}
            </span>
          </div>
          {formik.status && (
            <Alert variant="destructive">
              <AlertDescription>{formik.status}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit"
            className="w-full mt-4 hover:scale-[1.02] transition-transform"
            disabled={!formik.values.seat_code || bookingMutation.isPending}
          >
            {bookingMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Processing...</span>
              </div>
            ) : (
              'Lanjutkan Pemesanan'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};