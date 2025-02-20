// app/admin/dashboard/page.tsx
"use client";
import TransportComparison from '@/components/admin/dashboard/chartCard';
import StatsCard from '@/components/admin/dashboard/statsCard';
import TicketList from '@/components/admin/dashboard/ticketList';
import { useAllBookings } from '@/services/methods/booking';

const AdminDashboard = () => {
  const { data: completed } = useAllBookings();
  
  console.log('Data :',completed);

  const filteredTickets = completed?.filter((ticket) => ticket.booking_status === "confirmed" || ticket.booking_status === "completed" );
  const filteredTicketsLength = filteredTickets?.length;

  const revenue = filteredTickets?.reduce((acc, ticket) => {
    const totalPayment = parseFloat(ticket.total_payment);
    return acc + (isNaN(totalPayment) ? 0 : totalPayment);
  }, 0) || 0;

  const formattedRevenue = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(revenue || 0);

  const bookedTicket = completed?.filter((ticket) => ticket.booking_status !== "cancelled");
  const TicketLength = bookedTicket?.length;

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Tickets Sold"
            description="This month"
            value={filteredTicketsLength?.toString() || "0"}
            />
          <StatsCard
            title="Revenue"
            description="This month"
            value={formattedRevenue}
          />
          <StatsCard
            title="Total Booked"
            description="This month"
            value={TicketLength?.toString() + " Transport" || "0"}
          />
        </div>

        <div className="gap-6">
          <TransportComparison bookings={completed} />
          {completed && <TicketList tickets={completed} />}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;