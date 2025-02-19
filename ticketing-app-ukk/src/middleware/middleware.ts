// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//     // const authHeader = req.headers.get('Authorization');
//     const authHeader = localStorage.getItem('token');

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       console.log("isi:" ,payload)
//       const level_id = payload.level_id;
//       console.log("level",level_id)
//       if (level_id !== 1 && level_id !== 2) {
//         return NextResponse.redirect(new URL('/forbidden', req.url));
//       }
//     } catch {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };
