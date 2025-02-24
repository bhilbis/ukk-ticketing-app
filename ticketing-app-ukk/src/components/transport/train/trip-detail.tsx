/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plane, Train, PlaneTakeoff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TransportDetailsProps {
  route: any;
  schedule?: {
    departure_date: string;
    departure_time: string;
  };
}

export const TransportDetails = ({ route, schedule }: TransportDetailsProps) => {
  if (!route) return null;
  
  const isTrain = route.transport?.type_id === 2;
  
  const formatDuration = (duration: string) => {
    try {
      const [hours, minutes] = duration.split(':');
      return `${hours}J ${minutes}m`;
    } catch {
      return 'Durasi tidak valid';
    }
  };
  
  const arrivalTime = (departureTime?: string, duration?: string) => {
    if (!departureTime || !duration) return '-';
    
    try {
      const [depHours, depMinutes] = departureTime.split(':').map(Number);
      const [durHours, durMinutes] = duration.split(':').map(Number);
      
      const departureDate = new Date();
      departureDate.setHours(depHours);
      departureDate.setMinutes(depMinutes);
      
      const arrivalDate = new Date(departureDate.getTime());
      arrivalDate.setHours(arrivalDate.getHours() + durHours);
      arrivalDate.setMinutes(arrivalDate.getMinutes() + durMinutes);
      
      return arrivalDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return '-';
    }
  };
  
  const checkIn = (departureTime?: string) => {
    if (!departureTime) return '-';
    
    try {
      const [hours, minutes] = departureTime.split(':').map(Number);
      const checkInHours = isTrain ? 3 : 2; // 3 jam untuk kereta, 2 jam untuk pesawat
      
      const checkInDate = new Date();
      checkInDate.setHours(hours - checkInHours);
      checkInDate.setMinutes(minutes);
      
      return checkInDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return '-';
    }
  };

  return (
    <Card className="lg:col-span-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          {isTrain ? 'Detail Perjalanan Kereta' : 'Detail Penerbangan'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                {isTrain ? (
                  <Train className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                ) : (
                  <Plane className="w-6 h-6 md:w-8 md:h-8 text-blue-400 animate-pulse" />
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-base md:text-lg font-bold">{route.transport?.name_transport}</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {route.transport?.code} • {isTrain ? 'Kereta' : 'Pesawat'}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full xl:col-span-2">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <RouteWithIcon 
                start={route.start_route} 
                end={route.end_route}
                duration={formatDuration(route.travel_duration)}
                isTrain={isTrain}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">
                  {isTrain ? 'Check-in dibuka 3 jam sebelum keberangkatan' : 'Check-in dibuka 2 jam sebelum keberangkatan'}
                </span>
              </div>
              <span className="text-sm text-gray-500">{checkIn(schedule?.departure_time)} WIB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Perkiraan tiba</span>
              </div>
              <span className="text-sm text-gray-500">{arrivalTime(schedule?.departure_time, route.travel_duration)} WIB</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RouteWithIcon = ({ 
  start, 
  end, 
  duration,
  isTrain 
}: { 
  start: string; 
  end: string; 
  duration: string;
  isTrain: boolean;
}) => (
  <span className="flex flex-col md:flex-row items-stretch justify-between gap-4 relative h-30 md:h-auto">
    <span className="z-10 flex md:items-center justify-center">
      <span className="text-sm md:text-base font-medium text-gray-800 bg-white px-2">
        {start}
      </span>
    </span>

    <span className="absolute inset-0 flex items-center justify-center">
      <span className="hidden md:block w-full h-[2px] bg-gray-200 mx-4"></span>
      <span className="md:hidden h-full w-[2px] bg-gray-200 mt-4 mb-8"></span>
    </span>

    <span className="relative z-10 flex items-center justify-center">
      <span className="bg-white p-2 rounded-full shadow-md transform -translate-y-2 md:translate-y-0">
        <span className="flex flex-col items-center gap-1">
          {isTrain ? (
            <Train className="w-6 h-6 text-emerald-500" />
          ) : (
            <PlaneTakeoff className="w-6 h-6 text-blue-500" />
          )}
          <span className="text-xs font-semibold text-gray-600">{duration}</span>
        </span>
      </span>
    </span>

    <span className="z-10 flex items-center justify-center">
      <span className="text-sm md:text-base font-medium text-gray-800 bg-white px-2">
        {end}
      </span>
    </span>
  </span>
);

export const TransportDetailsSkeleton = () => (
  <Card className="lg:col-span-2">
    <CardContent className="space-y-4">
      <Skeleton className="h-8 w-48" />
    </CardContent>
  </Card>
);