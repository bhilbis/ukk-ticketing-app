"use client";

import { Train, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainSeatMapProps {
  seatCount: number;
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
  occupiedSeats: string[];
  className?: string;
}

const generateShortName = (className: string): string => {
  const words = className.split(" ");
  if (words.length > 1) {
    return words.map(word => word.charAt(0).toUpperCase()).join("");
  }
  return className.slice(0, 3).toUpperCase();
};

const generateSeatLabels = (className: string, rowNum: number, seatsPerRow: number = 6): string[] => {
  const shortName = generateShortName(className);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  return letters.slice(0, seatsPerRow).map(letter => `${shortName}-${rowNum}${letter}`);
};

export const TrainSeatMap = ({ 
  seatCount, 
  selectedSeat, 
  onSeatSelect, 
  occupiedSeats,
  className
}: TrainSeatMapProps) => {
  const seatsPerRow = 6;
  const rows = Math.ceil(seatCount / seatsPerRow);
  const occupiedSeatsSet = new Set(occupiedSeats);

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="w-full max-w-2xl bg-gray-50 p-8 rounded-2xl shadow-lg">
        <div className="relative mb-12">
          <div className="w-full h-20 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <Train className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-4">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowNum = rowIndex + 1;
            const seatLabels = generateSeatLabels(className ?? "TRN", rowNum);
            
            return (
              <div key={rowNum} className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-700 mb-2">
                  {generateShortName(className ?? "TRN")} - {rowNum}
                </span>

                <div className="grid grid-cols-7 gap-2 sm:gap-4 items-center">
                  {/* Kursi Kiri */}
                  <div className="col-span-3 grid grid-cols-3 gap-2">
                    {seatLabels.slice(0, 3).map((seat) => (
                      <button
                        key={seat}
                        disabled={occupiedSeatsSet.has(seat)}
                        onClick={() => onSeatSelect(seat)}
                        className={`w-9 h-9 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center text-sm font-medium transition-all
                          ${occupiedSeatsSet.has(seat) 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : selectedSeat === seat
                            ? 'bg-emerald-500 text-white shadow-md scale-105'
                            : 'bg-gray-100 border-2 border-gray-300 hover:bg-emerald-200'}
                        `}
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    ))}
                  </div>

                  {/* Lorong */}
                  <div className="w-8 h-full rounded mx-2" />

                  {/* Kursi Kanan */}
                  <div className="col-span-3 grid grid-cols-3 gap-2">
                    {seatLabels.slice(3, 6).map((seat) => (
                      <button
                        key={seat}
                        disabled={occupiedSeatsSet.has(seat)}
                        onClick={() => onSeatSelect(seat)}
                        className={`w-9 h-9 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center text-sm font-medium transition-all
                          ${occupiedSeatsSet.has(seat) 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : selectedSeat === seat
                            ? 'bg-emerald-500 text-white shadow-md scale-105'
                            : 'bg-gray-100 border-2 border-gray-300 hover:bg-emerald-200'}
                        `}
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-6 justify-center">
        {[
          { color: 'bg-white border-2 border-gray-300', label: 'Tersedia' },
          { color: 'bg-emerald-500', label: 'Dipilih' },
          { color: 'bg-gray-200', label: 'Terisi' },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-sm ${item.color}`} />
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};