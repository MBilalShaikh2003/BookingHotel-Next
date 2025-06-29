// app/layout.js or src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout'; // adjust path if needed

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BookStay',
  description: 'Hotel Booking App',
};

// ✅ This is a valid Server Component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
