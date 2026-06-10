import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import PropertiesSidebar from "./components/PropertiesSidebar"

export default function PropertieLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <PropertiesSidebar />

      <SidebarInset className="min-h-svh w-full">{children}</SidebarInset>
    </SidebarProvider>
  )
}
