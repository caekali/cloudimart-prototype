import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const AUTH_ROUTES = ["/signin", "/signup"];

      const PROTECTED_ROUTES = [
        // "/shoppingcart",
        "/checkout",
        // "//orders",
        "/account",
      ];

      const isAuthRoute = AUTH_ROUTES.some(route =>
        pathname.startsWith(route)
      );

      const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
      );

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      if (isAuthRoute && isLoggedIn) {
        const role = auth?.user?.role;

        if (role === "admin") return Response.redirect(new URL('/admin', nextUrl));
        if (role === "delivery_person") return Response.redirect(new URL('/delivery/deliveries', nextUrl));
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },


    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore - login() function returns the token in the user object
        token.accessToken = user.token;

        // @ts-ignore - login() function returns the token in the user object
        token.role = user.role;

      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.role = token.role;
      }

      // Create the session.token property
      // @ts-ignore
      session.token = token.accessToken;

      return session;
    },

  },
  providers: []
} satisfies NextAuthConfig;