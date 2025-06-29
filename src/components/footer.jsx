'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <footer className="bg-black text-white mt-10 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} BookStay. All rights reserved.</p>
      </div>
    </footer>
  );
}
