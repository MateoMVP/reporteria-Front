import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken"); // Usamos las cookies del servidor
  if (!token && !request.nextUrl.pathname.includes("_next")) {

    const clonedUrl = request.nextUrl.clone();
    clonedUrl.pathname = "/";
    return NextResponse.rewrite(clonedUrl);
  } else if (token && request.nextUrl.pathname === "/") {
    const clonedUrl = request.nextUrl.clone();
    clonedUrl.pathname = "/dashboard";
    return NextResponse.redirect(clonedUrl);
  } else {
    
    return NextResponse.next();
  }
  // Si hay token, permitir el acceso a la página solicitada
  return NextResponse.next();
}

// export const config = {
//   matcher:
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", // Interceptar las rutas que necesitan autenticación
// };
