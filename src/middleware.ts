import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { Route } from '@/shared/navigation/constants';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;
  const isSignInPage = path.startsWith(Route.SignIn);
  const isSignUpPage = path.startsWith(Route.SignUp);
  const isAuthPage = isSignInPage || isSignUpPage;

  if (isAuthPage) {
    if (token) {
      return Response.redirect(new URL(Route.Dashboard, req.url));
    }

    return NextResponse.next();
  }

  if (!token && !isAuthPage) {
    return Response.redirect(new URL(Route.SignIn, req.url));
  }

  return NextResponse.next();
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
