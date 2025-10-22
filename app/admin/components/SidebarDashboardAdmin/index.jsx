import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Group,
  Home,
  House,
  HousePlus,
  Info,
  LayoutDashboard,
  StickyNote,
  Users,
  Warehouse,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Painel Principal",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Usuários",
    url: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Imóveis",
    url: "/admin/imoveis",
    icon: HousePlus,
  },
  {
    title: "Posts", // ✅ NOVO
    url: "/admin/posts",
    icon: StickyNote,
  },
  {
    title: "Informações do Grupo", // ✅ NOVO
    url: "/admin/info-grupo",
    icon: Group,
  },
]

const publicPagesItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Imóveis",
    url: "/imoveis",
    icon: Warehouse,
  },
  {
    title: "Sobre Nós",
    url: "/sobre-nos",
    icon: Info,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: StickyNote,
  },
]

const SidebarDashboardAdmin = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="bg-gradient-wilson-blue flex items-center justify-center rounded-md p-4">
          <Image
            src="/icons/logo-vertical.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicaçôes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Páginas Públicas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicPagesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default SidebarDashboardAdmin
