"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Skeleton } from "./skeleton";
import { useEffect, useState } from "react";
import { Routes } from "@/services/methods/route";

interface AirplaneRouteCardProps {
  routes: Routes[] | null;
  filterKey: string;
}

const AirplaneRouteCard: React.FC<AirplaneRouteCardProps> = ({ routes, filterKey }) => {
  const [isRendering, setIsRendering] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  
  const airplaneRoutes = routes?.filter(route => route.transport?.type_id === 1) ?? null;

  useEffect(() => {
    const timeout = setTimeout(() => setIsRendering(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={filterKey}
          initial={{ opacity: 0, x: 1100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 1200 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden w-full"
        >
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            freeMode={true}
            mousewheel={true}
            modules={[Autoplay, FreeMode, Mousewheel]}
            className="flex justify-center items-center xl:min-h-[20rem] !pr-1 !py-2"
          >
            {isRendering || !airplaneRoutes ? (
              [...Array(airplaneRoutes?.length || 3)].map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[16rem] !h-[24rem] bg-transparent !rounded-lg shadow-md !flex !gap-16"
                >
                  <div>
                    <div className="relative !w-[16rem] h-[12rem] flex items-center justify-center bg-gray-200 rounded-t-lg">
                      <Skeleton className="!w-full !h-full rounded-t-lg bg-gray-200" />
                      <Skeleton className="absolute top-2 left-2 w-[4rem] h-5 bg-gray-300 px-2 py-2 rounded-md" />
                    </div>
                    <div className="p-4 bg-gray-300 rounded-b-lg h-full">
                      <Skeleton className="h-6 w-3/4 mb-4 bg-gray-200" />
                      <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
                      <Skeleton className="h-4 w-2/3 mb-2 bg-gray-200" />
                      <Skeleton className="h-4 w-1/3 mb-4 bg-gray-200" />
                      <Skeleton className="h-6 w-1/4 bg-gray-200" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              airplaneRoutes.flatMap((route) =>
                route.schedules?.map((schedule) => (
                  <SwiperSlide key={`${route.id}-${schedule.id}`} className="!w-[16rem] !h-[18rem] bg-transparent shadow-md !flex !gap-16">
                    <Link href={`/pesawat/${route.id}/schedule/${schedule.id}`} className="!w-full !h-full bg-transparent rounded-lg  hover:scale-[1.02] transition-all ease-out duration-500">
                      <div className="relative !w-full h-[10rem]">
                        <Image
                          src={
                            typeof route?.transport?.image === "string"
                              ? route.transport.image.startsWith("http")
                                ? route.transport.image
                                : `${BASE_URL}${route.transport.image}`
                              : route?.transport?.image instanceof File
                              ? URL.createObjectURL(route.transport.image)
                              : "/placeholder-transport.jpg"
                          }
                          alt={`from ${route.start_route} to ${route.end_route}`}
                          width={400}
                          height={400}
                          draggable={false}
                          className="object-cover !w-full !h-full rounded-t-md"
                        />
                      </div>
                      <div className="p-4 bg-slate-200 rounded-md flex flex-col justify-between gap-2">
                        <div>
                          <h2 className="text-sm font-bold text-ellipsis mb-2">
                            {`${route.start_route} → ${route.end_route}`}
                          </h2>
                          <p className="text-gray-600 text-xs">{new Date(schedule.departure_date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}</p>
                          <p className="text-gray-600 text-xs truncate sm:max-w-[13rem]">
                            {route.transport?.name_transport}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Mulai Dari</p>
                          <p className="text-red-500 font-bold text-sm truncate">
                            {`IDR ${Math.floor(route.price).toLocaleString('id-ID')}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              )
            )}
          </Swiper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AirplaneRouteCard;