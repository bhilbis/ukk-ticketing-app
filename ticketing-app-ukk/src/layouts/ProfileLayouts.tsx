// layouts/ProfileLayouts.tsx
"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cog, CreditCard, HomeIcon, Package, Ticket } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  // const [activeTab, setActiveTab] = useState('dashboard');
  const pathname = usePathname();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon size={24} /> },
    { id: 'your-orders', label: 'Bookings', icon: <Package size={24} /> },
    { id: 'coupons', label: 'Coupons', icon: <Ticket size={24} /> },
    { id: 'payment-method', label: 'Payment Method', icon: <CreditCard size={24} /> },
    { id: 'settings', label: 'Settings', icon: <Cog size={24}/> },
  ];

  return (
    <div className="flex min-h-screen px-[8rem] w-full">
      
      <div className="fixed w-[15rem] border border-gray-200 bg-white rounded-lg shadow-sm" style={{
        marginTop: '8rem',

      }}>
        <div className="text-center mb-6 pt-4">
          <div className='flex items-center justify-center gap-4 mb-2 mx-auto'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-lg font-semibold">John Doe</div>
          </div>
          <div className="text-sm text-gray-600">john.doe@example.com</div>
        </div>
        <nav>
        {sidebarItems.map((item) => {
            const isActive = pathname === `/myaccount/${item.id}`;
            return (
              <Link
                key={item.id}
                href={`/myaccount/${item.id}`}
                className={`flex items-center justify-start px-4 py-2 my-1 mx-2 rounded-lg transition-colors ${
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

      <div className="flex p-8 w-full" style={{
        marginLeft: '16rem',
        paddingTop: '8rem'
      }}>
        <div className="border border-gray-200 shadow-md rounded-lg bg-white p-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;