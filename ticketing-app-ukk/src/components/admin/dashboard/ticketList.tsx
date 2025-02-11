import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const RecentTickets = ({ tickets }:{
  tickets: {
    id: string;
    passenger: string;
    flight: string;
    status: string;
  }[];
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
        <CardDescription>Last 4 tickets booked</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">{ticket.passenger}</p>
                <p className="text-sm text-gray-500">Flight: {ticket.flight}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  ticket.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : ticket.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;
