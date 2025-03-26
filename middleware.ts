import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Paths that are always accessible
  const publicPaths = ["/", "/auth/signin", "/auth/signup"]
  const isPublicPath = publicPaths.some((path) => pathname === path)

  // Check if the path is for authentication API routes
  const isAuthApiPath = pathname.startsWith("/api/auth")

  // Get the token
  const token = await getToken({ req: request })

  // Redirect logic
  if (isPublicPath || isAuthApiPath) {
    // If user is logged in and trying to access auth pages, redirect to dashboard
    if (token && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protected routes - redirect to signin if no token
  if (!token) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

