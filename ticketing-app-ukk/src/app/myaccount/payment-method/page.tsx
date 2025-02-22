"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cog, CreditCard, HomeIcon, Package } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    { id: 'your-orders', label: 'Bookings', icon: <Package className="w-5 h-5 md:w-6 md:h-6" /> },
    { id: 'payment-method', label: 'Payment Method', icon: <CreditCard className="w-5 h-5 md:w-6 md:h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Cog className="w-5 h-5 md:w-6 md:h-6" /> },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Container with responsive padding */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Mobile Sidebar */}
          <div className="md:hidden w-full">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">John Doe</div>
                <div className="text-xs text-gray-600">john.doe@example.com</div>
              </div>
            </div>
            <nav className="flex overflow-x-auto pb-2 space-x-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === `/myaccount/${item.id}`;
                return (
                  <Link
                    key={item.id}
                    href={`/myaccount/${item.id}`}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg min-w-max ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-8 border border-gray-200 bg-white rounded-lg shadow-sm">
              <div className="text-center mb-6 pt-4">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-semibold">John Doe</div>
                </div>
                <div className="text-sm text-gray-600">john.doe@example.com</div>
              </div>
              <nav className="p-2">
                {sidebarItems.map((item) => {
                  const isActive = pathname === `/myaccount/${item.id}`;
                  return (
                    <Link
                      key={item.id}
                      href={`/myaccount/${item.id}`}
                      className={`flex items-center justify-start px-4 py-2 my-1 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="border border-gray-200 shadow-md rounded-lg bg-white p-4 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;