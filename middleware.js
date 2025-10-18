import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const { pathname } = req.nextUrl

  // Rotas protegidas
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // Pega token do NextAuth (JWT)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Não logado: manda pro sign-in do NextAuth com callback
  if (!token) {
    const signInUrl = new URL("/api/auth/signin", req.url)
    signInUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Logado mas sem permissão de ADMIN
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}