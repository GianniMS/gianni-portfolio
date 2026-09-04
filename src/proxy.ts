import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const valid = await verifySessionToken(token)

  if (!valid) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
