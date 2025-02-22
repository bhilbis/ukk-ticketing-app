"use client";

import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Armchair } from "lucide-react";

interface SeatMapProps {
  seatCount: number;
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
  occupiedSeats: string[];
  className?: string;
}

const generateShortName = (className: string): string => {
  const words = className.split(" ");
  if (words.length > 1) {
    return words.map(word => word.charAt(0).toUpperCase()).join(""); // Ambil huruf pertama tiap kata
  }
  return className.slice(0, 3).toUpperCase(); // Jika hanya 1 kata, ambil 3 huruf pertama
};


const generateSeatLabels = (className: string, rowNum: number, seatsPerRow: number = 6): string[] => {
  const shortName = generateShortName(className);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  return letters.slice(0, seatsPerRow).map(letter => `${shortName}-${rowNum}${letter}`);
};

export const SeatMap = ({ 
  seatCount, 
  selectedSeat, 
  onSeatSelect, 
  occupiedSeats,
  className
}: SeatMapProps) => {
  const seatsPerRow = 6;
  const rows = Math.ceil(seatCount / seatsPerRow);
  const occupiedSeatsSet = new Set(occupiedSeats);

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="w-full max-w-2xl bg-gray-50 p-8 rounded-2xl shadow-lg">
        <div className="relative mb-12">
          <div className="w-full h-20 bg-gray-200 rounded-t-[100px] flex items-center justify-center">
            <Plane className="w-12 h-12 text-gray-400 transform -rotate-90 animate-float" />
          </div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowNum = rowIndex + 1;
            const seatLabels = generateSeatLabels(className ?? "CLS", rowNum);
            
            return (
              <div key={rowNum} className="flex flex-col items-center">
            {/* Nama Kelas (EKO, BUS, FC) di atas setiap baris */}
            <span className="text-lg font-semibold text-gray-700">{generateShortName(className ?? "CLS")} - {rowNum}</span>

            {/* Grid Kursi */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-center">
              {/* Kursi Kiri */}
              {seatLabels.slice(0, 3).map((seat) => (
                <button
                  key={seat}
                  disabled={occupiedSeatsSet.has(seat)}
                  onClick={() => onSeatSelect(seat)}
                  className={`w-9 h-9 sm:w-[3.25rem] sm:h-[3.25rem] rounded-md flex items-center justify-center text-sm font-medium transition-all
                    ${occupiedSeatsSet.has(seat) 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : selectedSeat === seat
                      ? 'bg-blue-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 border border-gray-400 hover:bg-blue-200'}
                  `}
                >
                  <Armchair />
                </button>
              ))}

              {/* Lorong */}
              <div className="w-6"></div>

              {/* Kursi Kanan */}
              {seatLabels.slice(3, 6).map((seat) => (
                <button
                  key={seat}
                  disabled={occupiedSeatsSet.has(seat)}
                  onClick={() => onSeatSelect(seat)}
                  className={`w-9 h-9 sm:w-[3.25rem] sm:h-[3.25rem] rounded-md flex items-center justify-center text-sm font-medium transition-all
                    ${occupiedSeatsSet.has(seat) 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : selectedSeat === seat
                      ? 'bg-blue-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 border border-gray-400 hover:bg-blue-200'}
                  `}
                >
                  <Armchair />
                </button>
              ))}
            </div>
          </div>
            );
          })}
        </div>

      </div>

      <div className="flex gap-6 justify-center">
        {[
          { color: 'bg-white border-2 border-gray-300', label: 'Tersedia' },
          { color: 'bg-blue-500', label: 'Dipilih' },
          { color: 'bg-gray-200', label: 'Terisi' },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-lg ${item.color}`} />
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};