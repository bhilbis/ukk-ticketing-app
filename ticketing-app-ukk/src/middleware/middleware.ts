import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    console.log('Middleware running...');
    const token = localStorage.get('token')?.value;
    console.log('Token:', token);

    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload:', payload);

      const level_id = payload.level_id;
      console.log('Level ID:',level_id);
  
      if (level_id !== 1 && level_id !== 2) {
        console.log('Access denied, redirecting to forbidden');
        return NextResponse.redirect(new URL('/forbidden', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
