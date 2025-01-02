import type { NextRequest } from 'next/server';

import { Route } from '@/shared/navigation/constants';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  const path = request.nextUrl.pathname;
  const isSignIn = path.startsWith(Route.SignIn);
  const isSignUp = path.startsWith(Route.SignUp);
  const isAuth = isSignIn || isSignUp;

  if (!currentUser && !isAuth) {
    return Response.redirect(new URL(Route.SignIn, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
