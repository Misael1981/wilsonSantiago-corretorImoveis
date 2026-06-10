"use client"

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
  Home,
  HousePlus,
  LayoutDashboard,
  StickyNote,
  User2,
  Users,
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
    title: "Posts",
    url: "/admin/posts",
    icon: StickyNote,
  },
]

const AppSidebar = () => {
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Home Page</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
