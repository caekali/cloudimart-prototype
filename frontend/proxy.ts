import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

export default NextAuth(authConfig).auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  if (isLoggedIn && nextUrl.pathname === '/signin') {

    const role = req.auth?.user?.role;
   

    if (role === "admin") return NextResponse.redirect(new URL('/admin', nextUrl));
    if (role === "delivery_person") return NextResponse.redirect(new URL('/delivery/deliveries', nextUrl));
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});


// export default proxy;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*']
// };
