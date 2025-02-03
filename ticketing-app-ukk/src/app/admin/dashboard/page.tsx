// app/admin/dashboard/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

const AdminDashboard = () => {
  // Sample data for charts
  const ticketSalesData = [
    { month: 'Jan', tickets: 120 },
    { month: 'Feb', tickets: 200 },
    { month: 'Mar', tickets: 150 },
    { month: 'Apr', tickets: 300 },
    { month: 'May', tickets: 250 },
    { month: 'Jun', tickets: 400 },
  ];

  const flightOccupancyData = [
    { flight: 'FL001', occupancy: 80 },
    { flight: 'FL002', occupancy: 65 },
    { flight: 'FL003', occupancy: 90 },
    { flight: 'FL004', occupancy: 75 },
    { flight: 'FL005', occupancy: 85 },
  ];

  // Sample data for recent tickets
  const recentTickets = [
    { id: 'T001', passenger: 'John Doe', flight: 'FL001', status: 'Confirmed' },
    { id: 'T002', passenger: 'Jane Smith', flight: 'FL002', status: 'Pending' },
    { id: 'T003', passenger: 'Alice Johnson', flight: 'FL003', status: 'Cancelled' },
    { id: 'T004', passenger: 'Bob Brown', flight: 'FL004', status: 'Confirmed' },
  ];

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Tickets Sold</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,250</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Flights</CardTitle>
            <CardDescription>Currently in air</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$125,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Sales</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketSalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flight Occupancy</CardTitle>
            <CardDescription>Current flights</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={flightOccupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="flight" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="occupancy" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>Last 4 tickets booked</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{ticket.passenger}</p>
                  <p className="text-sm text-gray-500">Flight: {ticket.flight}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    ticket.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : ticket.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Recent user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p>User John Doe booked a ticket</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <div className="flex items-center justify-between">
              <p>User Jane Smith updated payment method</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
            <div className="flex items-center justify-between">
              <p>User Alice Johnson cancelled a ticket</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;