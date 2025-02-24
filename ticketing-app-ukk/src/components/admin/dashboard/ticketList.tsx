import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bookings } from "@/services/methods/booking";

interface RecentTicketsProps {
  tickets: Bookings[];
}

const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
        <CardDescription>Last 4 tickets booked</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.slice(0, 4).map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">
                  {ticket.passenger?.name_passenger || 'Unknown Passenger'}
                </p>
                <p className="text-sm text-gray-500">
                  Transport: {ticket.route?.transport?.code || 'N/A'}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(ticket.booking_status || '')}`}
              >
                {ticket.booking_status ? ticket.booking_status.charAt(0).toUpperCase() + ticket.booking_status.slice(1) : 'Unknown'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;