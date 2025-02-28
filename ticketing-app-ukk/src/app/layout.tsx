import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Toaster2 } from "sonner";
import { LenisProvider } from "@/context/LenisScroll";

import 'swiper/css'
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
// import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "TravelLink",
  description: "Generated by create next app",
};

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <link 
          rel="icon" 
          href="/travel-ticket-logo.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${MontserratFont.className} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            {/* <LoadingProvider> */}
              <nav>
                <Navbar/>
              </nav>

              <main>
                <LenisProvider>
                {children}
                <Toaster />
                <Toaster2 position="top-right" richColors />
                </LenisProvider>
              </main>

              <footer>
                <Footer/>
              </footer>
            {/* </LoadingProvider> */}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
