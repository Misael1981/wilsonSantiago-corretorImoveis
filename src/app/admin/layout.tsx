import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
