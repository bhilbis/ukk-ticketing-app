import type { Metadata } from "next";
import '../globals.css';
import AuthGuard from "@/hooks/use-auth";
import Profile from "@/components/profile/Profile";

export const metadata: Metadata = {
  title: "Profile",
  description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <Profile>
                <div className="">
                    {children}
                </div>
            </Profile>
        </AuthGuard>
    )
}   
