// app/admin/dashboard/page.tsx
"use client";
import ChartCard from '@/components/admin/dashboard/chartCard';
import StatsCard from '@/components/admin/dashboard/statsCard';
import TicketList from '@/components/admin/dashboard/ticketList';

const AdminDashboard = () => {
  // Sample data for charts
  // const ticketSalesData = [
  //   { month: 'Jan', tickets: 120 },
  //   { month: 'Feb', tickets: 200 },
  //   { month: 'Mar', tickets: 150 },
  //   { month: 'Apr', tickets: 300 },
  //   { month: 'May', tickets: 250 },
  //   { month: 'Jun', tickets: 400 },
  // ];

  const recentTickets = [
    { id: "T001", passenger: "John Doe", flight: "FL001", status: "Confirmed" },
    { id: "T002", passenger: "Jane Smith", flight: "FL002", status: "Pending" },
    { id: "T003", passenger: "Alice Johnson", flight: "FL003", status: "Cancelled" },
    { id: "T004", passenger: "Bob Brown", flight: "FL004", status: "Confirmed" },
  ];

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Tickets Sold"
            description="This month"
            value="1,250"
          />
          <StatsCard
            title="Revenue"
            description="This month"
            value="$125,000"
          />
        </div>

          <ChartCard />
          {/* <ChartCard title="Ticket Sales" description="Last 6 months">
            <BarChart data={ticketSalesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tickets" fill="#8884d8" />
            </BarChart>
          </ChartCard> */}

          {/* <ChartCard title="Flight Occupancy" description="Current flights">
            <LineChart data={flightOccupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="flight" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="occupancy" stroke="#82ca9d" />
            </LineChart>
          </ChartCard> */}

          <TicketList tickets={recentTickets} />
        
      </div>
    </div>
  );
};

export default AdminDashboard;