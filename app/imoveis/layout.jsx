export const dynamic = "force-dynamic"

import { Outfit, Playfair_Display } from "next/font/google"
import "../globals.css"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./components/AppSidebar"
import HeaderImoveis from "./components/HeaderImoveis"
import { Suspense } from "react"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export default function ImoveisLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh w-full">
        <Suspense fallback={null}>
          <HeaderImoveis />
        </Suspense>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
