"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { TrainFront, TrainIcon } from "lucide-react";


export interface Transportation {
    id: number;
    image?: string;
    from: string;
    to: string;
    date: string;
    type: string;
    class: string;
    price: string;
    trip: string;
    typeDiscount?: string;
    discount?: string;
    trainType: string;
  }

  interface TrainListProps {
    train: Transportation[];
    filterKey: string;
  }

const TrainCard: React.FC<TrainListProps> = ({ train, filterKey }) => {
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
            {train.map((train) => (
              <SwiperSlide
                key={train.id}
                className="!w-[18rem] !h-[11rem] bg-white rounded-lg shadow-md !flex !gap-16"
              >
                <Link href={"/"} className="w-full">
                  <div className="p-4 bg-gray-300 rounded-b-lg w-full h-full">
                    <div className="flex gap-5">
                        {train.trainType === "Whoosh" ? 
                        <TrainFront/> : <TrainIcon/> }
                        <h2 className="text-base font-bold mb-4 text-ellipsis">
                        {`${train.from} → ${train.to}`}
                        </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-gray-600 text-sm">{train.date}</p>
                        <p className="text-gray-600 text-sm truncate sm:max-w-[13rem]">{`${train.type}`}</p>
                        <p className="text-gray-600 text-sm truncate sm:max-w-[13rem]">{`${train.class}`}</p>
                      </div>
                      <p className="text-green-500 font-bold mt-2 truncate">{`${train.price}`}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TrainCard
