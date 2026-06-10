import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware simulates authentication logic
// For now, we use a simple cookie check to allow the user to bypass the login
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define public paths that don't require authentication
  const isAuthPage = pathname.startsWith('/auth');

  // 2. Check for an "auth" cookie (simulated session)
  // For the moment, we assume the user is NOT logged in if the cookie is missing
  const isAuthenticated = request.cookies.has('auth_session');

  // 3. Logic: If not authenticated and trying to access a protected page, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Logic: If authenticated and trying to access auth pages (login/signup), redirect to dashboard
  if (isAuthenticated && isAuthPage) {
    const dashboardUrl = new URL('/', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
