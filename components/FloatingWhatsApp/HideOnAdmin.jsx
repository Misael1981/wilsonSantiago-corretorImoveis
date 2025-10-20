"use client"

import { usePathname } from "next/navigation"
import FloatingWhatsApp from "."

export default function HideOnAdminFloatingWhatsApp() {
  const pathname = usePathname()

  if (!pathname) return null
  if (pathname.startsWith("/admin")) return null

  return <FloatingWhatsApp />
}