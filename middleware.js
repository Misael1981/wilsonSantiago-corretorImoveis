import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const host = request.headers.get("host")
  const oldHostRaw = process.env.OLD_HOST
  const newOrigin = process.env.NEXT_PUBLIC_SITE_URL

  // Normaliza OLD_HOST: suporta valores com protocolo (http://...) ou só host:porta
  const oldHost =
    oldHostRaw && oldHostRaw.includes("://")
      ? new URL(oldHostRaw).host
      : oldHostRaw || null

  const newHost = newOrigin ? new URL(newOrigin).host : null
  const isProd = process.env.NODE_ENV === "production"

  // Redireciona somente em produção, preserva path e query
  if (isProd && oldHost && newHost && host === oldHost) {
    const url = new URL(request.url)
    url.protocol = "https:"
    url.host = newHost
    return NextResponse.redirect(url, 301)
  }

  // Rotas protegidas
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // Pega token do NextAuth (JWT)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Não logado: manda pro sign-in do NextAuth com callback
  if (!token) {
    const signInUrl = new URL("/api/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(signInUrl)
  }

  // Logado mas sem permissão de ADMIN
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
