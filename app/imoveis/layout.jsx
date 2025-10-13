import { Outfit, Playfair_Display } from "next/font/google"
import "../globals.css"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "./components/AppSidebar"
import ImoveisBreadcrumb from "./components/BreadcrumbPage"
import HeaderImoveis from "./components/HeaderImoveis"

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
        <HeaderImoveis />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
