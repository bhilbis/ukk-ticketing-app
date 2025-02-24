/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useUserBookings } from '@/services/methods/booking';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Clock, Wallet, Plane, TrainFront, Compass, ArrowRightCircle, Globe, Gem, BookOpen, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/admin/dashboard/statsCard';
import axios from 'axios';
import { Button } from '@/components/ui/button';

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
    if (axios.isAxiosError(error)) {

      if (error?.response?.status === 403) {
        const errorData = error.response.data;
        return (
          <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <div className="space-y-8">
              {/* Error Alert Section */}
              <Alert variant="destructive" className="border-[1.5px]">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 mt-1 text-white" />
                  <div className="space-y-3">
                    <AlertTitle className="text-lg font-bold tracking-tight">
                      🚫 Access Restricted: {errorData.error}
                    </AlertTitle>
                    
                    <AlertDescription className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          Your Role: {errorData.your_role}
                        </span>
                        <span className="text-red-300">|</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          Required: {errorData.required_roles.join(", ")}
                        </span>
                      </div>
                      
                      <p className="text-red-700 font-medium flex items-center gap-2">
                        <ArrowRightCircle className="h-5 w-5" />
                        Please switch to a passenger account to continue
                      </p>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
      
              {/* Alternative Features Section */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Compass className="h-6 w-6 text-emerald-600" />
                    <span>Discover Travel Possibilities</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="py-6 grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Travel Inspiration",
                      icon: <Globe className="h-8 w-8 text-sky-600" />,
                      desc: "Explore trending destinations and curated experiences"
                    },
                    {
                      title: "Loyalty Program",
                      icon: <Gem className="h-8 w-8 text-amber-600" />,
                      desc: "Earn rewards & unlock exclusive benefits"
                    },
                    {
                      title: "Travel Guides",
                      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
                      desc: "Expert tips and local insights for your journey"
                    }
                  ].map((feature, idx) => (
                    <div 
                      key={idx}
                      className="group p-5 rounded-xl border hover:border-sky-200 transition-all"
                    >
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="p-3 bg-sky-50 rounded-full group-hover:bg-sky-100 transition-colors">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
      
              {/* Action Button */}
              <div className="text-center">
                <Button className="gap-2 px-8 py-5 text-lg">
                  <RefreshCcw className="h-5 w-5" />
                  Switch to Passenger Account
                </Button>
              </div>
            </div>
          </div>
        );
      }
  }

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