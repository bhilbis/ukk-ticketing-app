/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useUserBookings } from '@/services/methods/booking';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Clock, Wallet, Plane, TrainFront } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/admin/dashboard/statsCard';

export default function Dashboard() {
  const { data, isLoading, isError, error } = useUserBookings();
  
  const passengerName = data?.name_passenger || 'Guest';

  const stats = {
    total: data?.booking.length || 0,
    completed: data?.booking.filter(b => b.booking_status === 'completed').length || 0,
    pendingPayment: data?.booking.filter(b => 
      b.payment_status === 'unpaid' || b.payment_status === 'partial'
    ).length || 0,
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold">Welcome Back!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading data</AlertTitle>
        <AlertDescription>
          {error?.message || 'Failed to fetch bookings'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">Welcome Back, {passengerName}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Total Bookings"
          value={stats.total}
          icon={<Clock className="h-5 w-5 md:h-6 md:w-6" />}
          className="hover:border-blue-500 transition-colors"
        />
        
        <StatsCard
          title="Completed Bookings"
          value={stats.completed}
          icon={<CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500" />}
          className="hover:border-green-500 transition-colors"
        />
        
        <StatsCard
          title="Pending Payments"
          value={stats.pendingPayment}
          icon={<Wallet className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />}
          className="hover:border-amber-500 transition-colors"
          href='/myaccount/your-orders'
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold">Recent Bookings</h2>
        {data?.booking.slice(0, 3).map((booking: any) => (
          <Card key={booking.id} className="hover:bg-muted/50 transition-colors group">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  {booking.route?.transport?.type_id === 1 ? (
                    <Plane className="h-5 w-5 text-blue-500" />
                  ) : (
                    <TrainFront className="h-5 w-5 text-green-500" />
                  )}
                  <CardTitle className="text-base md:text-lg">#{booking.booking_code}</CardTitle>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge 
                    variant={booking.booking_status === 'completed' ? 'success' : 'warning'}
                    className="capitalize text-xs md:text-sm"
                  >
                    {booking.booking_status}
                  </Badge>
                  <Badge
                    variant={
                      booking.payment_status === 'paid' ? 'success' :
                      booking.payment_status === 'partial' ? 'warning' : 'destructive'
                    }
                    className="text-xs md:text-sm"
                  >
                    {booking.payment_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs md:text-sm font-medium">Route</p>
                  <p className="text-xs md:text-sm">
                    {booking.route?.start_route} → {booking.route?.end_route}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs md:text-sm font-medium">Departure</p>
                  <p className="text-xs md:text-sm">
                    {formatDate(booking.departure_date)} • {booking.departure_time.slice(0, 5).replace(':', '.')} WIB 
                  </p>
                </div>
                
                <div>
                  <p className="text-xs md:text-sm font-medium">Total Payment</p>
                  <p className="text-xs md:text-sm font-semibold">
                    {formatCurrency(booking.total_payment)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Transport: {booking.route?.transport?.name_transport}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Seat: {booking.seat_code}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.booking.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No bookings found</AlertTitle>
            <AlertDescription>
              You don&apos;t have any bookings yet. Start by creating a new booking!
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}