import type { Metadata } from "next";
// import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Ticketing App",
  description: "Generated by create next app",
};

// const kanitSans = Kanit({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href="/travel-ticket-logo.svg"
          sizes="any"
          type="image/svg+xml"
        />
      </head>
      <body
        className={` antialiased`}
      >
        <nav>
          <Navbar/>
        </nav>

        <main className="">
          {children}
        </main>

        <footer>
          <Footer/>
        </footer>

      </body>
    </html>
  );
}
