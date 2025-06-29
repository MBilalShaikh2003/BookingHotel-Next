'use client';

import { SessionProvider } from 'next-auth/react';
import Header from './Header';
import Footer from './footer';
export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Header />
      <main>{children}</main>
      <Footer/>
    </SessionProvider>
  );
}
