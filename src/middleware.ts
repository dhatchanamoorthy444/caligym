// Middleware for age verification and security headers
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Skip age verification for static assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next/static') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname === '/favicon.ico'
  ) {
    return response;
  }

  // Check age verification (18+)
  const ageVerified = request.cookies.get('caligym_age_verified');
  if (!ageVerified || ageVerified.value !== 'true') {
    // Create response to redirect to home with age verification modal
    const url = request.nextUrl.clone();
    url.searchParams.set('age_check', 'true');
    response.cookies.set('age_check_redirect', 'true', { maxAge: 60 * 60 }); // 1 hour

    // Only redirect if not already on home page
    if (!request.nextUrl.pathname.startsWith('/')) {
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api/|static|favicon.ico).*)',
  ],
};