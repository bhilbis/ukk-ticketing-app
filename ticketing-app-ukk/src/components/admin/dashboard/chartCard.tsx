/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookings } from "@/services/methods/booking";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";

const TransportTrendComparison = ({ bookings }: { bookings?: Bookings[] }) => {
  // Process bookings to get daily counts
  const processBookings = () => {
    if (!bookings?.length) return [];

    // Create a map of dates and their counts
    const countsByDate = bookings.reduce((acc, booking) => {
      const date = booking.booking_date ? new Date(booking.booking_date).toISOString().split('T')[0] : '';
      if (!acc[date]) {
        acc[date] = { date, plane: 0, train: 0 };
      }
      
      if (booking.route?.transport?.type_id === 1) {
        acc[date].plane += 1;
      } else if (booking.route?.transport?.type_id === 2) {
        acc[date].train += 1;
      }
      
      return acc;
    }, {} as Record<string, { date: string; plane: number; train: number; }>);

    // Convert to array and sort by date
    return Object.values(countsByDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('id-ID', { 
          day: 'numeric',
          month: 'short'
        })
      }));
  };

  const data = processBookings();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tren Pemesanan Transportasi</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#AAAAAA"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `${value}`}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="plane"
                name="Pesawat"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                className="stroke-blue-500"
                style={{ opacity: 0.75 }}
              />
              <Line
                type="monotone"
                dataKey="train"
                name="Kereta Api"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                className="stroke-yellow-500"
                style={{ opacity: 0.75 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportTrendComparison;