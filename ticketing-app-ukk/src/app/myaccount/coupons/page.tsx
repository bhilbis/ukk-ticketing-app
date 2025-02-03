"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { Copy } from "lucide-react";

interface Coupon {
  type: "kereta" | "pesawat";
  discount: number;
  minPrice: number;
  code: string;
  category: "cashback" | "double deals" | "flash sale";
}

const coupons: Coupon[] = [
  { type: "kereta", discount: 20, minPrice: 100, code: "KERETA20", category: "cashback" },
  { type: "kereta", discount: 20, minPrice: 100, code: "KERETA20", category: "cashback" },
  { type: "kereta", discount: 20, minPrice: 100, code: "KERETA20", category: "cashback" },
  { type: "pesawat", discount: 30, minPrice: 200, code: "FLY30", category: "double deals" },
  { type: "kereta", discount: 15, minPrice: 50, code: "RAIL15", category: "flash sale" },
  { type: "pesawat", discount: 25, minPrice: 150, code: "FLY25", category: "cashback" },
  { type: "kereta", discount: 10, minPrice: 70, code: "RAIL10", category: "double deals" },
  { type: "kereta", discount: 10, minPrice: 70, code: "RAIL10", category: "double deals" },
  { type: "pesawat", discount: 40, minPrice: 300, code: "FLY40", category: "flash sale" },
  { type: "pesawat", discount: 40, minPrice: 300, code: "FLY40", category: "flash sale" },
];

const categories = ["cashback", "double deals", "flash sale"];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "cashback":
      return "bg-green-100 border-green-500 text-green-800";
    case "double deals":
      return "bg-blue-100 border-blue-500 text-blue-800";
    case "flash sale":
      return "bg-red-100 border-red-500 text-red-800";
    default:
      return "bg-gray-100 border-gray-500 text-gray-800";
  }
};

const MyCoupons = () => {
  const router = useRouter();

  const handleUseCoupon = (coupon: Coupon) => {
    navigator.clipboard.writeText(coupon.code);
    router.push(coupon.type === "pesawat" ? "/airpesawat" : "/kereta-api");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">My Coupons</h1>
      <p className="text-gray-600 mb-6">Gunakan kupon eksklusif untuk perjalanan Anda!</p>
      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-3 capitalize">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons
              .filter((coupon) => coupon.category === category)
              .map((coupon, index) => (
                <div
                  key={index}
                  className={`relative border-l-4 p-4 rounded-lg shadow-md ${getCategoryColor(coupon.category)} flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{coupon.type === "kereta" ? "🚆" : "✈️"}</span>
                    <div>
                      <p className="text-lg font-semibold">Diskon {coupon.discount}%</p>
                      <p className="text-sm">Min. transaksi Rp {coupon.minPrice}Rb</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm font-mono bg-white px-2 py-1 rounded border border-gray-300">{coupon.code}</p>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleUseCoupon(coupon)}>
                      Gunakan
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCoupons;
