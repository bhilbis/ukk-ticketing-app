"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  type: "kereta" | "pesawat";
  from: string;
  to: string;
  date: string;
  price: number;
  status: "tertunda" | "dikonfirmasi" | "dibatalkan" | "selesai";
}

const bookings: Booking[] = [
  { id: "1", type: "pesawat", from: "Jakarta", to: "Bali", date: "10 Feb 2025", price: 1500000, status: "tertunda" },
  { id: "2", type: "kereta", from: "Surabaya", to: "Yogyakarta", date: "12 Feb 2025", price: 350000, status: "dikonfirmasi" },
  { id: "3", type: "pesawat", from: "Medan", to: "Jakarta", date: "15 Feb 2025", price: 1200000, status: "dibatalkan" },
  { id: "4", type: "kereta", from: "Bandung", to: "Semarang", date: "18 Feb 2025", price: 400000, status: "selesai" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "tertunda":
      return "bg-yellow-100 text-yellow-800";
    case "dikonfirmasi":
      return "bg-blue-100 text-blue-800";
    case "selesai":
      return "bg-gray-100 text-gray-800";
    case "dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingList = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Pemesanan</h1>
      <p className="text-gray-600 mb-6">Lihat detail pemesanan tiket Anda dengan mudah.</p>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border p-4 rounded-lg shadow-md flex justify-between items-center bg-white"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{booking.type === "kereta" ? "🚆" : "✈️"}</span>
              <div>
                <p className="text-lg font-semibold">{booking.from} → {booking.to}</p>
                <p className="text-sm text-gray-500">{booking.date}</p>
                <p className="text-sm font-bold">Rp {booking.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-md text-sm font-semibold ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Detail</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
