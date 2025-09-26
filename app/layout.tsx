import type { Metadata } from "next";
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/app/components/Navbar';
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Project Allocation System",
  description: "Student Project Allocation & Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <Toaster position="top-right" toastOptions={{ style: { background: '#152345', color: '#ffffff' } }} />
        </AppProvider>
      </body>
    </html>
  );
}
