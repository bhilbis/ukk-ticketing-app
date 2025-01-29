import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // const token = req.cookies.get('token')?.value;
    const level = req.cookies.get('level')?.value;

    const url = req.nextUrl.pathname; 

    if (url.startsWith('/admin') && level === 'Passenger') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/'],
};
