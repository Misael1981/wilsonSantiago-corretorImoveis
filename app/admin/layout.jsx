import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import SidebarDashboardAdmin from "./components/SidebarDashboardAdmin"

export const metadata = {
  robots: { index: false },
}

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <SidebarDashboardAdmin />
      <SidebarInset className="min-h-svh w-full">
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
