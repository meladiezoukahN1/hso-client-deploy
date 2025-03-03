import type { Metadata } from "next";
import "./globals.css";
import { Alexandria } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { ToastContainer } from "react-toastify";

const inter = Alexandria({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Housing and Subsistence Office",
  description: "نظام مكتب الإسكان الطلابي والاعاشة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <body className={`${inter.className}`}>
        {
          <Providers>
            {children}
            <Toaster richColors  />
            <ToastContainer limit={2} autoClose={2000} position="bottom-left" />
          </Providers>
        }
      </body>
    </html>
  );
}
