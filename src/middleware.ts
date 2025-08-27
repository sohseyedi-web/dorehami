import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.pathname;

  if (!token) {
    if (url.startsWith('/admin') || url === '/') {
      return NextResponse.redirect(new URL('/join', req.url));
    }
    return NextResponse.next();
  }

  const decoded = (await verifyToken(token)) as { role?: string } | null;

  if (!decoded) {
    return NextResponse.redirect(new URL('/join', req.url));
  }

  if (url.startsWith('/join')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (url.startsWith('/admin') && decoded.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/join', '/admin/:path*'],
};
