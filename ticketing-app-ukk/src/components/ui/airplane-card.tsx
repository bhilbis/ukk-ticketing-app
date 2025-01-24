"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";

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
  airplanes: Airplane[];
  filterKey: string;
}

const AirplaneCard: React.FC<AirplaneListProps> = ({ airplanes, filterKey }) => {
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
            className="flex justify-center items-center xl:min-h-[21rem]"
          >
            {airplanes.map((airplane) => (
              <SwiperSlide
                key={airplane.id}
                className="!w-[16rem] !h-[24rem] bg-white rounded-lg shadow-md !flex !gap-16"
              >
                <Link href={"/"}>
                  <div className="relative !w-full h-[12rem]">
                    <Image
                      src={airplane.image}
                      alt={`Flight from ${airplane.from} to ${airplane.to}`}
                      width={400}
                      height={400}
                      draggable={false}
                      className="rounded-t-lg object-cover !w-full !h-full"
                    />
                    <span className="absolute top-2 left-2 bg-blue-base text-white text-xs px-2 py-2 rounded-md">
                      {airplane.trip}
                    </span>
                    {airplane.discount && (
                      <span className="absolute -bottom-2 -right-1 bg-red-500 text-white text-xs px-2 py-2 rounded-md">
                        {airplane.discount}
                      </span>
                    )}
                  </div>
                  <div className="p-4 bg-gray-300 rounded-b-lg h-full">
                    <h2 className="text-base font-bold mb-4 text-ellipsis">
                      {`${airplane.from} →
                      )} ${airplane.to}`}
                    </h2>
                    <p className="text-gray-600 text-sm">{airplane.date}</p>
                    <p className="text-gray-600 text-sm truncate sm:max-w-[13rem]">{`${airplane.type}`}</p>
                    <p className="text-gray-600 text-sm mb-4 truncate sm:max-w-[13rem]">{`${airplane.class}`}</p>
                    <p className="text-green-500 font-bold mt-2 truncate">{`${airplane.price}`}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AirplaneCard;
