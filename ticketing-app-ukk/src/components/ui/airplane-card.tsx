"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Skeleton } from "./skeleton";
import { useEffect, useState } from "react";

export interface Airplane {
  id: number;
  image: string;
  from: string;
  to: string;
  date: string;
  type: string;
  class: string;
  price: string;
  trip: string;
  typeDiscount?: string;
  discount?: string;
}

interface AirplaneListProps {
  airplanes: Airplane[] | null;
  filterKey: string;
}

const AirplaneCard: React.FC<AirplaneListProps> = ({ airplanes, filterKey }) => {
  const [isRendering, setIsRendering] = useState(true);

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
            className="flex justify-center items-center xl:min-h-[20rem]"
          >
            {isRendering || !airplanes ? (
              [...Array(airplanes?.length || 3)].map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[16rem] !h-[24rem] bg-white rounded-lg shadow-md !flex !gap-16"
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
              airplanes.map((airplane) => (
                <SwiperSlide
                  key={airplane.id}
                  className="!w-[14rem] !h-[18rem] bg-white shadow-md !flex !gap-16"
                >
                  <Link href={"/"}>
                    <div className="relative !w-full h-[10rem]">
                      <Image
                        src={airplane.image}
                        alt={`Flight from ${airplane.from} to ${airplane.to}`}
                        width={400}
                        height={400}
                        draggable={false}
                        className=" object-cover !w-full !h-full rounded-t-md"
                      />
                      <span className="absolute top-2 left-2 bg-blue-base text-white text-xs px-2 py-2 rounded-md">
                        {airplane.trip}
                      </span>
                      {airplane.discount && (
                        <span className="absolute -bottom-2 -right-1 bg-red-400 text-white text-xs px-2 py-2 rounded-md">
                          {airplane.discount}
                        </span>
                      )}
                    </div>
                    <div className="p-4 bg-slate-200 rounded-b-lg flex flex-col justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-ellipsis mb-2">
                          {`${airplane.from} → ${airplane.to}`}
                        </h2>
                        <p className="text-gray-600 text-xs">{new Date(airplane.date).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-gray-600 text-xs truncate sm:max-w-[13rem]">{`${airplane.type}`}</p>
                        <p className="text-gray-600 text-xs mb-2 truncate sm:max-w-[13rem]">{`${airplane.class}`}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Mulai Dari</p>
                        <p className="text-red-500 font-bold text-sm truncate">{`IDR ${airplane.price}`}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AirplaneCard;
