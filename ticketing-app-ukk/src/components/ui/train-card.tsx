"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { TrainFront, TrainIcon } from "lucide-react";
import { Routes } from "@/services/methods/fetch-route";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface TrainListProps {
  routes: Routes[] | null;
  filterKey: string;
}

const TrainCard: React.FC<TrainListProps> = ({ routes, filterKey }) => {
  const [isRendering, setIsRendering] = useState(true);
  
  const trainRoutes = routes?.filter(route => route.transport?.type_id === 2) ?? null;

  useEffect(() => {
    const timeout = setTimeout(() => setIsRendering(false), 1000);
    return () => clearTimeout(timeout);
  }, [])

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
            className="flex justify-center items-center xl:min-h-[11rem]"
          >
            {isRendering || !trainRoutes ? (
              [...Array(trainRoutes?.length || 3)].map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[18rem] !h-[11rem] bg-transparent !rounded-lg shadow-md !flex !gap-16"
                >
                  <div>
                    <div className="p-4 w-[18rem] bg-gray-300 rounded-b-lg h-full">
                      <Skeleton className="h-6 w-3/4 mb-4 bg-gray-200" />
                      <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
                      <Skeleton className="h-4 w-2/3 mb-6 bg-gray-200" />
                      <Skeleton className="h-4 w-1/3 mb-2 bg-gray-200" />
                      <Skeleton className="h-4 w-1/4 bg-gray-200" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              trainRoutes.flatMap((route) =>
                route.schedules?.map((schedule) => (
                  <SwiperSlide
                    key={`${route.id}-${schedule.id}`}
                    className="!w-[18rem] !h-[11rem] bg-white rounded-lg shadow-md !flex !gap-16"
                  >
                    <Link href={`/kereta-api/${route.id}/schedule/${schedule.id}`} className="w-full hover:scale-[1.02] transition-all ease-out duration-500">
                      <div className="p-4 bg-slate-200 rounded-b-lg w-full h-full">
                        <div className="flex items-center gap-5  mb-4">
                            {route.transport?.name_transport === "WHOOSH" ? 
                            <TrainFront className="w-5 h-5 text-yellow-500"/> : <TrainIcon className="w-5 h-5 text-yellow-500"/> }
                            <h2 className="text-base font-bold text-ellipsis">
                            {`${route.start_route} → ${route.end_route}`}
                            </h2>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-gray-600 text-sm">{new Date(schedule.departure_date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}</p>
                            <p className="text-gray-600 text-sm truncate sm:max-w-[13rem]">{`${route.transport?.name_transport}`}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Mulai Dari</p>
                            <p className="text-red-500 font-bold text-sm truncate">
                            {`IDR ${Math.floor(route.price).toLocaleString('id-ID')}`}
                            </p>
                          </div>
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
  )
}

export default TrainCard
