import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const authCookie = request.cookies.get('auth')?.value

  // Escludi la pagina password.html e file statici
  if (pathname === '/password.html' || pathname.startsWith('/_next') || pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.png') || pathname.endsWith('.ico') || pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
    return NextResponse.next()
  }

  // Se ha il cookie auth=ok, lascia entrare
  if (authCookie === 'ok') {
    return NextResponse.next()
  }

  // Altrimenti reindirizza a password.html
  return NextResponse.redirect(new URL('/password.html', request.url))
}