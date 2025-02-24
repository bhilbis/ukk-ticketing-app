// app/admin/dashboard/page.tsx
"use client";
import ReportPage from '@/components/admin/booking/booking-report';
import TransportComparison from '@/components/admin/dashboard/chartCard';
import StatsCard from '@/components/admin/dashboard/statsCard';
import TicketList from '@/components/admin/dashboard/ticketList';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllBookings } from '@/services/methods/booking';
import { BookCheck, ClipboardPlus, HandCoins, Ticket } from 'lucide-react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: completed, isLoading } = useAllBookings();

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
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="overview">
                <Ticket className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="reports">
                <ClipboardPlus className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === 'overview' && (
          <>  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Tickets Sold"
                icon={<Ticket />}
                value={isLoading ? null : filteredTicketsLength || 0}
              />
              <StatsCard
                title="Revenue"
                icon={<HandCoins />}
                value={isLoading ? null : formattedRevenue || 0}
              />
              <StatsCard
                title="Total Booked"
                icon={<BookCheck />}
                value={isLoading ? null : `${TicketLength || 0} transport`}
              />
            </div>

            <div className="gap-6">
              <TransportComparison bookings={completed} />
              {completed && <TicketList tickets={completed} />}
            </div>
          </>
        )}

        {activeTab === 'reports' && (
          <ReportPage />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;