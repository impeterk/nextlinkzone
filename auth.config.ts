import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';

export const authConfig = {
  adapter: DrizzleAdapter(db),
  trustHost: true,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn &&  nextUrl.pathname === '/signin') {
        return Response.redirect(new URL('/dashboard/pages', nextUrl));
      }
      return true;
    },
  },
  providers: []
} satisfies NextAuthConfig;
