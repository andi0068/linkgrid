import { NextResponse, type NextRequest } from 'next/server';

import { urlConfig } from '@/config/url';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(urlConfig.auth.login, req.url));
  }

  return NextResponse.rewrite(new URL(urlConfig.admin.links, req.url));
}

export const config = {
  matcher: ['/', '/admin'],
};
