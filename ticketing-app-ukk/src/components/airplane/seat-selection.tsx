/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SeatMap } from "@/components/airplane/seat-map";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { Bookings } from "@/services/methods/booking";

interface SeatSelectionProps {
  route: any;
  selectedClass: { class_name: string; seat_count: number } | null;
  setSelectedClass: (cls: { class_name: string; seat_count: number } | null) => void;
  formik: FormikProps<Bookings>;
  occupiedSeats: string[];
}

export const SeatSelection = ({
  route,
  selectedClass,
  setSelectedClass,
  formik,
  occupiedSeats,
}: SeatSelectionProps) => {

  useEffect(() => {
    if (!selectedClass && route.transport?.classes?.length) {
      setSelectedClass(route.transport.classes[0]);
      formik.setFieldValue("seat_code", "");
    }
  }, [route, selectedClass, setSelectedClass, formik]);

  return (
    <Card className="lg:col-span-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Pilih Kursi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {route.transport?.classes?.map((transportClass: any, index: number) => (
              <Button
                key={index}
                variant={selectedClass?.class_name === transportClass.class_name ? "default" : "outline"}
                onClick={() => {
                  setSelectedClass(transportClass);
                  formik.setFieldValue('seat_code', '');
                }}
                className="transition-all hover:scale-105 text-xs md:text-sm px-3 py-1 md:px-4 md:py-2"
              >
                {transportClass.class_name}
              </Button>
            ))}
          </div>

          {selectedClass && (
            <>
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-sm md:text-base">
                  {formik.values.seat_code 
                    ? `Kursi yang dipilih: ${formik.values.seat_code}` 
                    : 'Silakan pilih kursi Anda'}
                </AlertDescription>
              </Alert>

              <div className="overflow-x-auto pb-2">
                <SeatMap
                  seatCount={selectedClass.seat_count}
                  selectedSeat={formik.values.seat_code}
                  onSeatSelect={(seat) => formik.setFieldValue('seat_code', seat)}
                  occupiedSeats={occupiedSeats}
                  className={selectedClass.class_name}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};