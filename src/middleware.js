// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const url = req.nextUrl;

//   // If not logged in and accessing /dashboard → redirect to login
//   if (!token && url.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // If logged in but not admin → redirect to homepage
//   if (token?.role !== 'admin' && url.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard'],
// };




import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  // Skip middleware for client-side navigation (if coming from login)
  if (url.pathname === '/dashboard' && req.headers.get('referer')?.includes('/login')) {
    return NextResponse.next();
  }

  // Block unauthorized access
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token?.role !== 'admin' && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};