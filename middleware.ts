import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const host = req.headers.get("host")
  const oldHostRaw = process.env.OLD_HOST
  const newOrigin = process.env.NEXT_PUBLIC_SITE_URL
  const isProd = process.env.NODE_ENV === "production"

  const oldHost =
    oldHostRaw && oldHostRaw.includes("://")
      ? new URL(oldHostRaw).host
      : oldHostRaw || null

  const newHost = newOrigin ? new URL(newOrigin).host : null

  if (isProd && oldHost && newHost && host === oldHost) {
    const url = new URL(req.url)
    url.protocol = "https:"
    url.host = newHost
    return NextResponse.redirect(url, 301)
  }

  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  if (!token) {
    const signInUrl = new URL("/api/auth/signin", req.url)
    signInUrl.searchParams.set("callbackUrl", req.url)
    return NextResponse.redirect(signInUrl)
  }

  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
