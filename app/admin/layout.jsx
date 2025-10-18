import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarDashboardAdmin from "./components/SidebarDashboardAdmin"

export const metadata = {
  robots: { index: false },
}

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <SidebarDashboardAdmin />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
