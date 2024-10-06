import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Usamos las cookies del servidor

  if (!token) {
    // Redirigir al login si no hay token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token, permitir el acceso a la página solicitada
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*', // Interceptar las rutas que necesitan autenticación
}
