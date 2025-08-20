import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get('loggedIn')?.value;

  const protectedPaths = ['/employee-list', '/customer-list','/customer','/edit-customer','/','/product', '/product/:path*', '/customer/:path*','/enquiry/add','enquiry/list','enquiry/edit/','/fsn/add','/fsn/list'];

  const isProtected = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && loggedIn !== 'true') {
    // 🔁 Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ Allow the request
  return NextResponse.next();
}

// 👇 Add this to define which routes the middleware applies to
export const config = {
  matcher: ['/employee-list', '/','/customer-list','/customer','/edit-customer','/','/product', '/product/:path*', '/customer/:path*','/enquiry/add','/enquiry/list', '/enquiry/edit/:path*','/fsn/add','/fsn/list'],
};
