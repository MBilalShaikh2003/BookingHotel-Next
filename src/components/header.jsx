'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Don't show header on auth pages
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          BOOKSTAY
        </Link>

        <div>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="hover:text-red-500 font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="hover:text-red-500 font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
