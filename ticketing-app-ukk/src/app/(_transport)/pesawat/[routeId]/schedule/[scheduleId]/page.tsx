/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { FlightDetails, FlightDetailsSkeleton } from "@/components/airplane/flight-detail";
import { useGetRoute } from "@/services/methods/route";
import { Bookings, useBookingMutation, useOccupiedSeats } from "@/services/methods/booking";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { BookingSummary } from "@/components/airplane/booking-summary";
import { SeatSelection } from "@/components/airplane/seat-selection";
import { BookingSchema } from "@/components/airplane/booking-schema";
import { useGetSchedule } from "@/services/methods/schedule";

export default function BookingPage() {
  const params = useParams();
  const { routeId, scheduleId } = params;
  const [selectedClass, setSelectedClass] = useState<{class_name: string; seat_count: number;} | null>(null);
  
  const { data: route, isLoading: routeLoading, isError: routeError } = useGetRoute(Number(routeId));
  const { data: schedule, isLoading: scheduleLoading, isError: scheduleError } = useGetSchedule(Number(scheduleId));

  const bookingMutation = useBookingMutation();

  const { data: occupiedSeats = [] } = useOccupiedSeats(
    Number(routeId),
    schedule?.departure_date ?? ''
  );

  const formik = useFormik({
    initialValues: {
      route_id: Number(routeId) || 0,
      departure_date: schedule?.departure_date || '',
      departure_time: schedule?.departure_time.slice(0, 5) || '',
      seat_code: "",
      total_payment: route?.price.toString() || "0",
    },
    validationSchema: BookingSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await bookingMutation.mutateAsync(values as Bookings);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage === "Unauthenticated.") {
          formik.setStatus("Harus login terlebih dahulu");
        } else {
          formik.setStatus(errorMessage || "Failed to create booking");
        }
      }
    },
  });

  if (routeLoading || scheduleLoading) {
    return (
      <div className="container mx-auto px-1 lg:px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FlightDetailsSkeleton />
          <Card className="p-4 space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (routeError || scheduleError || !route || !schedule) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert variant="destructive">
          <AlertDescription>Gagal memuat data rute penerbangan</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 lg:px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FlightDetails 
          route={route} 
          schedule={schedule}  
        />
        
        <BookingSummary
          selectedClass={selectedClass}
          formik={formik}
          bookingMutation={bookingMutation}
        />

        <SeatSelection
          route={route}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          formik={formik}
          occupiedSeats={occupiedSeats}
        />
      </div>
    </div>
  );
}