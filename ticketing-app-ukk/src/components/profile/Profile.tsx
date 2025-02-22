"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cog, CreditCard, HomeIcon, Package } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Profile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'your-orders', label: 'Bookings', icon: <Package className="w-4 h-4" /> },
    { id: 'payment-method', label: 'Payment Method', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Cog className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
        
      <div className="md:hidden fixed left-0 right-0 border-b bg-background z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <nav className="grid gap-2 mt-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/myaccount/${item.id}`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === `/myaccount/${item.id}`
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 h-full w-[250px] border-r bg-background">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <nav className="grid gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={`/myaccount/${item.id}`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === `/myaccount/${item.id}`
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[250px]  p-6 w-full">
        <div className="border rounded-lg bg-background p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Profile;