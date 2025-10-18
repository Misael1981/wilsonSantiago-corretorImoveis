```
import { NextResponse } from "next/server"

export function middleware(req) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin")
  if (!isAdminRoute) return NextResponse.next()

  // Exemplo simples: cookie "admin_token" válido
  const token = req.cookies.get("admin_token")?.value
  if (!token || token !== process.env.ADMIN_TOKEN) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
```

```
import { NextResponse } from "next/server"

export function middleware(req) {
  const { pathname } = req.nextUrl
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

  if (!isAdminRoute) return NextResponse.next()

  if (pathname.startsWith("/admin/login")) return NextResponse.next()

  const token = req.cookies.get("ADMIN_TOKEN")?.value
  const expected = process.env.ADMIN_TOKEN

  if (!token || token !== expected) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
```
