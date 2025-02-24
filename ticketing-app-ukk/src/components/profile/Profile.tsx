"use client";

import Link from 'next/link';
import { Cog, CreditCard, HomeIcon, LogOut, Package } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { DialogTitle } from '../ui/dialog';
import { useState } from 'react';
import { useLogout } from '@/services/methods/auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useUser } from '@/hooks/use-useProfile';
import { UserProfile } from './use-profile';

const Profile = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { user, isLoading, error } = useUser()
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <Package className="w-4 h-4" /> },
    { id: 'payment-method', label: 'Payment Method', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Cog className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setIsLogoutOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const LogoutButton = () => (
    <button
      onClick={() => setIsLogoutOpen(true)}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 transition-all w-full mt-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
        
      <div className="lg:hidden fixed left-0 right-0 border-b bg-background z-40">
        <div className="flex flex-col items-end justify-center px-4 h-12">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <DialogTitle>Navigation Menu</DialogTitle>
              <nav className="grid gap-2 mt-4">
                <UserProfile user={user} isLoading={isLoading} error={error} />
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
                <LogoutButton />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 h-full w-[250px] border-r bg-background">
        <div className="p-4">
          <UserProfile user={user} isLoading={isLoading} error={error} />
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
            <LogoutButton />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[250px] mt-10 lg:mt-0 p-6 w-full">
        <div className="border rounded-lg bg-background p-6">
          {children}
        </div>
      </main>

      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda perlu login kembali untuk mengakses akun Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Ya, Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;