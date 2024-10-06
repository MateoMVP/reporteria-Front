import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken"); // Usamos las cookies del servidor
  console.log("Token:", request.nextUrl.pathname);
  if (!token) {
    // Redirigir al login si no hay token
    return NextResponse.redirect(new URL("/", request.url));
  } else if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Si hay token, permitir el acceso a la página solicitada
  return NextResponse.next();
}

// export const config = {
//   matcher:
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", // Interceptar las rutas que necesitan autenticación
// };
