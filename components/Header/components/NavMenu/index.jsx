"use client"

import DialogOrderYourProperty from "@/components/DialogOrderYourProperty"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  {
    id: "imoveis",
    label: "Imóveis",
    href: "/imoveis",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "sobre",
    label: "Sobre",
    href: "/sobre",
  },
]

// NavMenu component
const NavMenu = () => {
  const { data } = useSession()
  const isAdmin = data?.user?.role === "ADMIN"
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-wilson-golden bg-transparent text-lg">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-wilson-blue border-wilson-blue z-50 border">
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="text-wilson-blue hover:text-bold mt-4 mb-2 text-lg font-medium">
                        Home Page
                      </div>
                      <p className="text-muted-foreground text-wilson-blue text-sm leading-tight">
                        Acesso a página principal
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#highlights"
                      title="Novidades e Lançamentos"
                      className="text-wilson-golden"
                    >
                      Novidades e Lançamentos
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#contact"
                      title="Contato"
                      className="text-wilson-golden"
                    >
                      Contato
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#adress"
                      title="Localização"
                      className="text-wilson-golden"
                    >
                      Localização
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                asChild
                className="text-wilson-golden text-lg"
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-wilson-golden bg-transparent text-lg">
              Institucional
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border-wilson-blue z-50 border">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <button
                      className="text-wilson-golden cursor-pointer bg-transparent p-0"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setDialogOpen(true)
                      }}
                    >
                      Encomendar seu Imóvel
                    </button>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/cadastrar-imovel"
                      className="text-wilson-golden"
                    >
                      Cadastrar seu Imóvel
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/politica-de-privacidade"
                      className="text-wilson-golden"
                    >
                      Política de Privacidade
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {isAdmin && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="text-lg text-white">
                <Link href="/admin">Dashboard Administrativo</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {/* Renderiza o Dialog fora do menu para não desmontar ao fechar */}
      <DialogOrderYourProperty open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

export default NavMenu
